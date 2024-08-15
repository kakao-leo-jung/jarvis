import path from "path";
import {spawn} from "child_process";
import Signal, {NO_EXIT} from "./signal.ts";

export function lessFile(filePath, fileName) {
  return new Promise((resolve, reject) => {
    const command = 'less'
    const args = [path.join(filePath, fileName)]

    const script = spawn(command, args, {
      stdio: ['inherit', 'inherit', 'inherit'],
    });

    script.on('exit', function (code) {
      console.log(`${fileName} exited with code : ${code}`);
      resolve(new Signal(NO_EXIT))
    });
  })
}

export function nodeFile(filePath, fileName, signal) {
  return new Promise((resolve, reject) => {
    const command = `${path.join(filePath, fileName)}`

    const script = spawn(command, [], {
      stdio: ['inherit', 'inherit', 'inherit'],
    });

    script.on('exit', function (code) {
      console.log(`${fileName} exited with code : ${code}`);
      resolve(signal)
    });
  })
}