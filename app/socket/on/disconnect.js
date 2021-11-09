const store = require("store2");
const log = require("../../helpers/log");
const chalk = require("chalk");


module.exports = (socket) => {

    store.transact("socket.connections", (arr) => {
        arr.forEach((e, index) => {
            if (e.sid == socket.id) {
                arr.splice(index, 1)
            }
        })
        return arr;
    })

    log(`Disconnected With ${chalk.redBright(socket.id)}`, "error")
}