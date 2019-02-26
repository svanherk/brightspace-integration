'use strict';

/* eslint-disable no-console */

const fs = require('fs'),
	glob = require('glob'),
	replacer = require('./define-replacer.js');

glob(process.argv[2], function(err, files) {
	console.log('Replacing "define" with "define2"...');
	if (err) {
		throw err;
	}
	files.forEach(function(file) {
		fs.readFile(file, 'utf8', function(err, data) {
			if (err) {
				throw err;
			}
			const js = replacer(data);
			fs.writeFile(file, js, 'utf8', function(err) {
				if (err) {
					throw err;
				}
			});
		});
	});
});
