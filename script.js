const API_key = 'cf209f923568a598d6bbcecff1f78e5d';

const movie_board = document.getElementsByClassName("movies-grid")[0];
const search_bar = document.getElementById("search-input");
const search_form = document.getElementById("search-form");
const search_button = document.getElementById("search-submit");
const more_movies_btn = document.getElementById("load-more-movies-btn");
const refresh_btn = document.getElementById("close-search-btn");
const showing_header_txt = document.getElementById("showing-header-text");

var global_page_id = 1;
 
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
    movie_board.innerHTML += generateMovieCard(movie_data);

 }

 function processSearch(){
    showing_header_txt.innerHTML = "Results";
    query_string = search_bar.value;
    more_movies_btn.classList.add("closed");
    refresh_btn.classList.remove("closed");
    search_bar.value = "";
    movie_board.innerHTML = "";
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_key}&language=en-US&query=${query_string}`)
        .then(response => response.json())
        .then(data => processList(data));
 }

 function refreshResults(){
    showing_header_txt.innerHTML = "Now Playing";
    more_movies_btn.classList.remove("closed");
    refresh_btn.classList.add("closed");
    global_page_id = 1;
    movie_board.innerHTML = "";
    add_now_playing();
 }

function addEventListeners(){
    search_form.addEventListener("submit", processSearch);
    search_button.addEventListener("click", processSearch);
    more_movies_btn.addEventListener("click", add_now_playing);
    refresh_btn.addEventListener("click", refreshResults);
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
    add_now_playing();
    
  }