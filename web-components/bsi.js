import '../js/page-loading/performance-timings.js';

import 'whatwg-fetch'; // Required for d2l-fetch + IE11

import 'fastdom';

import '../src/components/hello-world.js';

window.D2L = window.D2L || {};
window.D2L.FastDom = window.fastdom;

import '../js/timing-debug.js';

import { d2lfetch } from '../node_modules/d2l-fetch/src/index.js';
window.d2lfetch = d2lfetch;

import d2lIntl from 'd2l-intl';
window.d2lIntl = d2lIntl;

// from bsi.html
/*
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
*/
import 'd2l-alert/d2l-alert.js';
import 'd2l-alert/d2l-alert-toast.js';
import 'd2l-link/d2l-link.js';
import 'd2l-button/d2l-button-icon.js';
import 'd2l-button/d2l-button-subtle.js';
import 'd2l-button/d2l-floating-buttons.js';
import 'd2l-button-group/d2l-button-group.js';
import 'd2l-button-group/d2l-action-button-group.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-content.js';
import 'd2l-dropdown/d2l-dropdown-context-menu.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-dropdown/d2l-dropdown-more.js';
import 'd2l-icons/d2l-icons.js';
/*
<link rel="import" href="../bower_components/d2l-inputs/d2l-input-search.html">
*/
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-menu/d2l-menu-item-link.js';
import 'd2l-polymer-behaviors/d2l-dom-expand-collapse.js';
import 'd2l-polymer-behaviors/d2l-gestures-swipe.js';
/*
currently broken: https://github.com/Brightspace/d2l-save-status/pull/13
import 'd2l-save-status/d2l-save-status.js';
*/
import 'd2l-simple-overlay/d2l-simple-overlay.js';
import '@polymer/iron-icon/iron-icon.js';
/*
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation.html">
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation-band.html">
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation-button.html">
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation-button-close.html">
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation-button-notification-icon.html">
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation-main-header.html">
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation-main-footer.html">
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation-link.html">
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation-link-back.html">
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation-link-image.html">
<link rel="import" href="../bower_components/d2l-navigation/d2l-navigation-separator.html">
<link rel="import" href="../bower_components/d2l-users/all-imports.html">
<link rel="import" href="navigation-icons.html">
*/
