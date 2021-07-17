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
    create({ adminName, description, type, service }) {
        if (this.userId) {
            const query = `INSERT INTO tickets(adminname,userid,description,type,service ) VALUES($1,$2,$3,$4,$5) RETURNING *`;
            const values = [adminName, this.userId, description, type, service];
            console.log(pool.query(query, values));
            return pool.query(query, values);
        }

    }
    update(adminName, id) {
        if (adminName) {
            const query = `UPDATE tickets SET adminname=$1 where id=$2  RETURNING *`;
            const values = [adminName, id];
            return pool.query(query, values);
        }
    }
    delete(id) {
        const query = `DELETE FROM tickets WHERE id=$1 and userid=(select id from users where id=$2 ) RETURNING *`;
        const values = [id, this.userId];
        return pool.query(query, values);
    }
}
module.exports = Ticket;