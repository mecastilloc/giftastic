var category = ["Angry", "Fear", "Happy", "Sad", "Surprise", "Bored", "Dance"];


$(document).ready(function () {
    console.log("ready!");

    start();

    $("#add-input").click(function (event) {
        event.preventDefault();
        var newInput = $("#new-input").val().trim();
        if(newInput==""){
            $("#already-exists").text("Type something");
            setTimeout(function () { $("#already-exists").empty(); }, 2000);
        } 
        else{
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
    $(document).on("click", ".category", displayGif);
    $(document).on("click", ".gifs", animateGif);

});//end of document ready


function addNewBtn (event){
    
}

function start() {
    $("#buttons").empty();
    for (var i = 0; i < category.length; i++) {
        var emotiBtn = $("<button>");
        emotiBtn.addClass("category");
        emotiBtn.attr("data-category", category[i]);
        emotiBtn.text(category[i])
        $("#buttons").append(emotiBtn);
    }
}

function displayGif() {
    $("#gif-show").empty();
    var gif = $(this).attr("data-category");
    console.log($(this).attr("data-category"))
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&trending&api_key=A8cJAfQajoJdTsbHqWiorpWrAJvJUv4u&limit=12"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        renderGifs(response);
    });
}

function renderGifs(response) {
    for (var j = 0; j < response.data.length; j++) {
        var divcont=$("<div class='container' id='divcont'>");
        var rating = $("<p style=''>");
        var gifGrid = $("<img >");
        gifGrid.attr("src", response.data[j].images.fixed_height_still.url);
        gifGrid.attr("data-still", response.data[j].images.original_still.url);
        gifGrid.attr("data-animated", response.data[j].images.fixed_height.url);
        gifGrid.attr("data-status", 'still');
        gifGrid.addClass("gifs");
        rating.text("Rating: " + response.data[j].rating);
        $(divcont).append(rating);
        $(divcont).append(gifGrid);
        $("#gif-show").append(divcont);
    }
}

function animateGif() {
    console.log($(this).attr("data-status"));
    var status = $(this).attr("data-status");
    var animated = $(this).attr("data-animated");
    var still = $(this).attr("data-still");
    if (status == "still") {
       
        $(this).attr("src", animated);
        $(this).attr("data-status", "animated");
    }
    else if (status == "animated") {
        $(this).attr("src", still);
        $(this).attr("data-status", "still");
    }
}