const sql = require('mssql');

(async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('server=192.168.0.106,1433;database=BikeStores;user id=sa;password=1234;encrypt=true;trustServerCertificate=true')
        const result = await sql.query(`select * from "sales.orders"`)
        console.dir(result)
    } catch (err) {
        // ... error checks
	console.log( err )
    }
})();
