"use strict";
/*
 * @Author: vyron
 * @Date: 2021-08-14 22:57:40
 * @LastEditTime: 2021-10-05 18:12:33
 * @LastEditors: vyron
 * @Description: 工具类
 * @FilePath: /wechat-bot/src/utils/index.ts
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.BLANK = exports.debounce = void 0;
__exportStar(require("./schedule"), exports);
__exportStar(require("./owner"), exports);
var debounce = function (fn, wait /*Millisecond*/) {
    if (wait === void 0) { wait = 300; }
    var timer;
    return function debounceCallback() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        timer && clearTimeout(timer);
        timer = setTimeout(fn.bind.apply(fn, __spreadArray([null], args, false)), wait);
    };
};
exports.debounce = debounce;
var BLANK = function () { };
exports.BLANK = BLANK;
