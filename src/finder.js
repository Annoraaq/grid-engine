const path = require("path");
const fs = require("fs");

function findFiles(from, filter, callback) {
    if (! fs.existsSync(from)) {
        console.log("Directory doesn't exist; misconfigured?");
        return;
    }

    let files = fs.readdirSync(from);

    files.forEach(file => {
        let name = path.join(from, file);
        let stat = fs.lstatSync(name);

        if (stat.isDirectory()) {
            findFiles(name, filter, callback);
        } else if (filter.test(name)) {
            callback(name);
        }
    });
};

function copyStructure(from, to) {
    if (! fs.existsSync(from) || ! fs.existsSync(to)) {
        console.log("A directory didn't exist when trying to copy. Wrong paths passed?");
        return;
    }

    let files = fs.readdirSync(from);

    files.forEach(file => {
        let name = path.join(from, file);
        let stat = fs.lstatSync(name);

        if (stat.isDirectory()) {
            let subDir = name.split(from).pop();

            if (! fs.existsSync(`${to}${subDir}`)) {
                fs.mkdirSync(`${to}${subDir}`);
            }

            copyStructure(from, to);
        }
    });
};

module.exports = {
    findFiles: findFiles,
    copyStructure: copyStructure
};