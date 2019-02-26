import {expect, use} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import d2lFastDom from '../js/d2l-fastdom.js';
import fastdomPromised from '../node_modules/fastdom/extensions/fastdom-promised.js';

fastdomPromised.fastdom = d2lFastDom;
fastdomPromised.initialize();

use(sinonChai).should();

describe('d2l-fastdom-promised', () => {

	var fastdomMock;

	beforeEach(() => {
		global.window = {
			fastdom: undefined
		};
		fastdomMock = {
			clear: sinon.spy(),
			measure: sinon.stub().callsFake(
				function(cb) { setTimeout(cb, 0); }
			),
			mutate: sinon.stub().callsFake(
				function(cb) { setTimeout(cb, 0); }
			)
		};
	});

	function triggerWebComponentReady() {
		d2lFastDom.__wcr.WebComponentsLoaded();
		d2lFastDom.__wcr.WCRDispatched();
		return d2lFastDom.__wcr.WebComponentsReady;
	}

	afterEach(() => {
		d2lFastDom.__reset();
		fastdomPromised.initialize();
	});

	describe('clear', () => {

		it('should call directly into fastdom if loaded', () => {
			fastdomMock.mutate.returns('1234');
			global.window['fastdom'] = fastdomMock;
			const promise = fastdomPromised.mutate(() => {});
			fastdomPromised.clear(promise);
			fastdomMock.clear.should.have.been.calledWith('1234');
		});

		it('should not call fastdom if cleared before loaded', () => {
			var promise = fastdomPromised.mutate();
			global.window['fastdom'] = fastdomMock;
			fastdomPromised.clear(promise);
			fastdomMock.clear.should.not.have.been.called;
		});

		it('should not call fastdom if cleared twice before loaded', () => {
			var promise = fastdomPromised.mutate();
			global.window['fastdom'] = fastdomMock;
			fastdomPromised.clear(promise);
			fastdomPromised.clear(promise);
			fastdomMock.clear.should.not.have.been.called;
		});

	});

	['measure', 'mutate'].forEach((method) => {
		describe(`method ${method}`, () => {

			it('should call directly into fastdom if loaded', (done) => {
				var cb = sinon.spy();
				global.window['fastdom'] = fastdomMock;
				fastdomPromised[method](cb)
					.then(() => {
						cb.should.have.been.called;
						done();
					});
			});

			it('should create a "pending" map entry when fastdom not loaded', () => {
				fastdomPromised[method]();
				expect(d2lFastDom.__getIdMap()['d2l_fastdom_1'].id).to.equal('pending');
			});

			it('should call into fastdom after WCR event', (done) => {
				var cb = sinon.spy();
				var promise = fastdomPromised[method](cb);
				global.window['fastdom'] = fastdomMock;
				Promise.all([promise, triggerWebComponentReady()]).then(() => {
					cb.should.have.been.called;
					done();
				});
			});

		});

	});

});
