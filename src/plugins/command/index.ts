/*
 * @Author: vyron
 * @Date: 2021-08-14 22:51:42
 * @LastEditTime: 2021-10-25 09:54:12
 * @LastEditors: vyron
 * @Description: Bot command plugin
 * @FilePath: /wechat-bot/src/plugins/command/index.ts
 */
// @ts-ignore
import { Message, Wechaty } from "/wechaty"
import { BLANK } from "../../utils"
import { sendWeatherMessage } from "../weather"
import configs, { WeatherConfig } from "../weather/config"

enum Commands {
  WEATHER = "@天气",
  ROOM_KICK = "@踢",
}

type CommandFunction = (msg: Message, command: string) => void

type CommandMaps = {
  [key: string]: CommandFunction
}

const runServiceByCommand = async (command: string, msg: Message) => {
  const commands: CommandMaps = {
    [Commands.WEATHER]: weather,
    [Commands.ROOM_KICK]: BLANK,
  }
  const fn = commands[command]
  fn && typeof fn === "function" && fn(msg, command as Commands)
}

const command = (bot: Wechaty) => {
  bot.on("message", async (msg: Message) => {
    if (msg.self()) return
    const text = await msg.mentionText()
    const isCommand = Object.values(Commands).includes(text as Commands)
    isCommand && runServiceByCommand(text, msg)
  })
}

// 发送天气情况
const weather = async (msg: Message, command: string) => {
  console.log(`command:`, command)
  const talkerName = msg.talker().name()
  const talkerConfigIndex = configs.findIndex(
    (config) => config.contactName === talkerName
  )
  if (talkerConfigIndex === -1) {
    msg.say(`@${talkerName} 您尚未配置天气需要的经纬度信息,请联系管理员配置!`)
    return
  }
  await sendWeatherMessage(configs[talkerConfigIndex] as WeatherConfig, msg)
}

export default command
