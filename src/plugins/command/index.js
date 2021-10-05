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
var utils_1 = require("../../utils");
var weather_1 = require("../weather");
var config_1 = require("../weather/config");
var Commands;
(function (Commands) {
    Commands["WEATHER"] = "@\u5929\u6C14";
    Commands["ROOM_KICK"] = "@\u8E22";
})(Commands || (Commands = {}));
var runServiceByCommand = function (command, msg) { return __awaiter(void 0, void 0, void 0, function () {
    var commands, fn;
    var _a;
    return __generator(this, function (_b) {
        commands = (_a = {},
            _a[Commands.WEATHER] = weather,
            _a[Commands.ROOM_KICK] = utils_1.BLANK,
            _a);
        fn = commands[command];
        fn && typeof fn === "function" && fn(msg, command);
        return [2 /*return*/];
    });
}); };
var command = function (bot) {
    bot.on("message", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var text, isCommand;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (msg.self())
                        return [2 /*return*/];
                    return [4 /*yield*/, msg.mentionText()];
                case 1:
                    text = _a.sent();
                    isCommand = Object.values(Commands).includes(text);
                    isCommand && runServiceByCommand(text, msg);
                    return [2 /*return*/];
            }
        });
    }); });
};
// 发送天气情况
var weather = function (msg, command) { return __awaiter(void 0, void 0, void 0, function () {
    var talkerName, talkerConfigIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                talkerName = msg.talker().name();
                talkerConfigIndex = config_1["default"].findIndex(function (config) { return config.contactName === talkerName; });
                if (talkerConfigIndex === -1) {
                    msg.say("@" + talkerName + " \u60A8\u5C1A\u672A\u914D\u7F6E\u5929\u6C14\u9700\u8981\u7684\u7ECF\u7EAC\u5EA6\u4FE1\u606F,\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u914D\u7F6E!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, weather_1.sendWeatherMessage)(config_1["default"][talkerConfigIndex], msg)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = command;
