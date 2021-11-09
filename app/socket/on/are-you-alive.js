module.exports = (socket, data) => {
    const { stamp, sid } = data;

    io.to(sid).emit(`are-you-alive-reponse-to-${sid}-when-${stamp}`, { stamp });

    log("Alive Response Sent!");
}