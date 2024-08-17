#!/usr/bin/env npx tsx
import AbstractShell from "./shell";
import Signal, {EXIT, NO_EXIT_PRESERVE_DISPLAY} from "../libs/signal";
import Commands from "../libs/commands";
import Anthropic from '@anthropic-ai/sdk';
import {write, writeln} from "../libs/console";
import {ChatSession} from "../libs/gpt-chat";

export default class GptShell extends AbstractShell {
  gpt
  session

  constructor() {
    super(new Commands([], ['BACK', '뒤로가기', () => {
      return new Signal(EXIT)
    }]), "[GPT - cluade-3.5-sonet]")
    super.guideMessage = '좋은 하루입니다. 주인님 무엇이 궁금하신가요?'

    this.gpt = new Anthropic({
      apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
    });

    this.session = new ChatSession()
  }

  async handleInput(line: String) {
    if (line && line !== '0' && line !== '1') {
      this.rl.pause()
      await this.prompt(line)

      const signal = new Signal(NO_EXIT_PRESERVE_DISPLAY, `더 궁금한게 있으신가요? [0 : 종료, 1 : 새 세션 시작하기]`)

      this.rl.resume()
      this.guideMessage = signal.getMessage()
      if (signal.isExit()) {
        this.rl.close()
        return
      }

      this.printShell(signal.clearDisplay(), false)
      this.rl.prompt()
    } else if (line === '0') {
      // finish gpt prompt
      this.rl.close()
    } else if (line === '1') {
      // todo : open new session
      this.session.clear()
      this.printShell(true, true)
      this.rl.prompt()
    } else {
      this.rl.prompt()
    }
  }

  async prompt(question: String) {
    this.session.addMessage('user', question)

    const stream = await this.gpt.messages.stream({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      messages: this.session.getHistory(),
    })
    .on('text', text => {
      write(`${text}`)
    })

    const response = await stream.finalMessage();
    response.content.forEach(c => {
      this.session.addMessage(response.role, c.text)
    })
    writeln()
  }
}

await new GptShell().execute()