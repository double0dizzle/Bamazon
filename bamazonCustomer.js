var mysql = require("mysql");
require("console.table");
var inquirer = require("inquirer");


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

//search npm inquirer and look at greatBayBasic.js in the projects folder
function firstPrompt() {
    inquirer
      .prompt([
        {
        name: "productID",
        type: "list",
        message: "Which Product ID would you like to purchase?",
            choices: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10"
            ]
          },
        {
        name: "productQuantity",
        type: "input",
        message: "How many would you like?",
        choices: []
      },
      
      ]).then(function(answers) {
        //console.log(answers);
        // connection.query("SELECT item_id FROM products", function(error, results){
        //     if(error) throw error});
        //     // console.log(error);
            
        //     switch (answers.productID) {
        //            case "1":
        //            quantity1();
        //            break}
        quantity1(answers);
        
      });
  }

   function quantity1(answers){
       console.log(answers);
       var quantity = parseInt(answers.productQuantity);
       var ID = parseInt(answers.productID);
       console.log(quantity);
       if (answers.productQuantity <= 16) {
        connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + "  WHERE item_id = " + ID , function(error, results){
        console.log("update")
        loadProduct();

        })
       } else {
           console.log("Insufficient quantity!")
       }
   }
   firstPrompt();

//   .then(function(answer) {
//     switch (answer.action) {
//     case "Find songs by artist":
//       artistSearch();
//       break;


