const express = require('express');
const router = express.Router();
require('dotenv').config();
const userModel = require('../models/user');
const basic = require('../middleware/auth');
const secret = process.env.SECRET;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post("/login", basic, loginHandler)
router.post("/signup", signUpHandler);
async function loginHandler(req, res, next) {
    let username = req.user.rows[0].name;
    let password = req.user.password;
    const user = await userModel.read(username, password);
    const tokenObject = {
        id: user.rows[0].id,
        username: user.rows[0].name,
        admin: user.rows[0].admin,
    }
    if (user) {
        let token = jwt.sign(tokenObject, secret);
        res.status(200).json({ user: tokenObject, token })
        next();
    }
}

async function signUpHandler(req, res) {
    let { username, password } = req.body;
    const userExists = await userModel.read(username);
    if (!userExists.rowCount) {
        password = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, password, role: true });
        res.json(user.rows[0])
    }
    else {
        res.json({ msg: "user Already Exists" })
    }
}
module.exports = router;