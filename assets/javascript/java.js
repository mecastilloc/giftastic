var category = ["Angry", "Fear", "Happy", "Sad", "Surprise", "Bored", "Dance"];
var gif;
var count=0;


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
    // $(document).on("click", "#downloadBtn", function(event){
    //     event.preventDefault();
    //     //window.location.href = $(this).attr("data-download");
    //     window.open($(this).attr("data-download"), '_blank');
    //    // download($(this).attr("data-download"));
    //     console.log($(this).attr("data-download"));
       //});
 $(document).on("click", "#favoriteBtn", function(event){
        event.preventDefault();
        addFavorite(this);
    });

    $(document).on("click", "#downloadBtn", function(event){
        
        event.preventDefault();
        var name=($(this).attr("data-name"));
        var x=new XMLHttpRequest();
	x.open("GET", $(this).attr("data-download"), true);
	x.responseType = 'blob';
	x.onload=function(e){download(x.response, name, "image/gif" ); }
	x.send();
    });
    
});//end of document ready


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
   
if(gif!=($(this).attr("data-category"))){
    $("#gif-show").empty();
}
    
    gif = $(this).attr("data-category");
    console.log($(this).attr("data-category"))
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&trending&api_key=A8cJAfQajoJdTsbHqWiorpWrAJvJUv4u&limit=50"
    $.ajax({
        url: queryURL,
        method: "GET"
       
    }).then(function (response) {
        console.log(queryURL);
        renderGifs(response);
    });
}

function renderGifs(response) {
    $("#moreGif").empty();
    var addMore= $("<h5 id='add-more'>")
    addMore.text("Click again to Add More (50 Gifs max)");
    $("#moreGif").append(addMore);
    for (j = count; j < count+10; j++) {
        var divcont1=$("<div class='' id='divcont' style='height: 370px'>");
        //var divcont2=$("<div class='container row' id='divcont' style=''>");
        var rating = $("<p>");
        var gifGrid = $("<img >");
        var title = $("<p>");
        var score = $("<p>");
        var download = $("<button download>");
        var favorite = $("<button>");
        rating.text("Rating: " + response.data[j].rating);
        gifGrid.attr("src", response.data[j].images.fixed_height_still.url);
        gifGrid.attr("data-still", response.data[j].images.original_still.url);
        gifGrid.attr("data-animated", response.data[j].images.fixed_height.url);
        gifGrid.attr("data-status", 'still');
        gifGrid.addClass("gifs");
        title.text("Title: " + response.data[j].title);
        score.text("Score: " + response.data[j]._score);
        favorite.text("Add to Favorite");
        favorite.attr("src", response.data[j].images.fixed_height_still.url);
        favorite.attr("data-still", response.data[j].images.original_still.url);
        favorite.attr("data-animated", response.data[j].images.fixed_height.url);
        favorite.attr("data-status", 'still');
        favorite.attr("data-title", response.data[j].title);
        favorite.attr("data-score", response.data[j]._score);
        favorite.attr("data-rating", response.data[j].rating);
        favorite.attr("id", "favoriteBtn")
        download.text("Download");
        download.attr("target", "_blank");
        download.attr("data-download", response.data[j].images.fixed_height.url);
        download.attr("href", response.data[j].images.fixed_height.url);
        download.attr("data-name", response.data[j].title)
        download.attr("id","downloadBtn");
        
        $(divcont1).append(rating);
        $(divcont1).append(gifGrid);
        $(divcont1).append(title);
        $(divcont1).append(score);
        $(divcont1).append(favorite);
        $(divcont1).append(download);
        
        $("#gif-show").prepend(divcont1);
        //$("#gif-show").append(divcont2);
    }
    count+=10;
}

function addFavorite(x){
    $("#favorites-tag").empty()
        var divcont2=$("<div class='' id='divcont2' style='height: 370px'>");
    var tag = $("<h3>");
    var rating = $("<p>");
    var gifGrid = $("<img >");
    var title = $("<p>");
    var score = $("<p>");
    var download = $("<button>");
    
    rating.text("Rating: " + $(x).attr("data-rating"));
    title.text("Title: " + $(x).attr("data-title"));
        score.text("Score: " + $(x).attr("data-score"));
        gifGrid.attr("src", $(x).attr("src"));
        gifGrid.attr("data-still", $(x).attr("data-still"));
        gifGrid.attr("data-animated", $(x).attr("data-animated"));
        gifGrid.attr("data-status", 'still');
        gifGrid.addClass("gifs");
        download.text("Download");
        download.attr("data-download", $(x).attr("src"));
        download.attr("href", "no-script.html");
        download.attr("id","downloadBtn");
        download.attr("target", "_blank");
        tag.text("Favorites Section")
        $(divcont2).append(rating);
        $(divcont2).append(gifGrid);
        $(divcont2).append(title);
        $(divcont2).append(score);
        $(divcont2).append(download);

        $("#favorites-tag").append(tag);
        $("#favorites-show").prepend(divcont2);

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

