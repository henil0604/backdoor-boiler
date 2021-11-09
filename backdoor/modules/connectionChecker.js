module.exports = async () => {
    let intervalTime = (await load_config())["connectionChecker.intervalTime"]

    return setInterval(() => {

        let stamp = Date.now();
        let sid = socket.id;

        let event = `are-you-alive-reponse-to-${sid}-when-${stamp}`;

        socket.once(event, (data) => {
            log("Found Alive!");
        });

        socket.emit("are-you-alive", {
            stamp,
            sid
        });

    }, intervalTime);
}