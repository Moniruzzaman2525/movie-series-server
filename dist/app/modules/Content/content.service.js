"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("@prisma/client");
const content_constans_1 = require("./content.constans");
const apiError_1 = __importDefault(require("../../errors/apiError"));
const prisma = new client_1.PrismaClient();
const createContent = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const files = req.files;
        if (files && files.thumbnailImage && files.thumbnailImage.length > 0) {
            const uploadedImage = files.thumbnailImage[0];
            req.body.thumbnailImage = uploadedImage.path;
        }
        console.log(req.body);
        const content = yield prisma.video.create({
            data: Object.assign(Object.assign({}, req.body), { userId: user.id }),
        });
        return content;
    }
    catch (err) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, err.message);
    }
});
const getAllContent = (params, options, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = params, exactMatchFields = __rest(params, ["searchTerm"]);
        const { page, limit, sortBy, sortOrder, skip } = (0, content_constans_1.calculatePagination)(options);
        const conditions = [];
        const searchableFields = ['title', 'description', 'director', 'cast'];
        if (searchTerm && searchableFields.length > 0) {
            conditions.push({
                OR: searchableFields.map((field) => ({
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                })),
            });
        }
        const numberFields = ['releaseYear', 'views'];
        if (Object.keys(exactMatchFields).length > 0) {
            conditions.push({
                AND: Object.entries(exactMatchFields).map(([key, value]) => {
                    const isNumberField = numberFields.includes(key);
                    if (Array.isArray(value)) {
                        return {
                            [key]: {
                                in: isNumberField ? value.map(Number) : value,
                            },
                        };
                    }
                    return {
                        [key]: {
                            equals: isNumberField ? Number(value) : value,
                        },
                    };
                }),
            });
        }
        const whereConditions = conditions.length > 0 ? { AND: conditions } : {};
        const validSortFields = ['createdAt', 'title'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const result = yield prisma.video.findMany({
            where: whereConditions,
            skip,
            take: limit,
            orderBy: {
                [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
            },
            include: {
                Comment: {
                    where: {
                        OR: [
                            { status: 'APPROVED' },
                            ...(userId ? [{ userId }] : []),
                        ],
                        parentCommentId: null,
                    },
                    include: {
                        replies: {
                            where: {
                                OR: [
                                    { status: 'APPROVED' },
                                    ...(userId ? [{ userId }] : []),
                                ],
                            },
                            include: {
                                user: true,
                            },
                        },
                        user: true,
                        Like: userId
                            ? {
                                where: { userId },
                                select: { commentId: true },
                            }
                            : false,
                    },
                },
                review: {
                    where: {
                        OR: [
                            { status: 'APPROVED' },
                            ...(userId ? [{ userId }] : []),
                        ],
                    },
                    include: {
                        user: true
                    }
                },
                VideoTag: {
                    select: {
                        tag: true,
                    },
                },
                Like: userId ? {
                    where: {
                        userId: userId,
                    },
                    select: {
                        videoId: true,
                    },
                } : undefined,
                watchList: userId ? {
                    where: { userId },
                    select: { videoId: true },
                } : undefined,
                EditorsPick: true
            },
        });
        result.forEach((video) => {
            var _a;
            const likedVideoIds = video.Like ? video.Like.map(like => like.videoId) : [];
            const watchListVideoIds = video.watchList ? video.watchList.map(w => w.videoId) : [];
            video.liked = likedVideoIds.includes(video.id);
            video.inWatchList = watchListVideoIds.includes(video.id);
            video.totalComments = ((_a = video.Comment) === null || _a === void 0 ? void 0 : _a.length) || 0;
            const ratings = (video.review || [])
                .map(r => r.rating)
                .filter(r => typeof r === 'number');
            const overallRating = ratings.length > 0
                ? parseFloat((ratings.reduce((acc, r) => acc + r, 0) / ratings.length).toFixed(2))
                : 0;
            video.overallRating = overallRating;
        });
        const total = yield prisma.video.count({
            where: whereConditions,
        });
        return {
            meta: {
                page,
                limit,
                total,
            },
            data: result,
        };
    }
    catch (err) {
        console.error("Prisma Error:", err);
        const error = err instanceof Error ? err : new Error('Database operation failed');
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
const getTopRatedThisWeek = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek);
        startOfWeek.setHours(0, 0, 0, 0);
        const result = yield prisma.video.findMany({
            where: {
                review: {
                    some: {
                        createdAt: {
                            gte: startOfWeek,
                        },
                        status: 'APPROVED',
                    },
                },
            },
            include: {
                Comment: {
                    where: {
                        OR: [
                            { status: 'APPROVED' },
                            ...(userId ? [{ userId }] : []),
                        ],
                        parentCommentId: null,
                    },
                    include: {
                        replies: {
                            where: {
                                OR: [
                                    { status: 'APPROVED' },
                                    ...(userId ? [{ userId }] : []),
                                ],
                            },
                            include: {
                                user: true,
                            },
                        },
                        user: true,
                        Like: userId
                            ? {
                                where: { userId },
                                select: { commentId: true },
                            }
                            : false,
                    },
                },
                review: {
                    where: {
                        createdAt: {
                            gte: startOfWeek,
                        },
                        status: 'APPROVED',
                    },
                },
                VideoTag: {
                    select: {
                        tag: true,
                    },
                },
                Like: userId ? {
                    where: {
                        userId,
                    },
                    select: {
                        videoId: true,
                    },
                } : undefined,
                watchList: userId ? {
                    where: {
                        userId,
                    },
                    select: {
                        videoId: true,
                    },
                } : undefined,
            },
        });
        result.forEach((video) => {
            var _a;
            const likedVideoIds = video.Like ? video.Like.map(like => like.videoId) : [];
            const watchListVideoIds = video.watchList ? video.watchList.map(w => w.videoId) : [];
            video.liked = likedVideoIds.includes(video.id);
            video.inWatchList = watchListVideoIds.includes(video.id);
            video.totalComments = ((_a = video.Comment) === null || _a === void 0 ? void 0 : _a.length) || 0;
            const ratings = (video.review || [])
                .map(r => r.rating)
                .filter(r => typeof r === 'number');
            const overallRating = ratings.length > 0
                ? parseFloat((ratings.reduce((acc, r) => acc + r, 0) / ratings.length).toFixed(2))
                : 0;
            video.overallRating = overallRating;
        });
        return result;
    }
    catch (err) {
        console.error("Top Rated This Week Error:", err);
        const error = err instanceof Error ? err : new Error('Failed to fetch top rated videos');
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
const getNewlyAdded = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.video.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
            include: {
                Comment: {
                    where: {
                        OR: [
                            { status: 'APPROVED' },
                            ...(userId ? [{ userId }] : []),
                        ],
                        parentCommentId: null,
                    },
                    include: {
                        replies: {
                            where: {
                                OR: [
                                    { status: 'APPROVED' },
                                    ...(userId ? [{ userId }] : []),
                                ],
                            },
                            include: {
                                user: true,
                            },
                        },
                        user: true,
                        Like: userId
                            ? {
                                where: { userId },
                                select: { commentId: true },
                            }
                            : false,
                    },
                },
                review: {
                    where: {
                        OR: [
                            { status: 'APPROVED' },
                            ...(userId ? [{ userId }] : []),
                        ],
                    },
                    include: {
                        user: true
                    }
                },
                VideoTag: {
                    select: {
                        tag: true,
                    },
                },
                Like: userId ? {
                    where: {
                        userId: userId,
                    },
                    select: {
                        videoId: true,
                    },
                } : undefined,
                watchList: userId ? {
                    where: { userId },
                    select: { videoId: true },
                } : undefined,
                EditorsPick: true
            },
        });
        result.forEach((video) => {
            var _a;
            const likedVideoIds = video.Like ? video.Like.map(like => like.videoId) : [];
            const watchListVideoIds = video.watchList ? video.watchList.map(w => w.videoId) : [];
            video.liked = likedVideoIds.includes(video.id);
            video.inWatchList = watchListVideoIds.includes(video.id);
            video.totalComments = ((_a = video.Comment) === null || _a === void 0 ? void 0 : _a.length) || 0;
            const ratings = (video.review || [])
                .map(r => r.rating)
                .filter(r => typeof r === 'number');
            const overallRating = ratings.length > 0
                ? parseFloat((ratings.reduce((acc, r) => acc + r, 0) / ratings.length).toFixed(2))
                : 0;
            video.overallRating = overallRating;
        });
        return result;
    }
    catch (err) {
        console.error("Newly Added Error:", err);
        const error = err instanceof Error ? err : new Error('Failed to fetch newly added videos');
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
const updateContent = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    if (files && files.thumbnailImage && files.thumbnailImage.length > 0) {
        const uploadedImage = files.thumbnailImage[0];
        req.body.thumbnailImage = uploadedImage.path;
    }
    try {
        const isExist = yield prisma.video.findUnique({
            where: { id },
        });
        if (!isExist) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Content not found');
        }
        const content = yield prisma.video.update({
            where: { id },
            data: req.body,
        });
        return content;
    }
    catch (err) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, err.message);
    }
});
const getContentById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield prisma.video.findUnique({
            where: { id },
        });
        if (!isExist) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Content not found');
        }
        const content = yield prisma.video.findUnique({
            where: { id },
            include: {
                Comment: {
                    where: {
                        OR: [
                            { status: 'APPROVED' },
                            ...(userId ? [{ userId }] : []),
                        ],
                        parentCommentId: null,
                    },
                    include: {
                        replies: {
                            where: {
                                OR: [
                                    { status: 'APPROVED' },
                                    ...(userId ? [{ userId }] : []),
                                ],
                            },
                            include: {
                                user: true,
                            },
                        },
                        user: true,
                        Like: userId
                            ? {
                                where: { userId },
                                select: { commentId: true },
                            }
                            : false,
                    },
                },
                review: {
                    where: {
                        OR: [
                            { status: 'APPROVED' },
                            ...(userId ? [{ userId }] : []),
                        ],
                    },
                    include: {
                        user: true
                    }
                },
                VideoTag: {
                    select: {
                        tag: true,
                    },
                },
                Like: userId ? {
                    where: {
                        userId: userId,
                    },
                    select: {
                        videoId: true,
                    },
                } : undefined,
            },
        });
        return content;
    }
    catch (err) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, err.message);
    }
});
const deleteContent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield prisma.video.findUnique({
            where: { id },
        });
        if (!isExist) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Content not found');
        }
        const content = yield prisma.video.delete({
            where: { id },
        });
        return content;
    }
    catch (err) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, err.message);
    }
});
const contentGetCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield prisma.video.findMany({
            where: {
                category: {
                    equals: "SERIES",
                }
            }
        });
        return content;
    }
    catch (err) {
        console.log(err);
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to fetch videos by category');
    }
});
exports.contentService = {
    createContent,
    getAllContent,
    updateContent,
    deleteContent,
    getContentById,
    contentGetCategory,
    getTopRatedThisWeek,
    getNewlyAdded,
};
