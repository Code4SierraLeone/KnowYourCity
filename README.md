## KnowYourCity Campaign [Code4SierraLeone]
=============================================


**This branch mainly contains the main logic of the app that handles the Administrative Management part and can be used to both map the data as well manipulate and manage the data.**

Know Your City Campaign aims at mapping all the amenities within Informal Settlement areas in Freetown, Sierra Leone, so as to help the occupants get help in the case of a disaster in the regions. The mapping will give details in terms of directions and distance from their current locations as well as the services offered in those areas.


For the User Interface Design and Logic Implementation, I have used the following resources(please refer to the documentation for further details on each)
* `jQuery`
* `HTML` & `LessCSS`
* `Google Maps Javascript API v3`
* `JavaScript`
* `Golang`
* `Firebase`(Authentication and Real-Time Database)

## Main Features

* Allow users to find mapped resource centers in the Informal Settlement Areas
* Allow users to have access to contacts to the mapped resource centers
* Allow users to  Identify their current location on the map, thus be able to trace the mapped locations

## Quick Overview

KnowYourCity Campaign App has four main sections. Each sections aims at offering unique and important role 
in the whole system. As indicated below;

#### Landing Page

Just a simple descriptive landing page to help new users understand the aim of the web-app. 

![alt tag](https://raw.githubusercontent.com/Code4SierraLeone/KnowYourCity/base/assets/img/photos/13.png)


#### Web-App Main Page

The home page design aims to showing the user all the mapped amenities in various locations with the Informal 
Settlement Areas in Freetown. It also allows the users to know their current location and have access to Google 
Directions to help them find the closest mapped amenity.

![alt tag](https://raw.githubusercontent.com/Code4SierraLeone/KnowYourCity/base/assets/img/photos/12.png)


#### Web-App Support-Center Page

This page contains the direct contacts to all the amenities centers. With this tool users can easily reach out to
these centers in any case of emergency, and hopefully get quick medic assistance or quick access to these centers 
by ambulances support.

![alt tag](https://raw.githubusercontent.com/Code4SierraLeone/KnowYourCity/base/assets/img/photos/14.png)

#### Web-App Report-Hazard Page

We believe that Hazard occurrence can be natural and new ones can happen anytime. Thus we are giving the users the power
to report new hazards in their areas, thus help us easily reach out to the emergency cases in time.

![alt tag](https://raw.githubusercontent.com/Code4SierraLeone/KnowYourCity/base/assets/img/photos/15.png)

#### Web-App Help | FAQ Page

This page offers answers to the Frequently Asked Questions about the KnowYourCity Campaign App as well as it highlights the main objectives
and serves as a quick help page.

![alt tag](https://raw.githubusercontent.com/Code4SierraLeone/KnowYourCity/base/assets/img/photos/16.png)

## Developers

* Ensure to visit the `3_init_logi branch` to check details on handling the logic and Admin system. This is entirely built on `golang` base.
* To view the current user interface designs just serve the files from the `root` on your local server. You can as well set up the `$GOPATH` and run the `main.go` server found on this [3_init_logi branch](https://github.com/Code4SierraLeone/KnowYourCity/tree/3_init_logic).

>#### Getting your development instance of Know Your City Campaign app

1. Clone this repository

   `$ https://github.com/Code4SierraLeone/KnowYourCity.git`

2. Install project dependencies via `go get`.

    `$ go get`

3. Run a development server from the root folder.

    * `$ go run app/serve.go ` (This is for current tests)
    * `$ go run app/main.go ` (This is for server deployment stage)

>#### Data Mapping

* Collection and Implementation of data mapping.
* Included in the package is the Google Places API which I am using to search for all the hospitals within a radius of 11000, 
this shows and maps any health center within that radius. Which is an amazing way of identifying amenities around the user. Thank you Google Map Places.

```javascript
	map = new google.maps.Map(document.getElementById('map'), {
	          center: freetown,
	          zoom: 14
	        });

	        infowindow = new google.maps.InfoWindow();
	        var service = new google.maps.places.PlacesService(map);
	        service.nearbySearch({
	          location: freetown,
	          radius: 11000,
	          type: ['store']
	        }, callback);
	      }

	      function callback(results, status) {
	        if (status === google.maps.places.PlacesServiceStatus.OK) {
	          for (var i = 0; i < results.length; i++) {
	            createMarker(results[i]);
	          }
	        }
	      }

	      function createMarker(place) {
	        var placeLoc = place.geometry.location;
	        var marker = new google.maps.Marker({
	          map: map,
	          position: place.geometry.location
	        });

	        google.maps.event.addListener(marker, 'click', function() {
	          infowindow.setContent(place.name);
	          infowindow.open(map, this);
	        });
```

* To avoid data crowding, I have decided to use the marker clustering tool, which allows me to group the markers and as the user zoom in they get to reveal each marker and thus be able to view the information on that marker.

```javascript
        // Create an array of alphabetical characters used to label the markers.
        
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: location,
            label: labels[i % labels.length]
          });
        });
        

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

```
* When implementing the Google Places API its important to note that you need to include the `Google Map Places library`
as below.

```html
<script src="//maps.googleapis.com/maps/api/js?key=`YOUR-KEY`&libraries=places"></script>
```

>#### GEO-Location & Google Map Directions

The core aim of KnowYourCity Campaign is to give seamless solution to finding amenities. Mapping the amenities is enough but 
giving the users the power to know where they are currently situated, will even make it better, as they will easily know which
direction to take to access the amenities. With this we can easily introduce Google Directions which is the perfect solution.

```javascript
        // This will be useful for the users who are in the Freetown Informal Settlement Areas and will
        // help them geolocate the mapped amenities inform of GeoJSON!
        var infoWindow = new google.maps.InfoWindow({map: map});

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('<h5>You are Here, look around for location of the nearest Mapped Facility.</h5>');
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
```

## UI/UX Design

KnowYourCity Campaign App is smart-phone friendly. This should come in handy for usage of the system from any platform

![alt tag](https://raw.githubusercontent.com/Code4SierraLeone/KnowYourCity/base/assets/img/photos/11.png)

>##### Setting up the UI Layout functionality

Check the `app.js`

```javascript
    // Layout functionality
    var uiLayout = function() {
        // Resizes #main-container min height (push footer to the bottom)
        var $resizeTimeout;

        if ($lMain.length) {
            uiHandleMain();

            jQuery(window).on('resize orientationchange', function(){
                clearTimeout($resizeTimeout);

                $resizeTimeout = setTimeout(function(){
                    uiHandleMain();
                }, 150);
            });
        }

        // Init sidebar and side overlay custom scrolling
        uiHandleScroll('init');

        // Init transparent header functionality (solid on scroll - used in frontend)
        if ($lPage.hasClass('header-navbar-fixed') && $lPage.hasClass('header-navbar-transparent')) {
            jQuery(window).on('scroll', function(){
                if (jQuery(this).scrollTop() > 20) {
                    $lPage.addClass('header-navbar-scroll');
                } else {
                    $lPage.removeClass('header-navbar-scroll');
                }
            });
        }

        // Call layout API on button click
        jQuery('[data-toggle="layout"]').on('click', function(){
            var $btn = jQuery(this);

            uiLayoutApi($btn.data('action'));

            if ($lHtml.hasClass('no-focus')) {
                $btn.blur();
            }
        });
    };
```
>##### Layout API

```javascript
    var uiLayoutApi = function($mode) {
        var $windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
```
>##### Blocks Options Functionality

* First am initializing default icons full-screen and content toggle buttons
* Then calling blocks API on option button click
```javascript
    var uiBlocks = function() {
        uiBlocksApi(false, 'init');

        jQuery('[data-toggle="block-option"]').on('click', function(){
            uiBlocksApi(jQuery(this).closest('.block'), jQuery(this).data('action'));
        });
    };
```

## Current Internal Issues

* Need to figure out to use the cluster tool on the identified `google search places`
* Broken side-menu on the web-app page. Working to fix this ASAP **[FIXED]** 

## Milestone/Backlog

* Fully integrate the SMS feature into the app to allow for quick notifications
