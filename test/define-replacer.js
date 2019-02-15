import {expect} from 'chai';
import replacer from '../cli/define-replacer.js';

describe('define-replacer', () => {

	const inputs = [
		{in: 'define(["exports","../my_bundle.js"]', expect: 'define2(["exports","../my_bundle.js"]'},
		{in: 'if("function"==typeof define)define(function(){', expect: 'if("function"==typeof define2)define2(function(){'},
		{in: 'if(!window.define){', expect: 'if(!window.define2){'},
		{in: 'window.define=function (deps, moduleBody) {', expect: 'window.define2=function (deps, moduleBody) {'},
		{in: 'window.define._reset=function () {', expect: 'window.define2._reset=function () {'}
	];

	inputs.forEach((input) => {
		it(`should replace "define" in "${input.in}"`, () => {
			const out = replacer(input.in);
			expect(out).to.equal(input.expect);
		});
	});

});
