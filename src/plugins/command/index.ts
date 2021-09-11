/*
 * @Author: vyron
 * @Date: 2021-08-14 22:51:42
 * @LastEditTime: 2021-09-11 22:06:24
 * @LastEditors: vyron
 * @Description: Bot command plugin
 * @FilePath: /wechat-bot/src/plugins/command/index.ts
 */
// @ts-ignore
import { Message, Wechaty } from "/wechaty";
import { isOwner } from "../../utils";
import { sendWeatherMessage } from "../weather";
import configs, { WeatherConfig } from "../weather/config";

enum Commands {
	WEATHER = "天气",
	ROOM_KICK = "踢"
}

const runServiceByCommand = async (command: string, msg: Message) => {
	switch (command) {
		case Commands.WEATHER:
			sendWeatherMessage(configs[1] as WeatherConfig, msg);
			break;

		default:
			break;
	}
};

const command = (bot: Wechaty) => {
	bot.on("message", async (msg: Message) => {
		const text = await msg.mentionText();
		if (!!text && (await msg.mentionSelf()) && isOwner(msg.talker())) {
			runServiceByCommand(text, msg);
		}
	});
};

export default command;
