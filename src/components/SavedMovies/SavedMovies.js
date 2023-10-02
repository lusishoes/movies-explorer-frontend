import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import firstimg from "../../images/film1.png";
import secondimg from "../../images/film2.png";
import thirdmg from "../../images/film3.png";
import MoviesCard from "../MoviesCard/MoviesCard";
function SavedMovies() {
  return (
    <section className="saved_movies">
      <SearchForm />
      <div className="saved_movies__list">
        <MoviesCard
          name={"33 слова о дизайне"}
          img={firstimg}
          time={"1ч 17м"}
        />
        <MoviesCard
          name={"Киноальманах «100 лет дизайна»"}
          img={secondimg}
          time={"1ч 17м"}
        />
        <MoviesCard name={"В погоне за Бенкси"} img={thirdmg} time={"1ч 17м"} />
      </div>
    </section>
  );
}

export default SavedMovies;
