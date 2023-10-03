class Api {
  constructor(data) {
    this._link = data.link;
    this._headers = data.headers;
  }
  
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  
  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers
    })
    .then(res => this._handleResponse(res));
  }

  getUserData() {
    return fetch(`${this._link}/users/me`, {
      headers: this._headers
    })
    .then(res => this._handleResponse(res));
  }

  addNewCard(data) {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => this._handleResponse(res));
  }
  
  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._handleResponse(res); })
  }
  
  sendUserData(profileData) {
    return fetch(`${this._link}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(profileData)
    })
    .then(res => this._handleResponse(res));
  }
  
  sendAvatarData(avatarLink) {
    return fetch(`${this._link}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(avatarLink)
    })
    .then(res => this._handleResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: `${!isLiked ? 'DELETE' : 'PUT'}`
    })
      .then(res => this._handleResponse(res));
  }
}

const api = new Api( {
  link: 'http://api.yuliakorolyova.nomoredomainsrocks.ru',
headers: {
  authorization: '0be0e668-3bd1-4300-b735-a9364623e732',
  'Content-Type': 'application/json'
}
});
export default api;