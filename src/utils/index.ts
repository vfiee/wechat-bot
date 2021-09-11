/*
 * @Author: vyron
 * @Date: 2021-08-14 22:57:40
 * @LastEditTime: 2021-08-29 10:20:29
 * @LastEditors: vyron
 * @Description: 工具类
 * @FilePath: /wechat-bot/src/utils/index.ts
 */

export * from "./schedule";
export * from "./owner";

type DebounceCallback = (...args: any[]) => unknown;

export const debounce = (
	fn: DebounceCallback,
	wait: number = 300 /*Millisecond*/
) => {
	let timer: NodeJS.Timeout;
	return function debounceCallback(...args: any[]) {
		timer && clearTimeout(timer);
		timer = setTimeout(fn.bind(null, ...args), wait);
	};
};
