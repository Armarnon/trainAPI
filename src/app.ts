import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Server } from 'http';
import * as cors from 'cors';
import { UserController } from './controller/user';
import * as config from 'config';
import { LoginController } from './controller/login';
import { jwt } from './shared/auth';
import { IssueController } from './controller/issue';
import * as io from 'socket.io';
import { PicController } from './controller/pic';
import * as multer from 'multer';

const app = express();
const server = new Server(app);
//const port:number = 3000;
let port = server.listen(config.get("port"));

const socket_IO = io(server);

console.log(`server start on port ${port.address()["port"]}`);

socket_IO.on("connection", (_socket) => {

    _socket.on('newPic', (payload) => {
        socket_IO.emit('updatePic', 1);
    });

    // _socket.emit("XXX", "payload data");
    _socket.on('deletePic', (payload) => {
        socket_IO.emit('updatePic', -1);
    });

});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(jwt.initialize());

app.use('/api/v1/user', UserController);
app.use('/api/v1/login', LoginController);
app.use('/api/v1/issue', IssueController);
app.use('/api/v1/pic', PicController);
