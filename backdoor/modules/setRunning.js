let stateJson = require("./stateJson");

module.exports = (running = true) => {

    stateJson.update((data) => {
        data.running = running;
        return data;
    })

    return stateJson.get();

}