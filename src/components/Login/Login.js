import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../hooks/useForm";
function Login({ onLogin }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(values.password, values.email);
    resetForm();
  };

  return (
    <>
      <form
        className={`login_container`}
        name={`login_container`}
        onSubmit={(e) => handleLogin(e)}
        noValidate
      >
        {/* ADD: */}
        <Link to={'/'}><img src={logo} alt="логотип" className="login__logo" /></Link>
        <h3 className="login__title">Рады видеть!</h3>
        <p className="login__subtitle">E-mail</p>
        <input
          type="email"
          placeholder="Email"
          className="login__input"
          name="email"
          required={true}
          onChange={(e) => handleChange(e)}
          minLength="2"
          maxLength="30"
          value={values.email || ""}
          pattern="[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-z]{2,4}$"
        />
        <span className="login__input-error">{errors?.email}</span>
        <p className="login__subtitle">Пароль</p>
        <input
          type="password"
          placeholder="Пароль"
          className="login__input"
          name="password"
          required={true}
          value={values.password || ""}
          onChange={(e) => handleChange(e)}
        />
        <span className="login__input-error">{errors?.password}</span>
        <button
          className={`login__button ${isValid ? "" : "login__button-disabled"}`}
          type="submit"
          disabled={isValid !== true ? true : false}
        >
          Войти
        </button>
        <Link to="/signup" className="login__link">
          Ещё не зарегистрированы?
          <p className="login__link-signin">Регистрация</p>
        </Link>
      </form>
    </>
  );
}

export default Login;
