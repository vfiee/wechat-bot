import { Message, Wechaty, WechatyBuilder, types, Tag } from 'wechaty'
import {
  QRCodeTerminal,
  EventLogger,
  FriendshipAccepter,
  RoomInvitationAccepter
} from 'wechaty-plugin-contrib'
import plugins from './plugins/index.js'
import { config, sayToExceptionContact, isOwner } from './config.js'
import { Command } from './plugins/command'
import { openAiCommands, tagCommands } from './commands'

const commandIns = new Command([...openAiCommands, ...tagCommands])

const { name, userTagList, roomWhiteList, userWhiteList } = config

const onLogin = () => {
  // 通知机器人主人登录成功
  sayToExceptionContact(
    `🎉🎉🎉 机器人登录成功! 时间:${new Date().toLocaleDateString()}`
  )
}
const onLogOut = () => {
  // 通知机器人主人退出登录
  sayToExceptionContact(
    `💔💔💔 机器人已退出登录! 时间:${new Date().toLocaleDateString()}`
  )
}

const onError = (err: any, isExit: boolean = false) => {
  // 通知机器人主人发生错误
  sayToExceptionContact(`🚫 机器人发生错误!
  当前时间:${new Date().toLocaleDateString()}
  错误信息:${err.toString()}
  程序退出: ${isExit ? '是' : '否'}
  `)
}

async function onMessage(bot: Wechaty, message: Message) {
  const talker = message.talker()
  await talker.sync()
  const talkerType = talker.type()
  const name = talker.name() || (await talker.alias())
  // 忽略官方或没必要的消息
  if (
    talker.self() ||
    [types.Contact.Corporation, types.Contact.Official].includes(talkerType)
  )
    return

  // 如果是机器所有人, 通行
  const isOwnerContact = await isOwner(talker)
  if (isOwnerContact || (userWhiteList && userWhiteList.includes(name))) {
    commandIns.run(bot, message, isOwnerContact)
  }

  // 如果是白名单 tag user, 通行
  // const talkerTags = await talker.tags()
  // console.log(`talkerTags:`, talkerTags)
  // const isLegalTagContact = (userTagList || []).some((tag) =>
  //   talkerTags.includes(tag)
  // )
}

async function run() {
  const bot = WechatyBuilder.singleton({
    name
  })
  bot.use([
    QRCodeTerminal({ small: true }),
    EventLogger(),
    FriendshipAccepter(),
    RoomInvitationAccepter(),
    ...plugins
  ])

  return bot
    .on('login', onLogin)
    .on('logout', onLogOut)
    .on('error', onError)
    .on('message', (message) => onMessage(bot, message))
    .start()
}

run().catch((err) => {
  onError(err, true)
  process.exit()
})
