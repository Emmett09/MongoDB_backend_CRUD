//This is a backend only submission
//I have set it up to run through all the functionalities when the tester hits "run" in the IDE
//On running a method call will call the first function which will run and then call the next function and so on
//First the USERS collection containing the customers will be accessed, a specified customer will be retrieved
//Next a new customer will be created for this collection
//Next this customer will be updated with new details
//Next this customer will be delete, and finally the entire USERS collection will be retrieved to reflect the change
//Following the CRUD on the USERS collection, the final function will call the first function for the CRUD on the Phones collection
//Similar CRUD will be carried out on this collection, and the final function will call the first function for the CRUD on the Purchases collection
//Similar CRUD will be carried out on this collection and the connection to the database will close when this is complete
//In order to carry out this step by step process I have made my functions async and used a sleeper method
//I have used await sleeper with a specified time in order to set a 10 second delay between functions in order to allow the tester time to see/test

//Create database connection
//https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Emmett09:rE@ES5gQ86pyCn-@cluster0.gdntj.mongodb.net/assignment05?retryWrites=true&w=majority";


//adapted from previous assignment (Simon memory game)
//logic here==> https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
const sleeper = async(ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//method call begins the CRUD activities
findCustomer();

//Retrieve customer
//https://www.w3schools.com/nodejs/nodejs_mongodb_query.asp
async function findCustomer() {
    console.log("The specified customer will be retrieved in 10 seconds");
    await sleeper(10000);
    const client = new MongoClient(url, {useUnifiedTopology: true});
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var query = {FName: "Marie", LName: "Murphy"};
        dbo.collection("USERS").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log("Next a specified customer will be created and will display in 10 seconds")
            db.close();
        });
    });
    //method call continues functionality
    insertCustomer();
}

// Create customer
//https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp
//https://stackoverflow.com/questions/36887928/insert-array-of-objects-into-mongodb
async function insertCustomer() {
    await sleeper(10000);
    var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var myobj = {
            Title: "Mr.", FName: "Danny", LName: "Deleto", Mobile: "0877099999", Email: "d_letethis@gmail.com",
            HomeAddress: {
                Line1: "Random House",
                Line2: "Random Street",
                Town: "Random Town",
                County: "Louth",
                Eircode: "LH777777"
            },
            ShippingAddress: {
                Line1: "Random House",
                Line2: "Random Street",
                Town: "Random Town",
                County: "Louth",
                Eircode: "LH777777"
            },
        };
        dbo.collection("USERS").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("The following new customer was inserted to USERS: ");
            console.log(myobj);
            console.log("Next this newly created customer will be updated in 10 seconds")
            db.close();
        });
    });
    updateCustomer();
}

//Update customer
//https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp
async function updateCustomer() {
    await sleeper(10000);
    var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var myquery = {FName: "Danny", LName: "Deleto"};
        var newvalues = {$set: {Title: "Mx.", Mobile: "0834444333", Email: "plzdeletthis@hotmail.com"}};
        dbo.collection("USERS").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("The created user has been updated with the following details: ");
            console.log(newvalues)
            console.log("This updated user will display in 10 seconds")
            db.close();
        });
    });
    findUpdatedCustomer();
}

//Retrieve updated customer
async function findUpdatedCustomer() {
    await sleeper(10000);
    const client = new MongoClient(url, {useUnifiedTopology: true});
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var query = {FName: "Danny", LName: "Deleto"};
        dbo.collection("USERS").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log("This user will now be deleted")
            db.close();
        });
    });
    deleteCustomer();
}

//Delete customer
//https://www.w3schools.com/nodejs/nodejs_mongodb_delete.asp
async function deleteCustomer() {
    await sleeper(10000);
    var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, {useUnifiedTopology: true},function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var myquery = {FName: "Danny", LName: "Deleto", Mobile: "0834444333", Email: "plzdeletthis@hotmail.com"};
        dbo.collection("USERS").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("The recently created user was deleted");
            console.log("The full customer table will display in 10 seconds");
            db.close();
        });
    });
    showCustomers();
}

async function showCustomers() {
    await sleeper(10000);
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        dbo.collection("USERS").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log("This is the customer database");
            console.log(result);
            console.log("Next a specific item queries from the Phones collection will be displayed in 10 seconds");
            db.close();
        });
    });
    findItem();
}

//Retrieve item
async function findItem() {
    await sleeper(10000);
    const client = new MongoClient(url, {useUnifiedTopology: true});
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var query = {Manufacturer: "Nokia", Model: "3330"};
        dbo.collection("Phones").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log("Next a new phone will be created/inserted into the Phones collection and displayed");
            db.close();
        });
    });
    insertItem();
}

// Create item
async function insertItem() {
    await sleeper(10000);
    var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, {useUnifiedTopology: true},function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var myobj = { Manufacturer: "Samsung", Model: "Galaxy S8", Price: "€300" };
        dbo.collection("Phones").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("The following phone was added to the Phones collection: ");
            console.log(myobj);
            console.log("This item will be updated with new details in 10 seconds");
            db.close();
        });
    });
    updateItem();
}

//Update item
async function updateItem() {
    await sleeper(10000);
    var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, {useUnifiedTopology: true},function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var myquery = {Manufacturer: "Samsung", Model: "Galaxy S8"};
        var newvalues = {$set: {Manufacturer: "Huawei", Model: "P20", Price: "€350"}};
        dbo.collection("Phones").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("This newly created item has been updated with the following details: ");
            console.log(newvalues);
            console.log("Next, this item will be displayed, reflecting its updates");
            db.close();
        });
    });
    findUpdatedItem();
}

