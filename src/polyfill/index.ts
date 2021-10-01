/*
 * @Author: vyron
 * @Date: 2021-08-15 18:17:01
 * @LastEditTime: 2021-09-11 22:06:52
 * @LastEditors: vyron
 * @Description: Wechaty polyfill
 * @FilePath: /wechat-bot/src/polyfill/index.ts
 */

// @ts-ignore
import {Message} from "/wechaty";

export async function mentionSelf(this: Message): Promise<boolean> {
	const mentionList = await this.mentionList();
	if (!mentionList || mentionList.length === 0) return false;
	const id = this.wechaty.puppet.selfId();
	return mentionList.some(item => item.id == id);
}
