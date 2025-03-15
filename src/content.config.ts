// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Define your collection(s)
const thoughts = defineCollection({ 
	loader: glob({ pattern: "**/*.md", base: "./src/content/thoughts" }),
	schema: z.object({
		title: z.string(),
		date: z.string(),
		tags: z.array(z.string()).optional(),
		summary: z.string().optional()
	}),
});
const oldblogs = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/arch/oldblogs" }),
	schema: z.object({
		title: z.string(),
		date: z.string(),
		iteration: z.string(),
		summary: z.string().optional()
	}),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { thoughts, oldblogs };