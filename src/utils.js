const apiKey = "6d59ce3fb6bd52a8611024f59eea0176";
const baseURL = "https://lager.emilfolino.se/v2";

function renderMarkdown(text) {
    if (!text) return '';
    return marked.parse(text);
}

export { apiKey, baseURL, renderMarkdown };