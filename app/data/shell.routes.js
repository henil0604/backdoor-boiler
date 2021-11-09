module.exports = [
    {
        path: "/",
        method: "post",
        middlewares: [
            (req, res) => {
                res.send("Hello");
            }
        ]
    },
    {
        path: "/execute",
        method: "post",
        middlewares: [
            require("../routes/shell/execute")
        ]
    }
]