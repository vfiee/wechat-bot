/*
 * @Author: vyron
 * @Date: 2021-08-15 14:16:53
 * @LastEditTime: 2021-09-11 22:07:09
 * @LastEditors: vyron
 * @Description: Owner
 * @FilePath: /wechat-bot/src/utils/owner/index.ts
 */
// @ts-ignore
import { Contact, Message, Wechaty } from "/wechaty";

// 获取机器人实例
let _bot: Wechaty;
export const getBot = (): Wechaty => _bot || (_bot = Wechaty.instance());

// 获取主人 vyron
let _owner: Contact;
export const getOwner = () =>
	_owner || (_owner = getBot().Contact.load("wxid_eeon597kjr7i22"));

// 获取自己 vyronJ
let _self: Contact;
export const getSelf = () =>
	_self || (_self = getBot().Contact.load("wxid_rzbcle30eygs12"));

// 向主人发送消息
export const sendMessageToOwner = async (message: string) => {
	const owner = getOwner();
	if (!owner) return;
	owner.say(message);
};

// 判断是否为主人
export function isOwner(id: string): boolean;
export function isOwner(id: Contact): boolean;

export function isOwner(id: string | Contact) {
	const owner = getOwner();
	return owner && id && owner.id === (typeof id === "string" ? id : id.id);
}

// 判断是否为自己
export function isSelf(id: string): boolean;
export function isSelf(id: Contact): boolean;

export function isSelf(id: string | Contact) {
	const self = getSelf();
	return self && id && self.id === (typeof id === "string" ? id : id.id);
}

// 消息是否提到自己
export async function mentionSelf(msg: Message): Promise<boolean> {
	const mentionList = await msg.mentionList();
	if (!mentionList || mentionList.length === 0) return false;
	return mentionList.some(isSelf);
}
