const config = require("../config");
const fs = require("fs");
const createPage = require("./createPage");

let docs = fs.readdirSync(config.dev.contentDir)
    .map(doc => doc.slice(0, -3))
    .map(doc => createPage(doc));

if (!fs.existsSync(config.dev.outDir)) {
    fs.mkdirSync(config.dev.outDir);
}

