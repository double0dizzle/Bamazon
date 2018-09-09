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
      {
          name: "price",
      }
      
      ]).then(function(answers) {
        updateQuantity(answers);
        
      });
  }

   function updateQuantity(answers){
       console.log(answers);
       var quantity = parseInt(answers.productQuantity);
       var ID = parseInt(answers.productID);
       var price = connection.query("SELECT price FROM products WHERE item_id =" + " " + ID);
       var price1 = parseInt(price);
       console.log(quantity);
       if (answers.productQuantity <= 1) {
        connection.query("SELECT price FROM products WHERE item_id =" + " " + ID, function(error, results){
            loadProduct();
            console.log("Your price is" + price)
        });
        connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + "  WHERE item_id = " + ID , function(error, results){
        // loadProduct();
        

        })
       } else {
           console.log("Insufficient quantity!")
       }
   }
   firstPrompt();

//    function price(answers) {
//     var quantity = parseInt(answers.productQuantity);
//     var ID = parseInt(answers.productID);
//     console.log(quantity);
//     if (answers.productQuantity >= 1) {
//      connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + "  WHERE item_id = " + ID , function(error, results){
//      console.log("update")
//      loadProduct();

//      })
//     }
//    }



