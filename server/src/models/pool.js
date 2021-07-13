const pg = require("pg");
require("dotenv").config();
const connection = process.env.DATABASE_URL;
pg.defaults.ssl = {
    rejectUnauthorized: false,
};
const pgPool = new pg.Pool({
    connectionString: connection,
});
module.exports = pgPool;