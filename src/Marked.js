const marked = require("marked");

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
        let hljs = require("highlight.js");
        let validLang = hljs.getLanguage(lang) ? lang : "plaintext";

        return hljs.highlight(lang, code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

module.exports = marked;