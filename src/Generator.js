const config = require("./Config");
const { findFiles, readPage, prepPagePath, parsePage, getPageLayout, flattenObject, createPage } = require("./Methods");

findFiles(config.inDir + "/pages", /\.md$/, name => {
    let page = readPage(name);
    let path = prepPagePath(name, config.inDir, config.outDir);
    
    createPage(path, parsePage(getPageLayout(page), flattenObject(page)));
});