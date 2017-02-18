/*
 *  Document   : index_maps.js
 *  Author     : samson
 *  Description: Custom JS code used in Google Maps Page
 */

var BaseCompMaps = function() {
    // Gmaps.js, for more examples you can check out https://hpneo.github.io/gmaps/

    function CoordMapType(tileSize) {
        this.tileSize = tileSize;
      }

      CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var div = ownerDocument.createElement('div');
        div.innerHTML = coord;
        div.style.width = this.tileSize.width + 'px';
        div.style.height = this.tileSize.height + 'px';
        div.style.fontSize = '10';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px';
        div.style.borderColor = '#AAAAAA';
        return div;
      };

    // Init Regular Map on the index.html page
    function initMap() {

        // Here one can list all the locations to be mapped on the map, which will then be called when marking
        // Optionally, one can store this information within the same url and just import the data

        var locations = [
        {lat: 8.481146, lng: -13.21867, title: 'Marker #1', animation: google.maps.Animation.DROP, infoWindow: {content: '<strong>Marker #1</strong>'}},
        {lat: 8.482146, lng: -13.22867, title: 'Marker #1', animation: google.maps.Animation.DROP, infoWindow: {content: '<strong>Marker #1</strong>'}},
        {lat: 8.483146, lng: -13.23867, title: 'Marker #1', animation: google.maps.Animation.DROP, infoWindow: {content: '<strong>Marker #1</strong>'}},
        {lat: 8.484146, lng: -13.24867, title: 'Marker #1', animation: google.maps.Animation.DROP, infoWindow: {content: '<strong>Marker #1</strong>'}},
        {lat: 8.485146, lng: -13.25867, title: 'Marker #1', animation: google.maps.Animation.DROP, infoWindow: {content: '<strong>Marker #1</strong>'}},
        {lat: 8.486146, lng: -13.26867, title: 'Marker #1', animation: google.maps.Animation.DROP, infoWindow: {content: '<strong>Marker #1</strong>'}},
        {lat: 8.487146, lng: -13.27867, title: 'Marker #1', animation: google.maps.Animation.DROP, infoWindow: {content: '<strong>Marker #1</strong>'}},
        {lat: 8.488146, lng: -13.28867, animation: google.maps.Animation.DROP},
        {lat: 8.489146, lng: -13.29867, animation: google.maps.Animation.DROP},
        {lat: 8.480146, lng: -13.20867, animation: google.maps.Animation.DROP},
        {lat: 8.494146, lng: -13.22967, animation: google.maps.Animation.DROP},
        {lat: 8.474146, lng: -13.22867, animation: google.maps.Animation.DROP},
        {lat: 8.464146, lng: -13.22767, animation: google.maps.Animation.DROP},
        {lat: 8.454146, lng: -13.22667, animation: google.maps.Animation.DROP},
        {lat: 8.449146, lng: -13.22567, animation: google.maps.Animation.DROP},
        {lat: 8.438146, lng: -13.22467, animation: google.maps.Animation.DROP},
        {lat: 8.427146, lng: -13.22367, animation: google.maps.Animation.DROP},
        {lat: 8.416146, lng: -13.22267, animation: google.maps.Animation.DROP},
        {lat: 8.470146, lng: -13.22167, animation: google.maps.Animation.DROP},
        {lat: 8.471146, lng: -13.23567, animation: google.maps.Animation.DROP},
        {lat: 8.472146, lng: -13.24667, animation: google.maps.Animation.DROP},
        {lat: 8.473146, lng: -13.25767, animation: google.maps.Animation.DROP},
        {lat: 8.484146, lng: -13.20867, animation: google.maps.Animation.DROP},
        {lat: 8.495146, lng: -13.22967, animation: google.maps.Animation.DROP},
        {lat: 8.476246, lng: -13.22867, animation: google.maps.Animation.DROP},
        {lat: 8.467346, lng: -13.22767, animation: google.maps.Animation.DROP},
        {lat: 8.458446, lng: -13.22667, animation: google.maps.Animation.DROP},
        {lat: 8.440546, lng: -13.22567, animation: google.maps.Animation.DROP},
        {lat: 8.433646, lng: -13.22467, animation: google.maps.Animation.DROP},
        {lat: 8.422746, lng: -13.22367, animation: google.maps.Animation.DROP},
        {lat: 8.411846, lng: -13.22267, animation: google.maps.Animation.DROP},
        {lat: 8.474946, lng: -13.22167, animation: google.maps.Animation.DROP},
        {lat: 8.470146, lng: -13.23577, animation: google.maps.Animation.DROP},
        {lat: 8.471346, lng: -13.24687, animation: google.maps.Animation.DROP},
        {lat: 8.473246, lng: -13.25797, animation: google.maps.Animation.DROP},
        {lat: 8.484146, lng: -13.24817, animation: google.maps.Animation.DROP},
        {lat: 8.485146, lng: -13.25827, animation: google.maps.Animation.DROP},
        {lat: 8.486146, lng: -13.26837, animation: google.maps.Animation.DROP},
        {lat: 8.487146, lng: -13.27847, animation: google.maps.Animation.DROP},
        {lat: 8.488146, lng: -13.28857, animation: google.maps.Animation.DROP},
        {lat: 8.489146, lng: -13.29877, animation: google.maps.Animation.DROP},
        {lat: 8.480146, lng: -13.20887, animation: google.maps.Animation.DROP},
        {lat: 8.494146, lng: -13.22997, animation: google.maps.Animation.DROP},
        {lat: 8.474146, lng: -13.22807, animation: google.maps.Animation.DROP},
        {lat: 8.464146, lng: -13.22761, animation: google.maps.Animation.DROP},
        {lat: 8.454146, lng: -13.22662, animation: google.maps.Animation.DROP},
        {lat: 8.449146, lng: -13.22563, animation: google.maps.Animation.DROP},
        {lat: 8.438146, lng: -13.22464, animation: google.maps.Animation.DROP},
        {lat: 8.427146, lng: -13.22365, animation: google.maps.Animation.DROP},
        {lat: 8.416146, lng: -13.22266, animation: google.maps.Animation.DROP},
        {lat: 8.470146, lng: -13.22168, animation: google.maps.Animation.DROP},
        {lat: 8.471147, lng: -13.23569, animation: google.maps.Animation.DROP},
        {lat: 8.472148, lng: -13.24667, animation: google.maps.Animation.DROP},
        {lat: 8.473149, lng: -13.25767, animation: google.maps.Animation.DROP},
        {lat: 8.470141, lng: -13.23577, animation: google.maps.Animation.DROP},
        {lat: 8.471343, lng: -13.24687, animation: google.maps.Animation.DROP},
        {lat: 8.473244, lng: -13.25797, animation: google.maps.Animation.DROP},
        {lat: 8.484146, lng: -13.24817, animation: google.maps.Animation.DROP},
        {lat: 8.485145, lng: -13.25827, animation: google.maps.Animation.DROP},
        {lat: 8.486147, lng: -13.26837, animation: google.maps.Animation.DROP},
        {lat: 8.487148, lng: -13.27847, animation: google.maps.Animation.DROP},
        {lat: 8.488149, lng: -13.28857, animation: google.maps.Animation.DROP},
        {lat: 8.4891461, lng: -13.29877, animation: google.maps.Animation.DROP},
        {lat: 8.4801462, lng: -13.20887, animation: google.maps.Animation.DROP},
        {lat: 8.4941463, lng: -13.22997, animation: google.maps.Animation.DROP},
        {lat: 8.4741464, lng: -13.22807, animation: google.maps.Animation.DROP},
        {lat: 8.4641465, lng: -13.22761, animation: google.maps.Animation.DROP},
        {lat: 8.4541466, lng: -13.22662, animation: google.maps.Animation.DROP},
        {lat: 8.4491467, lng: -13.22563, animation: google.maps.Animation.DROP},
        {lat: 8.4381468, lng: -13.22464, animation: google.maps.Animation.DROP},
        {lat: 8.4271469, lng: -13.22365, animation: google.maps.Animation.DROP},
        {lat: 8.416146, lng: -13.222661, animation: google.maps.Animation.DROP},
        {lat: 8.470146, lng: -13.221682, animation: google.maps.Animation.DROP},
        {lat: 8.471147, lng: -13.235693, animation: google.maps.Animation.DROP},
        {lat: 8.472148, lng: -13.246674, animation: google.maps.Animation.DROP},
        {lat: 8.473149, lng: -13.257675, animation: google.maps.Animation.DROP},
        {lat: 8.471740, lng: -13.261676, animation: google.maps.Animation.DROP}
        ]

        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
          parking: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          library: {
            icon: iconBase + 'library_maps.png'
          },
          info: {
            icon: iconBase + 'info-i_maps.png'
          }
        };

        function addMarker(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
          });
        }
        // Places search, for future, Please google, do something
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
        }

        var features = [
          {
            position: new google.maps.LatLng(8.472740, -13.262676),
            type: 'parking'
          }
        ];

        for (var i = 0, feature; feature = features[i]; i++) {
          addMarker(feature);
        }

        var freetown = {lat: 8.484146, lng: -13.22867};
        var map = new google.maps.Map(document.getElementById('map'),{
            zoom: 14,
            center: freetown,
            scrollwheel: false,
            styles: [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
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
            animation: google.maps.Animation.DROP,
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


        // Insert this overlay map type as the first overlay map type at
        // position 0. Note that all overlay map types appear on top of
        // their parent base map.

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: freetown,
          animation: google.maps.Animation.DROP,
          radius: 11000,
          type: ['hospital']
        }, callback);
        
        map.overlayMapTypes.insertAt(
            0, new CoordMapType(new google.maps.Size(256, 256)));
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