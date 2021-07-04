require("dotenv").config();

// Frame Work
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");

//Database
const database= require("./Database/database");


//microservices routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// Initialization
const booky = express();

//configuration
booky.use(express.json());

//Establish database connection
mongoose.connect(process.env.MONGO_URL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,  
}
).then(() => console.log("connection established!!!!!!"));

// initialzing microservices
booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publications);




booky.listen(2222, () => console.log("Hey server is up and running!!!"));


