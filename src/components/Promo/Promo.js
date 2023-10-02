import React from "react";
import "./Promo.css";
import promoBackground from "../../images/promoback.svg";
const Promo = () => {
  return (
    <section className="promo_conteiner">
      <img src={promoBackground} alt="логотип" className="promo__background" />
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
};

export default Promo;
