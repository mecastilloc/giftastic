# `GifTastic`
Week 6 homework. AJAX and giphy API


## `Overview`

In this assignment, I use the GIPHY API to make a dynamic web page that populates with gifs of your choice. To achieve this task, the page calls the GIPHY API and use JavaScript and jQuery to change the HTML of the site.

**[Live Demo](https://mecastilloc.github.io/giftastic/index.html)**


## `Features`

1. An initial array of category buttons is created at page load.
   
2. When the user clicks on a button, the page grabs 10 static, non-animated gif images from the GIPHY API and places them on the page.

3. When the user clicks one of the still GIPHY images, the gif animates. If the user clicks the gif again, it stops playing.

4. With every gif, is display its rating (PG, G, etc.), gif's title and score. There is one button to add the gif to a Favorite Section another button to download the gif file
   * This data is provided by the GIPHY API.
   
5. It has a form that takes the value from a user input box and adds it into the category buttons. 

6. If the same category button is pressed again, it allows users to request additional gifs to be added to the page.
   * Each request adds 10 gifs to the page, and does not overwrite the existing gifs.(for time responses it is limited to 50 gifs max. It could be limitless)

7. Allows users to add their favorite gifs to a favorites section.
   * This persists even when they select or add a new topic.
   * This persists even when they refresh the page.
   * The favorites section can be deleted with a button.

   
### `COMMIT History`

`commit 1:`
repo creation

`commit 2:`
file structure created

`commit 3:`
render buttons function complete

`commit 4:`
Basic functions complete, trying bonus features next

`commit 5:`
changing http to https for correct deploy at GitHub pages

`commit 6:`
added more gif's info

`commit 7:`
request 10 more gifs added without clearing

`commit 8:`
Add to favorite persisting on new category feature is functional, one click download button function added. Readme updated with info`

`commit 9:`
Final css styling, showing gifs as bootstrap's cards, final code format

`commit 10:`
save favorites data in localStorage to persists on page reload, now can clear favorites with button 

`commit 11:`
Update readme.md


### `Work to do`

Even it works fine storing favorites data to render them on page refresh. I could not store the all favs grid in one localStorage variable so the code is to big rendering one by one.
I have to find the way to make the  fav gif's from localStorage and the ones added by click button rendering with one function. 


### `Extra Credits`

Download function taken from:
download.js v4.2, by dandavis; 2008-2016. [CCBY2] see http://danml.com/download.html [for tests/usage] (http://danml.com/download.html)
