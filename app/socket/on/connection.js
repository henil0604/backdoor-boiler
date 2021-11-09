const store = require("store2");
const log = require("../../helpers/log");
const chalk = require("chalk");


module.exports = (socket) => {

    log(`Connected With ${chalk.cyanBright(socket.id)}`, "info")

    store.transact("socket.connections", (arr) => {
        arr.push({
            sid: socket.id,
            handshake: socket.handshake.query,
            connectionTime: Date.now(),
        })
        return arr;
    })

    const events = require("../data/events");

    events.forEach(e => {
        socket.on(e.name, (...args) => {
            e.listener(socket, ...args)
        })
    })

}
