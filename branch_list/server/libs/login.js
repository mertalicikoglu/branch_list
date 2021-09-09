const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../config/options");
const validator = require('validator')

class Login {
    constructor(userName, password, db) {
        this.userName = userName
        this.password = password
        this.db = db
    }


    validationFunc() {
        return (!this.userName
            || !this.password
            || !validator.isLength(this.userName, { min: 4, max: 16, })
            || !validator.isLength(this.password, { min: 6, max: 16, }))
            ? true : false;
    }


    jwtSign(user) {
        return new Promise((resolve, reject) => {
            try {
                var token = jwt.sign({
                    iss: config.iss || 'iss-not-specified',
                    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                    data: user,
                },
                    config.secret);
                resolve(token);

            } catch (error) {
                reject(error)
            }
        })
    }

    compare(password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(this.password, password, (err, isMatched) => {
                if (err) reject(err)
                if (!isMatched) {
                    reject({ status: 401 });
                }
                resolve(true);
            })
        });
    }


    findUser() {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.user
                    .findOne({
                        where: {
                            userName: this.userName
                        },
                        include: [{
                            model: this.db.role,
                            as: 'roles'
                        }]
                    })
                    .then((user) => {
                        if (!user) {
                            reject({ status: 401 })
                        }
                        resolve(user);
                    })
                    .catch((e) => {
                        reject(e)
                    })
            } catch (error) {
                reject(error);
            }
        })
    }


    login() {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.validationFunc()) reject({ status: 400 })

                let user = await this.findUser();
                await this.compare(user.password)
                user = user.get({ plain: true })
                delete user.password

                let token = await this.jwtSign(user)
                resolve({
                    token,
                    user
                })
            } catch (error) {
                reject(error)
            }
        })

    }

}

exports.Login = Login