const API_key = 'cf209f923568a598d6bbcecff1f78e5d';

const movie_board = document.getElementsByClassName("movies-grid")[0];
const search_bar = document.getElementById("search-input");
const search_form = document.getElementById("search-form");
const more_movies_btn = document.getElementById("load-more-movies-btn");


var global_page_id = 1;

const movies = [
    {
    id: 338953,
    posterPath: "/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg",
    title: "Fantastic Beasts: The Secrets of Dumbledore",
    voteAverage: 6.9
    },
    {
    id: 526896,
    posterPath: "/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
    title: "Morbius",
    voteAverage: 6.4
    },
    {
    id: 752623,
    posterPath: "/neMZH82Stu91d3iqvLdNQfqPPyl.jpg",
    title: "The Lost City",
    voteAverage: 6.8
    },
    {
    id: 675353,
    posterPath: "/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
    title: "Sonic the Hedgehog 2",
    voteAverage: 7.7
    },
    {
    id: 639933,
    posterPath: "/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg",
    title: "The Northman",
    voteAverage: 7.3
    },
    {
    id: 818397,
    posterPath: "/QaNLpq3Wuu2yp5ESsXYcQCOpUk.jpg",
    title: "Memory",
    voteAverage: 7.3
    },
    {
    id: 507086,
    posterPath: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
    title: "Jurassic World Dominion",
    voteAverage: 6.7
    },
    {
    id: 453395,
    posterPath: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    title: "Doctor Strange in the Multiverse of Madness",
    voteAverage: 7.4
    },
    {
    id: 831946,
    posterPath: "/cpWUtkcgRKeauhTyVMjYHxAutp4.jpg",
    title: "Interceptor",
    voteAverage: 6.3
    },
    {
    id: 610150,
    posterPath: "/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg",
    title: "Dragon Ball Super: Super Hero",
    voteAverage: 6.8
    },
    {
    id: 414906,
    posterPath: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    title: "The Batman",
    voteAverage: 7.8
    },
    {
    id: 628900,
    posterPath: "/rJPGPZ5soaG27MK90oKpioSiJE2.jpg",
    title: "The Contractor",
    voteAverage: 6.6
    },
    {
    id: 629542,
    posterPath: "/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg",
    title: "The Bad Guys",
    voteAverage: 7.8
    },
    {
    id: 825808,
    posterPath: "/g2n1lFIFXC0lpG32ysUhFi0Uz61.jpg",
    title: "See for Me",
    voteAverage: 6
    },
    {
    id: 763285,
    posterPath: "/zT5ynZ0UR6HFfWQSRf2uKtqCyWD.jpg",
    title: "Ambulance",
    voteAverage: 7
    },
    {
    id: 648579,
    posterPath: "/bmxCAO0tz79xn40swJAEIJPRnC1.jpg",
    title: "The Unbearable Weight of Massive Talent",
    voteAverage: 7.3
    },
    {
    id: 361743,
    posterPath: "/wxP2Mzv9CdjOK6t4dNnFGqIQl0V.jpg",
    title: "Top Gun: Maverick",
    voteAverage: 8.3
    }
 ];
 
function generateMovieCard(movie_data){
    title = movie_data.original_title;
    vote = movie_data.vote_average;
    var return_string = `<div class="movie-card">
    <span class="movie-title"> ${title} </span>  `;

    if(movie_data.poster_path){
        imgURL = "https://image.tmdb.org/t/p/w500" + movie_data.poster_path;
        return_string +=`<img class="movie-poster" src=${imgURL} alt="A movie poster">`;
    }else{
        return_string +=`<img class="movie-poster" src="redx.png" alt="A red x">`;
    }

    return_string += `<span class="movie-votes"> ${vote}/10</span>
    </div>`;

    return return_string;
}

function addMovieToPanel(movie_data){
    //console.log('movie_data: ', movie_data);
    movie_board.innerHTML += generateMovieCard(movie_data);

 }

 function processSearch(){
    document.getElementsByClassName("showing-header")[0].innerHTML = "Results";
    query_string = search_bar.value;
    console.log(search_bar.value);
    search_bar.value = "";
    movie_board.innerHTML = "";
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_key}&language=en-US&query=${query_string}`)
        .then(response => response.json())
        .then(data => processList(data));
 }

function addEventListeners(){
    search_form.addEventListener("submit", processSearch);
    more_movies_btn.addEventListener("click", add_now_playing);
}

function processList(movie_data_json){
    movie_array = movie_data_json["results"];
    //console.log('movie_array: ', movie_array[0]);
    movie_array.forEach(addMovieToPanel);
}

function add_now_playing(){
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_key}&language=en-US&page=${global_page_id}&include_adult=false`)
        .then(response => response.json())
        .then(data => processList(data));
    global_page_id += 1;
}

window.onload = function () {
    movie_board.innerHTML = "";
    addEventListeners();
    //movies.forEach(addMovieToPanel);

    add_now_playing();
    
    
    // execute your functions here to make sure they run as soon as the page loads
  }