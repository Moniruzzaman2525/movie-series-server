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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const loadEmailTemplate_1 = require("./loadEmailTemplate");
const config_1 = __importDefault(require("../config"));
const sendEmail = (to, subject, templateName, replacements) => __awaiter(void 0, void 0, void 0, function* () {
    const htmlContent = (0, loadEmailTemplate_1.loadEmailTemplate)(templateName, replacements);
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: config_1.default.emailSender.email,
            pass: config_1.default.emailSender.app_pass,
        },
    });
    const mailOptions = {
        from: 'Movie Series platform 👻 web.moniruzzaman1@gmail.com',
        to,
        subject: subject,
        html: htmlContent,
    };
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error('Error sending email: ', error);
    }
});
exports.sendEmail = sendEmail;
