// =================================== Part - 1 ===================================
// To need the exact current page we are on.

/*
----------------------------------- NOTE:
---> Getting the popular movies --- make the fetch request to "themoviedb.org"
to get the popular movies list to display on the index-page

---> Register your key at https://www.themoviedb.org/settings/api

----------------------------------- !!! WARNING !!!
---> Use this for development or for very small projects. you should store your key and make requests from a server.

----------------------------------- WHY? Below is the Explanation...
---> API_KEY: If we're developing production application,
we must have our own backend server and we make a req and that is where we keep
this key, so that normal users can not get the access to the key...
---> So, we keep this private key in a .env file on server and we must not put
that in our repository.
*/
const global = {
  currentPage: window.location.pathname,
  search:{
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0
  },
  api:{
    apiKey: '456cdce8cd95b97082fccc5bcfe44b07',
    apiUrl: "https://api.themoviedb.org/3"
  }
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

// =================================== Part - 2 ---> popular movies ===================================
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
        alt="${popMovie.title}"
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
  const API_KEY = global.api.apiKey
  const API_URL = global.api.apiUrl

  showSpinner();

  const res = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();

  hideSpinner();

  return data;
}

/*
----------------------------------- NOTE:
---> This gives us an object where there is an array of objects, in which we have the details of each movie
*/

// =================================== Part - 3 ===================================
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
  // console.log(results);

  results.forEach((popShows) => {
    const div = document.createElement("div"); // created a new div here
    div.classList.add("card");
    div.innerHTML = `
    <a href="tv-details.html?id=${popShows.id}">
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
----------------------------------- NOTE:
In fetch function right before we fetch data we toggle the spinner
*/

// =================================== Part - 4 ===================================
// ----------------------------------- 4.0 ---> function for movie details page ---------------------------------------
const movieDetails = async () => {
  const movieId = window.location.search.split("=")[1];

  const movie = await fetchDataFromAPI(`movie/${movieId}`);
  // console.log(movie)

  // Overlay for BG Image
  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
    <div>
    ${
      movie.poster_path
        ? `<img
        src= "https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class= "card-img-top"
        alt= "${movie.title}"
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
          ${movie.genres
            .map((item) => {
              return `<li>${item.name}</li>`;
            })
            .join("")
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
        .map((item) => {
          return `<span>${item.name}</span>`;
        })
        .join(", ")
      }
      </div>
  </div>
  `;
  document.getElementById("movie-details").appendChild(div);
};

// ----------------------------------- 4.0 ---> function to add commas at place values of a number ---------------------------------------\
function addComasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// =================================== Part - 5 ===================================
// ----------------------------------- 5.0 ---> Display background image for every movie details  ---------------------------------------
const displayBackgroundImage = (type, backgroundPath) => {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPath = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.2";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
};

// =================================== Part - 6 ===================================
// ----------------------------------- 6.0 ---> function for movie details page ---------------------------------------
const tvDetails = async () => {
  const tvId = window.location.search.split("=")[1];

  const tvShows = await fetchDataFromAPI(`tv/${tvId}`);
  // console.log(tvShows);

  // Overlay for BG Image
  displayBackgroundImage("tv", tvShows.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
    <div>
    ${
      tvShows.poster_path
        ? `<img
        src= "https://image.tmdb.org/t/p/w500${tvShows.poster_path}"
        class= "card-img-top"
        alt= "${tvShows.name}"
      />`
        : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${tvShows.name}"
      />`
    }

    </div>
      <div>
        <h2>${tvShows.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${tvShows.vote_average.toFixed(1)}
        </p>
        <p class="text-muted">Last Air Date: ${tvShows.last_air_date}</p>
        <p>${tvShows.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${tvShows.genres
            .map((item) => {
              return `<li>${item.name}</li>`;
            })
            .join("")}
        </ul>
        <a href="${
          tvShows.homepage
        }" target="_blank" class="btn">Visit TV Show Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Show Info</h2>
      <ul>
        <li><span class="text-secondary">Number Of Episodes:</span> ${tvShows.number_of_episodes}</li>
        <li>
          <span class="text-secondary">
            Last Episode To Air:
          </span>
           ${tvShows.last_episode_to_air.name}
        </li>
        <li>
          <span class="text-secondary">Status:</span>
           ${tvShows.status}
        </li>
      </ul>
      <h4>Production Companies</h4>
    <div class="list-group">
    ${tvShows.production_companies
      .map((item) => {
        return `<span>${item.name}</span>`;
      })
      .join(", ")
    }
    </div>
  </div>
  `;
  document.getElementById("show-details").appendChild(div);
};

// =================================== Part - 7 ===================================
// ----------------------------------- 7.0 ---> Sweeper.JS --- Display movies on slider ---------------------------------------
async function displaySlider (){
  const { results } = await fetchDataFromAPI('movie/now_playing')
  // console.log("slider", results)

  results.forEach((movie)=>{
    const div = document.createElement('div')
    div.classList.add('swiper-slide');

    div.innerHTML =
    `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"/>
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i>${movie.vote_average.toFixed(1)}/ 10
      </h4>
    `
    const movieSwiper = document.querySelector('.swiper-wrapper')
    movieSwiper.appendChild(div);

    initSwiper()
  })
}

async function showDisplaySlider (){
  const { results } = await fetchDataFromAPI('tv/airing_today')
  // console.log(results);

  results.forEach((show)=>{
    const div = document.createElement('div')
    div.classList.add('swiper-slide');

    div.innerHTML =
    `
      <a href="tv-details.html?id=${show.id}">
        <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}"/>
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i>${show.vote_average.toFixed(1)}/ 10
      </h4>
    `
    const showSwiper = document.querySelector('.swiper-wrapper')
    showSwiper.appendChild(div);

    initSwiper()
  })
}

function initSwiper(){
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay:{
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
  })
}

// =================================== Part - 7 ===================================
// ----------------------------------- 7.0 ---> Search Functionality ---------------------------------------
const search = async() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString)

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if(global.search.term !== '' && global.search.term !== null){

// =================================== Part - 8 ===================================
// ----------------------------------- 8.0 ---> Search Functionality ---------------------------------------

    const {results,  total_pages,  page, total_results}  = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if(results.length === 0){
      showAlert('No Results Found')
      return;
    }
    else{
      displaySearchResults(results);
      document.querySelector('#search-term').value = ''
    }

  }
  else{
    showAlert('Please Enter a Search Term')
  }
}

function displaySearchResults(results){
  // Clear previous results
  document.querySelector('#search-results').innerHTML = ''
  document.querySelector('#search-results-heading').innerHTML = ''
  document.querySelector('#pagination').innerHTML = ''

  results.forEach((result) => {
    const div = document.createElement("div"); // created a new div here
    div.classList.add("card");
    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
    ${
      result.poster_path
        ? `<img
        src= "https://image.tmdb.org/t/p/w500${result.poster_path}"
        class= "card-img-top"
        alt= "${global.search.type === 'movie' ? result.title : result.name}"
      />`
        : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt= "${global.search.type === 'movie' ? result.title : result.name}"
      />`
    }
    </a>
    <div class="card-body">
      <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
      </p>
    </div>
    `;

    document.querySelector('#search-results-heading').innerHTML =
    `
    <h2>${results.length} of ${global.search.totalResults} for ${global.search.term}</h2>
    `

    const searchResultsDiv = document.querySelector("#search-results"); // got div from the document
    searchResultsDiv.appendChild(div);
// =================================== Part - 8 ends... ===================================
  });
// =================================== Part - 9 starts... ===================================
  displayPagination()
}

// ----------------------------------- 7.1 ---> Make Request From Search ---------------------------------------
async function searchAPIData() {
  const API_KEY = global.api.apiKey
  const API_URL = global.api.apiUrl

  showSpinner();

  const res = await fetch(
    `${API_URL}/search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await res.json();

  hideSpinner();

  return data;
}

