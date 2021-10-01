/*
 * @Author: vyron
 * @Date: 2021-08-15 14:16:53
 * @LastEditTime: 2021-10-01 12:48:32
 * @LastEditors: vyron
 * @Description: Owner
 * @FilePath: /wechat-bot/src/utils/owner/index.ts
 */
// @ts-ignore
import {Contact, Message, Wechaty} from "/wechaty";

// 获取机器人实例
let _bot: Wechaty;
export const getBot = (): Wechaty => _bot || (_bot = Wechaty.instance());

// 获取主人 vyron
let _owner: Contact;
export const getOwner = () =>
	_owner ||
	(_owner = getBot().Contact.load(
		"@779ddaa497fc187b86b18b36b373d42c5f32df6d9b8307a3800392b0838aee39"
	));

// 获取自己 vyronJ
let _self: Contact;
export const getSelf = () =>
	_self ||
	(_self = getBot().Contact.load(
		"@465789b6c66cb0127373e923206a29d3572223648f60c133de0e968da18563d9"
	));

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
	console.log(`owner:`, owner);
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
