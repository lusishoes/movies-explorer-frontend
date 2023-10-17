import React, { useEffect, useState } from "react";
import "./MoviesCard.css";
import saveimg from "../../images/cardiconimg.svg";
import { useLocation } from "react-router-dom";
import deleteimg from "../../images/deleteicon.svg";
const API_URL = "https://api.nomoreparties.co";
// ADD:
function MoviesCard({ movie, onSavedMovies, onDeleteMovie, savedMovies = [] }) {
  const location = useLocation();
  const [saveCard, setSaveCard] = useState(false); // сохранен ли фильм
  const [showBtn, setshowBtn] = useState(false); // показывается ли галочка
  // показывается ли галочка
  function showButton() {
    setshowBtn(true);
  }
  // показывается ли кнопка удаления на /saved-movies
  function deleteButton() {
    setshowBtn(false);
  }
  useEffect(() => {
    getSavedMovieCard(savedMovies, movie);
  });
  // если карточка сохранена показываю галочку
  function getSavedMovieCard(savedMovies, movie) {
    if (
      savedMovies.find(
        (savedMovie) => savedMovie.trailerLink === movie.trailerLink
      )
    ) {
      setSaveCard(true);
    } else {
      setSaveCard(false);
    }
  }

  // удаление фильма
  function deleteMovie() {
    if (location.pathname === "/movies") {
      onDeleteMovie(
        savedMovies.find((film) => film.trailerLink === movie.trailerLink)
      );
    } else {
      onDeleteMovie(movie);
    }
  }
  // сохранение фильма
  function saveFilm() {
    getSavedMovieCard(savedMovies, movie);
    onSavedMovies(movie);
  }

  const movieDuration = `${Math.trunc(movie.duration / 60)
    .toString()
    .padStart(2, "0")}ч ${(movie.duration % 60).toString().padStart(2, "0")}м`;

  const movieImgUrl = `${API_URL}${movie.image.url}`;

  return (
    <article
      className="card"
      onMouseEnter={showButton}
      onMouseLeave={deleteButton}
    >
      <a className="card__movie-link" target="_blank" href={movie.trailerLink}>
        <img
          src={
            location.pathname === "/saved-movies" ? movie.image : movieImgUrl
          }
          alt={movie.nameRU}
          className="card__img"
        />
      </a>

      {/* на всех картинках и если карточка НЕ сохранена*/}
      {location.pathname === "/movies" &&
        showBtn == true &&
        saveCard !== true && (
          <button
            className={`card__save`}
            onClick={() => {
              setSaveCard(true);
              saveFilm();
            }}
          >
            Сохранить
          </button>
        )}
      {/* на всех картинках и если карточка сохранена*/}
      {location.pathname === "/movies" && saveCard == true && (
        <img
          className="card__save-img"
          src={saveimg}
          alt="значек сохранения карточки"
          onClick={() => {
            deleteMovie();
            setSaveCard(false);
          }}
        />
      )}
      {/* на сохраненных картинках и кнопка удаления карточки*/}
      {location.pathname === "/saved-movies" && showBtn && (
        <img
          className="card__save-img"
          src={deleteimg}
          alt="значек сохранения карточки"
          onClick={() => deleteMovie()}
        />
      )}
      <div className="card__footer">
        <h2 className="card__title">{movie.nameRU}</h2>
        <p className="card__time">{movieDuration}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
