import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useWindowWidth from "../../hooks/useWindowWidth";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import CardsLoader from "../CradsLoader/CardsLoader";

function SavedMovies({ isLoggedIn, savedMovies, onDeleteMovie }) {
  const [movieQuantity, setmovieQuantity] = useState(0);
  const windowWidth = useWindowWidth();
  const [isShortMovie, setIsShortMovie] = useState(false); // +
  const [searchedFilteredMovies, setSearchedFilteredMovies] = useState([]); // если был поиск отфильтрованные фильмы
  const [moviesQuery, setMoviesQuery] = useState("");

  function filterMovies(savedMovies, query) {
    return savedMovies.filter(
      (savedMovie) =>
        savedMovie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        savedMovie.nameEN.toLowerCase().includes(query.toLowerCase())
    );
  }
  // фильтруем по длине
  function movieDuratationCounter(movies) {
    return movies.filter((movie) => movie.duration <= 40);
  }

  function findMovie(query) {
    setMoviesQuery(query);
  }

  function handleShortMovie() {
    setIsShortMovie(!isShortMovie);
  }

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, moviesQuery); // отфильтрованный массив содержащий moviesQuery
    setSearchedFilteredMovies(
      // если короткие то фильтрация по длине с содержанием moviesQuery иначе просто moviesQuery
      isShortMovie ? movieDuratationCounter(moviesList) : moviesList
    );
  }, [savedMovies, isShortMovie, moviesQuery]);

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
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="saved_movies">
        {/* onFindMovie - сам поисковой запрос, isShortMovie если checked то true, при изменении чекбокса handleShortMovies*/}
        <SearchForm
          onFindMovie={findMovie} // тут идет query
          isShortMovie={isShortMovie} // тут идет переключатель коротких фильмов
          onStartFilter={handleShortMovie} 
        />
        <div className="saved_movies__list" onClick={() => console.log(searchedFilteredMovies.length )}>
            {searchedFilteredMovies.length === 0 && moviesQuery.length === 0 ? Array.isArray(savedMovies) &&
              savedMovies.slice(0, movieQuantity).map((movie, id) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={id}
                    onDeleteMovie={onDeleteMovie}
                  />
                );
              }) : ""}
              {/* тут если не было поиска */}
              {searchedFilteredMovies.length > 0 ? Array.isArray(searchedFilteredMovies) &&
              searchedFilteredMovies.slice(0, movieQuantity).map((movie, id) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={id}
                    onDeleteMovie={onDeleteMovie}
                    savedMovies={savedMovies}
                  />
                );
              }) : ''}
                {/* тут если ничего не найдено*/}
               
              
        </div>
      </section>
      {searchedFilteredMovies.length === 0 && moviesQuery.length > 0 ? <EmptyComponent /> : ''}
      {searchedFilteredMovies.length > movieQuantity ? <CardsLoader loadCrads={handleLoadCrads} /> : ''}
      <Footer />
    </>
  );
}

export default SavedMovies;
