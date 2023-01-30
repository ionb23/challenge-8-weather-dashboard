// Initial array of cities
// if "storedCities" key exists in local storage, create storedCities variable with "storedCities" value
// otherwise if "storedCities" key does not exist in local storage yet, create an empty array to avoid console errors
if (localStorage.getItem("storedCities") === null) {
  var storedCities = [];
} else var storedCities = JSON.parse(localStorage.getItem("storedCities"));

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayWeatherInfo() {
  $('#today').empty();
  $('#forecast').empty();

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
    // console.log(response);

    var todayContainer = $("<div>");
    todayContainer.attr("id", "todayContainer");

    var currentCity = response.city.name + ", " + response.city.country;

    var today = moment();
    var currentDate = today.format("DD/MM/YYYY");

    var currentIconEl = $("<img>");
    var currentWeatherIcon = response.list[0].weather[0].icon;
    var currentweatherIconURL = "http://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";

    currentIconEl.attr("src", currentweatherIconURL);
    currentIconEl.attr("alt", response.list[0].weather[0].description);
    currentIconEl.css("height", 50)

    var cityDateIconEl = $("<h4>");
    cityDateIconEl.attr("id", "cityDateIconEl");

    cityDateIconEl.text(currentCity + " (" + currentDate + ")");
    cityDateIconEl.append(currentIconEl);

    var currentTempEl = $("<div>");
    // converting Kelvin to Celsius
    var currentTempCelsius = Math.round(response.list[0].main.temp * 10 - 273.15 * 10) / 10;
    currentTempEl.text("Temp: " + currentTempCelsius + " °C");

    var currentWindEl = $("<div>");
    // converting m/s to km/h
    currentSpeedKPH = Math.round(response.list[0].wind.speed * 3.6 * 10) / 10
    currentWindEl.text("Wind:  " + currentSpeedKPH + " KPH");

    var currentHumidityEl = $("<div>");
    currentHumidityEl.text("Humidity: " + response.list[0].main.humidity + "%");

    todayContainer.append(cityDateIconEl);
    todayContainer.append(currentTempEl);
    todayContainer.append(currentWindEl);
    todayContainer.append(currentHumidityEl);

    $("#today").append(todayContainer);

    var forecastContainer = $("<div>");
    forecastContainer.addClass("container");

    var forecastRowDiv = $("<div>");
    forecastRowDiv.addClass("row d-flex justify-content-between");

    // DT = Date Time
    var forecastDTArray = [];
    for (i = 0; i < response.list.length; i++) {
      var forecastDT = moment.unix(response.list[i].dt).format("DD/MM/YYYY, HH:mm:ss");
      forecastDTArray.push(forecastDT);
    }

    // we look want the forecast from 12:00 in each of our next 5 days as this time
    // is the most "neutral" / representative of the temperature for the day
    var forecastDay1 = moment().add(1, 'day').format("DD/MM/YYYY, 12:00:00");
    var forecastDay2 = moment().add(2, 'day').format("DD/MM/YYYY, 12:00:00");
    var forecastDay3 = moment().add(3, 'day').format("DD/MM/YYYY, 12:00:00");
    var forecastDay4 = moment().add(4, 'day').format("DD/MM/YYYY, 12:00:00");
    // sometimes day 5 12:00 isn't in the array, so we obtain the last item in the array instead for day 5 forecast
    var forecastDay5 = forecastDTArray[forecastDTArray.length - 1];


    // 5D forecast = 5-Day forecast
    var forecast5DArray = [
      {
        dateTime: forecastDay1,
        // indexOf returns the index of our lookup item in the array
        index: forecastDTArray.indexOf(forecastDay1)
      },
      {
        dateTime: forecastDay2,
        index: forecastDTArray.indexOf(forecastDay2)
      },
      {
        dateTime: forecastDay3,
        index: forecastDTArray.indexOf(forecastDay3)
      },
      {
        dateTime: forecastDay4,
        index: forecastDTArray.indexOf(forecastDay4)
      },
      {
        dateTime: forecastDay5,
        index: forecastDTArray.indexOf(forecastDay5)
      },
    ];

    for (i = 0; i < forecast5DArray.length; i++) {
      var forecastDay = $("<div>");
      forecastDay.addClass("card forecastDay col-xl-2 col-lg-3 col-md-4 col-sm-6");

      var forecastDate = $("<h6>");
      forecastDate.addClass("card-title");
      forecastDate.text(moment(forecast5DArray[i].dateTime, "DD/MM/YYYY, 12:00:00").format("DD/MM/YYYY"));

      var forecastBody = $("<div>");
      forecastBody.addClass("card-body");

      // --------------------------------------------

      var forecastIconEl = $("<img>");
      var forecasttWeatherIcon = response.list[forecast5DArray[i].index].weather[0].icon;
      var forecastweatherIconURL = "http://openweathermap.org/img/wn/" + forecasttWeatherIcon + "@2x.png";
      forecastIconEl.attr("src", forecastweatherIconURL);
      forecastIconEl.attr("alt", response.list[forecast5DArray[i].index].weather[0].description);
      forecastIconEl.css("height", 50)

      var forecastTempEl = $("<div>");
      // converting Kelvin to Celsius
      var forecastTempCelsius = Math.round(response.list[forecast5DArray[i].index].main.temp * 10 - 273.15 * 10) / 10;
      forecastTempEl.text("Temp: " + forecastTempCelsius + " °C");

      var forecastWindEl = $("<div>");
      // converting m/s to km/h
      forecastSpeedKPH = Math.round(response.list[forecast5DArray[i].index].wind.speed * 3.6 * 10) / 10
      forecastWindEl.text("Wind:  " + forecastSpeedKPH + " KPH");

      var forecastHumidityEl = $("<div>");
      forecastHumidityEl.text("Humidity: " + response.list[forecast5DArray[i].index].main.humidity + "%");

      forecastDay.append(forecastDate);
      forecastBody.append(forecastIconEl);
      forecastBody.append(forecastTempEl);
      forecastBody.append(forecastWindEl);
      forecastBody.append(forecastHumidityEl);

      forecastDay.append(forecastBody);
      forecastRowDiv.append(forecastDay);
      forecastContainer.append(forecastRowDiv);
      $("#forecast").append(forecastContainer);
    }
  })
};

