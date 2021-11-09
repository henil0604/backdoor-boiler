const socketio = require("socket.io-client")
const chalk = require("chalk");


const connect = async () => {
    return new Promise(async resolve => {

        let reconnecting = false;


        const connectionURI = (await load_config())["listener-uri"]

        log(`Connecting to ${chalk.cyanBright(connectionURI)}`)

        const socket = socketio.io(connectionURI)

        const reconnect = async () => {

            if (!reconnecting) {
                log("Already Connecting...", "warn")
                return false;
            }

            reconnecting = true;

            let reconnectDelay = (await load_config())["connect.reconnectDelay"];

            socket.disconnect();
            socket.close();
            log("Failed to Connect to Host. Retrying...", "error")
            await delayer(reconnectDelay != undefined ? reconnectDelay : 3000);
            let toReturn = await connect()
            reconnecting = false;
            return toReturn;
        }

        socket.connect(connectionURI)

        globalThis.socket = socket;

        socket.on("connect", () => {
            log("Connected to the Listener Host", "success");
            resolve(true)
        })

        socket.on("connect_error", () => {
            reconnect()
            resolve(false)
        })

        socket.on("disconnect", async () => {
            log("Disconnected to the Listener Host. Retrying...", "error")
            resolve(reconnect())
        })

    })
}




module.exports = connect;