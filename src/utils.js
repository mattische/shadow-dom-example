const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_BASE_URL;

function renderMarkdown(text) {
    if (!text) return '';
    return marked.parse(text);
}

export { apiKey, baseURL, renderMarkdown };
