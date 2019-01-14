'use strict';

/*
 * DE32432: All UMD-based FRAs break because they rely on RequireJS
 * being present on the page. RequireJS collides with esm-amd-loader's
 * "define".
 * This attemps to go through the build output and replace all "define"
 * instances with "define2" to avoid this conflict.
 *
 * Cases:
 * "window.define ", "window.define.", "window.define)" in esm-amd-loader.js
 * " define)define(" in shared_bundle_1.js from FastDom
 * "define(" at the start of each bundle file
 */
const regex = /((\sdefine\)define\()|(window\.define\s)|(window\.define\.)|(window\.define\))|^(define\())/g;

module.exports = function(data) {
	return data.replace(regex, (match) => {
		return match.replace(/define/g, 'define2');
	});
};
