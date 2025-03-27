import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "../styles/styles.css";
import Movie from "../components/Movie.tsx";
import { Container, Row, Col } from "reactstrap";
//@ts-ignore
import Logo from "../assets/logo.svg";
import { MovieData } from "../types/types.ts";
import { onlyResultsWithPosters } from "../utils/filterShowsMovies.ts";

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [genre, setGenre] = useState("");
  const [activeBtn, setActiveBtn] = useState<"movies" | "tvShows">("movies");
  const [category, setCategory] = useState<"movie" | "tv">("movie");

  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  useEffect(() => {
    const fetchMovies = async (queryValue: string) => {
      if (!queryValue) {
        return;
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${category}?api_key=${API_KEY}&page=1&include_adult=false&query=${query}`
      );
      const data = await response.json();
      const returnedMoviesShows = onlyResultsWithPosters(data?.results);
      setMovies(returnedMoviesShows);
    };

    const fetchGenres = async (genreValue: string) => {
      if (!genreValue) {
        return;
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${category}?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`
      );
      const data = await response.json();
      const returnedMoviesShows = onlyResultsWithPosters(data?.results);
      setMovies(returnedMoviesShows);
    };
    fetchMovies(query);
    fetchGenres(genre);
  }, [query, genre, API_KEY, category]);

  const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setGenre("");
    setQuery("");
  };

  const submitQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const handleBtnClick = (buttonName: "movies" | "tvShows") => {
    setActiveBtn(buttonName);
    buttonName === "movies" ? setCategory("movie") : setCategory("tv");
  };

  return (
    <div className="App">
      <h1 className="app-title">What 2 Watch</h1>
      <div className="movie-tv-shows-btns">
        <button
          type="button"
          className={`btn ${
            activeBtn === "movies" ? "btn-danger" : "btn-secondary"
          }`}
          onClick={() => handleBtnClick("movies")}
        >
          Movies
        </button>
        <button
          type="button"
          className={`btn ${
            activeBtn === "tvShows" ? "btn-danger" : "btn-secondary"
          } ms-3`}
          onClick={() => handleBtnClick("tvShows")}
        >
          Tv Shows
        </button>
      </div>
      <form onSubmit={submitQuery}>
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
          movies.map((item) => (
            <Col xs="12" md="6" lg="4" key={item.id}>
              <Movie
                title={category === "movie" ? item.title : item.name}
                year={
                  category === "movie" ? item.release_date : item.first_air_date
                }
                image={item.poster_path}
                description={item.overview}
              />
            </Col>
          ))}
      </Row>

      <footer>
        <p>
          {" "}
          Powered by{" "}
          <a
            href="https://www.themoviedb.org/?language=en-US"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <img src={Logo} alt="Powered By The Movie Database" />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
