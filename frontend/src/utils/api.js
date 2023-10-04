class Api {
  constructor(data) {
    this._link = data.link;  
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  // _getHeaders() {
  //   const jwt = localStorage.getItem('jwt');
  //   return {
  //     'Authorization': `${jwt}`,
  //     ...this._headers,
  //   };
  // }

  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => this._handleResponse(res));
  }

  getUserData() {
    return fetch(`${this._link}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then(res => this._handleResponse(res));
  }

  addNewCard(user) {
    return fetch(`${this._link}/cards`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({name: user.name,
        link: user.link,})
    })
    .then(res => this._handleResponse(res));
  }
  
  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
      .then(res => { return this._handleResponse(res); })
  }
  
  sendUserData(profileData) {
    return fetch(`${this._link}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(profileData)
    })
    .then(res => this._handleResponse(res));
  }
  
  sendAvatarData(avatarLink) {
    return fetch(`${this._link}/users/me/avatar`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(avatarLink)
    })
    .then(res => this._handleResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      method: `${!isLiked ? 'DELETE' : 'PUT'}`
    })
      .then(res => this._handleResponse(res));
  }
}

const api = new Api( {
  link: 'https://api.yuliakorolyova.nomoredomainsrocks.ru',
  // link: 'http://localhost:3001',
});
export default api;