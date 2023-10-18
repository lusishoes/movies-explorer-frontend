import React, { useState } from "react";
import accountIconMain from "../../images/account_icon.svg";
import accountIcon from "../../images/accounticon.svg";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import burgerimg from "../../images/burgericon.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./Navigation.css";
function Navigation({ isLoggedIn }) {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const location = useLocation();

  function changeBurgerVisibility() {
    setIsOpenBurger(!isOpenBurger);
  }

  return (
    <div className="navigation_wrapper">
      {isLoggedIn ? (
        <>
          <Link to={"/"}>
            <img src={logo} alt="логотип" className="navigation__logo" />
          </Link>
          <div className="navigation__links-wrapper">
            <Link
              to={"/movies"}
              className={`navigation__link navigation__link-loggedin ${
                location.pathname === "/movies" ? "navigation__link-choise" : ""
              }`}
            >
              Фильмы
            </Link>
            <Link
              to={"/saved-movies"}
              className={`navigation__link navigation__link-loggedin ${
                location.pathname === "/saved-movies"
                  ? "navigation__link-choise"
                  : ""
              }`}
            >
              Сохранённые фильмы
            </Link>

            <div className="navigation__profile">
              <Link to={"/profile"} className="navigation__link-profile">
                Аккаунт
              </Link>
              <div
                className={`navigation__link-profile_logo ${
                  location.pathname !== "/"
                    ? "navigation__link-profile_logo-grey"
                    : ""
                }`}
              >
                <img
                  src={
                    location.pathname !== "/" ? accountIcon : accountIconMain
                  }
                  alt="лого"
                  className="navigation__logo-profile"
                />
              </div>
            </div>
          </div>
          <img
            src={burgerimg}
            alt="лого"
            className="navigation__logo-burger"
            onClick={() => setIsOpenBurger(true)}
          />
          <BurgerMenu
            isOpen={isOpenBurger}
            changeBurgerVisibility={changeBurgerVisibility}
          />
        </>
      ) : (
        <>
          <img src={logo} alt="логотип" className="navigation__logo" />
          <div className="navigation__container">
            <Link to={"/signup"} className="navigation__link">
              Регистрация
            </Link>
            <div className="navigation__signin-link_wrapper">
              <Link to={"/signin"} className="navigation__signin-link">
                Войти
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
