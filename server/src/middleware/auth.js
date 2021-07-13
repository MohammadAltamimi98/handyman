"use strict";

const base64 = require("base-64");
const bcrypt = require('bcrypt');
const User = require("../models/user");

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return _authError();
    }

    let basic = req.headers.authorization.split(" ").pop();
    let [username, password] = base64.decode(basic).split(":");

    try {
        req.user = await User.read(username);
        let valid = await bcrypt.compare(password, req.user.rows[0].password);
        if (valid) {
            next();
        }
        else {
            throw new Error("Invalid")
        }

    } catch (e) {
        _authError();
    }

    function _authError() {
        res.status(403).send("Invalid Login");
    }
};