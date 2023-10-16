import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import lupaimg from "../../images/lupaicon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
function SearchForm({ onFindMovie, isShortMovie, onStartFilter }) {
  const [query, setQuery] = useState("");
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  // сохраняю запрос для localstorage
  function handleSetQueryValue(e) {
    setQuery(e.target.value);
  }
  // сабмит
  function handleSubmitForm(e) {
    e.preventDefault();
    if (query.length === 0) {
      setIsError(true);
      console.log(isError);
    } else {
      setIsError(false);
      onFindMovie(query);
    }
  }

    // ADD:
    useEffect(() => {
      if(location.pathname === '/movies' && localStorage.getItem('query')) {
        const query = localStorage.getItem('query');
        setQuery(query);
      }
    }, [location])

  return (
    <div className="search-container">
      <div className="search__form-container">
        <form className="search__form" onSubmit={handleSubmitForm}>
          <img src={lupaimg} alt="логотип" className="search__lupa" />
          <div className="search__form-request">
            <input
              name="search_film"
              className="search__input"
              id="search__input"
              type="text"
              placeholder="Фильм"
              onChange={(e) => {
                handleSetQueryValue(e);
              }}
              value={query}
            ></input>
            <button className="search__btn" type="submit">
              Найти
            </button>
          </div>
        </form>
        <FilterCheckbox
          isShortMovie={isShortMovie}
          onStartFilter={onStartFilter}
        />
      </div>
      {isError ? (
        <span className="search__validator">Введите хоть что нибудь</span>
      ) : (
        ""
      )}
      <div className="search-container-bottom-line"></div>
    </div>
  );
}

export default SearchForm;
