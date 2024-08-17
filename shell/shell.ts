import {clear, write} from "../libs/console";
import readline from "readline";

export default class AbstractShell {
  commands = null
  description = "[Choose help-guide!]\n"
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ' > ',
  })
  guideMessage = ''

  constructor(commands, description = this.description) {
    if (new.target === AbstractShell) {
      throw new Error("Cannot instantiate an abstract class.");
    }
    this.commands = commands
    if (description) {
      this.description = description
    }
  }

  async execute() {
    this.printShell()
    this.processInput()
  }

  processInput() {
    this.rl.prompt()
    this.rl.on("line", this.handleInput.bind(this));
  }

  async handleInput(line) {
    if (line && line >= 0) {
      this.rl.pause()
      const signal = await this.commands.exec(line)
      this.rl.resume()
      this.guideMessage = signal.getMessage()
      if (signal.isExit()) {
        this.rl.close()
        return
      }

      this.printShell(signal.clearDisplay())
      this.rl.prompt()
    } else {
      this.rl.prompt()
    }
  }

  printShell(clearDisplay = true, printTitle = true) {
    if (clearDisplay) {
      clear()
    }
    if (printTitle) {
      this.printTitle()
      this.commands.print()
    }
    write(`[JARVIS] : ${this.guideMessage}\n`)
  }

  printTitle() {
    write(`
         ██╗ █████╗ ██████╗ ██╗   ██╗██╗███████╗
         ██║██╔══██╗██╔══██╗██║   ██║██║██╔════╝
         ██║███████║██████╔╝██║   ██║██║███████╗
    ██   ██║██╔══██║██╔══██╗╚██╗ ██╔╝██║╚════██║
    ╚█████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║███████║
     ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝
\n`)
    write(this.description)
  }
}