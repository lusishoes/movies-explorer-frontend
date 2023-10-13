import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import CardsLoader from "../CradsLoader/CardsLoader";
import useWindowWidth from "../../hooks/useWindowWidth";
function MoviesCardList({ isLoggedIn, movies, onSavedMovies, onQuery, onDeleteMovie, savedMovies}) {
  const [movieQuantity, setmovieQuantity] = useState(0);
  const windowWidth = useWindowWidth();


  useEffect(() => {
    if (windowWidth > 1150) {
      setmovieQuantity(12);
    } else if (windowWidth > 720) {
      setmovieQuantity(8);
    } else {
      setmovieQuantity(5);
    }
  }, [windowWidth]);


  function handleLoadCrads() {
    if (windowWidth > 1150) {
      setmovieQuantity(movieQuantity + 3);
    } else if (windowWidth > 720) {
      setmovieQuantity(movieQuantity + 2);
    } else {
      setmovieQuantity(movieQuantity + 2);
    }
  }



  return (
    <div className="cards">
      <div className="cards__list">
        {Array.isArray(movies) && movies.slice(0, movieQuantity).map((movie, id) => {
          return (
            <MoviesCard
              movie={movie}
              key={id}
              onSavedMovies={onSavedMovies}
              onDeleteMovie={onDeleteMovie}
              savedMovies={savedMovies}
            />
          );
        })}
      </div>
      {movies.length === 0 && onQuery.length > 0 ? <EmptyComponent /> : ''}
      {movies.length > movieQuantity ? <CardsLoader loadCrads={handleLoadCrads} /> : ''}
    </div>
  );
}

export default MoviesCardList;
