const helperJs = require("@henil0604/helperjs");
const delayer = require("../../helpers/delayer");
const getClient = require("../../socket/modules/getClient");

module.exports = async (req, res) => {

    const sid = req.body.sid;
    const query = req.body.query;
    const client = getClient(sid);

    if (!client) {
        return res.send({
            status: "error",
            message: "Invalid client"
        })
    }

    let token = helperJs.random(32);
    let event = `execute-complete-${token}`;

    client.once(event, (data) => {
        return res.send({
            status: "success",
            message: "Executed",
            data
        });
    })

    await delayer(100);

    log(`Executing Query for ${sid}...`)

    client.emit("execute", { query, token });

}