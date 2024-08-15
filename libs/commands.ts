import {getDisplayLength, write} from "./console.ts";
import Command from "./command";
import Signal, {NO_EXIT} from "./signal.ts";

export default class Commands {
  fileMaxLength = 40
  commands = []

  constructor(arr, exitCmd) {
    this.commands.push(new Command(exitCmd[0], exitCmd[1], exitCmd[2]))
    arr.forEach(cmd => {
      this.commands.push(new Command(cmd[0], cmd[1], cmd[2]))
    })
  }

  print() {
    this.commands.forEach((cmd, index) => {
      if (index === 0) {
        return
      }

      write('\n')
      const indentSize = this.fileMaxLength - getDisplayLength(cmd.description)
      const indent = Array(indentSize).fill("\xa0").join("")
      write(`[${index}] ${cmd.description}${indent}# ${cmd.title}`)
    })

    // print exit
    write('\n')
    const indentSize = this.fileMaxLength - getDisplayLength(
        this.commands[0].description)
    const indent = Array(indentSize).fill("\xa0").join("")
    write(
        `[0] ${this.commands[0].description}${indent}# ${this.commands[0].title}`)
    write('\n\n')
  }

  has(index) {
    return index < this.commands.length
  }

  async exec(index) {
    if (!this.has(index)) {
      return new Signal(NO_EXIT, `잘못된 명령 입니다. [${index}]`)
    }

    return await this.commands[index].action()
  }
}