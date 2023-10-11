import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import * as moviesApi from '../../utils/MoviesApi';

function Movies({ isLoggedIn  }) {
  const [isShortMovie, setIsShortMovie] = useState([]);
  const [movies, setMovies] = useState({});

  useEffect(() => {
    if(isLoggedIn) {
      moviesApi.getMovies()
        .then((res) => {
          setMovies(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLoggedIn])


  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <SearchForm />
      <MoviesCardList isLoggedIn={isLoggedIn} movies={movies}/>
      <Footer />
    </>
  );
}

export default Movies;
