"use strict";
exports.__esModule = true;
exports.defaultWeatherMessageTemplate = void 0;
var getGreetByTime = function () {
    var hours = Number(new Date().getHours());
    var timeMaps = [
        [[5, 6], "清晨"],
        [[7, 11], "早上"],
        [[11, 13], "中午"],
        [[12, 18], "下午"],
        [[18, 24], "晚上"],
        [[24, 5], "凌晨"]
    ];
    var res = "";
    for (var i = 0; i < timeMaps.length; i++) {
        var _a = timeMaps[i], time = _a[0], greet = _a[1];
        var min = time[0], max = time[1];
        if (hours > min && hours <= max) {
            res = greet;
            break;
        }
    }
    return res;
};
function defaultWeatherMessageTemplate(data) {
    var _a = data || {}, minTemperature = _a.minTemperature, maxTemperature = _a.maxTemperature, minWind = _a.minWind, maxWind = _a.maxWind, windDirection = _a.windDirection, isNight = _a.isNight, date = _a.date, weather = _a.weather, temperature = _a.temperature, address = _a.address;
    if (!data || Object.keys(data).length === 0)
        return "";
    var prefix = this.prefix;
    var suffix = this.suffix;
    return "" + (prefix ? prefix + "\n\n" : "") + (date || "") + (isNight ? "夜" : "日") + " " + (weather || "") + "\n\u4F4D\u7F6E: " + (address || "") + "\n\u6E29\u5EA6: " + (temperature || "") + "\u2103 " + (minTemperature || 0) + "-" + (maxTemperature || 0) + "\u2103\n\u98CE\u51B5: " + (windDirection || "") + " " + (minWind || 0) + "\u7EA7-" + (maxWind || 0) + "\u7EA7" + (suffix ? "\n\n" + suffix : "");
}
exports.defaultWeatherMessageTemplate = defaultWeatherMessageTemplate;
var config = [
    {
        contactId: "xiaohui-up",
        contactName: "A小慧",
        scheduler: "0 0 8 * * *",
        prefix: "亲爱的宝贝~ ",
        suffix: "新的一天,新的开始,保持好心情,继续加油! 奥利给💋💋💋",
        template: defaultWeatherMessageTemplate,
        position: {
            longitude: 113.544109,
            latitude: 34.806363
        }
    },
    {
        contactId: "姜先生",
        contactName: "vyron",
        scheduler: "0 0 8 * * *",
        prefix: "\u4E3B\u4EBA" + getGreetByTime() + "\u597D~",
        suffix: "祝主人整天心情愉快 🥰🥰🥰",
        template: defaultWeatherMessageTemplate,
        position: {
            longitude: 113.544109,
            latitude: 34.806363
        }
    },
    {
        contactId: "fuyaohui66",
        contactName: "Hope Of The Whole Village",
        scheduler: "0 0 8 * * *",
        prefix: "\u5C0F\u7070\u7070\u540C\u5B66" + getGreetByTime() + "\u597D~",
        suffix: "新的一天,新的开始,保持好心情,继续加油码代码! 奥利给👍👍👍",
        template: defaultWeatherMessageTemplate,
        position: {
            longitude: 114.757824,
            latitude: 32.830579
        }
    },
    {
        contactId: "Flipped_Zyy",
        contactName: "张洋洋🐑",
        scheduler: "0 0 8 * * *",
        prefix: "\u5F20\u6D0B\u6D0B\u540C\u5B66" + getGreetByTime() + "\u597D~",
        suffix: "新的一天,新的开始,保持好心情,继续加油! 奥利给👍👍👍",
        template: defaultWeatherMessageTemplate,
        position: {
            longitude: 116.304423,
            latitude: 39.963
        }
    },
    {
        contactId: "rypbklsx0726",
        contactName: "十年",
        scheduler: "0 0 8 * * *",
        prefix: "\u6768\u51EF\u540C\u5B66" + getGreetByTime() + "\u597D~",
        suffix: "新的一天,新的开始,保持好心情,继续加油码代码! 奥利给👍👍👍",
        template: defaultWeatherMessageTemplate,
        position: {
            longitude: 114.026334,
            latitude: 33.013271
        }
    }
];
exports["default"] = config;
