const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
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
            || !validator.isLength(username, { min: 4, max: 16, })
            || !validator.isLength(password, { min: 6, max: 16, }))
            ? true : false;
    }


    jwtSign(user) {
        return new Promise((resolve, reject) => {
            try {
                jwt.sign(
                    {
                        iss: config.iss || 'iss-not-specified',
                        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                        data: user,
                    },
                    config.secret,
                    (err, token) => {
                        if (err) reject(err)
                        resolve(token);
                    },
                )
            } catch (error) {
                reject(error)
            }
        })
    }

    compare(password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, this.password, (err, isMatched) => {
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
                            userName: {
                                [Op.iLike]: '%' + this.userName + '%'
                            }
                        },
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
                reject(erorr);
            }
        })
    }


    login() {
        return new Promise(async (resolve, reject) => {
            try {
                if (validationFunc()) reject({ status: 400 })

                let user = await this.findUser();
                await this.compare(user.password)

                user = user.get({ plain: true })
                delete user.password

                let token = await this.jwtSign(user)

                resolve({
                    token,
                    login: user
                })
            } catch (error) {
                reject(error)
            }
        })

    }

}

exports.Login = Login