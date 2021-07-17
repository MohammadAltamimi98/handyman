const express = require('express');
const ticketModel = require('../models/ticket');
const router = express.Router();
require('dotenv').config();
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
router.get("/alltickets", getAllTickets); // for admin
router.get("/usertickets", getUserTickets); // get user tickets
router.post("/tickets", createNewTicket); // create new ticket
router.delete("/deleteticket", deleteTicketHandler);
router.put("/updateticket", updateTicketHandler);
async function getAllTickets(req, res, next) {
    try {
        let ticket = new ticketModel();
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
        let ticket = new ticketModel();
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
    try {
        let ticket = new ticketModel();
        console.log(req.body);
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ").pop();
        console.log(token);
        const validToken = jwt.verify(token, secret);
        if (validToken) {
            const { adminName, description, type, service } = req.body;
            console.log(req.body);
            ticket = new ticketModel(validToken.id);
            const newTicket = await ticket.create({ adminName, description, type, service });
            res.json(newTicket.rows);
            console.log(newTicket.rows);
        }
        else {
            throw new Error("You Don't have permission!");
        }
    }
    catch (err) {
        res.json({ msg: err.message })
    }
}
async function deleteTicketHandler(req, res, next) {
    try {
        const { id } = req.body;
        const token = req.headers.authorization.split(" ").pop();
        const validToken = jwt.verify(token, secret);
        if (validToken) {
            const ticket = new ticketModel(validToken.id);
            const deleteTicket = await ticket.delete(id);
            res.json(deleteTicket.rows[0]);
        }
        else {
            throw new Error("something went wrong!");
        }

    }
    catch (err) {
        res.json({ msg: err.message })
    }
}
async function updateTicketHandler(req, res, next) {
    let { id, adminName } = req.body;
    const token = req.headers.authorization.split(" ").pop();
    const validToken = jwt.verify(token, secret);
    if (validToken) {
        const ticket = new ticketModel(validToken.id);
        const ticketUpdate = await ticket.update(adminName, id);
        console.log(ticketUpdate.rows[0]);
        res.json(ticketUpdate.rows[0]);
    }
}
module.exports = router;