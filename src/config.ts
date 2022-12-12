import { WechatyBuilder, Contact } from 'wechaty'

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
  // 异常消息联系人
  exceptionContactQuery?: ContactQueryFilter
}

export const config: BotConfig = {
  name: 'WeChatBot',
  exceptionContactQuery: { weixin: 'vyronJ' }
}

export const getExceptionContact = async (): Promise<Contact | undefined> => {
  const { exceptionContactQuery } = config
  if (!exceptionContactQuery) return
  return WechatyBuilder.singleton()?.Contact.find(exceptionContactQuery)
}
