import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <section className="profile_container">
      <h2 className="profile__greetings">Привет, Виталий!</h2>
      <div className="profile__info">
        <p className="profile__category">Имя</p>
        <p className="profile__value">Виталий</p>
      </div>
      <div className="profile__info">
        <p className="profile__category">E-mail</p>
        <p className="profile__value">pochta@yandex.ru</p>
      </div>
      <p className="profile__edit">Редактировать</p>
      <Link to="/signup" className="profile__logout">
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
