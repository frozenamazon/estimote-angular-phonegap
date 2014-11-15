(function()
{
	var app = angular.module('Beacon', []);
	
	app.controller('BeaconCtrl', ['$scope', 'configuration', function($scope, configuration){

		function onError(errorMessage)
		{
			console.log('Scan error: ' + errorMessage);
		}

		function onScan(beacons){
			// Sort beacons by signal strength.
			beacons.beacons.sort(function(beacon1, beacon2) {
				return beacon1.rssi > beacon2.rssi; });

			$scope.beaconList = beacons.beacons;
			$scope.$apply();
		}

		function onDeviceReady(){

		}

		$scope.beaconColor = function(color){
			if (!color)
			{
				color = 0;
			}

			// Eliminate bad values (just in case).
			color = Math.max(0, color);
			color = Math.min(5, color);

			// Return style class for color.
			return configuration.beaconColorStyles[color];
		};

		$scope.scanBeacons = function(){

			EstimoteBeacons.startEstimoteBeaconsDiscoveryForRegion(
			{}, // Empty region matches all beacons.
			onScan,
			onError);
		};

		$scope.stopScanning = function(){
			EstimoteBeacons.stopEstimoteBeaconDiscovery();
		};

		// ------------- Initialisation ------------- //
		document.addEventListener('deviceready', onDeviceReady, false);	

	}]);

})();
