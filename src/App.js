import React, { useState, useEffect } from "react";
import "./styles.css";
import Movie from "./Movie";
import { Container, Row, Col } from "reactstrap";
import Logo from './logo.svg'

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");

  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  useEffect(() => {
    async function fetchMovies(queryValue) {
      if (!queryValue) {
        return;
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=1&include_adult=false&query=${query}`
      );
      const data = await response.json();
      const moviesWithOnlyPosters =
        data.results &&
        data.results.filter(item => (item.poster_path != null ? item : null));
      setMovies(moviesWithOnlyPosters);
    }

    async function fetchGenres(genreValue) {
      if (!genreValue) {
        return;
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`
      );
      const data = await response.json();
      console.log(data);
      const moviesWithOnlyPosters =
        data.results &&
        data.results.filter(item => (item.poster_path != null ? item : null));
      setMovies(moviesWithOnlyPosters);
    }
    fetchMovies(query);
    fetchGenres(genre);
  }, [query, genre, API_KEY]);

  function updateSearch(e) {
    setSearch(e.target.value);
  }

  function getQuery(e) {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  function handleGenreChange(e) {
    setGenre(e.target.value);
  }

  return (
    <div className="App">
      <h1 className="app-title">What 2 Watch</h1>
      <form onSubmit={getQuery}>
        <Container fluid={true}>
          <Row>
            <Col xs="12" sm="6" className="search-bar-col">
              <input
                className="search-bar"
                type="text"
                placeholder="Search Title..."
                value={search}
                onChange={updateSearch}
              />

              <button className="search-button" type="submit">
                Search
              </button>
            </Col>

            <Col xs="12" sm="6" className="genre-dropdown-col">
              <select
                className="genre-dropdown"
                onChange={handleGenreChange}
                value={genre}
              >
                <option hidden>Find by Genre</option>
                <option value="28">Action</option>
                <option value="12">Adventure</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="99">Documentary</option>
                <option value="14">Fantasy</option>
                <option value="36">History</option>
                <option value="27">Horror</option>
                <option value="9648">Mystery</option>
                <option value="10749">Romance</option>
                <option value="878">Science Fiction</option>
                <option value="53">Thriller</option>
                <option value="10752">War</option>
                <option value="37">Western</option>
              </select>
            </Col>
          </Row>
        </Container>
      </form>

      <Row>
        {movies &&
          movies.map(item => (
            <Col xs="12" md="6" lg="4" key={item.id}>
              <Movie
                key={item.id}
                title={item.title}
                year={item.release_date}
                image={item.poster_path}
                description={item.overview}
              />
            </Col>
          ))}
      </Row>

      <footer>
        <p> Powered by <a href="https://www.themoviedb.org/?language=en-US" target="_blank" rel="noopener noreferrer"> <img src={Logo} alt="Powered By The Movie Database" /></a></p>
      </footer>
    </div>
  );
}

export default App;
