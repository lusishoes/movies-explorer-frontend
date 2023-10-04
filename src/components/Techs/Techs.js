import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs-container" id="techs">
      <div className="techs-title__container">
        <h3 className="techs-title__text">Технологии</h3>
      </div>
      <div className="techs__list">
        <h2 className="techs__list_title">7 технологий</h2>
        <p className="techs__list_subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className="techs__list-items">
          <div className="techs__list-item">
            <p className="techs__list-text">HTML</p>
          </div>
          <div className="techs__list-item">
            <p className="techs__list-text">CSS</p>
          </div>
          <div className="techs__list-item">
            <p className="techs__list-text">JS</p>
          </div>
          <div className="techs__list-item">
            <p className="techs__list-text">React</p>
          </div>
          <div className="techs__list-item">
            <p className="techs__list-text">Git</p>
          </div>
          <div className="techs__list-item">
            <p className="techs__list-text">Express.js</p>
          </div>
          <div className="techs__list-item">
            <p className="techs__list-text">mongoDB</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Techs;
