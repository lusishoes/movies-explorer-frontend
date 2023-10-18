import React from "react";
import burgerCloseIcon from "../../images/closeburger.svg";
import burgerAccountIcon from "../../images/accounticon.svg";
import "./BurgerMenu.css";
import { useLocation } from "react-router-dom";

function BurgerMenu({ isOpen, changeBurgerVisibility }) {
  const location = useLocation();

  function changeBurger() {
    changeBurgerVisibility();
  }

  return isOpen ? (
    <div className="burger_wrapper">
      <div className="burger__container">
        <img
          src={burgerCloseIcon}
          alt="иконка закрытия бургера"
          className="burger__close-icon"
          onClick={() => changeBurger()}
        />
        <ul className="burger__link-elements">
          <li className="burger__link-list">
            <a
              className={`burger__link ${
                location.pathname === "/" ? "burger__link-chosen" : ""
              }`}
              href="/"
            >
              Главная
            </a>
          </li>
          <li className="burger__link-list">
            <a
              className={`burger__link ${
                location.pathname === "/movies" ? "burger__link-chosen" : ""
              }`}
              href="/movies"
            >
              Фильмы
            </a>
          </li>
          <li className="burger__link-list">
            <a
              className={`burger__link ${
                location.pathname === "/saved-movies"
                  ? "burger__link-chosen"
                  : ""
              }`}
              href="/saved-movies"
            >
              Сохранённые фильмы
            </a>
          </li>
        </ul>
        <div className="burger__account">
          <a
            href="/profile"
            className={`burger__account-info ${
              location.pathname === "/profile"
                ? "burger__account-info-choisen"
                : ""
            }`}
          >
            Аккаунт
          </a>
          <div className="burger__account-icon_wrapper">
            <img
              src={burgerAccountIcon}
              alt="иконка закрытия бургера"
              className="burger__account-icon"
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default BurgerMenu;
