import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import firstimg from "../../images/film1.png";
import secondimg from "../../images/film2.png";
import thirdmg from "../../images/film3.png";
import fourimg from "../../images/film4.png";
import fiveimg from "../../images/film5.png";
import sixtimg from "../../images/film6.png";
import seventimg from "../../images/film7.png";
import eighttimg from "../../images/film8.png";
import ninetimg from "../../images/film9.png";
import tentimg from "../../images/film10.png";
import eleventimg from "../../images/film11.png";
import twelvtimg from "../../images/film12.png";
import CardsLoader from "../CradsLoader/CardsLoader";
function MoviesCardList() {
  const initialCards = [
    {
      name: "33 слова о дизайне",
      img: firstimg,
      time: "1ч 17м",
    },
    {
      name: "Киноальманах «100 лет дизайна»",
      img: secondimg,
      time: "1ч 17м",
    },
    {
      name: "В погоне за Бенкси",
      img: thirdmg,
      time: "1ч 17м",
    },
    {
      name: "Баския: Взрыв реальности",
      img: fourimg,
      time: "1ч 17м",
    },
    {
      name: "Бег это свобода",
      img: fiveimg,
      time: "1ч 17м",
    },
    {
      name: "Книготорговцы",
      img: sixtimg,
      time: "1ч 17м",
    },
    {
      name: "Когда я думаю о Германии ночью",
      img: seventimg,
      time: "1ч 17м",
    },
    {
      name: "Gimme Danger: История Игги и The Stooges",
      img: eighttimg,
      time: "1ч 17м",
    },
    {
      name: "Дженис: Маленькая девочка грустит",
      img: ninetimg,
      time: "1ч 17м",
    },
    {
      name: "Соберись перед прыжком",
      img: tentimg,
      time: "1ч 17м",
    },
    {
      name: "Пи Джей Харви: A dog called money",
      img: eleventimg,
      time: "1ч 17м",
    },
    {
      name: "По волнам: Искусство звука в кино",
      img: twelvtimg,
      time: "1ч 17м",
    },
  ];
  return (
    <div className="cards">
      <div className="cards__list">
        {initialCards.map((movie, id) => {
          return (
            <MoviesCard
              name={movie.name}
              img={movie.img}
              time={movie.time}
              key={id}
            />
          );
        })}
      </div>
      <CardsLoader />
    </div>
  );
}

export default MoviesCardList;
