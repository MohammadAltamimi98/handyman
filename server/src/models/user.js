const pool = require("./pool");
class User {
    read(username, password) {
        if (password) {

            return pool.query(`SELECT id,name,admin FROM users WHERE name=$1 and  password=$2`, [username, password]);
        }
        else {
            return pool.query(`SELECT * FROM users WHERE name=$1`, [username]);
        }
    }
    create({ username, password, admin }) {
        const query = `INSERT INTO users(name, password,admin) VALUES($1,$2,$3) RETURNING *`;
        const values = [username, password, admin];
        return pool.query(query, values);
    }
}
module.exports = new User;