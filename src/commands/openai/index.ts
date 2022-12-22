import { Message, Wechaty } from 'wechaty'
import { CommandConfig } from '../../plugins/command'
import { getOpenAiReply } from '../../utils'

const OPEN_AI_MSG_PREFIX = `#AI`

const WAIT_MSG = `🚀 努力查询中...`

const STOP_MSG = '停止'

let isAskingAi = false

export const openAiCommands: CommandConfig[] = [
  {
    async validator(bot: Wechaty, message: Message, isOwner: boolean) {
      const isOpenAiMsg = (message.text() || '').startsWith(OPEN_AI_MSG_PREFIX)
      return isOpenAiMsg
    },
    async run(bot: Wechaty, message: Message, isOwner: boolean) {
      const text = message.text()
      const talker = message.talker()
      const isInRoom = message.room()
      const name = talker.name() || (await talker.alias())
      const ask = text.slice(OPEN_AI_MSG_PREFIX.length).trim()
      if (!ask) return
      const replayPrefix = `${isInRoom ? '@' : ''}${name}`
      if (ask === STOP_MSG) {
        if (isAskingAi) {
          isAskingAi = false
        }
        message.say(`${replayPrefix} 已终止`)
        return
      }
      if (isAskingAi) {
        return message.say(`${replayPrefix} 我太忙了, 请您稍后再问...`)
      }
      message.say(`${replayPrefix} ${WAIT_MSG}`)
      isAskingAi = true
      const answer = await getOpenAiReply(ask).finally(() => {
        isAskingAi = false
      })
      message.say(`${replayPrefix} 仅供参考 \n${answer}`)
    }
  }
]
