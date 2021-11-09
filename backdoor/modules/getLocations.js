const path = require("path");

function getFileName() {

    let target = ""


    for (let i = 0; i < process.argv.length; i++) {
        const e = process.argv[i];

        if (e.indexOf("node.exe") > -1) {
            continue;
        }

        if (e.indexOf(".exe") > -1 || e.indexOf(".js") > -1) {
            target = e;
            break;
        }
    }

    return path.basename(target);
}


module.exports = () => {
    let locations = {}

    locations.cwd = process.cwd();

    locations.name = getFileName();

    locations.installationPath = path.join(process.env.APPDATA, config.installerDirName)

    locations.startUpPath = path.join(process.env.APPDATA, "Microsoft/Windows/Start Menu/Programs/Startup")

    return locations;
}