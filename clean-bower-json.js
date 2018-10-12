'use strict';

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const bowerJsonPath = path.join(__dirname, 'bower.json');

fs.readFile(bowerJsonPath, { encoding: 'utf8' }, function(err, jsonString) {
	if (err) {
		console.error('Failed to open bower.json', err);
		process.exitCode = 1;
		return;
	}

	const bowerJson = JSON.parse(jsonString);

	const cleanedBowerJsonString = JSON.stringify(bowerJson, replacer, 2);

	fs.writeFile(bowerJsonPath, cleanedBowerJsonString, function(err) {
		if (err) {
			console.error('Error writing bower.json', err);
			process.exitCode = 1;
			return;
		}
	});
});

function replacer(key, value) {
	if (key === 'lastUpdated') {
		return undefined;
	}

	if (typeof value === 'object') {
		const newValue = {};

		for (const key of Object.keys(value).sort(keySorter)) {
			newValue[key] = value[key];
		}

		return newValue;
	}

	return value;
}

function keySorter(a, b) {
	return a.localeCompare(b, {
		sensitiviety: 'base'
	});
}
