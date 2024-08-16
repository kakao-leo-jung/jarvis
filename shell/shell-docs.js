#!/usr/bin/env node
import Shell from "./shell.js";
import Commands from "../libs/commands.js";
import * as fs from "node:fs";
import {docsPath} from "../main.js";
import path from "path";
import Signal, {EXIT} from "../libs/signal.js";
import {lessFile} from "../libs/executor.js";

export default class DocsShell extends Shell {

  constructor() {
    const arr = []
    const files = fs.readdirSync(docsPath);
    files.forEach((file) => {
      const fullPath = path.join(docsPath, file);

      let data = fs.readFileSync(fullPath, "utf-8");
      data = data.split("\n");
      data.length = 1;

      arr.push([file, data[0], async () => {
        return await lessFile(docsPath, file)
      }])
    });

    const commands = new Commands(arr, ['BACK', '뒤로가기', () => {
      return new Signal(EXIT)
    }])

    super(commands, "[설명서 목록]\n")
  }
}

await new DocsShell().execute()