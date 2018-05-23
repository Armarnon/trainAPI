"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var http_1 = require("http");
var cors = require("cors");
var user_1 = require("./controller/user");
var config = require("config");
var login_1 = require("./controller/login");
var auth_1 = require("./shared/auth");
var issue_1 = require("./controller/issue");
var io = require("socket.io");
var pic_1 = require("./controller/pic");
var app = express();
var server = new http_1.Server(app);
//const port:number = 3000;
var port = server.listen(config.get("port"));
var socket_IO = io(server);
console.log("server start on port " + port.address()["port"]);
socket_IO.on("connection", function (_socket) {
    _socket.on('hello', function (payload) {
        // _socket.emit('news', "");
    });
    _socket.emit("XXX", "payload data");
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(auth_1.jwt.initialize());
app.use('/api/v1/user', user_1.UserController);
app.use('/api/v1/login', login_1.LoginController);
app.use('/api/v1/issue', issue_1.IssueController);
app.use('/api/v1/pic', pic_1.PicController);
//# sourceMappingURL=C:/Users/92717/trainAPI/app.js.map