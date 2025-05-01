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
exports.contentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const content_service_1 = require("./content.service");
const content_constans_1 = require("./content.constans");
const createContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.contentService.createContent(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Content created successfully',
        data: result,
        statuscode: http_status_1.default.CREATED,
    });
}));
const getAllContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, content_constans_1.pick)(req.query, ['searchTerm', 'name', 'email']);
    const options = (0, content_constans_1.pick)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield content_service_1.contentService.getAllContent(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Content fetched successfully',
        data: result,
        statuscode: http_status_1.default.OK,
    });
}));
const updateContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield content_service_1.contentService.updateContent(id, req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Content updated successfully',
        data: result,
        statuscode: http_status_1.default.OK,
    });
}));
const deleteContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield content_service_1.contentService.deleteContent(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Content deleted successfully',
        data: result,
        statuscode: http_status_1.default.OK,
    });
}));
const getSingleContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield content_service_1.contentService.getContentById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Content fetched successfully',
        data: result,
        statuscode: http_status_1.default.OK,
    });
}));
exports.contentController = {
    createContent,
    getAllContent,
    updateContent,
    deleteContent,
    getSingleContent,
};
