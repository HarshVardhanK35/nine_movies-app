# The_Nine

**_About This Movie Display App_**
This Movie Display App is a web application that allows users to explore popular movies, search for specific movie and TV-Show, and view detailed information about each movie or TV-Show. It utilizes HTML, CSS, and JavaScript for the frontend, along with the Swiper slider for an interactive display of popular movies and TV-Shows and The Movie Database (TMDb) API for fetching movies and TV-Shows data.

## Features

- **_Swiper Slider:_** Engaging and responsive Swiper slider is used to display popular movies on the main page.
- **_Movie Search:_** Users can search for movies using the search functionality.
- **_Movie Detail Page:_** Clicking on a specific movie opens a dedicated movie detail page with comprehensive information.

## Technologies Used

- **_HTML:_** Markup language for structuring the web page.
- **_CSS:_** Stylesheets for styling and layout.
- **_JavaScript:_** Programming language for interactive and dynamic features.
- **_The Movie Database (TMDb) API:_** An external API for fetching movie data.
- **_Swiper-Slider:_** A modern touch slider library for UI for smoothly navigating through popular movies.

## Usage
1. _Clone the repository:_

    ```bash
    git clone https://github.com/your-username/movie-display-app.git
    ```
2. Open the **`index.html`** file in your web browser.
3. Explore popular movies using the **Swiper Slider** and search for specific movies using the search bar.
4. Click on a movie to view detailed information on a dedicated movie detail page.

## API Configuration
To fetch data from The Movie Database (TMDb) API, you need to obtain an API key. Follow these steps:

1. Go to **[TMDb website](https://www.themoviedb.org/)** and sign up for an account.
2. Once logged in, go to the **[API section](https://www.themoviedb.org/settings/api)** in your account settings.
3. Request an **API key** and follow the provided instructions.
4. Copy your API key and replace the **apiKey** in global variable **js/script.js** file

    ```javascript
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
        apiKey: 'Paste the requested key from TMDB',
        apiUrl: "https://api.themoviedb.org/3"
      }
    };
    ```

## Screenshots
Include screenshots of your app to provide visual representation.

## Future Enhancements
- **_User Authentication:_** Implement user accounts to personalize the movie-watching experience.
- **_Rating and Reviews:_** Allow users to rate and write reviews for movies.
- **_Genre Filtering:_** Introduce filtering options based on movie genres.

## Contributing
Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License
This project is licensed under the **[MIT License](LICENSE)**.
