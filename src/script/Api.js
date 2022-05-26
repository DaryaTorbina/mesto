export default class Api {
  constructor({ address, token, groupId }) {
    this._token = token;
    this._groupId = groupId;
    this._address = address;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  getServerData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateUserInfo(body) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  addNewMesto(body) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  removeMesto(cardID) {
    return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  addLikeMesto(cardID) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  deleteLikeMesto(cardID) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  updateProfileAvatar(body) {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }
}
