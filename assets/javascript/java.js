
var emotions = ["Anger", "Fear", "Happiness", "Sadness", "Surprise", "Boredom"];


$( document ).ready(function() {
    console.log( "ready!" );

start();

$("#add-input").click(function (event) {
    event.preventDefault();
    var newInput = $("#new-input").val().trim();
    if(!emotions.includes(newInput)){
 emotions.push(newInput);
    } 
    else{
        $("#already-exists").text("Already on the list");
        //setTimeout(errase(),2000);
        setTimeout(function(){ $("#already-exists").empty(); }, 2000);
    }
start();
});

});//end of document ready

function start(){
    $("#buttons").empty();
for(var i=0; i<emotions.length; i++){
var emotiBtn=$("<button>");
emotiBtn.addClass("emotion");
emotiBtn.attr("data-emotion", emotions[i]);
emotiBtn.text(emotions[i])
$("#buttons").append(emotiBtn);

}
}


function errase(){
  $("#already-exists").empty();
}
