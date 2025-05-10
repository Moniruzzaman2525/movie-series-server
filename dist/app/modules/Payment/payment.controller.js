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
const config_1 = __importDefault(require("../../../config"));
// import { data } from "./payment.constans";
const payment_service_1 = require("./payment.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const payment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { tID } = req.params;
    const { amount, contentId } = req.body;
    const tran_id = (0, uuid_1.v4)();
    const data = {
        total_amount: amount,
        currency: 'BDT',
        tran_id: tran_id,
        success_url: `${config_1.default.server_url}/api/v1/payment/success/${tran_id}`,
        fail_url: `${config_1.default.server_url}/api/v1/payment/failed/${tID}`,
        cancel_url: `${config_1.default.base_url}/cancel`,
        ipn_url: '',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const customData = Object.assign(Object.assign({}, data), { contentId });
    const result = yield payment_service_1.paymentService.payment(customData, user);
    (0, sendResponse_1.default)(res, {
        message: "Payment Initiated",
        data: result,
        statuscode: http_status_codes_1.StatusCodes.ACCEPTED,
        success: true
    });
}));
const successController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tId } = req.params;
    const result = yield payment_service_1.paymentService.successPayment(tId);
    res.redirect(`${config_1.default.base_url}/success`);
    (0, sendResponse_1.default)(res, {
        message: "Payment Successful",
        data: null,
        statuscode: http_status_codes_1.StatusCodes.OK,
        success: true,
    });
}));
const failedController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tran_id } = req.params;
    const result = yield payment_service_1.paymentService.failedPayment(tran_id);
    res.redirect(`${config_1.default.base_url}/fail`);
    (0, sendResponse_1.default)(res, {
        message: "Payment Failed",
        data: null,
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
    const result = yield payment_service_1.paymentService.getAllPaymentByUser(user.id);
    (0, sendResponse_1.default)(res, {
        message: "Payment Successful",
        data: result,
        statuscode: http_status_codes_1.StatusCodes.OK,
        success: true,
    });
}));
const updateAdminStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield payment_service_1.paymentService.updateAdminStatus(id);
    (0, sendResponse_1.default)(res, {
        message: "Payment Approved",
        data: result,
        statuscode: http_status_codes_1.StatusCodes.OK,
        success: true
    });
}));
const rejectPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId } = req.params;
    const result = yield payment_service_1.paymentService.rejectPayment(paymentId);
    (0, sendResponse_1.default)(res, {
        message: "Payment Rejected",
        data: result,
        statuscode: http_status_codes_1.StatusCodes.OK,
        success: true
    });
}));
const sellInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentService.sellInfo();
    (0, sendResponse_1.default)(res, {
        message: "sell-info retrieved successfully",
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
    failedController,
    updateAdminStatus,
    rejectPayment,
    sellInfo
};
