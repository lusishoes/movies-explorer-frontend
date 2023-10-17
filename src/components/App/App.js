import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { Route, Routes, useNavigate, Navigate, useLocation } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();
  // TODO: добавил
  const location = useLocation();
  // проверка наличия токена для авторизации
  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getContent(jwt)
        .then((data) => {
          if (!data) {
            return;
          }
          setIsLoggedIn(true);
          // TODO: изменил редирект
          navigate(location.pathname);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
        });
    }
  };
  // проверка токена при монтировании компонента
  useEffect(() => {
    checkToken();
  }, []);

  // фукнция регистрации
  const handleOnRegister = (name, email, password) => {
    console.log(name, email, password);
    mainApi
      .register(name, email, password)
      .then((res) => {
        console.log(res.status);
        setisInfoTooltipOpen(true);
        setIsInfoTooltip(true);
        // TODO: добавил
        handleOnLogin(password, email);
      })
      .catch((err) => {
        setisInfoTooltipOpen(true);
        setIsInfoTooltip(false);
        console.log(err);
      });
  };
  // функция при логине
  const handleOnLogin = (password, email) => {
    mainApi
      .login(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setisInfoTooltipOpen(true);
        setIsInfoTooltip(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        setisInfoTooltipOpen(true);
        setIsInfoTooltip(false);
      });
  };
  // отпраляю новые email, name на сервер, получаю -> устанавливаю их для currentUser
  const handleUpdateUser = (name, email) => {
    mainApi
      .setUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        setisInfoTooltipOpen(true);
        setIsInfoTooltip(true);
      })
      .catch((err) => {
        console.log(err);
        setisInfoTooltipOpen(true);
        setIsInfoTooltip(false);
      });
  };
  // сохраняю фильмы на своем сервере
  const handleSaveMovies = (movie) => {
    mainApi
      .setSavedMovies(movie)
      .then((res) => {
        if (Array.isArray(savedMovies)) {
          // TODO: поменял
          setSavedMovies(getUniqueMovies([res, ...savedMovies]));
        } else {
          // TODO: поменял
          setSavedMovies(getUniqueMovies([res]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // удаляю фильмы со своего сервера
  const handleDeleteMovie = (movie) => {
    console.log(movie);
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies(getUniqueMovies(savedMovies.filter((elem) => elem !== movie)));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // при выходе чищу локалстордж
  const signOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };
  // при закрытии попапа
  function closeAllPopups() {
    setisInfoTooltipOpen(false);
  }
  // при входе с сервера получаю email, name -> устанавливаю их для currentUser, так же получаю сохраненные фильмы
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserData()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
  
        mainApi
          .getMovies()
          .then((res) => {
            setSavedMovies(getUniqueMovies(res));
          })
          .catch((err) => {
            console.log(err);
          });
      }

  }, [isLoggedIn]);

  // TODO: добавил во избежание показа дубликатов - проблема на бэке, он не учитывает сценарий, при котором один и тот же фильм сохраняется несколько раз
const getUniqueMovies = (movies) => {
  const filtered = [];

  for (const movie of movies) {
    if (filtered.findIndex(m => m.trailerLink === movie.trailerLink) < 0) {
      filtered.push(movie);
    }
  }

  return filtered;
};

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
          element={!isLoggedIn ? <Register onRegister={handleOnRegister} /> : <Navigate to="/" replace />}
        />
        <Route path="/signin" element={!isLoggedIn ? <Login onLogin={handleOnLogin} /> : <Navigate to="/" replace />} />
        {/* Защитить */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={Profile}
              onSignOut={signOut}
              handleUpdateUser={handleUpdateUser}
            />
          }
        />
        {/* Защитить */}
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={Movies}
              onSavedMovies={handleSaveMovies}
              onDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
            />
          }
        />
        {/* Защитить */}
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={SavedMovies}
              savedMovies={savedMovies}
              onDeleteMovie={handleDeleteMovie}
            />
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
