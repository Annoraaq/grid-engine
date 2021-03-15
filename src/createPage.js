const config = require("../config");
const fm = require("front-matter");
const fs = require("fs");
const marked = require("./marked");

function createPage(pagePath) {
    let data = fs.readFileSync(`${config.dev.contentDir}/${pagePath}.md`, "utf8");

    let content = fm(data);
    content.body = marked(content.body);
    content.path = pagePath;

    return content;
};

module.exports = createPage;