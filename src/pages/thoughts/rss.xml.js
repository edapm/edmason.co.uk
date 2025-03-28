import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt({ html: true });

export async function GET(context) {
	const thoughts = await getCollection("thoughts");
	return rss({
		title: "Edward Mason's Thoughts",
		description:
			"My thoughts and musings on life, the universe, and everything",
		site: context.site,
		items: thoughts.map((post) => ({
			link: `/thoughts/${post.id}/`,
			title: post.data.title,
			pubDate: post.data.date,
			// Note: this will not process components or JSX expressions in MDX files.
			content: sanitizeHtml(parser.render(post.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
				allowedAttributes: {
					a: ["href", "name", "target"],
					img: ["src"],
				},
				disallowedTags: ["iframe"],
			}),
			...post.data,
		})),
	});
}
