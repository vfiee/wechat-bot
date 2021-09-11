/*
 * @Author: vyron
 * @Date: 2021-08-29 12:42:05
 * @LastEditTime: 2021-08-29 13:19:51
 * @LastEditors: vyron
 * @Description: 通知,支持server酱,钉钉,微信,企业微信,Telegram,Bark
 * @FilePath: /wechat-bot/src/utils/notification/index.ts
 */

import axios, { AxiosRequestConfig } from "axios";

function post(url: string, body: any, config?: AxiosRequestConfig) {
	return axios.post(url, body, config);
}

enum NotificationType {
	SERVER = "Server酱",
	DING = "dingding",
	WECHAT = "wechat",
	WORK_WECHAT = "work_wechat",
	TELEGRAM = "telegram",
	BARK = "bark"
}

type NotificationParams = {
	// 消息标题
	title?: string;
	// 消息内容
	text: string;
	// 抄送给其它人的openid,
	openids: string[];
	// 代理IP
	proxyHost?: string;
	// 代理端口
	proxyPort?: string;
	// 代理权限验证
	proxyAuth?: string;
};

type NotificationConfig = NotificationParams & {
	type: NotificationType;
};

function notification(config: NotificationConfig) {
	const { type, ...restConfig } = config;
	const typeNotificationMap = {
		[NotificationType.SERVER]: serverNotification,
		[NotificationType.DING]: dingNotification,
		[NotificationType.WECHAT]: wechatNotification,
		[NotificationType.WORK_WECHAT]: workWechatNotification,
		[NotificationType.TELEGRAM]: telegramNotification,
		[NotificationType.BARK]: barkNotification
	};
	typeNotificationMap[type] && typeNotificationMap[type](restConfig);
}

function serverNotification(params: NotificationParams) {}
function dingNotification(params: NotificationParams) {}
function wechatNotification(params: NotificationParams) {}
function workWechatNotification(params: NotificationParams) {}
function telegramNotification(params: NotificationParams) {}
function barkNotification(params: NotificationParams) {}
