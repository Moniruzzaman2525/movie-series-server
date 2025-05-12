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
exports.WatchServices = void 0;
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const addToWatchList = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "User is not authenticated or doesn't exist");
    }
    const video = yield prisma_1.default.video.findFirstOrThrow({
        where: {
            id: payload.videoId
        }
    });
    const result = yield prisma_1.default.watchList.create({
        data: {
            userId: user === null || user === void 0 ? void 0 : user.id,
            videoId: video.id
        }
    });
    return result;
});
const getWatchList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.video.findMany({
        where: {
            watchList: {
                some: {
                    userId: user === null || user === void 0 ? void 0 : user.id,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            Comment: {
                where: {
                    OR: [
                        { status: 'APPROVED' },
                        { userId: user === null || user === void 0 ? void 0 : user.id },
                    ],
                    parentCommentId: null,
                },
                include: {
                    replies: {
                        where: {
                            OR: [
                                { status: 'APPROVED' },
                                { userId: user === null || user === void 0 ? void 0 : user.id },
                            ],
                        },
                        include: {
                            user: true,
                        },
                    },
                    user: true,
                    Like: {
                        where: { userId: user === null || user === void 0 ? void 0 : user.id },
                        select: { commentId: true },
                    },
                },
            },
            review: {
                where: {
                    OR: [
                        { status: 'APPROVED' },
                        { userId: user === null || user === void 0 ? void 0 : user.id },
                    ],
                },
                include: {
                    user: true,
                },
            },
            VideoTag: {
                select: {
                    tag: true,
                },
            },
            Like: {
                where: { userId: user === null || user === void 0 ? void 0 : user.id },
                select: {
                    videoId: true,
                },
            },
            watchList: {
                where: { userId: user === null || user === void 0 ? void 0 : user.id },
                select: { videoId: true },
            },
            EditorsPick: true,
        },
    });
    result.forEach((video) => {
        var _a, _b, _c;
        const likedVideoIds = ((_a = video.Like) === null || _a === void 0 ? void 0 : _a.map((like) => like.videoId)) || [];
        const watchListVideoIds = ((_b = video.watchList) === null || _b === void 0 ? void 0 : _b.map((w) => w.videoId)) || [];
        video.liked = likedVideoIds.includes(video.id);
        video.inWatchList = watchListVideoIds.includes(video.id);
        video.totalComments = ((_c = video.Comment) === null || _c === void 0 ? void 0 : _c.length) || 0;
        const ratings = (video.review || [])
            .map((r) => r.rating)
            .filter((r) => typeof r === 'number');
        const overallRating = ratings.length > 0
            ? parseFloat((ratings.reduce((acc, r) => acc + r, 0) / ratings.length).toFixed(2))
            : 0;
        video.overallRating = overallRating;
    });
    return result;
});
const removeWatchList = (user, videoId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "User is not authenticated or doesn't exist");
    }
    const result = yield prisma_1.default.watchList.deleteMany({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id,
            videoId: videoId
        }
    });
    return result;
});
exports.WatchServices = {
    addToWatchList,
    getWatchList,
    removeWatchList
};
