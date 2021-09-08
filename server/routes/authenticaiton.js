const express = require('express')

const router = express.Router({ caseSensitive: true })

const Login = require("../libs/login").Login

const Session = require("../libs/session").Session



router.post("/api/login", async (req, res, next) => {
    try {
        const db = req.app.get('db');
        let login = await new Login(req.body.username, req.body.password, db)
        res.json(login)
    } catch (error) {
        if (error.status) {
            res.sendStatus(error.status)
            return
        }
        next()
    }
});


router.use('/api/*', async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        let session = await new Session(token)
        res.json(session)
    } catch (error) {
        if (error.status) {
            res.sendStatus(error.status)
            return
        }
        next()
    }

})


export default router;
