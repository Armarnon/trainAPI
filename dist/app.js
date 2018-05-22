"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var http_1 = require("http");
var cors = require("cors");
var user_1 = require("./controller/user");
var app = express();
var server = new http_1.Server(app);
var port = 3000;
server.listen(port);
console.log("server start on port " + port);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/v1/user', user_1.UserController);
//# sourceMappingURL=C:/Users/92717/trainAPI/app.js.map