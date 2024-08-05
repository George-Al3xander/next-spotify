"use client";

import ReactDOMServer from "react-dom/server";

import { Parser } from "html-to-react";

// @ts-ignore
const htmlToReactParser = new Parser();
function DynamicHtml({ content }: { content?: string }) {
    if (!content) return null;
    const element = htmlToReactParser.parse(content);
    return htmlToReactParser.parse(
        ReactDOMServer.renderToStaticMarkup(element),
    );
}

export default DynamicHtml;
