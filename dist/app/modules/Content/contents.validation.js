"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContentSchema = void 0;
const zod_1 = require("zod");
exports.updateContentSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        thumbnailImage: zod_1.z.string().optional(),
        video: zod_1.z.string().optional(),
        director: zod_1.z.string().optional(),
        releaseYear: zod_1.z.number().optional(),
        cast: zod_1.z.string().optional(),
        streamingPlatform: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        like: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        rating: zod_1.z.number().optional(),
        dislike: zod_1.z.number().optional(),
        createdAt: zod_1.z.date().optional(),
        updatedAt: zod_1.z.date().optional(),
        userId: zod_1.z.string().optional(),
    }),
});
