
// search by movie
$("#submitMovie").on("click", function () {
    document.getElementById("beer-view").style.display = 'block';
    document.getElementById("movie-view").style.display = 'block';
    document.getElementById("food-view").style.display = 'block';
    document.getElementById("beer").style.display = 'none';
    document.getElementById("movie").style.display = 'none';
    document.getElementById("food").style.display = 'none';

    event.preventDefault();
    localStorage.clear();

    //clear any previous searches
    document.getElementById("beer-form").reset();
    document.getElementById("food-form").reset();
    $("#movie-view").empty();
    $("#beer-view").empty();
    $("#food-view").empty();

    var movie = $("#movie-input").val().trim();

    var queryMovie = "https://omdbapi.com/?apikey=trilogy&t=" + movie;

    $.ajax({
        url: queryMovie,
        method: "GET"
    }).then(function (data) {
        console.log(data);
        var rating = data.Ratings[0].Value;
        // pulls the IMDB rating of the movie
        var rawRating = rating.substring(0, 3);
        var ratingNumber = Math.round(rawRating);
        var title = data.Title;
        console.log(title);
        var actors = data.Actors;
        console.log(actors);
        var poster = data.Poster;
        console.log(poster);
        var plot = data.Plot;

        //display movie
        var movieDiv = $("<div>");
        $(movieDiv).append("<img class='img-responsive img displayImg' src='" + poster + "'>");
        $(movieDiv).append("<div> <h3>" + title + "</h3> </div>");
        $(movieDiv).append("<div>" + actors + "</div> <br>");
        $(movieDiv).append("<div>" + plot + "</div>");
        $("#movie-view").append(movieDiv);
        document.getElementById("movie-view").style.height = 'auto';




        localStorage.setItem("movie", title);

        console.log(ratingNumber);

        //using the movie rating from IMDB, searches for beer above the ABV of the movie rating
        var queryBeer = "https://api.punkapi.com/v2/beers?abv_gt=" + ratingNumber;
        $.ajax({
            url: queryBeer,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var beer = Math.floor(Math.random() * response.length);
            beerChoice = response[beer];
            console.log(beerChoice);
            beerName = beerChoice.name;
            console.log(beerName);
            beerTag = beerChoice.tagline;
            console.log(beerTag);
            beerDescription = beerChoice.description;
            console.log(beerDescription);
            beerImage = beerChoice.image_url;
            console.log(beerImage);
            beerFood1 = beerChoice.food_pairing[0];
            beerFood2 = beerChoice.food_pairing[1];
            beerFood3 = beerChoice.food_pairing[2];
            console.log(beerFood1);
            console.log(beerFood2);
            console.log(beerFood3);

            beerId = beerChoice.id;

            localStorage.setItem("beer", beerId);

            $.ajax({
                url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood1,
                beforeSend: function (xhrObj) {
                    // Request headers
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
                },
                method: "GET"
            }).then(function (foodPic) {
                console.log(foodPic);
                var foodImage = foodPic.value[0].thumbnailUrl;
                console.log(foodImage);
                var foodDiv = $("<div>");
                $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
                $(foodDiv).append("<div>" + beerFood1 + "</div>");
                $.ajax({
                    url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood2,
                    beforeSend: function (xhrObj) {
                        // Request headers
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
                    },
                    method: "GET"
                }).then(function (foodPic) {
                    console.log(foodPic);
                    var foodImage = foodPic.value[0].thumbnailUrl;
                    console.log(foodImage);

                    $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
                    $(foodDiv).append("<div>" + beerFood2 + "</div>");
                    $.ajax({
                        url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood3,
                        beforeSend: function (xhrObj) {
                            // Request headers
                            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
                        },
                        method: "GET"
                    }).then(function (foodPic) {
                        console.log(foodPic);
                        var foodImage = foodPic.value[0].thumbnailUrl;
                        console.log(foodImage);

                        $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
                        $(foodDiv).append("<div>" + beerFood3 + "</div>");
                        $("#food-view").append(foodDiv);
                    });
                });


                //display beer
                var beerDiv = $("<div>");
                $(beerDiv).append("<img class='img-responsive img displayImg' src='" + beerImage + "'>");
                $(beerDiv).append("<div> <h3>" + beerName + "</h3> </div>");
                $(beerDiv).append("<div>" + beerTag + "</div> <br>");
                $(beerDiv).append("<div>" + beerDescription + "</div>");
                $("#beer-view").append(beerDiv);

                //display food

            })
        })

    })

})


