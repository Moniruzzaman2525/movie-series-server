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
exports.paymentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const payment_constans_1 = require("./payment.constans");
const payment_service_1 = require("./payment.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const payment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { amount, userName, userPhone, contentId } = req.body;
    const tran_id = Math.random().toString(16).substring(2);
    payment_constans_1.data.total_amount = amount;
    payment_constans_1.data.cus_name = userName;
    payment_constans_1.data.cus_email = user.email;
    payment_constans_1.data.tran_id = tran_id;
    payment_constans_1.data.cus_phone = userPhone;
    const customData = Object.assign(Object.assign({}, payment_constans_1.data), { contentId });
    const result = yield payment_service_1.paymentService.payment(customData, user);
    (0, sendResponse_1.default)(res, {
        message: "Payment Initiated",
        data: result,
        statuscode: http_status_codes_1.StatusCodes.ACCEPTED,
        success: true
    });
}));
const successController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tran_id } = req.params;
    console.log(tran_id);
    const result = yield payment_service_1.paymentService.successPayment(tran_id);
    (0, sendResponse_1.default)(res, {
        message: "Payment Successful",
        data: result,
        statuscode: http_status_codes_1.StatusCodes.OK,
        success: true,
    });
}));
const failedController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tran_id } = req.params;
    const result = yield payment_service_1.paymentService.failedPayment(tran_id);
    (0, sendResponse_1.default)(res, {
        message: "Payment Failed",
        data: result,
        statuscode: http_status_codes_1.StatusCodes.OK,
        success: true,
    });
}));
const getAllPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentService.getAllPayment();
    (0, sendResponse_1.default)(res, {
        message: "Payment Successful",
        data: result,
        statuscode: http_status_codes_1.StatusCodes.OK,
        success: true,
    });
}));
const getAllPaymentByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield payment_service_1.paymentService.getAllPaymentByUser(user.email);
    (0, sendResponse_1.default)(res, {
        message: "Payment Successful",
        data: result,
        statuscode: http_status_codes_1.StatusCodes.OK,
        success: true,
    });
}));
exports.paymentController = {
    payment,
    successController,
    getAllPayment,
    getAllPaymentByUser,
    failedController
};
