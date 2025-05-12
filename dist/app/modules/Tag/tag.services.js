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
exports.TagServices = void 0;
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const getAllTags = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.tag.findMany();
    return result;
});
const createTag = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.tag.createMany({
        data: payload.tags,
        skipDuplicates: true
    });
    return result;
});
const assignTagsToReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const video = yield prisma_1.default.video.findFirstOrThrow({
        where: {
            id: payload.videoId
        }
    });
    const data = payload.tagId.map((tagId) => ({ videoId: video.id, tagId }));
    const result = yield prisma_1.default.videoTag.createMany({
        data,
        skipDuplicates: true
    });
    return result;
});
exports.TagServices = {
    getAllTags,
    createTag,
    assignTagsToReview
};