// ----------------------------------- 7.2 ---> Show Error Alert ---------------------------------------
function showAlert(message, className = 'error'){
  const alertEl = document.createElement('div')
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message))

  document.querySelector('#alert').appendChild(alertEl)

  setTimeout(()=>{
    alertEl.remove()
  }, 3000)
}

// =================================== Part - 9 starts... ===================================
function displayPagination(){
  const div = document.createElement('div')
  div.classList.add('pagination');

  div.innerHTML =
  `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `

  document.querySelector('#pagination').appendChild(div);

  // Disable prev button if on 1st page
  if(global.search.page === 1){
    document.querySelector('#prev').disabled = true;
  }

  // Disable prev button if on last page
  if(global.search.page === global.search.totalPages){
    document.querySelector('#next').disabled = true;
  }

  /*
  ----------------------------------- Next Page Functionality --->
  ---> add an event listener, to change the page
  ---> to change the page we have to make another req to API.. with the particular page we want to get
  */

  document.querySelector('#next') .addEventListener('click', async () =>
  {
    global.search.page++
    const {results, total_pages} = await searchAPIData()
    displaySearchResults(results)
  })

  // ----------------------------------- Previous Page Functionality --->
  document.querySelector('#prev') .addEventListener('click', async () =>
  {
    global.search.page--
    const {results, total_pages} = await searchAPIData()
    displaySearchResults(results)
  })

}

// ==================================================================================================================================
// ----------------------------------- A Default Init Function---------------------------------------
// Initialize the Application --- Custom Router
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider()
      displayPopularMovies();
      break;
    case "/tv-shows":
      showDisplaySlider();
      displayPopularShows();
      break;
    case "/movie-details.html":
      movieDetails();
      break;
    case "/tv-details.html":
      tvDetails();
      break;
    case "/search.html":
      search()
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
