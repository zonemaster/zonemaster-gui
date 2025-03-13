import { defineCollection, z } from 'astro:content';

const faqCollection = defineCollection({
    schema: z.object({
        question: z.string(),
        category: z.string(),
    }),
});

export const collections = {
    faq: faqCollection,
};
