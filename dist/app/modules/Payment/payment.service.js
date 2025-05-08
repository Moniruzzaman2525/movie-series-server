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
exports.paymentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const SSLCommerzPayment = require('sslcommerz-lts');
const is_live = false;
const payment = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { total_amount, cus_name, cus_email, tran_id, cus_phone, cus_add1, contentId } = data;
    const isExist = yield prisma_1.default.payment.findFirst({
        where: {
            contentId: contentId,
            userId: user.id
        }
    });
    if (isExist) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You have already purchased this content");
    }
    const sslcz = new SSLCommerzPayment(config_1.default.payment.store_id, config_1.default.payment.store_passwd, is_live);
    const apiResponse = yield sslcz.init(data);
    const GatewayPageURL = apiResponse.GatewayPageURL;
    const transactionData = {
        total_amount: Number(total_amount),
        cus_name: cus_name || '',
        cus_email: cus_email || '',
        tran_id: tran_id || '',
        cus_phone: cus_phone || '',
        cus_add1: cus_add1 || '',
        userId: user.id,
        contentId: contentId || '',
        paymentStatus: false,
    };
    yield prisma_1.default.payment.create({
        data: transactionData,
    });
    return {
        tran_id,
        total_amount,
        cus_name,
        GatewayPageURL,
    };
});
const successPayment = (tran_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.update({
        where: {
            tran_id: tran_id
        },
        data: {
            paymentStatus: true
        },
        include: {
            user: true,
            video: true
        }
    });
    return result;
});
const failedPayment = (trx_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.delete({
        where: {
            tran_id: trx_id
        }
    });
    return result;
});
const getAllPayment = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.payment.findMany({
            include: {
                user: true,
                video: true
            }
        });
        return result;
    }
    catch (err) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Something went wrong");
    }
});
const getAllPaymentByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.payment.findMany({
            where: {
                userId: id
            },
            include: {
                video: true
            }
        });
        return result;
    }
    catch (err) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Something went wrong");
    }
});
const sellInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const sellInfo = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const totalSell = yield tx.payment.count({
            where: {
                paymentStatus: true
            }
        });
        const total_Profit = yield tx.payment.aggregate({
            _sum: {
                total_amount: true
            }
        });
        const total_movie_sell = yield tx.payment.aggregate({
            where: {
                paymentStatus: true,
                video: {
                    category: "MOVIE"
                }
            },
            _sum: {
                total_amount: true
            },
            _count: {
                paymentStatus: true
            }
        });
        const total_series_sell = yield tx.payment.aggregate({
            where: {
                paymentStatus: true,
                video: {
                    category: "SERIES"
                }
            },
            _sum: {
                total_amount: true
            },
            _count: {
                paymentStatus: true
            }
        });
        return {
            totalSell: totalSell,
            total_Profit: total_Profit._sum.total_amount,
            total_movie_sell: total_movie_sell._sum.total_amount,
            total_movie_sell_count: total_movie_sell._count.paymentStatus,
            total_series_sell: total_series_sell._sum.total_amount,
            total_series_sell_count: total_series_sell._count.paymentStatus,
        };
    }));
    return sellInfo;
});
exports.paymentService = {
    payment,
    successPayment,
    getAllPayment,
    getAllPaymentByUser,
    failedPayment,
    sellInfo
};
