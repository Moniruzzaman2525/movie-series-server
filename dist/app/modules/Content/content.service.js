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
const utils_1 = require("../../../utils");
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const createContent = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (file) {
            const uploadImage = yield (0, utils_1.uploadToCloudinary)(file);
            req.body.thumbnailImage = uploadImage.secure_url;
        }
        const content = yield prisma.video.create({
            data: req.body
        });
        return content;
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, err.message);
    }
});
const searchableFields = ["title", "description", "director", "cast", "genre"];
const getAllContent = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = params, exactMatchFields = __rest(params, ["searchTerm"]);
        const conditions = [];
        //*create search conditions for searchable fields
        if (searchTerm) {
            conditions.push({
                OR: searchableFields.map(field => ({
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }))
            });
        }
        //*create conditions for exact match fields
        if (Object.keys(exactMatchFields).length > 0) {
            conditions.push({
                AND: Object.entries(exactMatchFields).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return { [key]: { in: value } };
                    }
                    return { [key]: { equals: value } };
                })
            });
        }
        const whereConditions = conditions.length > 0
            ? { AND: conditions }
            : {};
        return yield prisma.video.findMany({
            where: whereConditions,
            // Consider adding for better performance:
            // take: 20, // Pagination limit
            // orderBy: { createdAt: 'desc' } // Default sorting
        });
    }
    catch (err) {
        const error = err instanceof Error ? err : new Error('Database operation failed');
        // More appropriate status code for database errors
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
exports.contentService = {
    createContent,
    getAllContent
};
