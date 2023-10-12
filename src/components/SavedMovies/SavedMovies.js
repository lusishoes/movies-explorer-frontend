import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useWindowWidth from "../../hooks/useWindowWidth";
function SavedMovies({ isLoggedIn, savedMovies, onDeleteMovie }) {
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

  return (
    <>
    <Header isLoggedIn={isLoggedIn}/>
    <section className="saved_movies">
      <SearchForm />
      <div className="saved_movies__list"  >
      {Array.isArray(savedMovies) && savedMovies.slice(0, movieQuantity).map((movie, id) => {
          return (
            <MoviesCard
              movie={movie}
              key={id}
              onDeleteMovie={onDeleteMovie}
            />
          );
        })}
      </div>
    </section>
    <Footer/>
    </>
  );
}

export default SavedMovies;
