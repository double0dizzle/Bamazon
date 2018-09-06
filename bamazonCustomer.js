var mysql = require("mysql");
require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazondb",
});

connection.connect(function(err){
    if (err) {
        console.log("error" + err)
    }
    else {
        console.log("working")
        loadProduct();
    }
});

//this will show a table of everything in the db
function loadProduct(){
connection.query("SELECT * FROM products", function(error, results){
    if(error) throw error;
    // console.log(results);
    console.table(results);
 

});
}
