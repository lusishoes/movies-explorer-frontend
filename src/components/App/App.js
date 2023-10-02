import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header isLoggedIn={true} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/profile"
          element={
            <>
              <Header isLoggedIn={true} />
              <Profile />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header isLoggedIn={true} />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header isLoggedIn={true} />
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
