var category = ["Angry", "Fear", "Happy", "Sad", "Surprise", "Bored", "Dance"];
var gif;
var count = 0;

//start of script
$(document).ready(function () {
    console.log("ready!");
    //function call for tooltip
    $('[data-toggle="tooltip"]').tooltip();

    start();

    $("#add-input").click(function (event) {
        event.preventDefault();
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
        start();
    });
    //create gifs on click
    $(document).on("click", ".category", displayGif);
    // animate/stop gits on click
    $(document).on("click", ".gifs", animateGif);
    //add gif to favorite section
    $(document).on("click", "#favoriteBtn", function (event) {
        event.preventDefault();
        addFavorite(this);
    });
    //downloads the file
    $(document).on("click", "#downloadBtn", function (event) {

        event.preventDefault();
        var name = ($(this).attr("data-name"));
        var x = new XMLHttpRequest();
        x.open("GET", $(this).attr("data-download"), true);
        x.responseType = 'blob';
        x.onload = function (e) { download(x.response, name, "image/gif"); }
        x.send();
    });
});//end of document ready

//create category buttons
function start() {
    $("#buttons").empty();
    for (var i = 0; i < category.length; i++) {
        var emotiBtn = $("<button class='btn btn-dark'>");
        emotiBtn.addClass("category");
        emotiBtn.attr("data-category", category[i]);
        emotiBtn.text(category[i])
        $("#buttons").append(emotiBtn);
    }
}
// make the ajax call
function displayGif() {
    // validates if defferent category is clicked then empty gif grid
    if (gif != ($(this).attr("data-category"))) {
        $("#gif-show").empty();
    }
    gif = $(this).attr("data-category");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&trending&api_key=A8cJAfQajoJdTsbHqWiorpWrAJvJUv4u&limit=50"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        renderGifs(response);
    });
}

//creates gif grid
function renderGifs(response) {
    $("#moreGif").empty();
    var addMore = $("<h6 id='add-more'>")
    addMore.text("Click again to Add More (50 Gifs max)");
    $("#moreGif").append(addMore);
    //shows the first 10 gifs, if same category clicked again, prepend 10 more
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
        //gig atrributes
        gifGrid.attr("src", response.data[j].images.fixed_height_still.url);
        gifGrid.attr("data-still", response.data[j].images.original_still.url);
        gifGrid.attr("data-animated", response.data[j].images.fixed_height.url);
        gifGrid.attr("data-status", 'still');
        gifGrid.attr("data-toggle", "tooltip");
        gifGrid.attr("title", "Click to Animate/Stop")
        gifGrid.addClass("gifs");
//write gif attributes for adding to favorites
        favorite.text("Add Favorite");
        favorite.attr("src", response.data[j].images.fixed_height_still.url);
        favorite.attr("data-still", response.data[j].images.original_still.url);
        favorite.attr("data-animated", response.data[j].images.fixed_height.url);
        favorite.attr("data-status", 'still');
        favorite.attr("data-title", response.data[j].title);
        favorite.attr("data-score", response.data[j]._score);
        favorite.attr("data-rating", response.data[j].rating);
        favorite.attr("id", "favoriteBtn")
// write download url
        download.text("Download");
        download.attr("data-download", response.data[j].images.fixed_height.url);
        download.attr("data-name", response.data[j].title)
        download.attr("id", "downloadBtn");
// creates the final grid modifying the DOM
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
    }
    count += 10;
}


//add th gif selected to favorites section
function addFavorite(x) {
    $("#favorites-tag").empty()
    var divcont2 = $("<div class='card bg-transparent' id='divcont2'>");
    var cardBody = $("<div id='favCardBody' class='card-body'>");
    var cardFooter = $("<div id='favCardFotter' class='card-footer'>");
    var rating = $("<p>");
    var tag = $("<h2>");
    var gifGrid = $("<img >");
    var title = $("<p>");
    var score = $("<p>");
    var download = $("<button class='btn btn-dark'>");
 //gig atrributes
    gifGrid.attr("src", $(x).attr("src"));
    gifGrid.attr("data-still", $(x).attr("data-still"));
    gifGrid.attr("data-animated", $(x).attr("data-animated"));
    gifGrid.attr("data-status", 'still');
    gifGrid.attr("data-toggle", "tooltip");
    gifGrid.attr("title", "Click to Animate/Stop")
    gifGrid.addClass("gifs");
// write donload url
    download.text("Download");
    download.attr("data-download", $(x).attr("src"));
    download.attr("data-name", $(x).attr("data-title"))
    download.attr("id", "downloadBtn");
//creats the gif in the section
    tag.text("Favorites Section");
    rating.text("Rating: " + $(x).attr("data-rating"));
    title.text("Title: " + $(x).attr("data-title"));
    score.text("Score: " + $(x).attr("data-score"));

    $(divcont2).append(gifGrid);
    $(divcont2).append(cardBody);
    $(divcont2).append(cardFooter);

    $(cardBody).append(rating);
    $(cardBody).append(title);
    $(cardBody).append(score);

    $(cardFooter).append(download);

    $("#favorites-tag").append(tag);
    $("#favorites-show").prepend(divcont2);
}

//animate/stop gif
function animateGif() {
    console.log($(this).attr("data-status"));
    var status = $(this).attr("data-status");
    var animated = $(this).attr("data-animated");
    var still = $(this).attr("data-still");
    if (status == "still") {
//changes the url an status to animated mode
        $(this).attr("src", animated);
        $(this).attr("data-status", "animated");
    }
    else if (status == "animated") {
        //changes the url an status to still mode
        $(this).attr("src", still);
        $(this).attr("data-status", "still");
    }
}

