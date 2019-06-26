
function runMap(results) {
    // console.log(results);
    // return;

    // console.log(ll)
    var interval = setInterval(function () {
        var x = window.lat;
        var y = window.lng



        if (x !== 'undefined' && y !== 'undefined') {
            stopInterval()
        }


        var locations = [];
        console.log(locations);
        results.forEach(function (ele) {
            console.log(ele);
            locations.push([
                ele.name,
                ele.location.lat,
                ele.location.lng,
                ele.location.formattedAddress[0],
                ele.location.formattedAddress[1]
            ]);



        });
        var googleURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCVuViz2cE5eJRQwQPm9YVHTtsIhkLpsMc";
        console.log(locations);

        $.ajax({
            url: googleURL,
            method: 'GET',
            dataType: 'jsonp'
        }).then(function () {

            console.log("got here")

            //this is now a static loading map with no pins

            var latlng = new google.maps.LatLng(x, y);
            var myOptions = {
                zoom: 12,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map'), myOptions);

            var infowindow = new google.maps.InfoWindow();
            // var opts = new google.maps.InfoWindowOptions();
            // var windowOptions = "<div>" + "<h2>" + locations[i][0] + "</h2>" + "<br></br>" + locations[i][3] + "<br></br>" + locations[i][4]
            var marker, i;

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map
                });
                // var windowOptions = "<div>" + "<h2>" + locations[i][0] + "</h2>" + "<br></br>" + locations[i][3] + "<br></br>" + locations[i][4]
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent("<div>" + "<h3>" + locations[i][0] + "</h3>" + "<br></br>" + locations[i][3] + "<br></br>" + locations[i][4]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            };
        });
        console.log(resultlatlngs);
    }, 1000)

    function stopInterval() {
        clearInterval(interval)
    }
}


