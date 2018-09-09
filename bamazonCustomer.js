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
      },
      
      ]).then(function(answers) {
        updateQuantity(answers);
        getPrice(answers);
      });
  }

   function updateQuantity(answers){
       console.log(answers);
       var quantity = parseInt(answers.productQuantity);
       var ID = parseInt(answers.productID);
    //    var price = connection.query("SELECT price FROM products WHERE item_id =" + " " + ID);
       connection.query("SELECT stock_quantity FROM products WHERE item_id =" + " " + ID, function(error, results){
        var stockQuantity = results[0].stock_quantity;
       if (quantity <= stockQuantity) {
        connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + "  WHERE item_id = " + ID , function(error, results){
        loadProduct();
        })
       } else {
           console.log("Insufficient quantity!")
       }
    });
   }
    
   function getPrice(answers){
      var quantity1 = parseInt(answers.productQuantity)
      var ID1 = parseInt(answers.productID)
      connection.query("SELECT price FROM products WHERE item_id =" + " " + ID1, function(error, results){
        //   console.log(ID1, quantity1, results[0].price)
          var price = parseInt(results[0].price)* quantity1;
          console.log("Your Price is: $" + price);
          
      });
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



