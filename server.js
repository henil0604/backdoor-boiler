const log = require("./app/helpers/log");
log("Loading Modules...");
let app = require('./app');
const env = require("./app/helpers/env");
const RouterManager = require("./app/middlewares/RouterManager")
const PORT = env("PORT") || 4141;

const socket = require("./app/socket")

const { io, server } = socket(app);

app.use(require("./app/middlewares/hit"));

app.use((req, res, next) => {
    req.io = io;
    next();
})

app = RouterManager(
    app,
    require("./app/data/routes")
)


server.listen(PORT, () => {
    log(`Listening on PORT ${log.chalk.greenBright(PORT)}`, 'success');
    log(`Load time: ${Date.now() - app.__STARTING_TIME}ms`);
});