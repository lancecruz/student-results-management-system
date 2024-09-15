const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
});

const query = async (text, params, callback) => {
    console.log("test");
    const data = await pool.query(text, params, callback);
    return data; 
};

module.exports = {
    query
};