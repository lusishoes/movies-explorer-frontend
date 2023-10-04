import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer_container">
      <div className="footer__about">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
      </div>
      <div className="footer__bottom">
        <p className="footer__bottom-text">© 2020</p>
        <div className="footer__bottom-links">
          <Link
            className="footer__bottom-text"
            to={"https://practicum.yandex.ru/"}
            target="_blank"
          >
            Яндекс.Практикум
          </Link>
          <Link
            className="footer__bottom-text"
            to={"https://github.com/"}
            target="_blank"
          >
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
