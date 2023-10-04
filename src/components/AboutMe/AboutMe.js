import React from "react";
import "./AboutMe.css";
import vitalik from "../../images/vitalik.svg";
import { Link } from "react-router-dom";
function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <div className="aboutme__title-container">
        <h3 className="aboutme__title-text">Студент</h3>
      </div>
      <div className="aboutme__profile">
        <div className="aboutme__description">
          <h2 className="aboutme__description-title">Виталий</h2>
          <p className="aboutme__description-subtitle">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="aboutme__description-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            className="aboutme__description-link"
            to={"https://github.com/"}
            target="_blank"
          >
            Github
          </Link>
        </div>
        <img src={vitalik} alt="фото программиста" className="aboutme-img" />
      </div>
    </section>
  );
}

export default AboutMe;
