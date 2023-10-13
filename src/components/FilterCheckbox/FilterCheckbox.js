import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isShortMovie, onStartFilter }) {
  return (
    <div className="filter">
      <input className="filter__btn" type="checkbox" checked={isShortMovie} onChange={onStartFilter} onClick={() => console.log(isShortMovie)}></input>
      <span className="filter__title">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
