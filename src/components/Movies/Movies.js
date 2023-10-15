import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import * as moviesApi from "../../utils/MoviesApi";

function Movies({ isLoggedIn, onSavedMovies, onDeleteMovie, savedMovies }) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchedFilteredMovies, setSearchedFilteredMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function movieDuratationCounter(movies) {
    return movies.filter((movie) => movie.duration <= 40);
  }

  function filterMovies(movies, query) {
    return movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase())
    );
  }

  function handleMoviesFilter(movies, query, isShortMovie) {
    const moviesList = filterMovies(movies, query);
    setSearchedMovies(moviesList);
    setSearchedFilteredMovies(
      isShortMovie ? movieDuratationCounter(moviesList) : moviesList
    );
    localStorage.setItem("movies", JSON.stringify(moviesList));
  }

  function handleShortMovies() {
    setIsShortMovie(!isShortMovie);
    if (!isShortMovie) {
      setSearchedFilteredMovies(movieDuratationCounter(searchedMovies));
    } else {
      setSearchedFilteredMovies(searchedMovies);
    }
    localStorage.setItem("isShortMovie", !isShortMovie);
  }

  // поиск фильмов
  function findMovie(query) {
    setQuery(query);
    setIsLoading(true);
    localStorage.setItem("query", query);
    localStorage.setItem("isShortMovie", isShortMovie);
    moviesApi
      .getMovies()
      .then((res) => {
        handleMoviesFilter(res, query, isShortMovie);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setSearchedMovies(movies);
      if (localStorage.getItem("isShortMovie") === "true") {
        setSearchedFilteredMovies(movieDuratationCounter(movies));
      } else {
        setSearchedFilteredMovies(movies);
      }
    }
    if (localStorage.getItem("isShortMovie") === "true") {
      setIsShortMovie(true);
    } else {
      setIsShortMovie(false);
    }
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        onFindMovie={findMovie}
        isShortMovie={isShortMovie}
        onStartFilter={handleShortMovies}
      />
      <MoviesCardList
        isLoggedIn={isLoggedIn}
        movies={searchedFilteredMovies}
        onSavedMovies={onSavedMovies}
        onQuery={query}
        onDeleteMovie={onDeleteMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
      />
      <Footer />
    </>
  );
}

export default Movies;
