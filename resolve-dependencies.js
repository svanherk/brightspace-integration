'use strict';

/* How to use:
	1. Update package.json as desired
	2. Remove node_modules and package-lock.json
	3. Run "npm i" to generate a new package-lock.json
	4. Update "packages" below with desired overrides
	5. Run "node resolve-dependencies.js" to fix package-lock.json
	6. Run "npm ci"
*/

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const packageLockPath = path.join(__dirname, 'package-lock.json');
const packages = [
	{ name: 'd2l-colors', from: 'github:BrightspaceUI/colors#lit-element'},
	{ name: 'd2l-button', from: 'github:BrightspaceUI/button#lit-element'},
	{ name: 'd2l-icons', from: 'github:BrightspaceUI/icons#lit-element'},
	{ name: 'd2l-more-less', from: 'github:BrightspaceUI/more-less#lit-element'}
];

const jsonString = fs.readFileSync(packageLockPath);
const json = JSON.parse(jsonString);

process.stdout.write(chalk.green('\nResolving Dependencies\n\n'));
packages.forEach((p) => {
	const lockedDependency = json.dependencies[p.name];
	if (p.from !== lockedDependency.from) {
		process.stdout.write(chalk.red(`${p.name} does not exist in package-lock.json root dependencies`));
		process.exitCode = 1;
	}
	p.version = json.dependencies[p.name].version;
	process.stdout.write(`${chalk.gray('name:')} ${p.name}\n${chalk.gray('from:')} ${p.from}\n${chalk.gray('version:')} ${p.version}\n\n`);
});

const resolve = (json) => {
	for (const key in json) {
		packages.forEach((p) => {
			if (json[key].requires !== undefined && json[key].requires[p.name] !== undefined) {
				process.stdout.write(`${chalk.gray('for:')} ${key}\n${chalk.gray('replacing:')} ${p.name} (${json[key].requires[p.name]})\n`);
				json[key].requires[p.name] = p.from;
			}
			if (json[key].dependencies && json[key].dependencies[p.name]) {
				delete json[key].dependencies[p.name];
				if (Object.keys(json[key].dependencies).length === 0) {
					delete json[key].dependencies;
				}
			}
		});
		const subDeps = json[key].dependencies;
		if (subDeps !== undefined) {
			resolve(subDeps);
		}
	}
};

resolve(json.dependencies);

fs.writeFileSync(packageLockPath, JSON.stringify(json, null, 2));
