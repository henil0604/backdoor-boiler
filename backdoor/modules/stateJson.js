const stateJson = {};

stateJson.get = () => {
    return JSON.parse(fs.readFileSync(stateJson.path(), "utf8"));
}

stateJson.path = () => {
    let stateJsonPath = $path.join(getLocations().installationPath, "state.json");
    return stateJsonPath;
}

stateJson.write = (data) => {
    if (typeof data != "object") {
        return;
    }

    return fs.writeFileSync(stateJson.path(), JSON.stringify(data))
}

stateJson.update = (callback) => {
    let stateJsonData = stateJson.get();

    let updated = callback(stateJsonData);

    if (typeof updated != "object") {
        return false;
    }

    stateJson.write(updated);
    return updated;
}









module.exports = stateJson;