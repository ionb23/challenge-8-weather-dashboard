// Initial array of cities
var cities = ["London", "Barcelona", "Chicago"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayWeatherInfo() {

    var city = $(this).attr("data-name");

    // my APIkey - use the below for future once it's authorized
    var APIKey = "74bcedd33b35e7ab84529cda9f41d95a";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + APIKey;

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var currentCityEl = $("<div>");
        // rating.text("Rated " + response.Rated);

        var currentDateEl = $("<div>");
        // rating.text("Rated " + response.Rated);

        var currentIconEl = $("<div>");
        // rating.text("Rated " + response.Rated);

        // currentIconEl.attr("src", response.Poster);
        var currenTempEl = $("<div>");
        // rating.text("Rated " + response.Rated);

        var currentWindEl = $("<div>");
        // rating.text("Rated " + response.Rated);

        var currentHumidityEl = $("<div>");
        // rating.text("Rated " + response.Rated);




        var releaseMoment = moment(response.Released, "DD MMM YYYY");
        var formattedDate = releaseMoment.format("MMMM [the] Do [in the superawesome year] YYYY");
        var releaseDate = $("<div>Released " + formattedDate + "</div>");
        var plot = $("<div>" + response.Plot + "</div>");
        $("#movies-view").prepend($("<hr>"));
        $("#movies-view").prepend(releaseDate);
        $("#movies-view").prepend(rating);
        $("#movies-view").prepend(poster);
        $("#movies-view").prepend(plot);
    })
};

// Function for displaying city weather data
function renderButtons() {
    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#history").empty();
  
    // Loops through the array of movies
    for (var i = 0; i < cities.length; i++) {
  
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var cityButton = $("<button>");
      // Adds a class of movie to our button
      cityButton.addClass("city");
      // Added a data-attribute
      cityButton.attr("data-name", cities[i]);
      // Provided the initial button text
      cityButton.text(cities[i]);
      // Added the button to the buttons-view div
      $("#history").append(cityButton);
    }
  }
  
  // This function handles events where the add movie button is clicked
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var city = $("#search-input").val().trim();
  
    // The city from the textbox is then added to our array
    cities.push(city);
  
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  
  });
  
  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".movie", displayWeatherInfo);
  
  // Calling the renderButtons function to display the initial buttons
  renderButtons();