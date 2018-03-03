

$("#add").on("click", function () {


    event.preventDefault();

    $("#movie-input").empty();
    $("#beer-input").empty();
    $("#food-input").empty();


    var movie = $("#input").val().trim();


    var queryMovie = "https://omdbapi.com/?apikey=trilogy&t=" + movie;

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

        var movieDiv = $("<div>");
        $(movieDiv).append("<img src='" + poster + "'>");
        $(movieDiv).append("<div>" + title + "</div>");
        $(movieDiv).append("<div>" + actors + "</div>");
        $(movieDiv).append("<div>" + plot + "</div>");
        $("#movie-input").append(movieDiv);



        console.log(ratingNumber);
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

            var beerDiv = $("<div>");

            $(beerDiv).append("<img src='" + beerImage + "'>");
            $(beerDiv).append("<div>" + beerName + "</div>");
            $(beerDiv).append("<div>" + beerTag + "</div>");
            $(beerDiv).append("<div>" + beerDescription + "</div>");
            $("#beer-input").append(beerDiv);

            var foodDiv = $("<div>");
            $(foodDiv).append("<div>" + beerFood1 + "</div>");
            $(foodDiv).append("<div>" + beerFood2 + "</div>");
            $(foodDiv).append("<div>" + beerFood3 + "</div>");
            $("#food-input").append(foodDiv);



        })


    })

})



$("#add2").on("click", function () {

    event.preventDefault();

    $("#movie-input").empty();
    $("#beer-input").empty();
    $("#food-input").empty();

    var beer = $("#input2").val().trim();

    var queryBeer = "https://api.punkapi.com/v2/beers?beer_name=" + beer;

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
        brewYear = beerChoice.first_brewed;
        console.log(brewYear);
        year = brewYear.substring(3, 7);
        console.log(year);

        var beerDiv = $("<div>");

        $(beerDiv).append("<img src='" + beerImage + "'>");
        $(beerDiv).append("<div>" + beerName + "</div>");
        $(beerDiv).append("<div>" + beerTag + "</div>");
        $(beerDiv).append("<div>" + beerDescription + "</div>");
        $("#beer-input").append(beerDiv);

        var foodDiv = $("<div>");
        $(foodDiv).append("<div>" + beerFood1 + "</div>");
        $(foodDiv).append("<div>" + beerFood2 + "</div>");
        $(foodDiv).append("<div>" + beerFood3 + "</div>");
        $("#food-input").append(foodDiv);

        var queryMovieDB = "https://api.themoviedb.org/3/discover/movie?api_key=65e7259520279f0add439f24bca07ecb&sort_by=popularity.desc&primary_release_year=" + year

        $.ajax({
            url: queryMovieDB,
            method: "GET"
        }).then(function (movData) {
            console.log(movData);
            var randomNum = Math.floor(Math.random() * 15);
            var movName = movData.results[randomNum].title;
            console.log(movName);

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

                var movieDiv = $("<div>");
                $(movieDiv).append("<img src='" + poster + "'>");
                $(movieDiv).append("<div>" + title + "</div>");
                $(movieDiv).append("<div>" + actors + "</div>");
                $(movieDiv).append("<div>" + plot + "</div>");
                $("#movie-input").append(movieDiv);

            })


        })





    })

});

$("#add3").on("click", function () {

    event.preventDefault();

    $("#movie-input").empty();
    $("#beer-input").empty();
    $("#food-input").empty();

    var food = $("#input3").val().trim();

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
        year = brewYear.substring(3, 7);
        console.log(year);

        var beerDiv = $("<div>");

        $(beerDiv).append("<img src='" + beerImage + "'>");
        $(beerDiv).append("<div>" + beerName + "</div>");
        $(beerDiv).append("<div>" + beerTag + "</div>");
        $(beerDiv).append("<div>" + beerDescription + "</div>");
        $("#beer-input").append(beerDiv);

        var foodDiv = $("<div>");
        $(foodDiv).append("<div>" + beerFood1 + "</div>");
        $(foodDiv).append("<div>" + beerFood2 + "</div>");
        $(foodDiv).append("<div>" + beerFood3 + "</div>");
        $("#food-input").append(foodDiv);

        var queryMovieDB = "https://api.themoviedb.org/3/discover/movie?api_key=65e7259520279f0add439f24bca07ecb&sort_by=popularity.desc&primary_release_year=" + year

        $.ajax({
            url: queryMovieDB,
            method: "GET"
        }).then(function (movData) {
            console.log(movData);
            var randomNum = Math.floor(Math.random() * 15);
            var movName = movData.results[randomNum].title;
            console.log(movName);

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

                var movieDiv = $("<div>");
                $(movieDiv).append("<img src='" + poster + "'>");
                $(movieDiv).append("<div>" + title + "</div>");
                $(movieDiv).append("<div>" + actors + "</div>");
                $(movieDiv).append("<div>" + plot + "</div>");
                $("#movie-input").append(movieDiv);

            })


        })





    })

});




