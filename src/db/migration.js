const { pool } = require('./queries');

(function() {
    pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            ID SERIAL PRIMARY KEY,
            task_name varchar(45) NOT NULL
        )
    `, (err, result) => {
        if (err) {
            throw error
        }
        console.log('finish migrating table')
    })
})()
