#!/usr/bin/env npx tsx
import AbstractShell from "./shell";
import Signal, {EXIT, NO_EXIT, NO_EXIT_PRESERVE_DISPLAY} from "../libs/signal";
import Commands from "../libs/commands";

export default class GptShell extends AbstractShell {

  constructor() {
    super(new Commands([], ['BACK', '뒤로가기', () => {
      return new Signal(EXIT)
    }]), "[GPT - cluade-3.5-sonet]")
  }

  async handleInput(line) {
    if (line && line >= 0) {
      this.rl.pause()
      // todo
      const signal = new Signal(NO_EXIT, `
       your input is : ${line}
      `)

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
}

await new GptShell().execute()