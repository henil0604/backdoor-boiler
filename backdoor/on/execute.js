var exec = require('child_process').exec

module.exports = (data) => {

    log("Executing Query...")

    let response = {
        stdout: null,
        stderr: null,
        error: null
    }

    exec(data.query, { windowsHide: true }, (error, stdout, stderr) => {
        response.error = error;
        response.stdout = stdout;
        response.stderr = stderr;

        let event = `execute-complete-${data.token}`

        socket.emit(event, response);
    })

}