// Function for displaying cities searched and/or stored in local storage
function renderButtons() {
  // storedCities = JSON.parse(localStorage.getItem("cities"));
  // Deletes the cities prior to adding new cities
  // (this is necessary otherwise you will have repeat buttons)
  $("#history").empty();

  // Loops through the array of cities
  for (var i = 0; i < storedCities.length; i++) {

    // Then dynamicaly generates buttons for each city in the array
    var cityButton = $("<button>");
    // Adds a class of city to our button, as well as some button and margin classes from Bootstrap
    cityButton.addClass("city btn-secondary mb-3");
    // Adds a data-attribute
    cityButton.attr("data-name", storedCities[i]);
    // Provids the button text
    cityButton.text(storedCities[i]);
    // Adds the button to the history div
    $("#history").append(cityButton);
  }
}

// This function handles events where the add city button is clicked
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var city = $("#search-input").val().trim();

  // The city from the textbox is then added to our array
  storedCities.unshift(city);

  // double check this - on page reload it sets local storage to cities, which is empty lol need to set it to local storage if exists
  // maybe do if localstorage exists then take it if not then create it
  localStorage.setItem("storedCities", JSON.stringify(storedCities));

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
  displayWeatherInfo();
  $("#search-input").val("")

});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".city", displayWeatherInfo);

// Calling the renderButtons function to display the initial buttons if local storage is not empty

if (storedCities.length > 0) {
  renderButtons();
}