//search by beer
$("#submitBeer").on("click", function () {

    document.getElementById("beer-view").style.display = 'block';
    document.getElementById("movie-view").style.display = 'block';
    document.getElementById("food-view").style.display = 'block';
    document.getElementById("beer").style.display = 'none';
    document.getElementById("movie").style.display = 'none';
    document.getElementById("food").style.display = 'none';

    event.preventDefault();
    localStorage.clear();
    //clear any previous searches
    document.getElementById("movie-form").reset();
    document.getElementById("food-form").reset();
    $("#movie-view").empty();
    $("#beer-view").empty();
    $("#food-view").empty();

    var beer = $("#beer-input").val().trim();

    var queryBeer = "https://api.punkapi.com/v2/beers?beer_name=" + beer;

    $.ajax({
        url: queryBeer,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //pulls a random beer from the beer search results
        var beer = Math.floor(Math.random() * response.length);
        beerChoice = response[beer];
        console.log(beerChoice);
        beerName = beerChoice.name;
        console.log(beerName);
        beerTag = beerChoice.tagline;
        console.log(beerTag);
        beerDescription = beerChoice.description;
        console.log(beerDescription);
        beerImage = beerChoice.image_url;
        console.log(beerImage);
        beerFood1 = beerChoice.food_pairing[0];
        beerFood2 = beerChoice.food_pairing[1];
        beerFood3 = beerChoice.food_pairing[2];
        console.log(beerFood1);
        console.log(beerFood2);
        console.log(beerFood3);
        brewYear = beerChoice.first_brewed;
        console.log(brewYear);
        //pulls the year the beer was first brewed
        year = brewYear.substring(3, 7);
        console.log(year);

        beerId = beerChoice.id;

        localStorage.setItem("beer", beerId);

        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood1,
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
            },
            method: "GET"
        }).then(function (foodPic) {
            console.log(foodPic);
            var foodImage = foodPic.value[0].thumbnailUrl;
            console.log(foodImage);
            var foodDiv = $("<div>");
            $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
            $(foodDiv).append("<div>" + beerFood1 + "</div>");
            $.ajax({
                url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood2,
                beforeSend: function (xhrObj) {
                    // Request headers
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
                },
                method: "GET"
            }).then(function (foodPic) {
                console.log(foodPic);
                var foodImage = foodPic.value[0].thumbnailUrl;
                console.log(foodImage);

                $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
                $(foodDiv).append("<div>" + beerFood2 + "</div>");
                $.ajax({
                    url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood3,
                    beforeSend: function (xhrObj) {
                        // Request headers
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
                    },
                    method: "GET"
                }).then(function (foodPic) {
                    console.log(foodPic);
                    var foodImage = foodPic.value[0].thumbnailUrl;
                    console.log(foodImage);

                    $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
                    $(foodDiv).append("<div>" + beerFood3 + "</div>");
                    $("#food-view").append(foodDiv);
                });
            });
        });

        //display beer
        var beerDiv = $("<div>");
        $(beerDiv).append("<img class='img-responsive img displayImg' src='" + beerImage + "'>");
        $(beerDiv).append("<div> <h3>" + beerName + "</h3> </div>");
        $(beerDiv).append("<div>" + beerTag + "</div> <br>");
        $(beerDiv).append("<div>" + beerDescription + "</div>");
        $("#beer-view").append(beerDiv);


        //search for popular movies from brew year of the selected beer
        var queryMovieDB = "https://api.themoviedb.org/3/discover/movie?api_key=65e7259520279f0add439f24bca07ecb&sort_by=popularity.desc&primary_release_year=" + year

        $.ajax({
            url: queryMovieDB,
            method: "GET"
        }).then(function (movData) {
            console.log(movData);
            //randomly selects one of the top 15 most popular movies from the given year
            var randomNum = Math.floor(Math.random() * 15);
            var movName = movData.results[randomNum].title;
            console.log(movName);

            //uses the movie taken from themoviedb api and searches OMDB
            var queryMovie = "https://omdbapi.com/?apikey=trilogy&t=" + movName;

            $.ajax({
                url: queryMovie,
                method: "GET"
            }).then(function (data) {
                console.log(data);
                var rating = data.Ratings[0].Value;
                var rawRating = rating.substring(0, 3);
                var ratingNumber = Math.round(rawRating);
                var title = data.Title;
                console.log(title);
                var actors = data.Actors;
                console.log(actors);
                var poster = data.Poster;
                console.log(poster);
                var plot = data.Plot;

                localStorage.setItem("movie", title);

                //display movie
                var movieDiv = $("<div>");
                $(movieDiv).append("<img class='img-responsive img displayImg' src='" + poster + "'>");
                $(movieDiv).append("<div> <h3>" + title + "</h3> </div>");
                $(movieDiv).append("<div>" + actors + "</div> <br>");
                $(movieDiv).append("<div>" + plot + "</div>");
                $("#movie-view").append(movieDiv);

            })


        })





    })

});

