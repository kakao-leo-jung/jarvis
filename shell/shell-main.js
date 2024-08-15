#!/usr/bin/env node
import AbstractShell from "./shell.js";
import Commands from "../libs/commands.js";
import {write} from "../libs/console.js";
import Signal, {EXIT, NO_EXIT} from "../libs/signal.js";
import {nodeFile} from "../libs/executor.js";
import {shellPath} from "../main.js";

export default class MainShell extends AbstractShell {

  constructor() {
    const commands = new Commands([
      ['DOCS', '설명서 목록 보기', async () => {
        return await nodeFile(shellPath, 'shell-docs.js', new Signal(NO_EXIT))
      }],
      ['EXECS', '유틸 목록 보기', async () => {
        return await nodeFile(shellPath, 'shell-execs.js', new Signal(NO_EXIT))
      }],
    ], ['EXIT', '종료하기', () => {
      write(`[JARVIS] : 종료합니다.`)
      return new Signal(EXIT)
    }])
    super(commands)
  }
}

await new MainShell().execute()