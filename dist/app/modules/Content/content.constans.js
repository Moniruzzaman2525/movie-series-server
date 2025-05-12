"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.calculatePagination = exports.searchableFields = void 0;
exports.searchableFields = ['title', 'description', 'director', 'cast', 'genre', 'category', 'streamingPlatform'];
const calculatePagination = (options) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.calculatePagination = calculatePagination;
const pick = (obj, keys) => {
    const finalObj = {};
    if (!obj)
        return finalObj;
    for (const key of keys) {
        if (Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.pick = pick;
