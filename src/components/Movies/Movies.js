import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import * as moviesApi from "../../utils/MoviesApi";
import useWindowWidth from "../../hooks/useWindowWidth";
import { movieDuratationCounter, filterMoviesByQuery } from "../../utils/utils";

function Movies({ isLoggedIn, onSavedMovies, onDeleteMovie, savedMovies }) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [searchedFilteredMovies, setSearchedFilteredMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movieQuantity, setmovieQuantity] = useState(0);
  const windowWidth = useWindowWidth();
  // при монтировании устанавливаю все необходимое
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
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

    if (localStorage.getItem("query")) {
      const query = localStorage.getItem("query");
      setQuery(query);
    }

    if (localStorage.getItem("foundMovies")) {
      setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
    }
  }, []);

  function handleMoviesFilter(movies, query, isShortMovie) {
    const moviesList = filterMoviesByQuery(movies, query);
    setSearchedFilteredMovies(
      isShortMovie ? movieDuratationCounter(moviesList) : moviesList
    );
    localStorage.setItem("movies", JSON.stringify(moviesList));
  }

  function handleShortMovies() {
    setIsShortMovie(!isShortMovie);
    handleMoviesFilter(foundMovies, query, !isShortMovie);
    localStorage.setItem("isShortMovie", !isShortMovie);
    localStorage.setItem("query", query);
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
        setFoundMovies(res);
        localStorage.setItem("foundMovies", JSON.stringify(res));
        handleMoviesFilter(res, query, isShortMovie);

        if (windowWidth > 1280) {
          setmovieQuantity(12);
        } else if (windowWidth > 768) {
          setmovieQuantity(8);
        } else {
          setmovieQuantity(5);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        query={query}
        setQuery={setQuery}
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
        movieQuantity={movieQuantity}
        setmovieQuantity={setmovieQuantity}
      />
      <Footer />
    </>
  );
}

export default Movies;
