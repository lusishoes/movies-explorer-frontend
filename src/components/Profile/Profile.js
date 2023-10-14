import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useForm";

function Profile({ isLoggedIn, onSignOut, handleUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const [isEquals, setisEquals] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const signOut = () => {
    onSignOut();
    resetForm(currentUser);
  };

  function updateUserInfo(e) {
    e.preventDefault();
    if (
      values.name !== currentUser.name ||
      values.email !== currentUser.email
    ) {
      const name = values.name;
      const email = values.email;
      handleUpdateUser(name, email);
    }
    setIsDisabled(!isDisabled);
  }

  function handleCheckEquals() {
    let name = values.name === currentUser.name;
    let email = values.email === currentUser.email;
    setisEquals(name && email);
  }

  useEffect(() => {
    values.name = currentUser.name;
    values.email = currentUser.email;
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <form className="profile_container" onSubmit={updateUserInfo} noValidate>
        <h2 className="profile__greetings">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__info">
          <div className="profile__wrapper">
            <p className="profile__category">Имя</p>
            <input
              name="name"
              className="profile__value"
              value={isDisabled ? currentUser.name : values.name}
              onChange={(e) => {
                handleChange(e);
                handleCheckEquals();
              }}
              type="text"
              minLength="2"
              maxLength="30"
              placeholder="Введите ваше имя"
              disabled={isDisabled}
            />
          </div>
          <span className="profile__validation">{errors?.name}</span>
        </div>

        <div className="profile__info">
          <div className="profile__wrapper">
            <p className="profile__category">E-mail</p>
            <input
              name="email"
              className="profile__value"
              value={isDisabled ? currentUser.email : values.email}
              onChange={(e) => {
                handleChange(e);
                handleCheckEquals();
              }}
              type="email"
              minLength="2"
              maxLength="30"
              pattern="[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-z]{2,4}$"
              placeholder="Введите ваш email"
              disabled={isDisabled}
            />
          </div>
          <span className="profile__validation">{errors?.email}</span>
        </div>
        <button
          className={`profile__edit ${
            (isEquals === false && isValid === true) || isDisabled === true
              ? ""
              : "profile__edit-disabled"
          }`}
          type="submit"
          disabled={
            (isEquals === false && isValid === true) || isDisabled === true
              ? false
              : true
          }
        >
          Редактировать
        </button>
        <Link to="/signup" className="profile__logout" onClick={signOut}>
          Выйти из аккаунта
        </Link>
      </form>
    </>
  );
}

export default Profile;
