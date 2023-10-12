 const BASE_URL = 'https://api.lusishoes.movies.nomoredomainsrocks.ru';
 const MOVIE_API_URL = "https://api.nomoreparties.co";
 export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password})
    }).then(handleResponse);
  }
  
  // авторизация
  export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password, email})
    }).then(handleResponse);
  }
  
  // метод определяющий валидность токена
  export const getContent = (token) => {
      return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(handleResponse);
  }
  // сохраняем фильмы
  export const setSavedMovies = (data) => {
    console.log(data.image.url)
    return fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `${MOVIE_API_URL}${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail:
        `${MOVIE_API_URL}${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(handleResponse);
  };

  // получаем дефолтную инфу 
  export const getUserData = () =>{
      return fetch(`${BASE_URL}/users/me`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        }).then(handleResponse);
  }

  // отправляем добавленную инфу 
  export const setUserInfo = (name, email) => { 
    console.log(name, email);
      return fetch(`${BASE_URL}/users/me`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          body: JSON.stringify({name, email})
      }).then(handleResponse);
  }


  // удаление карточки 
  export const deleteMovie = (id) => {
    console.log(id);
      return fetch(`${BASE_URL}/movies/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
      }).then(handleResponse);  
  }

//   export const changeLikeCardStatus = ({cardId, isLiked}) => {
//       if (isLiked) {
//           return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
//               method: 'PUT',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${localStorage.getItem('jwt')}`
//               }
//           }).then(handleResponse);
//       }
//       else {
//           return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
//               method: 'DELETE',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${localStorage.getItem('jwt')}`
//               }
//           }).then(handleResponse);
//       }
//     }

 const handleResponse = (res) => {
      if(res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }
