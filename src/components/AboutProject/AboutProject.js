import React from "react";
import "./AboutProject.css";
function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <div className="aboutProject__title-block">
        <h2 className="aboutProject__title">О проекте</h2>
      </div>
      <div className="aboutProject__about">
        <div className="aboutProject__info">
          <div className="aboutProject__info-block">
            <h3 className="aboutProject__info-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="aboutProject__info-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="aboutProject__info-block">
            <h3 className="aboutProject__info-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="aboutProject__info-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>

        <div className="aboutProject__timelapse">
          <div className="aboutProject__timelapse-firstweek">
            <p className="aboutProject__timelapse-firstweek-text">1 неделя</p>
          </div>
          <div className="aboutProject__timelapse-secondweek">
            <p className="aboutProject__timelapse-secondweek-text">4 недели</p>
          </div>
          <div className="aboutProject__timelapse-firstweek-parts">
            <p className="aboutProject__timelapse-text">Back-end</p>
          </div>
          <div className="aboutProject__timelapse-secondweek-parts">
            <p className="aboutProject__timelapse-text">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
