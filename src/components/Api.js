export default class Api {
    constructor({adress,token}) {
        this._adress = adress;
        this._token = token;
    }

    _handleResponse = (response) => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(`Ошибка ${response.status}`)
    };

    getCards() {
        return fetch(`${this._adress}/cards`,{
            headers: {
                authorization: this._token
            }
        }).then(this._handleResponse);
    }

    addCard(place,image) {
        return fetch(`${this._adress}/cards`,{
            method: 'POST',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: place,
              link: image
            })
        })
        .then(this._handleResponse)
    }

    getUser() {
        return fetch(`${this._adress}/users/me`,{
            headers: {
                authorization: this._token
            }
        }).then(this._handleResponse);
    }

    editUserInfo(name,job) {
        return fetch(`${this._adress}/users/me`,{
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              about: job
            })
        })
        .then(this._handleResponse)
    }

    deleteCard(_id) {
        return fetch(`${this._adress}/cards/${_id}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(this._handleResponse)

    }

    editAvatar(avatar) {
        return fetch(`${this._adress}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-type': 'application/json'
            },
            body: JSON.stringify(avatar)
        })
        .then(this._handleResponse)
    }

    updateLikeCard({ _isLiked, _id }) {
        return _isLiked ? this._deleteLike(_id) : this._addLike(_id);
      }
    
      _addLike(_id) {
        return fetch(`${this._adress}/cards/${_id}/likes`, {
          method: 'PUT',
          headers: {
            authorization: this._token,
            'Content-type': 'application/json'
          }
        })
        .then(this._handleResponse)
      }
    
      _deleteLike(_id) {
        return fetch(`${this._adress}/cards/${_id}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: this._token,
            'Content-type': 'application/json'
          }
        })
        .then(this._handleResponse)
      }

}

