const config = require("./config");
const fs = require("fs");
const { createPage, readPage } = require("./pages");
const { findFiles, copyStructure } = require("./finder");

findFiles("./content", /\.md$/, name => {
    console.log("Found the", name, "file");
    let page = readPage(name);
    createPage(page);
});

/*
let docs = fs.readdirSync(config.dev.contentDir)
    .map(doc => doc.slice(0, -3))
    .map(doc => readPage(doc))
    .sort(function(a, b) {
        return b.attributes.date - a.attributes.date
    });


if (!fs.existsSync(config.dev.outDir)) {
    fs.mkdirSync(config.dev.outDir);
}

createPage(docs);
*/

