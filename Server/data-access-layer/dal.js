const db=require("mysql");

//* Create a connection pool with specified parameters
const pool=db.createPool({
    host: "localhost",
    user: "root",
    database: "super_db"
});

//* Log a message to the console once the database connection has been established
console.log("connected to db");

//* Function to execute a SQL command asynchronously using the connection pool
function executeQueryAsync(sqlCmd) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, (err, rows)=> {
            //* Reject the Promise with the error if one occurs
            if (err) {
                reject(err);
            }
            //* Otherwise, resolve the Promise with the query result
            else {
                resolve(rows);      
            }
        });
    });
}

//* Export the function for use in other modules
module.exports = {
    executeQueryAsync
};
