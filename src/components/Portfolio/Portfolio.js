import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg";
import { Link } from "react-router-dom";
function Portfolio() {
  return (
    <section className="portfolio_container">
      <h3 className="portfolio__title">Портфолио</h3>
      <div className="portfolio__links">
        <Link
          className="portfolio__link"
          to={"https://github.com/"}
          target="_blank"
        >
          <p className="portfolio__link-title">Статичный сайт</p>
          <img src={arrow} alt="стрелочка" className="portfolio__img" />
        </Link>
        <Link
          className="portfolio__link"
          to={"https://github.com/"}
          target="_blank"
        >
          <p className="portfolio__link-title">Адаптивный сайт</p>
          <img src={arrow} alt="стрелочка" className="portfolio__img" />
        </Link>

        <Link
          className="portfolio__link"
          to={"https://github.com/"}
          target="_blank"
        >
          <p className="portfolio__link-title">Одностраничное приложение</p>
          <img src={arrow} alt="стрелочка" className="portfolio__img" />
        </Link>
      </div>
    </section>
  );
}

export default Portfolio;
