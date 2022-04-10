
export default class Api {

    constructor(options) {

        this.baseUrl = options.baseUrl;
        this.headers = options.headers;

    }

    getInitial() {
        return fetch(this.baseUrl, {
            headers: this.headers

         })
         .then(res => {
            if(res.ok){
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
         })
         .catch((err) => {
            console.log(err)
         })
    }

    PATCH(body) {
        return fetch(this.baseUrl, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify(body)
        }).then(res => {
            if(res.ok){
                return true;
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    POST(body) {
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            return result
        }).catch((err) => {
            console.log(err)
        })
    }

    DELETE(id) {
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then(res => {
            if(res.ok){
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((result) => {
            return result
        }).catch((err) => {
            console.log(err)
        })
    }

    PUT(id, body){
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((result) => {
            return result
        }).catch((err) => {
            console.log(err)
        })
    }
}



