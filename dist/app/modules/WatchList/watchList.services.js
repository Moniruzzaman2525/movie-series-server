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
    if (!user) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "User is not authenticated or doesn't exist");
    }
    const result = yield prisma_1.default.watchList.findMany({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id
        }
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
