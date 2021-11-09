const store = require("store2");
const connectionChecker = require("./modules/connectionChecker");

module.exports = (app) => {
    const http = require('http');
    const server = http.createServer(app);
    const { Server } = require("socket.io");
    const io = new Server(server);

    globalThis.io = io;
    globalThis.log = require("../helpers/log");
    globalThis.Interval$ = {};

    store.clearAll();

    store.set("socket.connections", []);

    io.on('connection', require("./on/connection"));

    globalThis.Interval$.connectionChecker = connectionChecker()

    return { io, server };
}