//search by food
$("#submitFood").on("click", function () {

    document.getElementById("beer-view").style.display = 'block';
    document.getElementById("movie-view").style.display = 'block';
    document.getElementById("food-view").style.display = 'block';
    document.getElementById("beer").style.display = 'none';
    document.getElementById("movie").style.display = 'none';
    document.getElementById("food").style.display = 'none';

    event.preventDefault();
    localStorage.clear();
    //clear any previous searches
    document.getElementById("beer-form").reset();
    document.getElementById("movie-form").reset();
    $("#movie-view").empty();
    $("#beer-view").empty();
    $("#food-view").empty();

    var food = $("#food-input").val().trim();

    var queryFood = "https://api.punkapi.com/v2/beers?food=" + food;

    $.ajax({
        url: queryFood,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var beer = Math.floor(Math.random() * response.length);
        beerChoice = response[beer];
        console.log(beerChoice);
        beerName = beerChoice.name;
        console.log(beerName);
        beerTag = beerChoice.tagline;
        console.log(beerTag);
        beerDescription = beerChoice.description;
        console.log(beerDescription);
        beerImage = beerChoice.image_url;
        console.log(beerImage);
        beerFood1 = beerChoice.food_pairing[0];
        beerFood2 = beerChoice.food_pairing[1];
        beerFood3 = beerChoice.food_pairing[2];
        console.log(beerFood1);
        console.log(beerFood2);
        console.log(beerFood3);
        brewYear = beerChoice.first_brewed;
        console.log(brewYear);
        //pulls the year the beer was first brewed
        year = brewYear.substring(3, 7);
        console.log(year);

        beerId = beerChoice.id;

        localStorage.setItem("beer", beerId);

        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood1,
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
            },
            method: "GET"
        }).then(function (foodPic) {
            console.log(foodPic);
            var foodImage = foodPic.value[0].thumbnailUrl;
            console.log(foodImage);
            var foodDiv = $("<div>");
            $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
            $(foodDiv).append("<div>" + beerFood1 + "</div>");
            $.ajax({
                url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood2,
                beforeSend: function (xhrObj) {
                    // Request headers
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
                },
                method: "GET"
            }).then(function (foodPic) {
                console.log(foodPic);
                var foodImage = foodPic.value[0].thumbnailUrl;
                console.log(foodImage);

                $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
                $(foodDiv).append("<div>" + beerFood2 + "</div>");
                $.ajax({
                    url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood3,
                    beforeSend: function (xhrObj) {
                        // Request headers
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
                    },
                    method: "GET"
                }).then(function (foodPic) {
                    console.log(foodPic);
                    var foodImage = foodPic.value[0].thumbnailUrl;
                    console.log(foodImage);

                    $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
                    $(foodDiv).append("<div>" + beerFood3 + "</div>");
                    $("#food-view").append(foodDiv);
                });
            });

        });

        //display beer
        var beerDiv = $("<div>");
        $(beerDiv).append("<img class='img-responsive img displayImg' src='" + beerImage + "'>");
        $(beerDiv).append("<div> <h3>" + beerName + "</h3> </div>");
        $(beerDiv).append("<div>" + beerTag + "</div> <br>");
        $(beerDiv).append("<div>" + beerDescription + "</div>");
        $("#beer-view").append(beerDiv);


        var queryMovieDB = "https://api.themoviedb.org/3/discover/movie?api_key=65e7259520279f0add439f24bca07ecb&sort_by=popularity.desc&primary_release_year=" + year

        $.ajax({
            url: queryMovieDB,
            method: "GET"
        }).then(function (movData) {
            console.log(movData);
            //randomly selects one of the top 15 most popular movies from the given year
            var randomNum = Math.floor(Math.random() * 15);
            var movName = movData.results[randomNum].title;
            console.log(movName);

            //uses the movie taken from themoviedb api and searches OMDB
            var queryMovie = "https://omdbapi.com/?apikey=trilogy&t=" + movName;

            $.ajax({
                url: queryMovie,
                method: "GET"
            }).then(function (data) {
                console.log(data);
                var rating = data.Ratings[0].Value;
                var rawRating = rating.substring(0, 3);
                var ratingNumber = Math.round(rawRating);
                var title = data.Title;
                console.log(title);
                var actors = data.Actors;
                console.log(actors);
                var poster = data.Poster;
                console.log(poster);
                var plot = data.Plot;

                localStorage.setItem("movie", title);

                //display movie
                var movieDiv = $("<div>");
                $(movieDiv).append("<img class='img-responsive img displayImg' src='" + poster + "'>");
                $(movieDiv).append("<div> <h3>" + title + "</h3> </div>");
                $(movieDiv).append("<div>" + actors + "</div> <br>");
                $(movieDiv).append("<div>" + plot + "</div>");
                $("#movie-view").append(movieDiv);

            })


        })





    })

});


