import React, { useState } from "react";
import "./MoviesCard.css";
import saveimg from "../../images/cardiconimg.svg";
import { useLocation } from "react-router-dom";
import deleteimg from "../../images/deleteicon.svg";
const API_URL = "https://api.nomoreparties.co";
function MoviesCard({ movie }) {
  const location = useLocation();
  const [saveCard, setSaveCard] = useState(false);
  const [showBtn, setshowBtn] = useState(false);
  function showButton() {
    setshowBtn(true);
  }
  function deleteButton() {
    setshowBtn(false);
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
        <img src={movieImgUrl} alt={movie.nameRU} className="card__img" />
      </a>
      {location.pathname === "/movies" &&
        showBtn == true &&
        saveCard !== true && (
          <button className={`card__save`} onClick={() => setSaveCard(true)}>
            Сохранить
          </button>
        )}
      {location.pathname === "/movies" && saveCard == true && (
        <img
          className="card__save-img"
          src={saveimg}
          alt="значек сохранения карточки"
        />
      )}
      {location.pathname === "/saved-movies" && showBtn && (
        <img
          className="card__save-img"
          src={deleteimg}
          alt="значек сохранения карточки"
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
