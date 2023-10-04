import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <section className="nav_container">
      <a className="nav__link" href="#aboutProject">
        О проекте
      </a>
      <a className="nav__link" href="#techs">
        Технологии
      </a>
      <a className="nav__link" href="#aboutme">
        Студент
      </a>
    </section>
  );
}

export default NavTab;
