 const BASE_URL = 'https://api.lusishoes.movies.nomoredomainsrocks.ru';

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

   // карточки не мои
  export const getInitialCards = () => {
      return fetch(`${BASE_URL}/cards`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          method: 'GET',
      }).then(handleResponse);
  }
  // получаем дефолтную инфу 
  export const getUserData = () =>{
      return fetch(`${BASE_URL}/users/me`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
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

  // добавлени новой карточки 
  export const getCreatedCard = ({data}) => {
      return fetch(`${BASE_URL}/cards`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          body: JSON.stringify({
              name: `${data.name}`,
              link: `${data.link}`,
          })  
      }).then(handleResponse);
  }
  // удаление карточки 
  export const deleteCard = ({id}) => {
      return fetch(`${BASE_URL}/cards/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
      }).then(handleResponse);  
  }

  export const changeLikeCardStatus = ({cardId, isLiked}) => {
      if (isLiked) {
          return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('jwt')}`
              }
          }).then(handleResponse);
      }
      else {
          return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('jwt')}`
              }
          }).then(handleResponse);
      }
    }

 const handleResponse = (res) => {
      if(res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }
