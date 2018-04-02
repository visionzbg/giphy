$(document).ready(function() {

  var topics = ["Tom Brady", "Rob Gronkowski", "Dann Amendola", "Julian Edelman", "Dion Lewis", "Chris Hogan", "Brandin Cooks", "Rex Burkhead", "Danny Shelton", "James White", "Adrian Clayborn", "Marquis Flowers", "Stephen Gostowski", "Patrick Chung", "Stephon Gilmore", "Devon McCourty", "Phillip Dorsett", "Dont's Hightower", "James White"];	

 //  create topics array buttons

  function renderButtons(){
    $('#buttons-view').empty();
    for (var i = 0; i < topics.length; i++) {

            //create all buttons

            var a = $('<button>');
            a.addClass('players');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
          }
        }    

        renderButtons();

//on button click

$(document).on('click', '.players', function() {

//new variable will log the text data from each button

    var newEngland = $(this).html(); 

// console.log(newEngland);

// var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=2W2fhmUSFpdHMr8mofEaMWLLG1ossgxl";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newEngland + "&api_key=2W2fhmUSFpdHMr8mofEaMWLLG1ossgxl";

// console.log(queryURL);

// Creating an AJAX call for the specific Patriot button being clicked

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;

//console.log(results);

//empties the div before adding more gifs

        $('#patriots-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;

 // console.log(imageView);  

        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#patriots-view').prepend(gifImage);
                    gifImage.on('click', playGif);

// Pulling ratings for each player

        var rating = results[j].rating;
// console.log(rating);
        var displayRated= $('<p>').text("Rating: " + rating);
        $('#patriots-view').prepend(displayRated);

  } // the end 

}); // done response

        //function to stop and animate gifs

        function playGif() { 
                    var state = $(this).attr('data-state');
                    // console.log(state);
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }



           } //end of on click function

}); //end of document on click 

//adding new button to array

        $(document).on('click', '#add-patriot', function(){
            if ($('#patriot-input').val().trim() == ''){
              alert('Input can not be left blank');
           }

           else {
            var patriots = $('#patriot-input').val().trim();
            topics.push(patriots);
            $('#patriot-input').val('');
            renderButtons();
            return false;
            }
        });
        }); // end click function

