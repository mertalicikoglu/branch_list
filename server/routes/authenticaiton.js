import express from 'express';

const router = express.Router({ caseSensitive: true })

const Login = require("../libs/login").Login

const Session = require("../libs/session").Session



router.post("/auth/login", async (req, res, next) => {
    try {
        const db = req.app.get('db');
        let login = new Login(req.body.username, req.body.password, db)
        let response = await login.login();
        return res.json(response)
    } catch (error) {
        if (error.status) {
            res.sendStatus(error.status)
            return
        }
        next(error)
    }
});


router.use('/api/*', async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        let session = new Session(token)
        let account = await session.control()
        console.log("account",account)
        req.account = account
        next()
    } catch (error) {
        if (error.status) {
            res.sendStatus(error.status)
            return
        }
        res.sendStatus(401)
    }

})


export default router;
