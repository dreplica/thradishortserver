"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var shortid_1 = __importDefault(require("shortid"));
var urlschema = new mongoose_1.default.Schema({
    _id: { type: String, default: shortid_1.default.generate },
    original_url: String,
});
exports.urlModel = mongoose_1.default.model("URLMODEL", urlschema);
//# sourceMappingURL=mongo.js.map