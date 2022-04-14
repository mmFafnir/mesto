
export default class Api {

    constructor(options) {

        this.baseUrl = options.baseUrl;
        this.headers = options.headers;

    }

    getInitialCards() {
        return this._getInitial('cards')
    }

    addCard(body) {
        return this._POST('cards', body);
    }

    deleteCard(id){
       return this._DELETE(`cards/${id}`)
    }

    addCardLike(id, body){
       return this._PUT(`cards/${id}/likes`, body)
    }

    removeCardLike(id){
        return this._DELETE(`cards/${id}/likes`)

    }

    getUserData() {
        return this._getInitial('users/me')
    }

    updateUserInfo(body) {
        return this._PATCH(body, `users/me`)
    }

    updateAvatar(body){
        return this._PATCH(body, `users/me/avatar`)
    }

    _getInitial(path) {
        return fetch(this.baseUrl + path, {
            headers: this.headers

         }).then(res => {
            return this._checkResponse(res)
//            console.log(res.json())
//            console.log()
         })

    }

    _PATCH(body, path) {
        path = path != undefined ? `/${path}` : '/';
        return fetch(this.baseUrl + path, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify(body)
        }).then(res => this._checkResponse(res))
    }

    _POST(path, body) {
        return fetch(this.baseUrl+path, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => this._checkResponse(res))
        .then(result => {
            return result
        })
    }

    _DELETE(path) {
        return fetch(this.baseUrl + path, {
            method: 'DELETE',
            headers: this.headers,
        }).then(res => {
            return this._checkResponse(res);
        }).then((result) => {
            return result
        })
    }

    _PUT(id, body){
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => {
            return this._checkResponse(res);
        }).then((result) => {
            console.log(result)
            return result
        })
    }

    _checkResponse(res) {
        if(res.ok){
            return res.json()
        }
        return { data: Promise.reject(`Ошибка: ${res.status}`), status: false}
    }
}



