const pool = require("./pool");
class Ticket {
    constructor(userId) {
        this.userId = userId;
    }
    read() {
        if (this.userId) {
            return pool.query(`SELECT * FROM tickets WHERE userid=(select id from users where id=$1)`, [this.userId]);
        }
        return pool.query(`SELECT * FROM tickets`);
    }
    create({ name, description }) {
        if (this.userId) {
            const query = `INSERT INTO tickets(userid,name, description) VALUES($1,$2,$3) RETURNING *`;
            console.log(this.userId, description, name);
            const values = [this.userId, name, description];
            return pool.query(query, values);
        }

    }
    delete(id) {
        const query = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
        const values = [id];
        return pool.query(query, values);
    }
}
module.exports = Ticket;