// The app object is defined in a closure to make it easier to
// change its visible name, if that would be needed.
var app = (function()
{
	// Application object.
	var app = {};

	// ------------- Private helper functions ------------- //

	function onDeviceReady()
	{
		// TODO: Add functionality if needed.
	}

	app.startScanning = function()
	{
		function onScan(beaconInfo)
		{
			//console.log('onScan');
			displayBeconInfo(beaconInfo);
		}

		function onError(errorMessage)
		{
			console.log('Scan error: ' + errorMessage);
		}

		function displayBeconInfo(beaconInfo)
		{
			//console.log('displayBeconInfo');
			// Clear beacon HTML items.
			$('.style-beacon-list').empty();

			// Sort beacons by signal strength.
			beaconInfo.beacons.sort(function(beacon1, beacon2) {
				return beacon1.rssi > beacon2.rssi; });

			// Generate HTML for beacons.
			var html = '';
			$.each(beaconInfo.beacons, function(key, beacon)
			{
				// jQuery doesn't work.
				var element = $(createBeaconHTML(beacon));
				$('.style-beacon-list').append(element);
			});
		};

		function createBeaconHTML(beacon)
		{
			console.log('beacon: '+beacon.major+' '+beacon.minor+', '+beacon.rssi+' ('+beacon.measuredPower+')');
			htm = '<div class="style-color-mint style-color-mint-text">'
				+ '<table><tr><td>Major</td><td>' + beacon.major
				+ '</td></tr><tr><td>Minor</td><td>' + beacon.minor
				+ '</td></tr><tr><td>RSSI</td><td>' + beacon.rssi
				+ '</td></tr><tr><td>Measured power</td><td>' + beacon.measuredPower
				+ '</td></tr><tr><td>MAC address</td><td>' + beacon.macAddress
				+ '</td></tr></table></div>';
			return htm;
		};

		console.log("startEstimoteBeaconsDiscoveryForRegion")

		EstimoteBeacons.startEstimoteBeaconsDiscoveryForRegion(
			{}, // Empty region matches all beacons.
			onScan,
			onError);
	};

	app.stopScanning = function()
	{
		console.log("stopEstimoteBeaconDiscovery")
		EstimoteBeacons.stopEstimoteBeaconDiscovery();
	};

	// ------------- Initialisation ------------- //

	document.addEventListener('deviceready', onDeviceReady, false);


	// ------------- Return application object ------------- //

	return app;

})();
