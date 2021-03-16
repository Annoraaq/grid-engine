const path = require("path");
const fs = require("fs");
const fm = require("front-matter");
const marked = require("./Marked");
const config = require("./Config");

function flattenObject(obj) {
    let flattened = {};

    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(flattened, flattenObject(obj[key]));
        } else {
            flattened[key] = obj[key];
        }
    });

    return flattened;
}

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
}

function readPage(path) {
    let data = fs.readFileSync(path, "utf8");

    let content = fm(data);
    content.body = marked(content.body);
    content.path = path;

    return content;
}

function getPageLayout(page) {
    let layout = page.attributes.layout ? page.attributes.layout : config.defaultLayout;
    return fs.readFileSync(config.inDir + "layouts/" + layout + ".html", "utf8");
}

function parsePage(layout, data) {
    layout.replace(/{{\s*(.+?)\s*}}/, (r, k) => data[k]);

    console.log("\n----------------------------------------------------------------------------\n");
    console.log(layout);
}

function prepPagePath(path, inDir, outDir) {
    let inPath = inDir.split("./").pop();
    let outPath = outDir.split("./").pop();

    path = path.split(".md").shift() + ".html";
    path = outPath + path.split(inPath + "pages/").pop();
    return path;
}

module.exports = {
    findFiles,
    readPage,
    parsePage,
    prepPagePath,
    flattenObject,
    getPageLayout
}