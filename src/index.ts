// @ts-ignore
import { Wechaty, Contact } from "/wechaty"
import {
  QRCodeTerminal,
  EventLogger,
  FriendshipAccepter,
  RoomInvitationAccepter,
} from "wechaty-plugin-contrib"
import plugins from "./plugins"
import { setSelf, sendMessageToOwner } from "./utils"

const onLogin = async (user: Contact) => {
  // 通知机器人主人登录成功
  const message = `🎉🎉🎉 机器人登录成功!
  当前时间:${new Date().toLocaleDateString()}`
  sendMessageToOwner(message)
  setSelf(user)
}
const onLogOut = () => {
  // 通知机器人主人退出登录
  const message = `🎉🎉🎉 机器人已退出登录!
  当前时间:${new Date().toLocaleDateString()}`
  sendMessageToOwner(message)
}

const onError = (err: any, isExit: boolean = false) => {
  // 通知机器人主人发生错误
  console.log(`发生错误,请及时处理${isExit ? "程序将会退出" : ""}:`, err)
  const message = `❎❎❎ 机器人发生错误!
  当前时间:${new Date().toLocaleDateString()}`
  sendMessageToOwner(message)
  sendMessageToOwner(`错误信息:${err.toString()}`)
}

async function run() {
  const bot = Wechaty.instance({ name: "wechat-bot" })
  bot.use([
    QRCodeTerminal(),
    EventLogger(),
    FriendshipAccepter(),
    RoomInvitationAccepter(),
    ...plugins,
  ])
  bot.on("login", onLogin).on("logout", onLogOut).on("error", onError)
  await bot.start()
}

run().catch((err) => {
  onError(err, true)
  process.exit()
})
