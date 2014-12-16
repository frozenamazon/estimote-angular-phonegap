(function()
{
	var app = angular.module('Beacon', []);
	
	app.controller('BeaconCtrl', ['$scope', 'configuration', function($scope, configuration){

		function onScanError(errorMessage)
		{
			$scope.error = errorMessage;
			$scope.beaconList = {};
		}

		$scope.showAd = true;
		$scope.scanFlag = false;

		var registeredBeacon = {
			major: 42204,
			minor: 40284,
			ad: 'Welcome to Macquarie. We currently have a staff offer for Macquarie Life'
		};

		function onScan(beacons){
			// Sort beacons by signal strength.
			var beaconsList = beacons.beacons;

			beaconsList.sort(function(beacon1, beacon2) {
				return beacon1.rssi > beacon2.rssi; 
			});

			$scope.beaconList = beaconsList;
			$scope.$apply();

			if($scope.showAd){
				angular.forEach(beaconsList, function(beacon){
					if((beacon.major === registeredBeacon.major) && (beacon.minor === registeredBeacon.minor)){
						if(beacon.rssi > -90){
							$scope.ad = registeredBeacon.ad;
						}
						else{
							$scope.ad = 'No beacons nearby';
						}
					}
				});
			}
		}

		$scope.clearAds = function(){
			$scope.ad = '';
		};

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
			$scope.scanFlag = true;

			EstimoteBeacons.startEstimoteBeaconsDiscoveryForRegion(
			{}, // Empty region matches all beacons.
			onScan,
			onScanError);
		};

		$scope.stopScanning = function(){
			EstimoteBeacons.stopEstimoteBeaconDiscovery();
			$scope.scanFlag = false;
		};

		// ------------- Initialisation ------------- //
		document.addEventListener('deviceready', onDeviceReady, false);	

	}]);

})();
