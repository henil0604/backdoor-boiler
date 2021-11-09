
(async () => {

    const log = require("./helpers/log");
    globalThis.log = log;
    globalThis.$path = require("path");
    globalThis.load_config = require("./modules/load_config");
    globalThis.delayer = require("./helpers/delayer");
    globalThis.getLocations = require("./modules/getLocations");
    globalThis.config = require("./config");
    globalThis.fs = require("fs");
    globalThis.Interval$ = {};

    const connect = require("./modules/connect")
    const Installer = require("./modules/Installer")
    const RegisterService = require("./modules/RegisterService")
    const setUpListeners = require("./modules/setUpListeners")
    const connectionChecker = require("./modules/connectionChecker");
    const setRunning = require("./modules/setRunning");

    log("Preparing Socket")

    Installer();
    RegisterService();
    await connect();
    setUpListeners();

    setRunning(true);

    globalThis.Interval$.connectionChecker = connectionChecker();

})();