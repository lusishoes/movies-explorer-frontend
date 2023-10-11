import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../hooks/useForm";

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleRegister = (e) => {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
    resetForm();
  };

  return (
    <>
      <form
        className={`register_container`}
        name={`register__container`}
        onSubmit={handleRegister}
      >
        <img src={logo} alt="логотип" className="register__logo" />
        <h3 className="register__title">Добро пожаловать!</h3>
        <p className="register__subtitle">Имя</p>
        <input
          id="input-name"
          placeholder="Имя"
          className="register__input"
          name="name"
          required={true}
          value={values?.name}
          onChange={(e) =>  handleChange(e)}
        />
        <span
          className="register__input-error"
        >{errors?.name}</span>
        <p className="register__subtitle">E-mail</p>
        <input
          id="input-email"
          type="email"
          placeholder="Email"
          className="register__input"
          name="email"
          required={true}
          value={values?.email}
          onChange={(e) => handleChange(e)}
        />
        <span
          className="register__input-error"
        >{errors?.email}</span>
        <p className="register__subtitle">Пароль</p>
        <input
          id="input-password"
          type="password"
          placeholder="Пароль"
          className="register__input"
          name="password"
          required={true}
          value={values?.password}
          onChange={(e) => handleChange(e)}
        />
        <span
          className="register__input-error"
        >{errors?.password}</span>
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
        <Link to="/signin" className="register__link">
          Уже зарегистрированы? <p className="register__link-signin">Войти</p>
        </Link>
      </form>
    </>
  );
}

export default Register;
