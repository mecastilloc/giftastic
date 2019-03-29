var category = ["Angry", "Fear", "Happy", "Sad", "Surprise", "Bored", "Dance"];
var gif;
var count = 0;
var favnumber = localStorage.getItem("favnumber");

if (favnumber === null) {
    favnumber = 0;
}
console.log("initial favnumber " + favnumber);

//start of script
$(document).ready(function () {

    start();
    initialBtns();
    //creates new category button in click
    $("#add-input").click(function (event) {
        event.preventDefault();
        addNewInput();

    });
    //creates gifs on click
    $(document).on("click", ".category", displayGif);
    // animates/stops gits on click
    $(document).on("click", ".gifs", animateGif);
    //adds gif to favorite section
    $(document).on("click", "#favoriteBtn", function (event) {
        event.preventDefault();
        favnumber++;
        addFavorite(this);
    });
    //downloads the file
    $(document).on("click", "#downloadBtn", function (event) {
        event.preventDefault();
        var name = ($(this).attr("name"));
        var x = new XMLHttpRequest();
        x.open("GET", $(this).attr("download"), true);
        x.responseType = 'blob';
        x.onload = function (e) { download(x.response, name, "image/gif"); }
        x.send();
    });
    //clears the favorites section
    $(document).on("click", "#clear-btn", function (event) {
        event.preventDefault();
        favnumber = 0;
        localStorage.clear();
        $("#favorites-show").empty();
        $("#favorites-tag").empty();
    });

});//end of document ready


//FUNTIONS USED

//Initial settings
function start() {
    console.log("ready!");
    //function call for tooltip
    $('[toggle="tooltip"]').tooltip();
    //creates favorites stored in locaStorage
    if (favnumber > 0) {
        console.log("entre if renderfavs");
        for (var i = 1; i <= favnumber; i++) {
            renderFavs(i);
        }
    }
}

//creates category buttons
function initialBtns() {
    $("#buttons").empty();
    for (var i = 0; i < category.length; i++) {
        var categoryBtn = $("<button class='btn btn-dark'>");
        categoryBtn.addClass("category");
        categoryBtn.attr("category", category[i]);
        categoryBtn.text(category[i]);
        $("#buttons").append(categoryBtn);
    }
}

//makes the ajax call
function displayGif() {
    //validates if defferent category is clicked then empties gif grid, restarts the counter for more gitfs of same category
    $("#favorites-tag").hide();
    $("#favorites-show").hide();
    if (gif != ($(this).attr("category"))) {
        $("#gif-show").empty();
        count = 0;
    }
    gif = $(this).attr("category");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&trending&api_key=A8cJAfQajoJdTsbHqWiorpWrAJvJUv4u&limit=50"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        renderGifs(response);
    });
}

//creates new Input button
function addNewInput() {
    var newInput = $("#new-input").val().trim();
    if (newInput == "") {
        $("#already-exists").text("Type something");
        setTimeout(function () { $("#already-exists").empty(); }, 2000);
    }
    else {
        if (!category.includes(newInput)) {
            category.push(newInput);
        }
        else {
            $("#already-exists").text("Already on the list");

            setTimeout(function () { $("#already-exists").empty(); }, 2000);
        }
    }
    initialBtns();
}

//creates gif grid
function renderGifs(response) {
    $("#moreGif").empty();
    var addMore = $("<h6 id='add-more'>");
    addMore.text("Click again to Add More (50 Gifs max)");
    $("#moreGif").append(addMore);
    //shows the first 10 gifs, if same category clicked again, prepends 10 more
    for (j = count; j < count + 10; j++) {
        var divcont1 = $("<div class='card bg-transparent' id='divcont'>");
        var cardBody = $("<div id='mainCardBody' class='card-body'>");
        var cardFooter = $("<div id='mainCardFotter' class='card-footer'>");
        var rating = $("<p>");
        var gifGrid = $("<img class>");
        var title = $("<p>");
        var score = $("<p>");
        var download = $("<button class='btn btn-dark'>");
        var favorite = $("<button class='btn btn-dark'>");
        //gif atrributes
        gifGrid.attr("src", response.data[j].images.fixed_height_still.url);
        gifGrid.attr("still", response.data[j].images.original_still.url);
        gifGrid.attr("animated", response.data[j].images.fixed_height.url);
        gifGrid.attr("status", "still");
        gifGrid.attr("toggle", "tooltip");
        gifGrid.attr("title", "Click to Animate/Stop");
        gifGrid.addClass("gifs");
        //writes gif attributes for adding to favorites
        favorite.text("Add Favorite");
        favorite.attr("src", response.data[j].images.fixed_height_still.url);
        favorite.attr("still", response.data[j].images.original_still.url);
        favorite.attr("animated", response.data[j].images.fixed_height.url);
        favorite.attr("status", "still");
        favorite.attr("giftitle", response.data[j].title);
        favorite.attr("score", response.data[j]._score);
        favorite.attr("rating", response.data[j].rating);
        favorite.attr("id", "favoriteBtn");
        //writes download attributes
        download.text("Download");
        download.attr("download", response.data[j].images.fixed_height.url);
        download.attr("name", response.data[j].title);
        download.attr("id", "downloadBtn");
        //creates the final grid modifying the DOM
        rating.text("Rating: " + response.data[j].rating);
        title.text("Title: " + response.data[j].title);
        score.text("Score: " + response.data[j]._score);

        $(divcont1).append(gifGrid);
        $(divcont1).append(cardBody);
        $(divcont1).append(cardFooter);

        $(cardBody).append(rating);
        $(cardBody).append(title);
        $(cardBody).append(score);

        $(cardFooter).append(favorite);
        $(cardFooter).append(download);

        $("#gif-show").prepend(divcont1);

        $("#favorites-tag").show();
        $("#favorites-show").show();
    }
    //for adding the next 10 gifs in JSON object response
    count += 10;
}

