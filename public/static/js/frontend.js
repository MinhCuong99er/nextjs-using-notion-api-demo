/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import $ from 'jquery';
// import jQuery from 'jquery';

export const initJquery = () => {
	$(document).ready(function () {
		// window.TMT.owl('.slider-home', 1, 10, false);
		// window.TMT.owl('.slider-promotion', 3, 15, true, false);
		if ($('.livechat-girl').length > 0) {
			setInterval(function() {
				$('.livechat-girl .animated-circles').addClass('animated');
				setTimeout(function() {
					$('.livechat-girl .animated-circles').removeClass('animated');
				}, 3000);
			}, 6000);
			$('.livechat-girl').hover(
				function() {
					$('.popover', $(this)).css({ 'display': 'block' }).addClass('fade in');
				},
				function() {
					$('.popover', $(this)).css({ 'display': 'none' }).removeClass('fade in');
				}
			);
		}
		
		// window.TMT.owl('.slider-style-1', 1, 0, true);
		// window.TMT.owl('.slider-about', 1, 0);

		// window.TMT.owl('.list-gallery', 1, 10, true);
		// window.TMT.owl('.slider-dt-product', 1, 10, false);


		// window.TMT.mobile();
		// window.TMT.wow();
		// window.TMT.scrollToDiv();
		// window.TMT.menuMobile();
		// window.TMT.setUTM();

		// $('[data-toggle="tooltip"]').tooltip();
		// $('#modalDetail').on('shown.bs.modal', function () {
		// 	// console.log('123');
		// 	const _img = $(this).find('.aligncenter');
		// 	_img.each(function () {
		// 		$(this).attr('data-zoom-image', $(this).attr('src'));
		// 		$(this).elevateZoom({
		// 			zoomType: "inner",
		// 			cursor: "crosshair"
		// 		});
		// 	});
		// });

		// $('#modalDetail').on('hide.bs.modal', function () {
		// 	$('.zoomContainer').remove();
		// });
		// let viewportwidth;
		// let viewportheight;
		// if (typeof window.innerWidth != 'undefined') {
		// 	viewportwidth = window.innerWidth;
		// 	viewportheight = window.innerHeight;
		// }
		// if (viewportwidth > 768) {
		// 	setTimeout(function () {
		// 		$('.right-product').height($('.left-product').innerHeight() - 45);
		// 	}, 800);

		// }
		//
		// $(".fancybox").fancybox({
		// 	// prevEffect	: 'none',
		// 	// nextEffect	: 'none',

		// 	title: {
		// 		type: 'outside'
		// 	},
		// 	fullScreen: {
		// 		autoStart: false
		// 	},

		// });
	});
};

