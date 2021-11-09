const config = require("../config");
const request = require("request-promise");

const defaultConfig = {
    "listener-uri": "http://localhost:4141",
    "connectionChecker.intervalTime": 3000,
    "connect.reconnectDelay": 1000
};

module.exports = async () => {
    try {
        return JSON.parse(await request.get(config.dynamic_config))
    } catch (e) {
        return defaultConfig;
    }
}