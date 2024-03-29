tippy('button')


// get user location and store as variable

var userlat = 0;
var userlng = 0;
var usercategory = "";
var cardimage = "";

var resultlatlngs = []; //lat, lng

$(document).on("click", ".btn", function (event) {
    event.preventDefault();


    usercategory = document.forms["userform"]["usercategory"].value;
    if (usercategory == "") {
      alert("Pick a category! Woof!");
      return ;
    }


    navigator.geolocation.getCurrentPosition(StorePosition);

    function StorePosition(position) {

        userlat = position.coords.latitude;
        userlng = position.coords.longitude;

        window.lat = position.coords.latitude;
        window.lng = position.coords.longitude;
        foursquareapicall();


    }
})



//Working api call

https://api.foursquare.com/v2/venues/search?client_id=PNXMQSVLHPQQUTUYQLGUPVZOMX1LSE5NPHRWVF1NG3PINRQU&client_secret=FRSFYMBNKSKMI34AIKNI1CEBRMHDLYRHQJB5WHSV1PZCKTJA&v=20180323&limit=10&ll=32.8387891,-96.7857465&categoryId=4bf58dd8d48988d1e5941735&radius=32000
function foursquareapicall() {

if (usercategory == "4bf58dd8d48988d1e5941735"){
    cardimage = "assets/images/dog-park.jpg"
}
else if (usercategory == "5032897c91d4c4b30a586d69"){
    cardimage = "assets/images/groomers.jpg"
} 
else if (usercategory == "4d954af4a243a5684765b473"){
    cardimage = "assets/images/vet.jpg"
} 
else if (usercategory == "4bf58dd8d48988d100951735"){
    cardimage = "assets/images/store.jpg"
} 
    var queryURL = "https://api.foursquare.com/v2/venues/search";

    $.ajax({
        url: queryURL,
        data: {
            client_id: "PNXMQSVLHPQQUTUYQLGUPVZOMX1LSE5NPHRWVF1NG3PINRQU",
            client_secret: "FRSFYMBNKSKMI34AIKNI1CEBRMHDLYRHQJB5WHSV1PZCKTJA",
            v: "20180323",
            limit: "5",

            ll: userlat + "," + userlng,
            categoryId: usercategory,
            radius: "3000",
        },
        method: "GET",

    })


        .then(function (response) {
            var venueresults = response.response.venues;
            resultlatlngs = [];
            for (var i = 0; i < venueresults.length; i++) {
                console.log("what up");
                console.log([venueresults[i].location.lat, venueresults[i].location.lng]);
                // console.log(i)
                // console.log(response)
                // console.log(response.response)
                // console.log(response.response.venues)
                // console.log(response.response.venues[i])
                console.log(venueresults[i]);
                console.log("name is " + venueresults[i].name);
                resultlatlngs.push([venueresults[i].name, location.lat, venueresults[i].location.lng]);
                console.log(venueresults[i].location.address);
                console.log(venueresults[i].location.city);
                console.log(venueresults[i].location.state);
                console.log(venueresults[i].location.postalCode);



                var name = venueresults[i].name;
                var address = venueresults[i].location.address;
                var city = venueresults[i].location.city;
                var state = venueresults[i].location.state;
                var postalCode = venueresults[i].location.postalCode;


                var resultsdiv = $("<div class='py-0'>");

if (usercategory=="4bf58dd8d48988d1e5941735"){
                resultsdiv.html(`

        <div class="card py-0 bg-dark text-white">
        <img class="card-img" src=${cardimage} alt="Card image" style=>
            <div class="py-0 card-img-overlay" style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black">
                <p></p>
                <h4 class="card-title" id="place-name">${name}</h4>
                <h5 class="card-text" id="place-location">${city}, ${state}</h5>
                <h5 class="card-text" id="place-zip">${postalCode}</h5>

            </div> </div>
        `);
} else if (usercategory=="5032897c91d4c4b30a586d69" || usercategory=="4d954af4a243a5684765b473" || usercategory=="4bf58dd8d48988d100951735"){
    resultsdiv.html(`

    <div class="card py-0 bg-dark text-white">
    <img class="card-img" src=${cardimage} alt="Card image" style=>
        <div class="py-0 card-img-overlay" style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black">
            <p></p>
            <h4 class="card-title" id="place-name">${name}</h4>
            <h4 class="card-title" id="place-address">${address}</h4>
            <h5 class="card-text" id="place-location">${city}, ${state}</h5>
            <h5 class="card-text" id="place-zip">${postalCode}</h5>

        </div> </div>
    `);

}
        // <h5 class="card-text" id="rating">Rating: <i class="fas fa-paw"></i><i class="fas fa-paw"></i></h5>


                $("#results").prepend(resultsdiv);

                runMap(venueresults);

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
            resultsdivdisplay();
            // console.log(resultlatlngs);
        })
}


    function initaldivdisplay() {
        $('#splash').show();
        $('#navbar').hide();
        // $('#loading').hide();
        $('#resultsandmap').hide();
    }

    function resultsdivdisplay() {
        $('#splash').hide();
        $('#video').hide();
        $('#navbar').show();
        $('#resultsandmap').show();
    }

initaldivdisplay();
