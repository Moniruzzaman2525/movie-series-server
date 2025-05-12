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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorsPickServer = void 0;
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const createEditorPick = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.video.findFirstOrThrow({
        where: {
            id: payload.videoId
        }
    });
    const result = yield prisma_1.default.editorsPick.create({
        data: {
            videoId: payload.videoId
        }
    });
    return result;
});
const getAllEditorPicks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);
    const result = yield prisma_1.default.video.findMany({
        where: {
            EditorsPick: {
                some: {},
            },
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
            EditorsPick: true,
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
});
const removeEditorByPicks = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.editorsPick.deleteMany({
        where: {
            videoId: videoId
        }
    });
    return result;
});
exports.EditorsPickServer = {
    createEditorPick,
    getAllEditorPicks,
    removeEditorByPicks
};
