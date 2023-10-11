import React, {  useState, useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Login({ onLogin }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(formValue.password, formValue.email);
  }

  return (
    <>
      <form className={`login_container`} name={`login_container`} onSubmit={handleLogin}>
        <img src={logo} alt="логотип" className="login__logo" />
        <h3 className="login__title">Рады видеть!</h3>
        <p className="login__subtitle">E-mail</p>
        <input
          id="input-email"
          type="email"
          placeholder="Email"
          className="login__input"
          name="email"
          required={true}
          onChange={handleChange}
        />
        <span
          id="input-profile-image-error"
          className="login__input-error"
        ></span>
        <p className="login__subtitle">Пароль</p>
        <input
          id="input-password"
          type="password"
          placeholder="Пароль"
          className="login__input"
          name="password"
          required={true}
          onChange={handleChange}
        />
        <span
          id="input-profile-image-error"
          className="login__input-error"
        ></span>
        <button className="login__button" type="submit">
          Войти
        </button>
        <Link to="/signup" className="login__link">
          Ещё не зарегистрированы?{" "}
          <p className="login__link-signin">Регистрация</p>
        </Link>
      </form>
    </>
  );
}

export default Login;
