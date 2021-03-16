const config = require("./Config");
const { findFiles, readPage, prepPagePath, parsePage, getPageLayout, flattenObject } = require("./Methods");

findFiles(config.inDir + "/pages", /\.md$/, name => {
    let page = readPage(name);
    let path = prepPagePath(name, config.inDir, config.outDir);
    //let output = parsePage(page);

    console.log(parsePage(getPageLayout(page), flattenObject(page)));
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

