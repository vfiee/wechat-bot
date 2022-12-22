/*
 * @Author: vyron
 * @Date: 2021-08-14 22:51:42
 * @LastEditTime: 2022-12-16 16:17:56
 * @LastEditors: vyron
 * @Description: Bot weather plugin
 * @FilePath: /wechat-bot/src/plugins/weather/index.ts
 */
import { Contact, Message, Wechaty } from 'wechaty'
import configs, { WeatherTemplateData, WeatherConfig } from './config.js'
// import {
//   setScheduleJob,
//   sendMessageToOwner,
//   getBot
// } from '../../utils/index.js'
import { getWeather } from '../../api/weather/index.js'

const msg = (msg: string) => `[Weather] ${msg}`

export const sendWeatherMessage = async (
  config: WeatherConfig,
  contact?: Contact | Message | null
) => {
  // contact =
  //   contact ||
  //   (await getBot().Contact.find({ name: config.contactName })) ||
  //   (await getBot().Contact.find({ alias: config.contactName })) ||
  //   (await getBot().Contact.find({ name: config.contactId }))
  // if (!contact) {
  //   await sendMessageToOwner(
  //     msg(
  //       `注册定时发送天气信息失败,未获取到联系人[${config.contactName},${config.contactId}]`
  //     )
  //   )
  //   return
  // }
  // const weatherData = await getWeather(config.position)
  // const message = config.template(weatherData as WeatherTemplateData)
  // if (!weatherData || !message) {
  //   await sendMessageToOwner(
  //     msg(
  //       !weatherData ? '发送天气信息失败,未获取到天气信息' : '天气模板配置错误'
  //     )
  //   )
  //   return
  // }
  //   !!message &&
  //     (await contact.say(
  //       `${
  //         contact instanceof Message ? `@${contact.talker().name()}\n` : ''
  //       }${message}`
  //     ))
}

const weather = (bot: Wechaty) => {
  // bot.on('login', (_contact: Contact) => {
  //   configs
  //     .filter((config) => !config.disabled)
  //     .forEach((config) => {
  //       setScheduleJob({ tz: 'Asia/Shanghai', rule: config.scheduler }, () => {
  //         sendWeatherMessage(config)
  //       })
  //     })
  // })
}

export default weather
