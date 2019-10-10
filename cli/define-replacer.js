'use strict';

/*
 * DE32432: All UMD-based FRAs break because they rely on RequireJS
 * being present on the page. RequireJS collides with esm-amd-loader's
 * "define".
 * This attemps to go through the build output and replace all "define"
 * instances with "define2" to avoid this conflict.
 *
 * Cases:
 * "window.define=", "window.define.", "window.define)" in esm-amd-loader.js
 * " define)define(" in shared_bundle_1.js from FastDom
 * "define(" at the start of each bundle file
 * " define?define(" near the end of shared_bundle_1.js from babel (https://github.com/babel/babel/issues/10512)
 */
const regex = /((\sdefine\)define\()|(\sdefine\?define\()|(window\.define=)|(window\.define\.)|(window\.define\))|^(define\())/g;

module.exports = function(data) {
	return data.replace(regex, (match) => {
		return match.replace(/define/g, 'define2');
	});
};
