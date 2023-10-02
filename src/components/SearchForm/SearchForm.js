import React from "react";
import "./SearchForm.css";
import lupaimg from "../../images/lupaicon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
function SearchForm() {
  return (
    <div className="search-container">
      <div className="search__form-container">
        <form className="search__form">
          <img src={lupaimg} alt="логотип" className="search__lupa" />
          <div className="search__form-request">
            <input
              name="search_film"
              className="search__input"
              id="search__input"
              type="text"
              placeholder="Фильм"
            ></input>
            <button className="search__btn" type="submit">
              Найти
            </button>
          </div>
        </form>
        <FilterCheckbox />
      </div>
      <div className="search-container-bottom-line"></div>
    </div>
  );
}

export default SearchForm;
