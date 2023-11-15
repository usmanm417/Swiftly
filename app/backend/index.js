const sql = require("mssql/msnodesqlv8");

// db config
var config = {
    server:"OMARS-PC",
    database:"swiftlymobile",
    driver:"msnodesqlv8",
    DSN:"msnodesqlv8",
    options:{
        trustedConnection: true
    },
};

// connect to db
sql.connect(config,function(err) {
    if (err) {
        console.log(err)
    }

    // create request here
    var request = new sql.Request();

    // db query
    request.query('SELECT * FROM Items WHERE id = 0725643897', function(err, recordSet){
        if (err) {
            console.log(err);
        } else {
            console.log(recordSet);
        }
    })
})