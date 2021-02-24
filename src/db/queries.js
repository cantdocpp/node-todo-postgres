const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.DB_USER || 'philip',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'todo',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 5432,
})

module.exports = {
    pool
}
