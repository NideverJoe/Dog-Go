// get user location and store as variable

var userlat = 0;
var userlng = 0;
// var userzip = 0;
var resultlatlngs=[]; //lat, lng


navigator.geolocation.getCurrentPosition(StorePosition);

function StorePosition(position) {

  userlat = position.coords.latitude;
  userlng = position.coords.longitude;
  foursquareapicall();


}


//Working api call

https://api.foursquare.com/v2/venues/search?client_id=PNXMQSVLHPQQUTUYQLGUPVZOMX1LSE5NPHRWVF1NG3PINRQU&client_secret=FRSFYMBNKSKMI34AIKNI1CEBRMHDLYRHQJB5WHSV1PZCKTJA&v=20180323&limit=10&ll=32.8387891,-96.7857465&categoryId=4bf58dd8d48988d1e5941735&radius=32000
function foursquareapicall () {

    var queryURL = "https://api.foursquare.com/v2/venues/search";

    $.ajax({
        url: queryURL,
        data: {
            client_id: "PNXMQSVLHPQQUTUYQLGUPVZOMX1LSE5NPHRWVF1NG3PINRQU",
            client_secret: "FRSFYMBNKSKMI34AIKNI1CEBRMHDLYRHQJB5WHSV1PZCKTJA",
            v: "20180323",
            limit: "5",
            ll: userlat+","+userlng,
            // near: userzip,
            categoryId:"4bf58dd8d48988d1e5941735",
            radius: "3000",
        },
        method: "GET",

    })

    .then(function (response) {
        var venueresults = response.response.venues;
        resultlatlngs=[];
        for (var i = 0; i < venueresults.length; i++) {
            console.log("what up");
        // console.log(i)
        // console.log(response)
        // console.log(response.response)
        // console.log(response.response.venues)
        // console.log(response.response.venues[i])
        console.log(venueresults[i]) ;
        console.log("name is " + venueresults[i].name) ;
        resultlatlngs.push([venueresults[i].name, venueresults[i].location.lat, venueresults[i].location.lng]);
        console.log(venueresults[i].location.address);
        console.log(venueresults[i].location.city) ;
        console.log(venueresults[i].location.state) ;
        console.log(venueresults[i].location.postalCode) ;

       

        var name = venueresults[i].name;
        var address = venueresults[i].location.address;
        var city = venueresults[i].location.city;
        var state = venueresults[i].location.state;
        var postalCode=venueresults[i].location.postalCode;


        var resultsdiv = $("<div class='py-0'>");



        resultsdiv.html(`
        <div class="card py-0 bg-dark text-white">
        <img class="card-img" src="assets/images/dog-park.jpg" alt="Card image">
            <div class="py-0 card-img-overlay">
                <h4 class="card-title" id="place-name">${name}</h4>
                <h5 class="card-text" id="place-location">${city}, ${state}</h5>
                <h5 class="card-text" id="place-zip">${postalCode}</h5>
                <h5 class="card-text" id="rating">Rating: <i class="fas fa-paw"></i><i class="fas fa-paw"></i></h5>
            </div> </div>
        `);

        $("#results").append(resultsdiv);



        //start with frozen image and store animated location. start with still state
        // var gifimage = $("<img>");
        // gifimage.attr("src", results[i].images.fixed_height_still.url);
        // gifimage.attr("data-still", results[i].images.fixed_height_still.url);
        // gifimage.attr("data-animate", results[i].images.fixed_height.url);
        // gifimage.attr("data-state", "still");
        // gifimage.addClass("gif");
        // resultsdiv.prepend(p);
        //         resultsdiv.prepend(gifimage);

        //         $("#gifzone").prepend(gifDiv);
            }
            console.log(resultlatlngs);
        })
}



