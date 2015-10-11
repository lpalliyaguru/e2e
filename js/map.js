var locations = [
    [
        "Location 1",
        "215 West Girard Avenue 19123",
        "39.9695601",
        "-75.1395161"
    ],
    [
        "Location 2",
        "5360 Old York Road 19141",
        "40.034038",
        "-75.145223"
    ],
    [
        "Location 3",
        "1350 W Girard Avenue 19123",
        "39.9713524",
        "-75.1590360"
    ]
];

gmarkers = [];

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(39.9995601, -75.1395161),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

function createMarker(latlng, html) {
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(html);
        infowindow.open(map, marker);
    });
    return marker;
}

for (var i = 0; i < locations.length; i++) {
    gmarkers[locations[i][0]] =
        createMarker(new google.maps.LatLng(locations[i][2], locations[i][3]), locations[i][0] + "<br>" + locations[i][1]);
}
