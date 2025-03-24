import { defineCollection, z } from 'astro:content';

const faqCollection = defineCollection({
    type: 'content',
    schema: z.object({
        question: z.string(),
        category: z.string(),
    }),
});

export const collections = {
    faq: faqCollection,
};
