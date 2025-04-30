"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEmailTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loadEmailTemplate = (templateName, replacements) => {
    const templatePath = path_1.default.join(__dirname, '../views/emailTemplates', `${templateName}.html`);
    let template = fs_1.default.readFileSync(templatePath, 'utf-8');
    for (const [key, value] of Object.entries(replacements)) {
        template = template.replace(`{{${key}}}`, value);
    }
    return template;
};
exports.loadEmailTemplate = loadEmailTemplate;
