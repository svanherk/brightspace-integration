'use strict';

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const packageLockPath = path.join(__dirname, 'package-lock.json');

function validate(json, depth) {
	depth++;
	for (const key in json) {
		if (key.substr(0, 4) === 'd2l-' && depth > 1) {
			console.error(`D2L sub-dependency detected: "${key}". All "d2l-*" web component dependencies must be at root level to avoid duplicate registrations. Check that the version ranges in "package.json" do not contain anything beyond the major version.`);
			process.exitCode = 1;
		}
		const subDeps = json[key].dependencies;
		if (subDeps !== undefined) {
			validate(subDeps, depth);
		}
	}
}

fs.readFile(packageLockPath, { encoding: 'utf8' }, function(err, jsonString) {

	if (err) {
		console.error('Failed to open package-lock.json', err);
		process.exitCode = 1;
		return;
	}

	const json = JSON.parse(jsonString);
	validate(json.dependencies, 0);

});
