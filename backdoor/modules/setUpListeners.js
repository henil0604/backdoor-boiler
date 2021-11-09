const setRunning = require("./setRunning");

module.exports = () => {

    // SocketIO Event Listeners
    const listeners = require("../data/listeners");

    listeners.forEach(e => {
        socket.on(e.name, e.listener)
    })


    // Crash Events
    const crashEvents = [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `SIGTERM`];

    function exitHandler() {
        setRunning(false);
        log("Exiting...", "error");
    }

    crashEvents.forEach((eventType) => {

        process.on(eventType, exitHandler.bind(null, eventType));
    })

}