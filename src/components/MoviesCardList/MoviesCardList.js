import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import CardsLoader from "../CradsLoader/CardsLoader";
import useWindowWidth from "../../hooks/useWindowWidth";
function MoviesCardList({ isLoggedIn, movies, onSavedMovies, onQuery, onDeleteMovie, savedMovies}) {
  const [movieQuantity, setmovieQuantity] = useState(0);
  const windowWidth = useWindowWidth();


  useEffect(() => {
    if (windowWidth > 1150) {
      setmovieQuantity(12);
    } else if (windowWidth > 720) {
      setmovieQuantity(8);
    } else {
      setmovieQuantity(5);
    }
  }, [windowWidth]);


  function handleLoadCrads() {
    if (windowWidth > 1150) {
      setmovieQuantity(movieQuantity + 3);
    } else if (windowWidth > 720) {
      setmovieQuantity(movieQuantity + 2);
    } else {
      setmovieQuantity(movieQuantity + 2);
    }
  }

  

  return (
    <div className="cards">
      <div className="cards__list">
        {Array.isArray(movies) && movies.slice(0, movieQuantity).map((movie, id) => {
          return (
            <MoviesCard
              movie={movie}
              key={id}
              onSavedMovies={onSavedMovies}
              onDeleteMovie={onDeleteMovie}
              savedMovies={savedMovies}
            />
          );
        })}
      </div>
      {movies.length === 0 && onQuery.length >= 0 ? <EmptyComponent /> : ''}
      {movies.length > movieQuantity ? <CardsLoader loadCrads={handleLoadCrads} /> : ''}
    </div>
  );
}

export default MoviesCardList;



  // const initialCards = [
  //   {
  //     name: "33 слова о дизайне",
  //     img: firstimg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "Киноальманах «100 лет дизайна»",
  //     img: secondimg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "В погоне за Бенкси",
  //     img: thirdmg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "Баския: Взрыв реальности",
  //     img: fourimg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "Бег это свобода",
  //     img: fiveimg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "Книготорговцы",
  //     img: sixtimg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "Когда я думаю о Германии ночью",
  //     img: seventimg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "Gimme Danger: История Игги и The Stooges",
  //     img: eighttimg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "Дженис: Маленькая девочка грустит",
  //     img: ninetimg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "Соберись перед прыжком",
  //     img: tentimg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "Пи Джей Харви: A dog called money",
  //     img: eleventimg,
  //     time: "1ч 17м",
  //   },
  //   {
  //     name: "По волнам: Искусство звука в кино",
  //     img: twelvtimg,
  //     time: "1ч 17м",
  //   },
  // ];