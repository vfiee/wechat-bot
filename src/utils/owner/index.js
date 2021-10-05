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
exports.__esModule = true;
exports.mentionSelf = exports.isSelf = exports.setSelf = exports.getSelf = exports.sendMessageToOwner = exports.isOwner = exports.setOwner = exports.getOwner = exports.getBot = void 0;
/*
 * @Author: vyron
 * @Date: 2021-08-15 14:16:53
 * @LastEditTime: 2021-10-05 17:28:47
 * @LastEditors: vyron
 * @Description: Owner
 * @FilePath: /wechat-bot/src/utils/owner/index.ts
 */
// @ts-ignore
var wechaty_1 = require("/wechaty");
// 获取机器人实例
var _bot;
var getBot = function () { return _bot || (_bot = wechaty_1.Wechaty.instance()); };
exports.getBot = getBot;
// 主人 vyron
var _owner;
var getOwner = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = _owner;
                if (_a) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.getBot)().Contact.find({ name: "vyron" })];
            case 1:
                _a = (_owner = (_b.sent()));
                _b.label = 2;
            case 2: return [2 /*return*/, _a];
        }
    });
}); };
exports.getOwner = getOwner;
// 设置拥有者
var setOwner = function (contact) { return (_owner = contact); };
exports.setOwner = setOwner;
function isOwner(id) {
    return __awaiter(this, void 0, void 0, function () {
        var owner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exports.getOwner)()];
                case 1:
                    owner = _a.sent();
                    return [2 /*return*/, owner && id && owner.id === (typeof id === "string" ? id : id.id)];
            }
        });
    });
}
exports.isOwner = isOwner;
// 向主人发送消息
var sendMessageToOwner = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var owner;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getOwner)()];
            case 1:
                owner = _a.sent();
                if (!owner)
                    return [2 /*return*/];
                owner.say(message);
                return [2 /*return*/];
        }
    });
}); };
exports.sendMessageToOwner = sendMessageToOwner;
// 自己 vyronJ
var _self;
var getSelf = function () { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0:
            _a = _self;
            if (_a) return [3 /*break*/, 2];
            return [4 /*yield*/, (0, exports.getBot)().Contact.find({ name: "vyronJ" })];
        case 1:
            _a = (_self = (_b.sent()));
            _b.label = 2;
        case 2: return [2 /*return*/, _a];
    }
}); }); };
exports.getSelf = getSelf;
var setSelf = function (self) { return (_self = self); };
exports.setSelf = setSelf;
function isSelf(id) {
    return __awaiter(this, void 0, void 0, function () {
        var self;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exports.getSelf)()];
                case 1:
                    self = _a.sent();
                    return [2 /*return*/, self && id && self.id === (typeof id === "string" ? id : id.id)];
            }
        });
    });
}
exports.isSelf = isSelf;
// 消息是否提到自己
function mentionSelf(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var mentionList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, msg.mentionList()];
                case 1:
                    mentionList = _a.sent();
                    if (!mentionList || mentionList.length === 0)
                        return [2 /*return*/, false];
                    return [2 /*return*/, mentionList.some(isSelf)];
            }
        });
    });
}
exports.mentionSelf = mentionSelf;
