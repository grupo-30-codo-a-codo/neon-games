const connection = require('../config/dbConfig');

const getOrders = async (req, res) => {
    const sqlQuery = 'SELECT * FROM orders';
    let orders = {}
    connection.query(sqlQuery, ((error, result) => {
        if(error) throw Error;
        res.json(result);
    }))
}



module.exports = getOrders;