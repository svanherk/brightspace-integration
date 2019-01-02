var ready;
var d2lComponentsLoaded = false;
var webComponentsReady = false;

function check() {
	if (d2lComponentsLoaded && webComponentsReady) {
		ready();
	}
}

module.exports = {
	WebComponentsLoaded: function() {
		d2lComponentsLoaded = true;
		check();
	},
	WCRDispatched: function() {
		webComponentsReady = true;
		check();
	},
	WebComponentsReady: new Promise(function(resolve) {
		ready = resolve;
	}),
	reset: function() {
		d2lComponentsLoaded = false;
		webComponentsReady = false;
		this.WebComponentsReady = new Promise(function(resolve) {
			ready = resolve;
		});
	}
};