//reset search
$("#reset").on("click", function () {
    document.getElementById("beer-input").reset();
    document.getElementById("movie-input").reset();
    document.getElementById("food-input").reset();
    $("#movie-view").empty();
    $("#beer-view").empty();
    $("#food-view").empty();

});

function toggleDiv(element) {
    document.getElementById(element).style.display = 'block';
    document.getElementById("img-beer").style.display = 'none';
    document.getElementById("img-movie").style.display = 'none';
    document.getElementById("img-food").style.display = 'none';

};




//function to display last search using localStorage
function start() {

    var movieStorage = localStorage.getItem("movie");
    var beerStorage = localStorage.getItem("beer");
    var queryMovie = "https://omdbapi.com/?apikey=trilogy&t=" + movieStorage;

    $.ajax({
        url: queryMovie,
        method: "GET"
    }).then(function (data) {
        console.log(data);
        var rating = data.Ratings[0].Value;
        // pulls the IMDB rating of the movie
        var rawRating = rating.substring(0, 3);
        var ratingNumber = Math.round(rawRating);
        var title = data.Title;
        console.log(title);
        var actors = data.Actors;
        console.log(actors);
        var poster = data.Poster;
        console.log(poster);
        var plot = data.Plot;

        //display movie
        var movieDiv = $("<div>");
        $(movieDiv).append("<img class='img-responsive img displayImg' src='" + poster + "'>");
        $(movieDiv).append("<div>" + title + "</div>");
        $(movieDiv).append("<div>" + actors + "</div>");
        $(movieDiv).append("<div>" + plot + "</div>");
        $("#movie-view").append(movieDiv);
    })

    var queryBeer = "https://api.punkapi.com/v2/beers?ids=" + beerStorage;
    $.ajax({
        url: queryBeer,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var beer = Math.floor(Math.random() * response.length);
        beerChoice = response[beer];
        console.log(beerChoice);
        beerName = beerChoice.name;
        console.log(beerName);
        beerTag = beerChoice.tagline;
        console.log(beerTag);
        beerDescription = beerChoice.description;
        console.log(beerDescription);
        beerImage = beerChoice.image_url;
        console.log(beerImage);
        beerFood1 = beerChoice.food_pairing[0];
        beerFood2 = beerChoice.food_pairing[1];
        beerFood3 = beerChoice.food_pairing[2];
        console.log(beerFood1);
        console.log(beerFood2);
        console.log(beerFood3);

        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood1,
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
            },
            method: "GET"
        }).then(function (foodPic) {
            console.log(foodPic);
            var foodImage = foodPic.value[0].thumbnailUrl;
            console.log(foodImage);
            var foodDiv = $("<div>");
            $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
            $(foodDiv).append("<div>" + beerFood1 + "</div>");
            $.ajax({
                url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood2,
                beforeSend: function (xhrObj) {
                    // Request headers
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
                },
                method: "GET"
            }).then(function (foodPic) {
                console.log(foodPic);
                var foodImage = foodPic.value[0].thumbnailUrl;
                console.log(foodImage);

                $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
                $(foodDiv).append("<div>" + beerFood2 + "</div>");
                $.ajax({
                    url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?&count=1&offset=0&mkt=en-us&safeSearch=Moderate&q=" + beerFood3,
                    beforeSend: function (xhrObj) {
                        // Request headers
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "922a8834782c497881bebd5df8ba77d1");
                    },
                    method: "GET"
                }).then(function (foodPic) {
                    console.log(foodPic);
                    var foodImage = foodPic.value[0].thumbnailUrl;
                    console.log(foodImage);

                    $(foodDiv).append("<img class='img-responsive img displayImg foodImg' src='" + foodImage + "'>");
                    $(foodDiv).append("<div>" + beerFood3 + "</div>");
                    $("#food-view").append(foodDiv);
                });
            });
        });

        //display beer
        var beerDiv = $("<div>");
        $(beerDiv).append("<img class='img-responsive img displayImg' src='" + beerImage + "'>");
        $(beerDiv).append("<div>" + beerName + "</div>");
        $(beerDiv).append("<div>" + beerTag + "</div>");
        $(beerDiv).append("<div>" + beerDescription + "</div>");
        $("#beer-view").append(beerDiv);
    });

};
start();

