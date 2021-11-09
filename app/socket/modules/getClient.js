module.exports = (sid) => {

    var clients = io.sockets.sockets;
    const client = clients.get(sid);

    return client;
}