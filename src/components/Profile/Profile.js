import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useForm";

function Profile({ isLoggedIn, onSignOut, handleUpdateUser }) {
  const currentUser = useContext(CurrentUserContext); // текущий контекст
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(); // валидация 
  const [isEquals, setisEquals] = useState(true); // изменились ли значения
  const [isDisabled, setIsDisabled] = useState(true); // заблокированы ли инпуты

  // выход из аккаунт
  const signOut = () => {
    onSignOut();
    resetForm();
  };
  // обновление инфрмации о юзере
  function updateUserInfo(e) {
    e.preventDefault();
    setIsDisabled(!isDisabled);
    // if (isEquals === false) {
      const name = values.name;
      const email = values.email;
      console.log(email);
      handleUpdateUser(name, email);
    // }
    
    setisEquals(false);
  }

  // проверяю изменились ли значения
  function handleCheckEquals() {
    let name = values.name == currentUser.name;
    let email = values.email == currentUser.email;
    setisEquals(name && email);
  }
  // при изменении currentUser меняю values
  useEffect(() => {
    values.name = currentUser.name;
    values.email = currentUser.email;
  }, [isLoggedIn]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <form className="profile_container" onSubmit={(e) => updateUserInfo(e)} noValidate>
        <h2 className="profile__greetings">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__info">
          <div className="profile__wrapper">
            <p className="profile__category">Имя</p>
            <input
              name="name"
              className="profile__value"
              value={isDisabled === true ? currentUser.name : values.name}
              onChange={(e) => {
                handleChange(e); 
                handleCheckEquals();
              }}
              type="text"
              minLength="2"
              maxLength="30"
              placeholder="Введите ваше имя"
              disabled={isDisabled ? true : false}
            />
          </div>
          <span className="profile__validation">{errors.name}</span>
        </div>

        <div className="profile__info">
          <div className="profile__wrapper">
            <p className="profile__category">E-mail</p>
            <input
              name="email"
              className="profile__value"
              value={isDisabled === true ? currentUser.email : values.email}
              onChange={(e) => {
                handleChange(e);
                handleCheckEquals();
              }}
              type="email"
              minLength="2"
              maxLength="30"
              pattern="[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-z]{2,4}$"
              placeholder="Введите ваш email"
              disabled={isDisabled ? true : false}
            />
          </div>
          <span className="profile__validation">{errors.email}</span>
        </div>
        <button
          className={`profile__edit`}
          type="submit"
          //onClick={(e) => updateUserInfo(e)}
          disabled={!isValid || isEquals}
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
// (isEquals === true || !isValid) || isDisabled===false
//${
//   isEquals !== true && isValid === true
//   ? "profile__edit-disabled"
//   : ""
// }