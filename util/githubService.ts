const WIKI_RAW_URL = "https://raw.githubusercontent.com/wiki/wridgeu/wridgeu.github.io/";
const WIKI_PAGE_URL = "https://github.com/wridgeu/wridgeu.github.io/wiki/";

/**
 * Fetch the markdown content
 * @returns {Promise<string | undefined>} content of markdown file, undefined if the page does not exist
 */
async function getSelectedContent(requestedContent: string): Promise<string | undefined> {
	// pushed pages are stored with spaces, pages created in the web editor with hyphens
	const spaced = requestedContent.replace(/[-*?]/g, " ");
	let response = await fetch(`${WIKI_RAW_URL}${encodeURIComponent(spaced)}.md`);
	if (response.status === 404 && spaced !== requestedContent) {
		response = await fetch(`${WIKI_RAW_URL}${encodeURIComponent(requestedContent)}.md`);
	}
	if (response.status === 404) {
		return undefined;
	}
	if (!response.ok) {
		throw new Error(`Wiki page "${requestedContent}" responded with ${response.status}`);
	}
	return response.text();
}

/**
 * Fetch the markdown table of contents (index) of
 * the github wiki
 * @returns {Promise<string>} content of markdown file
 */
function getWikiIndex(): Promise<string> {
	//return sidebar to use as initial entry point
	return fetch(`${WIKI_RAW_URL}_Sidebar.md`).then((response) => response.text());
}

function getContentEditLink(requestedContent: string): string {
	return `${WIKI_PAGE_URL}${requestedContent}/_edit`;
}

/**
 * @namespace sapmarco.projectpages.util
 */
export { WIKI_RAW_URL, WIKI_PAGE_URL, getWikiIndex, getSelectedContent, getContentEditLink };
