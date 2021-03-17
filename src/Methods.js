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
    // Handle @include directives
    layout = layout.replace(/@include\(\s*'(.+)'\s*\)/g, function(match, p1) {
        let partial = p1.split(".").join("/") + ".html";
        let partialPath = config.inDir + "/partials/" + partial;

        return fs.readFileSync(partialPath, "utf8");
    });

    // Finally, handle echo tags and return the result
    return layout.replace(/{{\s*(.+?)\s*}}/g, function(match, p1) {
        return data[p1];
    });
}

function prepPagePath(path, inDir, outDir) {
    let inPath = inDir.split("./").pop();
    let outPath = outDir.split("./").pop();

    path = path.split(".md").shift() + ".html";
    path = outPath + path.split(inPath + "pages/").pop();
    return path;
}

function createPage(path, page) {
    if (! fs.existsSync(path)) {
        let dirPath = path.split("/").pop().join("/");
        fs.mkdirSync(dirPath.join("/"), { recursive: true });
    }

    fs.writeFile(path, page, e => {
        if (e) { throw e; }
        console.log(path, "was created successfully");
    });
}

module.exports = {
    findFiles,
    readPage,
    parsePage,
    prepPagePath,
    flattenObject,
    getPageLayout,
    createPage
}