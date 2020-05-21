"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/* GET home page. */
var indexRouter = router.get("/", function (req, res, next) {
    res.json({ title: "Express" });
});
exports.default = {
    indexRouter: indexRouter,
};
//# sourceMappingURL=index.js.map