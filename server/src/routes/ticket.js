const express = require('express');
const ticketModel = require('../models/ticket');
const router = express.Router();
require('dotenv').config();
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
router.get("/alltickets", getAllTickets)
router.get("/usertickets", getUserTickets);
router.post("/tickets", createNewTicket)
let ticket = new ticketModel();
async function getAllTickets(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ").pop();
        const validToken = jwt.verify(token, secret);
        if (validToken && validToken.admin) {
            const tickets = await ticket.read();
            res.json(tickets.rows);
            console.log(tickets.rows);
        }
        else {
            throw new Error("You Don't have permission!");
        }
    }
    catch (err) {
        res.json({ msg: err.message })
    }

}
async function getUserTickets(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ").pop();
        const validToken = jwt.verify(token, secret);
        if (validToken) {
            ticket = new ticketModel(validToken.id);
            const tickets = await ticket.read();
            res.json(tickets.rows);
        }
        else {
            throw new Error("You Don't have permission!");
        }
    }
    catch (err) {
        res.json({ msg: err.message })
    }
}
async function createNewTicket(req, res, next) {
    const tokenstr = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJyYW1haGkiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjI2MzI4NTYyfQ.zUOMXWpYRYCUm_FeGaJ-A8ZgmE52eJpBzcE70y-ob20";
    const token = jwt.verify(tokenstr, secret);
    const { name, description } = req.body;
    ticket = new ticketModel(token.id);
    const newTicket = await ticket.create({ name, description });
    res.json(newTicket.rows[0]);
    console.log(newTicket.rows[0]);
}
module.exports = router;