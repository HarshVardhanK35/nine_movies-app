// ----------------------------------- Part - 1 ---------------------------------------
// To need the exact current page we are on.
const global = {
  currentPage: window.location.pathname,
};

// Highlight Active Link:
function highlightActiveLink() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    // console.log(link);
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// ==================================================================================================================================

// ----------------------------------- Part - 2 ---> popular movies ---------------------------------------

// ----------------------------------- 2.0 ---> Function to Display Popular Movies ---------------------------------------
async function displayPopularMovies() {
  const { results } = await fetchDataFromAPI("/movie/popular");
  // console.log(results);

  results.forEach((popMovie) => {
    const div = document.createElement("div"); // created a new div here
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${popMovie.id}">
    ${
      popMovie.poster_path
        ? `<img
        src= "https://image.tmdb.org/t/p/w500${popMovie.poster_path}"
        class= "card-img-top"
        alt= "${popMovie.title}"
      />`
        : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="Movie Title"
      />`
    }
    </a>
    <div class="card-body">
    <h5 class="card-title">${popMovie.title}</h5>
    <p class="card-text">
    <small class="text-muted">Release: ${popMovie.release_date}</small>
    </p>
    </div>
    `;
    const popularMoviesDiv = document.getElementById("popular-movies"); // got div from the document
    popularMoviesDiv.appendChild(div);
  });
}

// ----------------------------------- 2.1 ---> Fetching Data ---------------------------------------
async function fetchDataFromAPI(endpoint) {
  const API_KEY = "456cdce8cd95b97082fccc5bcfe44b07";
  const API_URL = "https://api.themoviedb.org/3";

  showSpinner();

  const res = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();

  hideSpinner();

  return data;
}

/*
----------------------------------- NOTE for 2.0:
---> This gives us an object where there is an array of objects, in which we have the details of each movie

----------------------------------- NOTE for 2.1:
---> Getting the popular movies --- make the fetch request to "themoviedb.org"
to get the popular movies list to display on the index-page

--->Register your key at https://www.themoviedb.org/settings/api

----------------------------------- !!! WARNING !!!
---> Use this for development or for very small projects. you should store your key and make requests from a server.

----------------------------------- WHY? Below is the Explanation...
---> API_KEY: If we're developing production application,
we must have our own backend server and we make a req and that is where we keep
this key, so that normal users can not get the access to the key...
---> So, we keep this private key in a .env file on server and we must not put
that in our repository.
*/

// ==================================================================================================================================
// ----------------------------------- Part - 3 ---------------------------------------
// ----------------------------------- 3.0 ---> function to show the spinner ---------------------------------------
const showSpinner = () => {
  const spinner = document.querySelector(".spinner");
  spinner.classList.add("show");
};
const hideSpinner = () => {
  const spinner = document.querySelector(".spinner");
  spinner.classList.remove("show");
};

// ----------------------------------- 3.1 ---> Function to display popular TV Shows---------------------------------------
async function displayPopularShows() {
  const { results } = await fetchDataFromAPI("/tv/popular");
  console.log(results);

  results.forEach((popShows) => {
    const div = document.createElement("div"); // created a new div here
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${popShows.id}">
    ${
      popShows.poster_path
        ? `<img
        src= "https://image.tmdb.org/t/p/w500${popShows.poster_path}"
        class= "card-img-top"
        alt= "${popShows.original_name}"
      />`
        : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt=${popShows.original_name}
      />`
    }
    </a>
    <div class="card-body">
    <h5 class="card-title">${popShows.original_name}</h5>
    <p class="card-text">
    <small class="text-muted">Release: ${popShows.first_air_date}</small>
    </p>
    </div>
    `;
    const popularShowsDiv = document.getElementById("popular-shows"); // Got div from the document
    popularShowsDiv.appendChild(div);
  });
}
/*
----------------------------------- NOTE for 3.0:
In fetch function right before we fetch data we toggle the spinner
*/

// ==================================================================================================================================
// ----------------------------------- Part - 4 ---------------------------------------
// ----------------------------------- 4.0 ---> function for movie details page ---------------------------------------
const movieDetails = async () => {
  const movieId = window.location.search.split("=")[1];

  const movie = await fetchDataFromAPI(`movie/${movieId}`);
  // console.log(movie)

  // Overlay for BG Image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML =
  `
  <div class="details-top">
    <div>
    ${
      movie.poster_path
        ? `<img
        src= "https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class= "card-img-top"
        alt= "${movie.original_name}"
      />`
        : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
      />`
    }

    </div>
      <div>
        <h2>${movie.title}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${movie.vote_average.toFixed(1)}
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>${movie.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${movie.genres.map
            ((item)=>{
              return `<li>${item.name}</li>`
            }).join('')
          }
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>
      <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Budget:</span> $${addComasToNumber(movie.budget)}</li>
          <li><span class="text-secondary">Revenue:</span> $${addComasToNumber(movie.revenue)}</li>
          <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
          <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
      <div class="list-group">
      ${movie.production_companies
        .map((item)=>{
          return (`<span>${item.name}</span>`)
        }).join(', ')
      }
      </div>
  </div>
  `;
  document.getElementById('movie-details').appendChild(div)
};

// ----------------------------------- 4.0 ---> function to add commas at place values of a number ---------------------------------------\
function addComasToNumber(number){
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ==================================================================================================================================
// ----------------------------------- Part - 5 ---------------------------------------
// ----------------------------------- 5.0 --->  ---------------------------------------
const displayBackgroundImage = (type, backgroundPath) => {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
  overlayDiv.style.backgroundSize = 'cover'
  overlayDiv.style.backgroundPath = 'no-repeat'
  overlayDiv.style.height = '100vh'
  overlayDiv.style.width = '100vw'
  overlayDiv.style.position = 'absolute'
  overlayDiv.style.top = '0'
  overlayDiv.style.left = '0'
  overlayDiv.style.zIndex = '-1'
  overlayDiv.style.opacity = '0.2'

  if(type === 'movie'){
    document.querySelector('#movie-details').appendChild(overlayDiv)
  }
  else{
    document.querySelector('#show-details').appendChild(overlayDiv)
  }
}


// ==================================================================================================================================
// ----------------------------------- A Default Init Function---------------------------------------
// Initialize the Application --- Custom Router
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      movieDetails();
      break;
    case "/tv-details.html":
      console.log("TV_Details-Page");
      break;
    case "/search.html":
      console.log("Search-Page");
      break;
  }
  highlightActiveLink();
}
document.addEventListener("DOMContentLoaded", init);
/*
  About - Init:
  1. we just put the functions here which belong to that respective page.
  2. init runs on every page and runs highlightActiveLink function.
*/
