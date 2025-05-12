import { z } from 'zod';

export const updateContentSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    genre: z.string().optional(),
    thumbnailImage: z.string().optional(),
    video: z.string().optional(),
    director: z.string().optional(),
    releaseYear: z.number().optional(),
    cast: z.string().optional(),
    streamingPlatform: z.string().optional(),
    description: z.string().optional(),
    like: z.number().optional(),
    price: z.number().optional(),
    rating: z.number().optional(),
    dislike: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    userId: z.string().optional(),
  }),
});
