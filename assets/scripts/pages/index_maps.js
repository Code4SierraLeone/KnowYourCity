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
        var freetown = {lat: 8.484146, lng: -13.22867};
        var map = new google.maps.Map(document.getElementById('map'),{
            zoom: 15,
            center: freetown,
            scrollwheel: false
        });

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
            animation: google.maps.Animation.DROP,
            title: 'Freetown'
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        // Just in case it is supported in the area to show transit layers
        var transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);

        // Just in case it is supported in the area to show traffic status
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        // Just in case it is supported in the area to show biking layers
        var bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map);

        // // Create a <script> tag and set the Amenities URL as the source.
        // var script = document.createElement('script');
        // // This example uses a local copy of the GeoJSON stored at
        // // https://knowyourcity.com/
        // script.src = 'https://knowyourcity.com/db/documentation/javascript/examples/json/amenities_GeoJSONP.js';
        // document.getElementsByTagName('head')[0].appendChild(script);
        //
        // // Loop through the results array and place a marker for each
        // // set of coordinates.
        // window.amfeed_callback = function(results) {
        //     for (var i = 0; i < results.features.length; i++) {
        //         var coords = results.features[i].geometry.coordinates;
        //         var latLng = new google.maps.LatLng(coords[1],coords[0]);
        //         var marker = new google.maps.Marker({
        //             position: latLng,
        //             map: map
        //         });
        //     }
        // };

        // // The Google Maps Data Layer provides a container for arbitrary geospatial data (including GeoJSON).
        // // If your data is in a file hosted on the same domain as your Maps JavaScript API application,
        // // you can load it using the map.data.loadGeoJson() method. The file must be on the same domain,
        // // but you can host it in a different subdomain. For example, you can make a request to files.example.com
        // // from www.example.com.

        // This will be useful for the users who are in the Freetown Informal Settlement Areas and will
        // help them geolocate the mapped amenities inform of GeoJSON! I have disabled it as I am not within Freetown :)
        // var infoWindow = new google.maps.InfoWindow({map: map});
        //
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //         var pos = {
        //             lat: position.coords.latitude,
        //             lng: position.coords.longitude
        //         };
        //
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