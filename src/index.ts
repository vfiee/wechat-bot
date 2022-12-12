// @ts-ignore
import { Wechaty, Contact, WechatyBuilder } from 'wechaty'
import {
  QRCodeTerminal,
  EventLogger,
  FriendshipAccepter,
  RoomInvitationAccepter
} from 'wechaty-plugin-contrib'
import plugins from './plugins'
import { config, getExceptionContact } from './config'

const { name } = config

const onLogin = async (user: Contact) => {
  // 通知机器人主人登录成功
  const contact = await getExceptionContact()
  if (!contact) return
  contact.say(`🎉🎉🎉 机器人登录成功!
  当前时间:${new Date().toLocaleDateString()}`)
}
const onLogOut = async () => {
  // 通知机器人主人退出登录
  const contact = await getExceptionContact()
  if (!contact) return
  contact.say(`🎉🎉🎉 机器人已退出登录!
  当前时间:${new Date().toLocaleDateString()}`)
}

const onError = async (err: any, isExit: boolean = false) => {
  // 通知机器人主人发生错误
  // console.log(`发生错误,请及时处理${isExit ? '程序将会退出' : ''}:`, err)
  const contact = await getExceptionContact()
  if (!contact) return
  contact.say(`🚫 机器人发生错误!
  当前时间:${new Date().toLocaleDateString()}
  错误信息:${err.toString()}
  程序退出: ${isExit ? '是' : '否'}
  `)
}

async function run() {
  const bot = WechatyBuilder.singleton({ name })
  bot.use([
    QRCodeTerminal(),
    EventLogger(),
    FriendshipAccepter(),
    RoomInvitationAccepter(),
    ...plugins
  ])
  bot.on('login', onLogin).on('logout', onLogOut).on('error', onError)
  await bot.start()
}

run().catch((err) => {
  onError(err, true)
  process.exit()
})
