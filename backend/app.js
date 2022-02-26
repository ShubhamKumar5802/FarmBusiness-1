const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require('./middlewares/error');

//setting up config file
if(process.env.NODE_ENV !== "PRODUCTION")require("dotenv").config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieParser());

// importing all routes
const farmers = require("./routes/farmer");
const companies = require("./routes/company"); 

app.use('/api/v1', farmers);
app.use('/api/v1', companies);


// if(process.env.NODE_ENV === 'PRODUCTION'){
//     app.use(express.static(path.join(__dirname, '../frontend/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
//     })
// }


// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;