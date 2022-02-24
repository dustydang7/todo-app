const Pool = require('pg').Pool;

const pool = new Pool ({
    user: "Dusty",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "Tasks"
});

module.exports = pool;