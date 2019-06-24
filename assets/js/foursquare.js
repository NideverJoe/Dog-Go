// get user location and store as variable

var userlat = 0;
var userlng = 0;
var resultlat0=0;
var resultlat1=0;
var resultlat2=0;
var resultlat3=0;
var resultlat4=0;
var resultlng0=0;
var resultlng1=0;
var resultlng2=0;
var resultlng3=0;
var resultlng4=0;


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
            categoryId:"4bf58dd8d48988d1e5941735",
            radius: "3000",
        },
        method: "GET",

    })

    .then(function (response) {
        var venueresults = response.response.venues

        for (var i = 0; i < venueresults.length; i++) {
            console.log("what up")
        // console.log(i)
        // console.log(response)
        // console.log(response.response)
        // console.log(response.response.venues)
        // console.log(response.response.venues[i])
        console.log(venueresults[i]) 
        console.log("name is " + venueresults[i].name) 
        console.log("lat is "+venueresults[i].location.lat)
        userlat[i]= venueresults[i].location.lat
        console.log("lng is "+venueresults[i].location.lng)
        userlng[i]= venueresults[i].location.lng
        console.log(venueresults[i].location.address)
        console.log(venueresults[i].location.city) 
        console.log(venueresults[i].location.state) 
        console.log(venueresults[i].location.postalCode) 

       

        var name = venueresults[i].name;
        var address = venueresults[i].location.address;
        var city = venueresults[i].location.city;
        var state = venueresults[i].location.state;
        var postalCode=venueresults[i].location.postalCode;


        var resultsdiv = $("<div class='card px-2 rounded'>");



        resultsdiv.html(`
        <h3>${name}</h3>
        <p>${address}</p>
        <p>${city}, ${state}</p>
        <p>${postalCode}</p>
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
            console.log( resultlat0);
console.log( resultlat1);
console.log( resultlat2);
console.log( resultlat3);
console.log( resultlat4);
console.log( resultlng0);
console.log( resultlng1);
console.log( resultlng2);
console.log( resultlng3);
console.log( resultlng4);
        })
}



