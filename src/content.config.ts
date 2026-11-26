import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faqCollection = defineCollection({
    loader: glob({ base: './src/content/faq', pattern: '**/*.md' }),
    schema: z.object({
        question: z.string(),
        category: z.string(),
    }),
});

export type FaqItem = {
    question: string;
    answer: string;
};

export const collections = {
    faq: faqCollection,
};