//Retrieve updated item
async function findUpdatedItem() {
    await sleeper(10000);
    const client = new MongoClient(url, {useUnifiedTopology: true});
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var query = {Manufacturer: "Huawei", Model: "P20"};
        dbo.collection("Phones").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log("This item will now be deleted")
            db.close();
        });
    });
    deleteItem();
}

//Delete item
async function deleteItem() {
    await sleeper(10000);
    var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, {useUnifiedTopology: true},function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var myquery = {Manufacturer: "Huawei", Model: "P20", Price: "€350" };
        dbo.collection("Phones").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("Newest entry deleted, the Phones collection will display in 10 seconds reflecting the change");
            db.close();
        });
    });
    showPhones();
}

//shows entire phones collection
async function showPhones() {
    await sleeper(10000);
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        dbo.collection("Phones").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log("This is the phones database");
            console.log(result);
            db.close();
        });
    });
    showPurchase();
}

//Retrieve specified purchase
async function showPurchase() {
    console.log("The specified purchases for this customer will be retrieved in 10 seconds");
    await sleeper(10000);
    const client = new MongoClient(url, {useUnifiedTopology: true});
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var query = {'Customer.Name': "Mr. Emmett Mulroy"};
        dbo.collection("Purchases").find(query).toArray(function (err, result) {
            if (err) throw err;
            for (let i in result) {
                console.log(result[i]["_id"]);
                console.log(result[i]["Customer"]);
                console.log(result[i]["PurchasedItems"])
            }
            console.log("Next a specified purchase will be created and will display in 10 seconds")
            //console.log(JSON.stringify(result));
            db.close();
        });
    });
    insertPurchase();
}


// Create purchase
async function insertPurchase() {
    await sleeper(10000);
    var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var myobj = {
            Customer: {
                ID: "6082bb3185c0bd873c409c2c",
                Name: "Mrs. Samantha Duke",
                Address: "54 Real Street",
            },
            PurchasedItems: [{
                Reference: "607c1cb93c127200650ef0dd",
                Manufacturer: "Nokia",
                Model: "3330",
                Price: "€20",
            },
                {
                    Reference: "607c37513c127200650ef0e0",
                    Manufacturer: "Apple",
                    Model: "iPhone 8",
                    Price: "€200"
                }],
        };
        dbo.collection("Purchases").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("The following entry was inserted to Purchases: ");
            console.log(myobj);
            console.log("Next this newly created purchase will be updated in 10 seconds")
            db.close();
        });
    });
    updatePurchase();
}


//Update Purchase
async function updatePurchase() {
    await sleeper(10000);
    var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var myquery = {'Customer.Name': "Mrs. Samantha Duke", 'Customer.Address': "54 Real Street"};
        var newvalues = {$set: {'Customer.Name': "Ms. Sam Kennedy", 'Customer.Address': "1 Different Street"}};
        dbo.collection("Purchases").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("The created Purchase has been updated with the following details: ");
            console.log(newvalues)
            console.log("This updated Purchase will display in 10 seconds")
            db.close();
        });
    });
    showUpdatedPurchase();
}

async function showUpdatedPurchase() {
    await sleeper(10000);
    const client = new MongoClient(url, {useUnifiedTopology: true});
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var query = {'Customer.Name': "Ms. Sam Kennedy"};
        dbo.collection("Purchases").find(query).toArray(function (err, result) {
            if (err) throw err;
            for (let i in result) {
                console.log(result[i]["_id"]);
                console.log(result[i]["Customer"]);
                console.log(result[i]["PurchasedItems"])
            }
            console.log("Next the newly created purchase will be deleted");
            console.log(JSON.stringify(result));
            db.close();
        });
    });
    deletePurchases();
}
//Delete Purchases
async function deletePurchases() {
    await sleeper(10000);
    var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, {useUnifiedTopology: true},function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        var myquery = {'Customer.Name': "Ms. Sam Kennedy", 'Customer.Address': "1 Different Street"};
        dbo.collection("Purchases").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("The recently Purchase was deleted");
            console.log("The full Purchases table will display in 10 seconds");
            db.close();
        });
    });
    showPurchases();
}

//shows entire phones collection
async function showPurchases() {
    await sleeper(10000);
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("assignment05");
        dbo.collection("Purchases").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log("This is the Purchases database");
            //for loop needed to iterate through and display the arrays of objects
            for (let i in result) {
                console.log(result[i]["_id"]);
                console.log(result[i]["Customer"]);
                console.log(result[i]["PurchasedItems"])
            }
            db.close();
        });
    });
}

/*For my database I used 3 collections. USERS represents the customers, Phones represents the phones available for purchase,
and Purchases represents the purchases by each customer. For the USERS collection I used Strings for the title, first and last name,
mobile, and email, and an object of strings for both the home and shipping addresses. For the Phones collection I used
Strings for the manufacturer, model and price. I handled the Purchases collection by using an object of strings for each
customer, using the ID from the USERS collection relating to each customer. For their purchases I used an array of objects
with each object containing Strings detailing the phones purchases and including the ID relating to each phone from the Phones
collection.
 */

