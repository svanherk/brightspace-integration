import '../js/page-loading/performance-timings.js';

import 'whatwg-fetch'; // Required for d2l-fetch + IE11

import 'fastdom';

window.D2L = window.D2L || {};
window.D2L.FastDom = window.fastdom;

import '../js/timing-debug.js';

// from bsi.html
/*
<link rel="import" href="../bower_components/d2l-fetch/d2l-fetch.html">
<link rel="import" href="../bower_components/d2l-fetch-auth/d2l-fetch-auth.html">
<link rel="import" href="../bower_components/d2l-fetch-dedupe/d2l-fetch-dedupe.html">
<link rel="import" href="../bower_components/d2l-fetch-simple-cache/d2l-fetch-simple-cache.html">

<script>
	window.d2lfetch.use({
		name: 'auth',
		fn: window.d2lfetch.auth,
		options: {
			enableTokenCache: true
		}
	});
	window.d2lfetch.use({name: 'dedupe', fn: window.d2lfetch.dedupe});
	window.d2lfetch.use({name: 'simpleCache', fn: window.d2lfetch.simpleCache});
</script>

<link rel="import" href="../bower_components/polymer/polymer.html">
<link rel="import" href="../bower_components/d2l-alert/d2l-alert.html">
<link rel="import" href="../bower_components/d2l-fastdom-import/fastdom.html">
<link rel="import" href="../bower_components/d2l-link/d2l-link.html">
*/
import '../node_modules/d2l-button/d2l-button-icon.js';
import '../node_modules/d2l-button/d2l-button-subtle.js';
import '../node_modules/d2l-button/d2l-floating-buttons.js';
/*
<link rel="import" href="../bower_components/d2l-button-group/d2l-button-group.html">
<link rel="import" href="../bower_components/d2l-button-group/d2l-action-button-group.html">
<link rel="import" href="../bower_components/d2l-dropdown/d2l-dropdown.html">
<link rel="import" href="../bower_components/d2l-dropdown/d2l-dropdown-content.html">
<link rel="import" href="../bower_components/d2l-dropdown/d2l-dropdown-menu.html">
<link rel="import" href="../bower_components/d2l-dropdown/d2l-dropdown-more.html">
<link rel="import" href="../bower_components/d2l-image-action/d2l-image-action.html">
<link rel="import" href="../bower_components/d2l-intl-import/d2l-intl.html">
*/
import '../node_modules/d2l-icons/d2l-icons.js';
/*
<link rel="import" href="../bower_components/d2l-loading-spinner/d2l-loading-spinner.html">
<link rel="import" href="../bower_components/d2l-menu/d2l-menu.html">
<link rel="import" href="../bower_components/d2l-menu/d2l-menu-item-link.html">
<link rel="import" href="../bower_components/d2l-polymer-behaviors/d2l-dom-expand-collapse.html">
<link rel="import" href="../bower_components/d2l-polymer-behaviors/d2l-gestures-swipe.html">
<link rel="import" href="../bower_components/d2l-simple-overlay/d2l-simple-overlay.html">
*/
import '../node_modules/@polymer/iron-icon/iron-icon.js';
/*
<link rel="import" href="navigation-band.html">
<link rel="import" href="navigation-icons.html">
*/
