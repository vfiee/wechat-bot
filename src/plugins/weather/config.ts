/*
 * @Author: vyron
 * @Date: 2021-08-15 00:06:09
 * @LastEditTime: 2021-10-05 19:33:26
 * @LastEditors: vyron
 * @Description: 天气配置文件
 * @FilePath: /wechat-bot/src/plugins/weather/config.ts
 */
export interface WeatherTemplateData {
	temperature: number;
	minTemperature: number;
	maxTemperature: number;
	minWind: number;
	maxWind: number;
	windDirection: string;
	isDay: boolean;
	isNight: boolean;
	date: string;
	weather: string;
	address: string;
}

export type WeatherMessageTemplate = (data: WeatherTemplateData) => string;

export type WeatherPosition = {
	longitude: number;
	latitude: number;
};

type TimeMap = [number[], string];

const getGreetByTime = () => {
	const hours = Number(new Date().getHours());
	const timeMaps: TimeMap[] = [
		[[5, 6], "清晨"],
		[[7, 11], "早上"],
		[[11, 13], "中午"],
		[[12, 18], "下午"],
		[[18, 24], "晚上"],
		[[24, 5], "凌晨"]
	];
	let res = "";
	for (const [time, greet] of timeMaps) {
		const [min, max] = time;
		if (hours > min && hours <= max) {
			res = greet as string;
			break;
		}
	}
	return res;
};

export interface WeatherConfig {
	contactId: string;
	contactName: string;
	scheduler: string;
	prefix?: string;
	suffix?: string;
	disabled?: boolean;
	template: WeatherMessageTemplate;
	position: WeatherPosition;
}

export function defaultWeatherMessageTemplate(
	this: WeatherConfig,
	data: WeatherTemplateData
) {
	let {
		minTemperature,
		maxTemperature,
		minWind,
		maxWind,
		windDirection,
		isNight,
		date,
		weather,
		temperature,
		address
	} = data || {};
	if (!data || Object.keys(data).length === 0) return "";
	const prefix = this.prefix;
	const suffix = this.suffix;
	return `${prefix ? prefix + "\n\n" : ""}${date || ""}${
		isNight ? "夜" : "日"
	} ${weather || ""}
位置: ${address || ""}
温度: ${temperature || ""}℃ ${minTemperature || 0}-${maxTemperature || 0}℃
风况: ${windDirection || ""} ${minWind || 0}级-${maxWind || 0}级${
		suffix ? "\n\n" + suffix : ""
	}`;
}

const config: WeatherConfig[] = [
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
		prefix: `主人${getGreetByTime()}好~`,
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
		prefix: `小灰灰同学${getGreetByTime()}好~`,
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
		prefix: `张洋洋同学${getGreetByTime()}好~`,
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
		prefix: `杨凯同学${getGreetByTime()}好~`,
		suffix: "新的一天,新的开始,保持好心情,继续加油码代码! 奥利给👍👍👍",
		template: defaultWeatherMessageTemplate,
		position: {
			longitude: 114.102989,
			latitude: 32.084698
		}
	}
];

export default config;
