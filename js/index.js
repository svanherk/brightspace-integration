import './polyfills.js';

window.D2L = window.D2L || {};

import webComponentsReady from './d2l-web-components-ready.js';
window.D2L.WebComponentsLoaded = webComponentsReady.WebComponentsLoaded;
window.D2L.WCRDispatched = webComponentsReady.WCRDispatched;
window.D2L.WebComponentsReady = webComponentsReady.WebComponentsReady;
if (window.d2lWCLoaded) {
	webComponentsReady.WebComponentsLoaded();
}
if (window.d2lWCRDispatched) {
	webComponentsReady.WCRDispatched();
}

import FastDom from './d2l-fastdom.js';
window.D2L.FastDom = FastDom;

import './timing-debug.js';

window.D2L = window.D2L || {};

import FastDom from './d2l-fastdom.js';
window.D2L.FastDom = FastDom

import './timing-debug.js';

import '../bower_components/jquery-vui-change-tracking/changeTracker.js';
import '../bower_components/jquery-vui-change-tracking/changeTracking.js';
