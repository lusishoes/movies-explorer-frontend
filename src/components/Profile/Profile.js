import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useForm";

function Profile({ isLoggedIn, onSignOut, handleUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  console.log("currentUser", currentUser);

  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormWithValidation();
  const [isEquals, setisEquals] = useState(true);

  const signOut = () => {
    onSignOut();
    resetForm();
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
      // ADD:
      setisEquals(true);
    }
  }
     // ADD:
  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  // TODO: оптимизировал проверку на равенство
  useEffect(() => {
    setisEquals(
      values.name === currentUser.name && values.email === currentUser.email
    );
  }, [values.name, values.email]);

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
              value={values.name}
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              minLength="2"
              maxLength="30"
              placeholder="Введите ваше имя"
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
              // TODO: убрал isDisabled
              value={values.email}
              onChange={(e) => {
                handleChange(e);
              }}
              type="email"
              minLength="2"
              maxLength="30"
              pattern="[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-z]{2,4}$"
              placeholder="Введите ваш email"
            />
          </div>
          <span className="profile__validation">{errors?.email}</span>
        </div>
        <button
          // ADD:
          className={`profile__edit ${
            isEquals === false && isValid === true
              ? ""
              : "profile__edit-disabled"
          }`}
          type="submit"
          disabled={
            // ADD:
            isEquals === false && isValid === true ? false : true
          }
        >
          Редактировать
        </button>

        <Link to="/" className="profile__logout" onClick={signOut}>
          Выйти из аккаунта
        </Link>
      </form>
    </>
  );
}

export default Profile;
