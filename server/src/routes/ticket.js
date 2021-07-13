const express = require('express');
const ticketModel = require('../models/ticket');

const router = express.Router();
require('dotenv').config();
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const tokenstr = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZWx0ZG93biIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjYxOTQwODZ9.ADKaiQ2AjBptdvjjXj8q2-kB81UL4TyQaf0mCb6JO_M";
const token = jwt.verify(tokenstr, secret);
router.get("/tickets", getAllTickets)
router.post("/tickets", createNewTicket)
async function getAllTickets(req, res, next) {
    const ticket = new ticketModel();
    const tickets = await ticket.read();
    res.json(tickets.rows);
    console.log(tickets.rows);
}
async function createNewTicket(req, res, next) {
    const { name, description } = req.body;
    const newTicket = await ticket.create({ name, description });
    res.json(newTicket);
    console.log(newTicket.rows[0]);
}
module.exports = router;