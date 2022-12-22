import { Wechaty, Message } from 'wechaty'

export interface CommandConfig {
  validator: (
    bot: Wechaty,
    message: Message,
    isOwner?: boolean
  ) => boolean | Promise<boolean>
  run: (bot: Wechaty, message: Message, isOwner?: boolean) => void
}

const isArray = Array.isArray

export class Command {
  private commands: Set<CommandConfig>
  constructor(commands?: CommandConfig[]) {
    this.commands = new Set(commands || [])
  }
  add(commands: CommandConfig | CommandConfig[]) {
    if (isArray(commands)) {
      commands.forEach((item) => this.commands.add(item))
    } else {
      this.commands.add(commands)
    }
  }
  delete(command: CommandConfig) {
    return this.commands.delete(command)
  }
  run(bot: Wechaty, message: Message, isOwner?: boolean) {
    this.commands.forEach(async ({ validator, run }) => {
      if (await validator(bot, message, isOwner)) {
        run(bot, message, isOwner)
      }
    })
  }
}
