
/*list of locations*/
var Model = [
    {name: "Malliyoor Sree Mahaganapathy Temple", location: {lat: 9.733244, lng: 76.501275}, googleId: "ChIJPx0Nk2LWBzsRKqCw2Ou7KJU", pincode: "686603"},
    {name: "Thazhathangady Juma Masjid", location: {lat:  9.598416, lng: 76.50551}, googleId: "ChIJKyomAAMrBjsRvCqdHw-O3Qw", pincode: "686603"},
    {name: "Kumarakam Bird Sanctuary", location: {lat:  9.62723, lng: 76.42861}, googleId: "ChIJG4td2neACDsRguUR1HU505M", pincode: "686563"},
    {name: "Island of Pathiramanal", location: {lat: 9.618643, lng: 76.384709}, googleId: "ChIJcY9C3KKACDsRJOkW3c0iFNU", pincode: "688555"},
    {name: "vaikom", location: {lat: 9.721645, lng: 76.392667}, googleId: "ChIJF89lxQ55CDsRYQBIDmt-lhU", pincode: "686141"},
    {name: "Muncipal Jubilee Park", location: {lat: 9.592904, lng: 76.528411}, googleId: "ChIJPQWep3UrBjsRcFise7TSIWo", pincode: "686002"},
    {name: "Kumarakom", location: {lat: 9.617545, lng: 76.430095}, googleId: "ChIJ96jwrsqBCDsRIekpNVwHIww", pincode: "686141"},
    {name: "Palai", location: {lat: 9.713753, lng: 76.682928}, googleId: "ChIJn15tsM7NBzsRNC7P1r-POrM", pincode: "686141"},
    {name: "Changanaserry", location: {lat: 9.445888, lng: 76.540965}, googleId: "ChIJJ8OSaAsmBjsRoAStKsBnbAg", pincode: "686002"},
    {name: "Kanjirappilly", location: {lat: 9.557271, lng: 76.78943}, googleId: "ChIJCwFLJHg2BjsR2tD0zhg6lgM", pincode: "686141"},
    {name: "Bharananganam Church", location: {lat: 9.69945, lng: 76.724994}, googleId: "ChIJ-25sSHHMBzsRaE1ZIWVfsj4", pincode: "686141"},
    {name: "Erumeli Church", location: {lat: 9.481056, lng: 76.845052}, googleId: "ChIJw804GtNHBjsR6ZkGA9jjPpA", pincode: "686141"},
    {name: "Ettumanoor", location: {lat: 9.67036, lng: 76.560875}, googleId: "ChIJfY1XPXvTBzsRfYed_NpW_-o", pincode: "686002"},
    {name: "Kuravilangadu", location: {lat: 9.758441, lng: 76.563273}, googleId: "ChIJNdbsmTrRBzsRGpM5NTJ1z6U", pincode: "686141"}
];

/*creates a new map variable*/

var map;

/*function to initialize the map*/

function initMap() {
/*map js*/
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 10.527642,
            lng: 76.214435
        },
        zoom: 13,

/*adding some style to map*/

        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    });

    /*initiating knockout*/

    ko.applyBindings(new ViewModel());
}

/*initializing markers*/

var markers = [];

/*viewmodel*/

var ViewModel = function() {
    var self = this;

    /*search location in input box*/

    self.filter = ko.observable('');
    self.locationitems = ko.observableArray(Model);
    self.search = ko.computed(function() {

        /*convert into lowercase input entered in the field*/

        var filter = self.filter().toLowerCase();
        self.locationitems().forEach(function(item) {
            if (item.marker) {

                /*make markers reappear when input box is cleared*/

                item.marker.setVisible(true);
            }
        });
        if (!filter) {

            /*if there is no searching of locations return all places*/

            return self.locationitems();
        } else {

            /*filtering locations*/

            return ko.utils.arrayFilter(self.locationitems(), function(item) {

                /*searching for typed location*/

                var place = item.name.toLowerCase().indexOf(filter) !== -1;
                if (item.marker) {
                    /*show only the marker of search result*/
                    item.marker.setVisible(place); /*toggle visibility of the marker*/
                }
                return place;
            });
        }
    }, self);
    self.searchplaces = ko.observableArray();
    self.locationitems().forEach(function(place) {
        self.searchplaces.push(place);
    });
    /*colour changing part when clicked*/
    self.clickonsearchplaces = function(place) {
        place.marker.setIcon(makeMarkerIcon('00ff00'));
        google.maps.event.trigger(place.marker, 'click');
    };

    /*intializing infowindow*/
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    /*setting default icon color*/
    var defaultIcon = makeMarkerIcon('0091ff');
    /*setting highlighted icon color*/
    var highlightedIcon = makeMarkerIcon('FFFF24');
    /*looping over model arrays length*/
    for (i = 0; i < Model.length; i++) {
        /*intializing location and name*/
        var position = Model[i].location;
        var title = Model[i].name;
        /*intializing marker*/
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i

        });
        Model[i].marker = marker;
        markers.push(marker);
        /*when clicked on marker shows an infowindow*/
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        /*mouse hovers marker and change color*/
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        /*mouse moves away from marker and change color*/
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
        /*map should cover all the locations*/
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);

    /*populate infowindow*/
    function populateInfoWindow(marker, infowindow) {
        /*streetview intialzing*/
        var streetViewService = new google.maps.StreetViewService();
        /*wikipedia api*/
        var articleUrl;
        var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
        var wikiTimeout = setTimeout(function() {
            alert("failed to load wikipedia page");
        }, 8000);
        /*ajax requst*/
        $.ajax({
            url: wikiURL,
            dataType: "jsonp"
        }).done(function(response) {
            /*timeout is cleared if wikipedia link is loaded successfully*/
            clearTimeout(wikiTimeout);
            /*response from wikipedia api*/
            articleUrl = response[3][0];
            /*getpanorama function is initialized*/
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
        });

        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
            //for getting panorama view we are setting radius to 50 if dont get any stretview it should show within 50m
            var radius = 50;
            // In case the status is OK, which means the pano was found, compute the
            // position of the streetview image, then calculate the heading, then get a
            // panorama from that and set the options
            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(
                        nearStreetViewLocation, marker.position);
                    infowindow.setContent('<div>' + marker.title + '</div><br><a href ="' + articleUrl + '">' + articleUrl + '</a><hr><div id="pano"></div>');
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 20
                        }
                    };
                    var panorama = new google.maps.StreetViewPanorama(
                        document.getElementById('pano'), panoramaOptions);
                } else {
                    /*if there is no streetview display title and no streetview*/
                    infowindow.setContent('<div>' + marker.title + '</div>' +
                        '<div>No Street View Found</div>');
                }
                /*open infowindow on that marker*/
                infowindow.open(map, marker);
            }
        }
    }

    /*function for changing the colour of marker icon*/
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;
    }
};
