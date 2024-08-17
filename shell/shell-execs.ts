#!/usr/bin/env npx tsx
import AbstractShell from "./shell";
import Commands from "../libs/commands";
import * as fs from "node:fs";
import {execsPath} from "../main.ts";
import path from "path";
import Signal, {EXIT, NO_EXIT_PRESERVE_DISPLAY} from "../libs/signal";
import {nodeFile} from "../libs/executor";

export default class ExecsShell extends AbstractShell {

  constructor() {
    const arr = []
    const files = fs.readdirSync(execsPath);
    files.forEach((file) => {
      const fullPath = path.join(execsPath, file);

      let data = fs.readFileSync(fullPath, "utf-8");
      const regex = /\/\*\*([\s\S]*?)\*\//;
      const match = data.match(regex);
      const description = match ? match[1].trim() : '';

      arr.push([file, description, async () => {
        return await nodeFile(execsPath, file,
            new Signal(NO_EXIT_PRESERVE_DISPLAY))
      }])
    });

    const commands = new Commands(arr, ['BACK', '뒤로가기', () => {
      return new Signal(EXIT)
    }])

    super(commands, "[유틸 스크립트 목록]\n")
  }
}

await new ExecsShell().execute()