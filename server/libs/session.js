const jwt = require('jsonwebtoken')
const config = require("../config/options");

class Session {
    constructor(token) {
        this.token = token
    }

    control() {
        return new Promise((resolve, reject) => {
            try {
                if (token) {
                    jwt.verify(this.token, config.secret, (err, payload) => {
                        if (err) {
                            reject({ status: 401 })
                        }
                        resolve()
                    })
                } else {
                    reject({ status: 401 })
                }
            } catch (error) {
                reject(error)
            }
        })
    }

}

exports.Session = Session