
export default class Api {

    constructor(options) {

        this.baseUrl = options.baseUrl;
        this.headers = options.headers;

    }

    getInitial() {
        return fetch(this.baseUrl, {
            headers: this.headers

         }).then(res => {
            return this._checkResponse(res)
//            console.log(res.json())
//            console.log()
         })

    }

    PATCH(body, path) {
        path = path != undefined ? `/${path}` : '/';
        return fetch(this.baseUrl + path, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify(body)
        }).then(res => this._checkResponse(res))
    }

    POST(body) {
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => this._checkResponse(res))
        .then(result => {
            return result
        })
    }

    DELETE(id) {
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then(res => {
            return this._checkResponse(res);
        }).then((result) => {
            return result
        })
    }

    PUT(id, body){
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => {
            return this._checkResponse(res);
        }).then((result) => {
            return result
        })
    }

    async _checkResponse(res) {
        if(res.ok){
            const data = await res.json()
            return { data: data, status: true}
        }
        return { data: Promise.reject(`Ошибка: ${res.status}`), status: false}
    }

}



