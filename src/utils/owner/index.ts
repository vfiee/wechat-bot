/*
 * @Author: vyron
 * @Date: 2021-08-15 14:16:53
 * @LastEditTime: 2022-12-12 18:26:00
 * @LastEditors: vyron
 * @Description: Owner
 * @FilePath: /wechat-bot/src/utils/owner/index.ts
 */
// @ts-ignore
import { Contact, Message, Wechaty, WechatyBuilder } from 'wechaty'

// 获取机器人实例
let _bot: Wechaty
export const getBot = (): Wechaty => _bot || (_bot = WechatyBuilder.singleton())

// 主人 vyron
let _owner: Contact
export const getOwner = async () =>
  _owner ||
  (_owner = (await getBot().Contact.find({ name: 'vyronJ' })) as Contact)

// 设置拥有者
export const setOwner = (contact: Contact) => (_owner = contact)

// 判断是否为主人
export async function isOwner(id: string): Promise<boolean>
export async function isOwner(id: Contact): Promise<boolean>
export async function isOwner(id: string | Contact) {
  const owner = await getOwner()
  return owner && id && owner.id === (typeof id === 'string' ? id : id.id)
}

// 向主人发送消息
export const sendMessageToOwner = async (message: string) => {
  const owner = await getOwner()
  if (!owner) return
  return owner.say(message)
}

// 自己 vyronJ
let _self: Contact
export const getSelf = async () =>
  _self ||
  (_self = (await getBot().Contact.find({ name: 'vyronJ' })) as Contact)

export const setSelf = (self: Contact) => (_self = self)

// 判断是否为自己
export async function isSelf(id: string): Promise<boolean>
export async function isSelf(id: Contact): Promise<boolean>

export async function isSelf(id: string | Contact) {
  const self = await getSelf()
  return self && id && self.id === (typeof id === 'string' ? id : id.id)
}

// 消息是否提到自己
export async function mentionSelf(msg: Message): Promise<boolean> {
  const mentionList = await msg.mentionList()
  if (!mentionList || mentionList.length === 0) return false
  return mentionList.some(isSelf)
}
