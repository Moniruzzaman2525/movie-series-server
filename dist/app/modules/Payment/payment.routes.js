"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), payment_controller_1.paymentController.getAllPayment);
router.get('/:email', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), payment_controller_1.paymentController.getAllPaymentByUser);
router.post('/', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), payment_controller_1.paymentController.payment);
router.patch('/success/:tran_id', payment_controller_1.paymentController.successController);
exports.paymentRouter = router;
