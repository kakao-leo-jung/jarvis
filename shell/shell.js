import {clear, write} from "../libs/console.js";
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

  constructor(commands, description) {
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

  printShell(clearDisplay = true) {
    if (clearDisplay) {
      clear()
    }
    this.printTitle()
    this.commands.print()
    write(`${this.guideMessage}\n`)
  }

  printTitle() {
    write(`
   _   _        _                    
 | | | |  ___ | | _ __    ___  _ __ 
 | |_| | / _ \| || '_ \  / _ \| '__|
 |  _  ||  __/| || |_) ||  __/| |   
 |_| |_| \___||_|| .__/  \___||_|   
                 |_|                
\n`)
    write(this.description)
  }
}