//adds the gif selected to favorites section
function addFavorite(x) {
    $("#favorites-tag").empty();
    var divcont2 = $("<div class='card bg-transparent' id='divcont2'>");
    var cardBody = $("<div id='favCardBody' class='card-body'>");
    var cardFooter = $("<div id='favCardFotter' class='card-footer'>");
    var rating = $("<p>");
    var tag = $("<h2>");
    var gifGrid = $("<img >");
    var title = $("<p>");
    var score = $("<p>");
    var download = $("<button class='btn btn-dark'>");
    var clearFavs = $("<button class='btn btn-dark'>");
    //gif atrributes
    gifGrid.attr("src", $(x).attr("src"));
    gifGrid.attr("still", $(x).attr("still"));
    gifGrid.attr("animated", $(x).attr("animated"));
    gifGrid.attr("rating", $(x).attr("rating"));
    gifGrid.attr("giftitle", $(x).attr("giftitle"));
    gifGrid.attr("score", $(x).attr("score"));
    gifGrid.attr("status", "still");
    gifGrid.attr("toggle", "tooltip");
    gifGrid.attr("title", "Click to Animate/Stop");
    gifGrid.addClass("gifs");
    //writes download attributes
    download.text("Download");
    download.attr("download", $(x).attr("src"));
    download.attr("name", $(x).attr("giftitle"));
    download.attr("id", "downloadBtn");
    //clear favs button
    clearFavs.text("Clear Favorites");
    clearFavs.attr("id", "clear-btn");
    //creates the gif in the section
    tag.text("Favorites Section");
    rating.text("Rating: " + $(x).attr("rating"));
    title.text("Title: " + $(x).attr("giftitle"));
    score.text("Score: " + $(x).attr("score"));
    //adds gif info to localStore
    getAttributes(gifGrid);

    $(divcont2).append(gifGrid);
    $(divcont2).append(cardBody);
    $(divcont2).append(cardFooter);

    $(cardBody).append(rating);
    $(cardBody).append(title);
    $(cardBody).append(score);

    $(cardFooter).append(download);

    $("#favorites-tag").append(tag);
    $("#favorites-tag").append(clearFavs);
    $("#favorites-show").prepend(divcont2);
}

//gets all gif's attributes
function getAttributes($node) {
    var gifAttributes = {};
    $.each($node[0].attributes, function (index, attribute) {
        gifAttributes[attribute.name] = attribute.value;
    });
    localStorage.setItem(favnumber, JSON.stringify(gifAttributes));
    localStorage.setItem("favnumber", favnumber);
    //return gifAttributes;
}

//renders gifs from localStore
function renderFavs(x) {
    var rendertest = JSON.parse(localStorage.getItem("test"));
    var renderfav = JSON.parse(localStorage.getItem(x));
    $("#favorites-tag").empty();
    var divcont2 = $("<div class='card bg-transparent' id='divcont2'>");
    var cardBody = $("<div id='favCardBody' class='card-body'>");
    var cardFooter = $("<div id='favCardFotter' class='card-footer'>");
    var rating = $("<p>");
    var tag = $("<h2>");
    var gifGrid = $("<img >");
    var title = $("<p>");
    var score = $("<p>");
    var download = $("<button class='btn btn-dark'>");
    var clearFavs = $("<button class='btn btn-dark'>");
    //gif atrributes
    gifGrid.attr("src", renderfav.src);
    gifGrid.attr("still", renderfav.still);
    gifGrid.attr("animated", renderfav.animated);
    gifGrid.attr("status", renderfav.status);
    gifGrid.attr("toggle", renderfav.toggle);
    gifGrid.attr("title", renderfav.title);
    gifGrid.addClass("gifs");
    //writes download attributes
    download.text("Download");
    download.attr("download", renderfav.src);
    download.attr("name", renderfav.giftitle);
    download.attr("id", "downloadBtn");
    //clear favs button
    clearFavs.text("Clear Favorites");
    clearFavs.attr("id", "clear-btn");
    //creats the gif in the section
    tag.text("Favorites Section");
    rating.text("Rating: " + renderfav.rating);
    title.text("Title: " + renderfav.giftitle);
    score.text("Score: " + renderfav.score);

    $(divcont2).append(gifGrid);
    $(divcont2).append(cardBody);
    $(divcont2).append(cardFooter);

    $(cardBody).append(rating);
    $(cardBody).append(title);
    $(cardBody).append(score);

    $(cardFooter).append(download);

    $("#favorites-tag").append(tag);
    $("#favorites-tag").append(clearFavs);
    $("#favorites-show").prepend(divcont2);
}

//animate/stop gif
function animateGif() {
    console.log($(this).attr("status"));
    var status = $(this).attr("status");
    var animated = $(this).attr("animated");
    var still = $(this).attr("still");
    if (status == "still") {
        //changes the url an status to animated mode
        $(this).attr("src", animated);
        $(this).attr("status", "animated");
    }
    else if (status == "animated") {
        //changes the url an status to still mode
        $(this).attr("src", still);
        $(this).attr("status", "still");
    }
}

