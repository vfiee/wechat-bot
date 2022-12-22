import { Message, Wechaty } from 'wechaty'
import { CommandConfig } from '../../plugins/command'

export const tagCommands: CommandConfig[] = [
  {
    async validator(bot: Wechaty, message: Message, isOwner: boolean) {
      // const text = message.text()
      // console.log(`text:`, text)
      // const tags = await bot.Tag.get('openai')
      // console.log(`tags:`, tags)
      // const contact = await bot.Contact.find({ name: '尼斯湖皮皮怪' })
      // const contact2 = await message.room()?.member('尼斯湖皮皮怪')
      // const tag = await bot.Tag.get('openai')
      // console.log(`add tag:`, await tag.add(contact2))
      // console.log(`contact:`, contact)
      // console.log(`contact2:`, await contact2.tags())
      return false
    },
    run(bot: Wechaty, message: Message, isOwner: boolean) {
      console.log(`run tag`)
    }
  }
]
