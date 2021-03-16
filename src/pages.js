const config = require("./config");
const fm = require("front-matter");
const fs = require("fs");
const marked = require("./marked");

function templatePage(data)  {
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${data.attributes.description}" />
        <link rel="stylesheet" href="../assets/styles/grotesk.light.min.css">
        <link rel="stylesheet" href="../assets/styles/highlights.min.css">
        <link rel="stylesheet" href="../assets/styles/main.min.css">
        <title>${data.attributes.title}</title>
    </head>
    <body>
        <div class="grotesk">
            <header>
                <a href="/">Go back home</a>
                <p>—</p>
            </header>
            <div class="content">
                <h1>${data.attributes.title}</h1>
                <p>${new Date(
                  parseInt(data.attributes.date)
                ).toDateString()}</p>
                <hr />
                ${data.body}
            </div>
            <footer>
                ${`<p>© ${new Date().getFullYear()} ${
                  config.authorName
                }, Find the code on <a href="github.com/kartiknair/blog">GitHub</a></p>`}
            </footer>
        </div>
    </body>
</html>
`;
}

function createPage(page) {
    let name = page.path.split(".md").shift() + ".html";

    fs.writeFile(name, templatePage(page), e => {
        if (e) { throw e; }
        console.log(name, "was created successfully");
    });
}

function createPages(pages) {
    pages.forEach(page => {
        if (! fs.existsSync(`${config.dev.outDir}/${page.path}`)) {
            fs.mkdirSync(`${config.dev.outDir}/${page.path}`);
        }

        fs.writeFile(
            `${config.dev.outDir}/${page.path}/index.html`, 
            templatePage(page),
            e => {
                if (e) { throw e; }
                console.log(`${page.path}/index.html was created successfully`);
            }
        );
    });
}

module.exports = {
    createPage: createPage
};