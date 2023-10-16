import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import CardsLoader from "../CradsLoader/CardsLoader";
import useWindowWidth from "../../hooks/useWindowWidth";
import Preloader from "../Preloader/Preloader";
function MoviesCardList({
  movies,
  onSavedMovies,
  onQuery,
  onDeleteMovie,
  savedMovies,
  isLoading,
}) {
  const [movieQuantity, setmovieQuantity] = useState(0);
  const windowWidth = useWindowWidth();
// ADD:
  useEffect(() => {
    if (windowWidth > 1280) {
      setmovieQuantity(12);
    } else if (windowWidth > 768) {
      setmovieQuantity(8);
    } else {
      setmovieQuantity(5);
    }
  }, [windowWidth]);
// ADD:
  function handleLoadCrads() {
    if (windowWidth > 1280) {
      setmovieQuantity(movieQuantity + 3);
    } else if (windowWidth > 768) {
      setmovieQuantity(movieQuantity + 2);
    } else {
      setmovieQuantity(movieQuantity + 2);
    }
  }

  return (
    <div className="cards">
      <div className="cards__list">
        {isLoading === false &&
          Array.isArray(movies) &&
          movies.slice(0, movieQuantity).map((movie, id) => {
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
      {isLoading === true ? <Preloader /> : ""}
      {movies.length === 0 && onQuery.length > 0 && isLoading === false ? (
        <EmptyComponent />
      ) : (
        ""
      )}
      {movies.length > movieQuantity && isLoading === false ? (
        <CardsLoader loadCrads={handleLoadCrads} />
      ) : (
        ""
      )}
    </div>
  );
}

export default MoviesCardList;
