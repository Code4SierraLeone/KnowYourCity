/*
 *  Document   : index_maps.js
 *  Author     : samson
 *  Description: Custom JS code used in Google Maps Page
 */

var BaseCompMaps = function() {
    // Gmaps.js, for more examples you can check out https://hpneo.github.io/gmaps/

    // Init Regular Map on the index.html page
    function initMap() {

        // Here one can list all the locations to be mapped on the map, which will then be called when marking
        // Optionally, one can store this information within the same url and just import the data

        var locations = [
        {lat: 8.481146, lng: -13.21867},
        {lat: 8.482146, lng: -13.22867},
        {lat: 8.483146, lng: -13.23867},
        {lat: 8.484146, lng: -13.24867},
        {lat: 8.485146, lng: -13.25867},
        {lat: 8.486146, lng: -13.26867},
        {lat: 8.487146, lng: -13.27867},
        {lat: 8.488146, lng: -13.28867},
        {lat: 8.489146, lng: -13.29867},
        {lat: 8.480146, lng: -13.20867},
        {lat: 8.494146, lng: -13.22967},
        {lat: 8.474146, lng: -13.22867},
        {lat: 8.464146, lng: -13.22767},
        {lat: 8.454146, lng: -13.22667},
        {lat: 8.449146, lng: -13.22567},
        {lat: 8.438146, lng: -13.22467},
        {lat: 8.427146, lng: -13.22367},
        {lat: 8.416146, lng: -13.22267},
        {lat: 8.470146, lng: -13.22167},
        {lat: 8.471146, lng: -13.23567},
        {lat: 8.472146, lng: -13.24667},
        {lat: 8.473146, lng: -13.25767},
        {lat: 8.484146, lng: -13.20867},
        {lat: 8.495146, lng: -13.22967},
        {lat: 8.476246, lng: -13.22867},
        {lat: 8.467346, lng: -13.22767},
        {lat: 8.458446, lng: -13.22667},
        {lat: 8.440546, lng: -13.22567},
        {lat: 8.433646, lng: -13.22467},
        {lat: 8.422746, lng: -13.22367},
        {lat: 8.411846, lng: -13.22267},
        {lat: 8.474946, lng: -13.22167},
        {lat: 8.470146, lng: -13.23577},
        {lat: 8.471346, lng: -13.24687},
        {lat: 8.473246, lng: -13.25797},
        {lat: 8.484146, lng: -13.24817},
        {lat: 8.485146, lng: -13.25827},
        {lat: 8.486146, lng: -13.26837},
        {lat: 8.487146, lng: -13.27847},
        {lat: 8.488146, lng: -13.28857},
        {lat: 8.489146, lng: -13.29877},
        {lat: 8.480146, lng: -13.20887},
        {lat: 8.494146, lng: -13.22997},
        {lat: 8.474146, lng: -13.22807},
        {lat: 8.464146, lng: -13.22761},
        {lat: 8.454146, lng: -13.22662},
        {lat: 8.449146, lng: -13.22563},
        {lat: 8.438146, lng: -13.22464},
        {lat: 8.427146, lng: -13.22365},
        {lat: 8.416146, lng: -13.22266},
        {lat: 8.470146, lng: -13.22168},
        {lat: 8.471147, lng: -13.23569},
        {lat: 8.472148, lng: -13.24667},
        {lat: 8.473149, lng: -13.25767},
        {lat: 8.470141, lng: -13.23577},
        {lat: 8.471343, lng: -13.24687},
        {lat: 8.473244, lng: -13.25797},
        {lat: 8.484146, lng: -13.24817},
        {lat: 8.485145, lng: -13.25827},
        {lat: 8.486147, lng: -13.26837},
        {lat: 8.487148, lng: -13.27847},
        {lat: 8.488149, lng: -13.28857},
        {lat: 8.4891461, lng: -13.29877},
        {lat: 8.4801462, lng: -13.20887},
        {lat: 8.4941463, lng: -13.22997},
        {lat: 8.4741464, lng: -13.22807},
        {lat: 8.4641465, lng: -13.22761},
        {lat: 8.4541466, lng: -13.22662},
        {lat: 8.4491467, lng: -13.22563},
        {lat: 8.4381468, lng: -13.22464},
        {lat: 8.4271469, lng: -13.22365},
        {lat: 8.416146, lng: -13.222661},
        {lat: 8.470146, lng: -13.221682},
        {lat: 8.471147, lng: -13.235693},
        {lat: 8.472148, lng: -13.246674},
        {lat: 8.473149, lng: -13.257675},
        {lat: 8.471740, lng: -13.261676}
        ]

        var freetown = {lat: 8.484146, lng: -13.22867};
        var map = new google.maps.Map(document.getElementById('map'),{
            zoom: 14,
            center: freetown,
            scrollwheel: false,
            styles: [
                {
                    "featureType": "administrative.locality",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.school",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "saturation": -31
                        }
                    ]
                },
                {
                    "featureType": "poi.government",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.medical",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.sports_complex",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.place_of_worship",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }
            ]
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});



        // Indication of a sample mapping with info window giving more details which finalises the TODO indicated earlier
        // This approach may be long but offers a better clarification.
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Freetown</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Freetown</b>, also referred to as <b>Slavetown</b>, is a town ' +
            'with various cultures from across Africa. </p>'+
            '<p>Attribution: Freetown,'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: freetown,
            map: map,
            title: 'Freetown'
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        // Create a <script> tag and set the Amenities URL as the source.
        var script = document.createElement('script');
        // This example uses a local copy of the GeoJSON stored at
        // https://knowyourcity.com/
        script.src = 'https://knowyourcity.com/db/documentation/javascript/examples/json/amenities_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        // Loop through the results array and place a marker for each
        // set of coordinates.
        window.amfeed_callback = function(results) {
            for (var i = 0; i < results.features.length; i++) {
                var coords = results.features[i].geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1],coords[0]);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
            }
        };

        // The Google Maps Data Layer provides a container for arbitrary geospatial data (including GeoJSON).
        // If your data is in a file hosted on the same domain as your Maps JavaScript API application,
        // you can load it using the map.data.loadGeoJson() method. The file must be on the same domain,
        // but you can host it in a different subdomain. For example, you can make a request to files.example.com
        // from www.example.com.

        // This will be useful for the users who are in the Freetown Informal Settlement Areas and will
        // help them geolocate the mapped amenities inform of GeoJSON! I have disabled it as I am not within Freetown :)
        // var infoWindow = new google.maps.InfoWindow({map: map});

        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //         var pos = {
        //             lat: position.coords.latitude,
        //             lng: position.coords.longitude
        //         };

        //         infoWindow.setPosition(pos);
        //         infoWindow.setContent('<h5>You are Here, look around for location of the nearest Mapped Facility.</h5>');
        //         map.setCenter(pos);
        //     }, function() {
        //         handleLocationError(true, infoWindow, map.getCenter());
        //     });
        // } else {
        //     // Browser doesn't support Geolocation
        //     handleLocationError(false, infoWindow, map.getCenter());
        // }
    }
    

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

    return {
        init: function () {
            // Init Map
            initMap();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseCompMaps.init(); });