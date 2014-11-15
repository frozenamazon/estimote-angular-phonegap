(function(){
	'use strict'
	
	var app = angular.module('Beacon');

	app.factory('configuration', function (){
		var beaconColorStyles = [
			'style-color-unknown style-color-unknown-text',
			'style-color-mint style-color-mint-text',
			'style-color-ice style-color-ice-text',
			'style-color-blueberry-dark style-color-blueberry-dark-text',
			'style-color-white style-color-white-text',
			'style-color-transparent style-color-transparent-text'];

		var beaconLog = [
			{
				major: 42204, 
				minor: 40284
			}
		];

		return{
			beaconColorStyles: beaconColorStyles,
			beaconLog: beaconLog
		}
	});

})();