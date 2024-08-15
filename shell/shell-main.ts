#!/usr/bin/env npx tsx
import AbstractShell from "./shell";
import Commands from "../libs/commands";
import {write} from "../libs/console";
import Signal, {EXIT, NO_EXIT} from "../libs/signal";
import {nodeFile} from "../libs/executor";
import {shellPath} from "../main.ts";

export default class MainShell extends AbstractShell {

  constructor() {
    const commands = new Commands([
      ['DOCS', '설명서 목록 보기', async () => {
        return await nodeFile(shellPath, 'shell-docs.ts', new Signal(NO_EXIT))
      }],
      ['EXECS', '유틸 목록 보기', async () => {
        return await nodeFile(shellPath, 'shell-execs.ts', new Signal(NO_EXIT))
      }],
    ], ['EXIT', '종료하기', () => {
      write(`[JARVIS] : 종료합니다.`)
      return new Signal(EXIT)
    }])
    super(commands)
  }
}

await new MainShell().execute()