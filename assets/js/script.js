// Initial array of cities
var cities = ["London", "Barcelona", "Chicago"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayWeatherInfo() {
    $('#today').empty();

    var city = $(this).attr("data-name") || $("#search-input").val().trim();

    // my APIkey - use the below for future once it's authorized
    var APIKey = "74bcedd33b35e7ab84529cda9f41d95a";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var todayContainer = $("<div>");
        todayContainer.attr("id", "todayContainer");

        var currentCity = response.city.name + ", " + response.city.country;

        var today = moment();
        var currentDate = today.format("DD/MM/YYYY");

        var currentIconEl = $("<img>");
        var currentWeatherIcon = response.list[0].weather[0].icon;
        var weatherIconURL = "http://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";

        currentIconEl.attr("src", weatherIconURL);
        currentIconEl.attr("alt", response.list[0].weather[0].description);
        currentIconEl.css("height", 50)

        var cityDateIconEl = $("<h4>");
        cityDateIconEl.attr("id", "cityDateIconEl");

        cityDateIconEl.text(currentCity + " (" + currentDate + ")");
        cityDateIconEl.append(currentIconEl);

        var currentTempEl = $("<div>");
        // converting Kelvin to Celsius
        var currentTempCelsius = Math.round(response.list[0].main.temp*10 - 273.15*10)/10;
        currentTempEl.text("Temp: " + currentTempCelsius + " °C");

        var currentWindEl = $("<div>");
        // converting m/s to km/h
        currentSpeedKPH = Math.round(response.list[0].wind.speed * 3.6 * 10)/10
        currentWindEl.text("Wind  " + currentSpeedKPH + " KPH");
        
        var currentHumidityEl = $("<div>");
        currentHumidityEl.text("Humidity: " + response.list[0].main.humidity + "%");



        var releaseMoment = moment(response.Released, "DD MMM YYYY");
        var formattedDate = releaseMoment.format("MMMM [the] Do [in the superawesome year] YYYY");
        var releaseDate = $("<div>Released " + formattedDate + "</div>");
        var plot = $("<div>" + response.Plot + "</div>");
        // $("#today").prepend($("<hr>"));
        todayContainer.append(cityDateIconEl);
        todayContainer.append(currentTempEl);
        todayContainer.append(currentWindEl);
        todayContainer.append(currentHumidityEl);

        $("#today").append(todayContainer);

        console.log(today.add(1,'day').format("DD/MM/YYYY"))





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
    displayWeatherInfo();
    $("#search-input").val("")
  
  });
  
  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".city", displayWeatherInfo);
  
  // Calling the renderButtons function to display the initial buttons
  renderButtons();