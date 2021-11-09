const store = require("store2");
const chalk = require("chalk");
const getClient = require("./getClient");

module.exports = () => {
    return setInterval(() => {
        store.get("socket.connections").forEach(e => {

            const client = getClient(e.sid);

            try {

                let stamp = Date.now();

                const event = `are-you-alive-reponse-from-${client.id}-when-${stamp}`

                client.once(event, (data) => {
                    log(`Found Alive: ${chalk.cyanBright(client.id)}`);
                })

                client.emit("are-you-alive", { stamp })

            } catch (error) {

                const isConnected = client?.connected;

                if (isConnected != true) {
                    log(`Failed to check Status... Checking If Present`, "error", "[SOCKET]")
                    log(`Found Non-Present Socket Connection: ${e.sid}. Removing it...`, "info", "[SOCKET]")

                    store.transact("socket.connections", (arr) => {

                        arr.forEach((a, index) => {
                            if (a.sid == e.sid) {
                                arr.splice(index, 1);
                            }
                        })

                        return arr;
                    })

                }

            }

        })
    }, 3000)
}