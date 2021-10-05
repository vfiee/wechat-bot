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
exports.sendWeatherMessage = void 0;
/*
 * @Author: vyron
 * @Date: 2021-08-14 22:51:42
 * @LastEditTime: 2021-10-01 13:03:05
 * @LastEditors: vyron
 * @Description: Bot weather plugin
 * @FilePath: /wechat-bot/src/plugins/weather/index.ts
 */
// @ts-ignore
var wechaty_1 = require("/wechaty");
var config_1 = require("./config");
var utils_1 = require("../../utils");
var weather_1 = require("../../api/weather");
var msg = function (msg) { return "[Weather] " + msg; };
var sendWeatherMessage = function (config, contact) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, weatherData, message, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _c = contact;
                if (_c) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, utils_1.getBot)().Contact.find({ name: config.contactName })];
            case 1:
                _c = (_e.sent());
                _e.label = 2;
            case 2:
                _b = _c;
                if (_b) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, utils_1.getBot)().Contact.find({ alias: config.contactName })];
            case 3:
                _b = (_e.sent());
                _e.label = 4;
            case 4:
                _a = _b;
                if (_a) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, utils_1.getBot)().Contact.find({ name: config.contactId })];
            case 5:
                _a = (_e.sent());
                _e.label = 6;
            case 6:
                contact = _a;
                if (!!contact) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, utils_1.sendMessageToOwner)(msg("\u6CE8\u518C\u5B9A\u65F6\u53D1\u9001\u5929\u6C14\u4FE1\u606F\u5931\u8D25,\u672A\u83B7\u53D6\u5230\u8054\u7CFB\u4EBA[" + config.contactName + "," + config.contactId + "]"))];
            case 7:
                _e.sent();
                return [2 /*return*/];
            case 8: return [4 /*yield*/, (0, weather_1.getWeather)(config.position)];
            case 9:
                weatherData = _e.sent();
                message = config.template(weatherData);
                if (!(!weatherData || !message)) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, utils_1.sendMessageToOwner)(msg(!weatherData ? "发送天气信息失败,未获取到天气信息" : "天气模板配置错误"))];
            case 10:
                _e.sent();
                return [2 /*return*/];
            case 11:
                _d = !!message;
                if (!_d) return [3 /*break*/, 13];
                return [4 /*yield*/, contact.say("" + (contact instanceof wechaty_1.Message ? "@" + contact.talker().name() + "\n" : "") + message)];
            case 12:
                _d = (_e.sent());
                _e.label = 13;
            case 13:
                _d;
                return [2 /*return*/];
        }
    });
}); };
exports.sendWeatherMessage = sendWeatherMessage;
var weather = function (bot) {
    bot.on("login", function (_contact) {
        config_1["default"]
            .filter(function (config) { return !config.disabled; })
            .forEach(function (config) {
            (0, utils_1.setScheduleJob)({ tz: "Asia/Shanghai", rule: config.scheduler }, function () {
                (0, exports.sendWeatherMessage)(config);
            });
        });
    });
};
exports["default"] = weather;