export const initJqueryLocation = () => {
	let locationAddress = ($('#locationValue').val() || "").split('|');
	let locationCount = $('#locationCount').val();
	let locationNameValue = ($('#locationNameValue').val() || "").split('|');
	let listMarkes = [];
	let viewportwidth;
	let viewportheight;
	function getLatLng(locationNameValue, address) {
		// console.log( address );
		var geo = new google.maps.Geocoder();
		geo.geocode({ 'address': address }, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				listMarkes.push([address, results[0].geometry.location.lat(), results[0].geometry.location.lng(), locationNameValue]);

				// console.log( listMarkes );
			}
			else {
				return '';
			}
		});
	}

	let map;
	let infoWindow = null;
	let marker = null;
	function initMap() {

		let bounds = new google.maps.LatLngBounds();
		let mapOptions = {
			mapTypeId: 'roadmap'
		};

		// Display a map on the web page
		map = new google.maps.Map(document.getElementById("map"), mapOptions);
		map.setTilt(50);

		// Multiple listMarkes location, latitude, and longitude


		// Info window content

		// Add multiple listMarkes to map
		infoWindow = new google.maps.InfoWindow();
		let i;

		// Place each marker on the map
		for (i = 0; i < listMarkes.length;) {
			let position = new google.maps.LatLng(listMarkes[i][1], listMarkes[i][2]);
			bounds.extend(position);
			marker = new google.maps.Marker({
				position: position,
				map: map,
				title: '<div style="text-align:center"><strong>' + listMarkes[i][3] + '</strong><br />' + listMarkes[i][0] + '</div>'
			});
			marker.setIcon('//maps.google.com/mapfiles/ms/icons/green-dot.png');
			// Add info window to marker
			google.maps.event.addListener(marker, 'click', (function (marker, i) {
				return function () {
					infoWindow.setContent('<div style="text-align:center"><strong>' + listMarkes[i][3] + '</strong><br/>' + listMarkes[i][0] + '</div>');
					infoWindow.open(map, marker);
				};
			})(marker, i));
			infoWindow.setContent('<div style="text-align:center"><strong>' + listMarkes[i][3] + '</strong><br />' + listMarkes[i][0] + '</div>');
			infoWindow.open(map, marker);
			// Center the map to fit all listMarkes on the screen
			map.fitBounds(bounds);

		}

		// Set zoom level
		var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
			this.setZoom(12);
			google.maps.event.removeListener(boundsListener);
		});

	}
	// Load initialize function

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ?
			'Error: The Geolocation service failed.' :
			'Error: Your browser doesn\'t support geolocation.');
		infoWindow.open(map);
	}

	function clickAddress(name, address) {
		// marker.setAnimation(null);
		if (infoWindow) {
			infoWindow.close();
		}
		var _html = '<div style="text-align:center"><strong>' + name + '</strong><br />' + address + '</div>';
		// console.log( address );
		var geo = new google.maps.Geocoder();
		geo.geocode({ 'address': address }, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				var bounds = new google.maps.LatLngBounds();
				listMarkes.push([address, results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
				infoWindow = new google.maps.InfoWindow();
				var position = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
				bounds.extend(position);
				marker = new google.maps.Marker({
					position: position,
					map: map,
					animation: google.maps.Animation.DROP,
					title: _html
				});
				marker.setIcon('//maps.google.com/mapfiles/ms/icons/green-dot.png');
				marker.setAnimation(google.maps.Animation.BOUNCE);
				function toggleBounce() {
					if (marker.getAnimation() !== null) {
						marker.setAnimation(null);
					} else {
						marker.setAnimation(google.maps.Animation.BOUNCE);
					}
				}
				// Add info window to marker
				google.maps.event.addListener(marker, 'click', (function (marker) {
					return function () {
						infoWindow.setContent(_html);
						infoWindow.open(map, marker);
					};
				})(marker));
				google.maps.event.addListener(marker, 'click', toggleBounce);

				infoWindow.setContent(_html);
				infoWindow.open(map, marker);
				// Center the map to fit all listMarkes on the screen
				map.fitBounds(bounds);
				// Set zoom level
				var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
					this.setZoom(14);
					google.maps.event.removeListener(boundsListener);
				});
			}
			else {
				return '';
			}
		});

		let viewportwidth;
		let viewportheight;
		if (typeof window.innerWidth != 'undefined') {
			viewportwidth = window.innerWidth;
			viewportheight = window.innerHeight;
		}
		if (viewportwidth < 800) {
			setTimeout(function () {
				$("html, body").animate({ scrollTop: $("#map").offset().top }, 500);
			}, 1000);
		}
	}

	function nearlyMap() {
		// marker.setAnimation(null);
		if (infoWindow) {
			infoWindow.close();
		}
		// Try HTML5 geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				let pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				let latlng = { lat: parseFloat(pos['lat']), lng: parseFloat(pos['lng']) };
				let geocoder = new google.maps.Geocoder;
				geocoder.geocode({ 'location': latlng }, function (results, status) {
					if (status === 'OK') {
						if (results[0]) {
							map.setZoom(12);
							var image = '/wp-content/themes/blankthemes/assets/images/current-location.png';
							marker = new google.maps.Marker({
								position: latlng,
								map: map,
								icon: image,
								title: results[0].formatted_address
							});
							// marker.setAnimation(google.maps.Animation.BOUNCE);
							google.maps.event.addListener(marker, 'click', (function (marker) {
								return function () {
									infoWindow.setContent(results[0].formatted_address);
									infoWindow.open(map, marker);
								};
							})(marker));
							infoWindow = new google.maps.InfoWindow();
							infoWindow.setContent(results[0].formatted_address);
							infoWindow.open(map, marker);
						} else {
							window.alert('No results found');
						}
					} else {
						window.alert('Geocoder failed due to: ' + status);
					}
				});
				map.setCenter(pos);
			}, function () {
				handleLocationError(true, infoWindow, map.getCenter());
			});
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter());
		}
		let viewportwidth;
		let viewportheight;
		if (typeof window.innerWidth != 'undefined') {
			viewportwidth = window.innerWidth,
				viewportheight = window.innerHeight;
		}
		if (viewportwidth < 800) {
			setTimeout(function () {
				$("html, body").animate({ scrollTop: $("#map").offset().top }, 500);
			}, 1000);
		}
	}

	
	$(document).ready(function () {

		// console.log( locationAddress[locationCount] );

		if (typeof window.innerWidth != 'undefined') {
			viewportwidth = window.innerWidth;
			viewportheight = window.innerHeight;
		}
		if (viewportwidth > 800) {
			$('#list-address').height($('#map').outerHeight() - 30);
		}

		var _i = 0;
		var getL = setInterval(function () {
			getLatLng(locationNameValue[_i], locationAddress[_i]);
			if (_i == 5) {
				clearInterval(getL);
				initMap();
			}
			// console.log(_i);
			_i++;
		}, 450);
	});
};