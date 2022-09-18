var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors")
require("dotenv").config()

var indexRouter = require('./routes/index');
const utilsHelper = require('./helpers/utils.helper');

var app = express();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
}
var http = require("https");
setInterval(function () {
    console.log("he", process.env.BE_URL)
    http.get(process.env.BE_URL);
}, 300000);
console.log('restart')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


app.use('/api', indexRouter);

//catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("404 - Resource not found");
    next(err);
});

//Initialize Error handling
app.use((err, req, res, next) => {
    console.log("ERROR", err);
    const statusCode = err.message.split(" - ")[0];
    const message = err.message.split(" - ")[1];
    if (!isNaN(statusCode)) {
        utilsHelper.sendResponse(res, statusCode, false, null, { message }, null);
    } else {
        utilsHelper.sendResponse(
            res,
            500,
            false,
            null,
            { message: err.message },
            "Internal Server Error"
        );
    }
});

module.exports = app;
