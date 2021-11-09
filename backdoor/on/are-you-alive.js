module.exports = (data) => {
    const event = `are-you-alive-reponse-from-${socket.id}-when-${data.stamp}`
    socket.emit(event, {
        sid: socket.sid
    })
    log(`Alive Response Sent!`)
}