import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import InfoTooltip from '../InfoTooltip/InfoTooltip';
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .getContent(jwt)
      .then((data) => {
        if (!data) {
          return;
        }
        setData(data);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((e) => {
        setIsLoggedIn(false);
        console.log(e);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleOnRegister = (name, email, password) => {
    console.log(name, email, password)
    mainApi
      .register(name, email, password)
      .then((res) => {
        console.log(res.status)
        setisInfoTooltipOpen(true);
        setIsInfoTooltip(true);
        navigate("/signin");
      })
      .catch((err) => {
        setisInfoTooltipOpen(true);
        setIsInfoTooltip(false);
        console.log(err);
      });
  };

  const handleOnLogin = (password, email) => {
    mainApi
      .login(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  // отпраляю новые email, name на сервер, получаю -> устанавливаю их для currentUser
  const handleUpdateUser = (name, email) => {
    mainApi.setUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/signin");
  };

  function closeAllPopups() {
    setisInfoTooltipOpen(false);
  }
// при входе с сервера получаю email, name -> устанавливаю их для currentUser
  useEffect(() => {
    if(isLoggedIn) {
      mainApi.getUserData()
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header isLoggedIn={isLoggedIn} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={<Register onRegister={handleOnRegister} />}
        />
        <Route path="/signin" element={<Login onLogin={handleOnLogin} />} />
        {/* Защитить */}
        <Route
          path="/profile"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={Profile} onSignOut={signOut} handleUpdateUser={handleUpdateUser}/>}
        />
        {/* Защитить */}
        <Route
          path="/movies"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={Movies} />}
        />
        {/* Защитить */}
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={SavedMovies} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          messegeState={isInfoTooltip}
        />
    </CurrentUserContext.Provider>
  );
}

export default App;
