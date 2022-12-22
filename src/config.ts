import { WechatyBuilder, Contact, Sayable } from 'wechaty'
import { ContactImpl } from 'wechaty/impls'

// 配置文件

export interface ContactQueryFilter {
  alias?: string | RegExp
  id?: string
  name?: string | RegExp
  weixin?: string
}

export interface BotConfig {
  // name
  name: string
  owner?: ContactQueryFilter
  // 异常消息联系人
  exceptionContactQuery?: ContactQueryFilter
  roomWhiteList?: string[]
  userTagList?: string[]
  userWhiteList?: string[]
}

// 机器人配置
export const config: BotConfig = {
  // 机器人名称
  name: 'WeChatBot',
  // 所有人
  owner: { alias: 'vyron' },
  // 异常信息发送人
  exceptionContactQuery: { alias: 'vyron' },
  // 群聊白名单
  roomWhiteList: [],
  // 用户tag白名单
  userTagList: ['openai'],
  // 用户白名单
  userWhiteList: ['尼斯湖皮皮怪']
}

export const getOwner = () =>
  WechatyBuilder.singleton()?.Contact.find(config.owner)

export const getContact = (query?: ContactQueryFilter) =>
  WechatyBuilder.singleton()?.Contact.find(query)

export const getExceptionContact = () =>
  getContact(config.exceptionContactQuery)

export const sayToExceptionContact = async (sayable: Sayable) =>
  (await getExceptionContact())?.say(sayable)

export const isOwner = async (
  owner?: ContactQueryFilter | Contact
): Promise<boolean> => {
  if (!owner) return false
  const { id } = await getOwner()
  if (owner instanceof ContactImpl) {
    return owner.id === id
  }
  const contact = await getContact(owner as ContactQueryFilter)
  return contact?.id === id
}
