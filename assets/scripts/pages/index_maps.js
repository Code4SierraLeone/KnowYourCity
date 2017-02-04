/*
 *  Document   : index_maps.js
 *  Author     : samson
 *  Description: Custom JS code used in Google Maps Page
 */

var BaseCompMaps = function() {
    // Gmaps.js, for more examples you can check out https://hpneo.github.io/gmaps/

    // Init Regular Map on the index.html page
    var initMap = function(){
        // Init Map
        var $map = new GMaps({
            div: '#js-map',
            lat: 8.484146,
            lng: -13.22867,
            zoom: 15,
            scrollwheel: false
            }).addMarkers([
            // sample marked data
            // I definitely will have to implement this in a better way using GeoJSON @samson
            // TODO Look up the set up instruction here <https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple-max>
            {lat: 8.48, lng: -13.23, title: 'Amenity #1', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #1</strong><p><a class=h3 href="supportcenter.html">Central Hospital</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.49, lng: -13.23, title: 'Amenity #2', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #2</strong><p><a class=h3 href="supportcenter.html">Food Center</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.49, lng: -13.21, title: 'Amenity #3', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #3</strong><p><a class=h3 href="supportcenter.html">RedCross</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.48, lng: -13.21, title: 'Amenity #4', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #4</strong><p><a class=h3 href="supportcenter.html">Food Center</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.484, lng: -13.222, title: 'Amenity #5', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #5</strong><p><a class=h3 href="supportcenter.html">Support Center</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.483, lng: -13.24, title: 'Amenity #6', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #5</strong><p><a class=h3 href="supportcenter.html">Support Center</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.482, lng: -13.25, title: 'Amenity #7', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Hello Hospital</strong><p><a class=h3 href="supportcenter.html">Clinic</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.485, lng: -13.214, title: 'Amenity #4', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #4</strong><p><a class=h3 href="supportcenter.html">Red Cross</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.486, lng: -13.223, title: 'Amenity #5', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #5</strong><p><a class=h3 href="supportcenter.html">Food Center</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.4874, lng: -13.212, title: 'Amenity #4', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #4</strong><p><a class=h3 href="supportcenter.html">Red Cross</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.489, lng: -13.2242, title: 'Amenity #5', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #5</strong><p><a class=h3 href="supportcenter.html">Rescue Shelter</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.491, lng: -13.2124, title: 'Amenity #4', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #4</strong><p><a class=h3 href="supportcenter.html">Central Hospital</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.4812, lng: -13.2256, title: 'Amenity #5', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #5</strong><p><a class=h3 href="supportcenter.html">Rescue Center</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.487, lng: -13.213, title: 'Amenity #4', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #4</strong><p><a class=h3 href="supportcenter.html">WHO Center</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.488, lng: -13.226, title: 'Amenity #5', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #5</strong><p><a class=h3 href="supportcenter.html">RedCross</a></p><p>Offers Quick Emergency Services</p>'}},
            {lat: 8.481, lng: -13.2612, title: 'Amenity #8', animation: google.maps.Animation.BOUNCE, infoWindow: {content: '<strong>Amenity #5</strong><p><a class=h3 href="supportcenter.html">Clinic</a></p><p>Offers Quick Emergency Services</p>'}}
        ]).geolocate({
            success: function(position) {
                gmapGeolocation.setCenter(position.coords.latitude, position.coords.longitude);
                gmapGeolocation.addMarker({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    animation: google.maps.Animation.BOUNCE,
                    title: 'GeoLocation',
                    infoWindow: {
                        content: '<div class="text-success"><i class="fa fa-map-marker"></i> <strong>Your location!</strong></div>'
                    }
                });
            },
            error: function(error) {
                alert('Geolocation failed: ' + error.message);
            },
            not_supported: function() {
                alert("Your browser does not support geolocation");
            },
            always: function() {
                // Message when geolocation succeed
            }
        });

    };
    
    return {
        init: function () {
            // Init Map
            initMap();

        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseCompMaps.init(); });