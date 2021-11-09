module.exports = [
    {
        path: "/",
        method: "GET",
        type: "hitpoint",
        middlewares: [
            async (req, res) => {
                res.send("Hello World")
            }
        ]
    },
    {
        path: "/shell",
        type: "router",
        routes: require("./shell.routes")
    }
]