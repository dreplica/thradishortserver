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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.find_uri = exports.post_short_Url = void 0;
var dns_1 = __importDefault(require("dns"));
var mongo_1 = require("../models/mongo");
exports.post_short_Url = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var reg, uri, okay_url, db_check, url_saving, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reg = /[^http://|https://].+/;
                uri = url.match(reg);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!uri) return [3 /*break*/, 4];
                return [4 /*yield*/, check_url(uri[0])];
            case 2:
                okay_url = _a.sent();
                if (!okay_url) {
                    return [2 /*return*/, { error: "please check your link" }];
                }
                return [4 /*yield*/, check_db(uri[0])];
            case 3:
                db_check = _a.sent();
                if (db_check) {
                    return [2 /*return*/, { url: db_check._id }];
                }
                url_saving = new mongo_1.urlModel({ original_url: uri[0] });
                url_saving.save();
                return [2 /*return*/, { url: url_saving._id }];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, { error: "please check your input and try again" }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.find_uri = function (_id) { return __awaiter(void 0, void 0, void 0, function () {
    var get_url, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongo_1.urlModel.findById(_id)];
            case 1:
                get_url = _a.sent();
                return [2 /*return*/, { url: get_url === null || get_url === void 0 ? void 0 : get_url.original_url }];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, { error: "sorry doesnt exist" }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var check_url = function (url) {
    return new Promise(function (resolve, reject) {
        return dns_1.default.lookup(url, function (error) {
            if (error) {
                return resolve(false);
            }
            return resolve(true);
        });
    });
};
var check_db = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var reg, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("url");
                reg = new RegExp(url, "i");
                console.log(reg);
                return [4 /*yield*/, mongo_1.urlModel.findOne({ origina_url: url })];
            case 1:
                result = _a.sent();
                console.log(result === null || result === void 0 ? void 0 : result.original_url);
                if (result) {
                    console.log("url already exist");
                    return [2 /*return*/, result];
                }
                return [2 /*return*/, false];
            case 2:
                error_3 = _a.sent();
                console.log(error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=requests.js.map