$(".clear-form").on('click', function () {
    document.getElementById("img-beer").style.display = 'block';
    document.getElementById("img-movie").style.display = 'block';
    document.getElementById("img-food").style.display = 'block';
    document.getElementById("form-group-beer").style.display = 'none';
    document.getElementById("form-group-movie").style.display = 'none';
    document.getElementById("form-group-food").style.display = 'none';
    $("input[type=text], textarea").val("");
    console.log(this);
    document.getElementById("beer-view").style.display = 'none';
    document.getElementById("movie-view").style.display = 'none';
    document.getElementById("food-view").style.display = 'none';
    document.getElementById("beer").style.display = 'block';
    document.getElementById("movie").style.display = 'block';
    document.getElementById("food").style.display = 'block';

    console.log("hello");
    localStorage.clear();
    $("#movie-view").empty();
    $("#beer-view").empty();
    $("#food-view").empty();
});

function toggleDiv(element) {
    document.getElementById(element).style.display = 'block';
    document.getElementById("img-beer").style.display = 'none';
    document.getElementById("img-movie").style.display = 'none';
    document.getElementById("img-food").style.display = 'none';
}
function reset() {
    document.getElementById("img-beer").style.display = 'block';
    document.getElementById("img-movie").style.display = 'block';
    document.getElementById("img-food").style.display = 'block';
    console.log("reset")
}
$(".clear-form").on('click', function () {
    console.log(this)
});




