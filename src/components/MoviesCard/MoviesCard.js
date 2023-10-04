import React, { useState } from "react";
import "./MoviesCard.css";
import saveimg from "../../images/cardiconimg.svg";
import { useLocation } from "react-router-dom";
import deleteimg from "../../images/deleteicon.svg";

function MoviesCard(props) {
  const location = useLocation();
  const [saveCard, setSaveCard] = useState(false);
  const [showBtn, setshowBtn] = useState(false);
  function showButton() {
    setshowBtn(true);
  }
  function deleteButton() {
    setshowBtn(false);
  }

  return (
    <article
      className="card"
      onMouseEnter={showButton}
      onMouseLeave={deleteButton}
    >
      <img src={props.img} alt={props.name} className="card__img" />
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
        <h2 className="card__title">{props.name}</h2>
        <p className="card__time">{props.time}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
