import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter">
      <input className="filter__btn" type="checkbox"></input>
      <span className="filter__title">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
