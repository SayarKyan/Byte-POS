// Define the API URL and key for The Movie Database API (TMDb)
const API_KEY = 'your_api_key';  // Replace with your own API key from TMDb
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// Get DOM elements
const searchInput = document.getElementById("search");
const movieContainer = document.getElementById("movies");
const movieDetails = document.getElementById("movie-details");
const movieInfo = document.getElementById("movie-info");
const closeBtn = document.querySelector(".close");

// Event listener for search input
searchInput.addEventListener('keyup', function(event) {
  const query = event.target.value;
  if (query) {
    searchMovies(query);
  } else {
    movieContainer.innerHTML = ''; // Clear movies if search is empty
  }
});

// Function to search for movies from the API
async function searchMovies(query) {
  const response = await fetch(API_URL + query);
  const data = await response.json();
  displayMovies(data.results);
}

// Function to display a list of movies
function displayMovies(movies) {
  movieContainer.innerHTML = '';
  if (movies.length === 0) {
    movieContainer.innerHTML = '<p>No movies found!</p>';
  }
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    movieElement.addEventListener('click', () => showMovieDetails(movie.id));
    movieContainer.appendChild(movieElement);
  });
}

// Function to show detailed information about a movie
async function showMovieDetails(movieId) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
  const data = await response.json();
  displayMovieDetails(data);
}

// Function to display movie details
function displayMovieDetails(movie) {
  movieDetails.style.display = 'block';
  movieInfo.innerHTML = `
    <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
    <div class="info">
      <h3>${movie.title}</h3>
      <p><strong>Release Date:</strong> ${movie.release_date}</p>
      <p><strong>Overview:</strong> ${movie.overview}</p>
      <p><strong>Rating:</strong> ${movie.vote_average}</p>
    </div>
  `;
}

// Close movie details section
closeBtn.addEventListener('click', () => {
  movieDetails.style.display = 'none';
});
