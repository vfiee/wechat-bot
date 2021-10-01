/*
 * @Author: vyron
 * @Date: 2021-08-14 22:51:42
 * @LastEditTime: 2021-10-01 13:34:26
 * @LastEditors: vyron
 * @Description: Bot command plugin
 * @FilePath: /wechat-bot/src/plugins/command/index.ts
 */
// @ts-ignore
import {config, Message, Wechaty} from "/wechaty";
import {isOwner} from "../../utils";
import {sendWeatherMessage} from "../weather";
import configs, {WeatherConfig} from "../weather/config";

enum Commands {
	WEATHER = "@天气",
	ROOM_KICK = "@踢"
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
		if (msg.self()) return;
		const text = await msg.mentionText();
		const talker = msg.talker();
		if (!!text && isOwner(talker)) {
			runServiceByCommand(text, msg);
		}
	});
};

export default command;
