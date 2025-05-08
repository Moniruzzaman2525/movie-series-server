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
    const editorsPickVideos = yield prisma_1.default.editorsPick.findMany({
        take: 10,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            video: {
                include: {
                    review: {
                        where: { status: 'APPROVED' },
                    },
                    VideoTag: {
                        select: { tag: true },
                    },
                    Like: userId
                        ? {
                            where: { userId },
                            select: { videoId: true },
                        }
                        : undefined,
                    watchList: userId
                        ? {
                            where: { userId },
                            select: { videoId: true },
                        }
                        : undefined,
                },
            },
        },
    });
    const processed = editorsPickVideos.map(entry => {
        var _a, _b, _c, _d;
        const video = entry.video;
        const ratings = video.review
            .map(r => r.rating)
            .filter(r => typeof r === 'number');
        const overallRating = ratings.length > 0
            ? parseFloat((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2))
            : 0;
        return Object.assign(Object.assign({}, video), { overallRating, liked: (_b = (_a = video.Like) === null || _a === void 0 ? void 0 : _a.some(l => l.videoId === video.id)) !== null && _b !== void 0 ? _b : false, inWatchList: (_d = (_c = video.watchList) === null || _c === void 0 ? void 0 : _c.some(w => w.videoId === video.id)) !== null && _d !== void 0 ? _d : false });
    });
    return {
        meta: {
            total: processed.length,
        },
        data: processed,
    };
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
