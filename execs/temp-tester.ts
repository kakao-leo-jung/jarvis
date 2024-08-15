#!/usr/bin/env npx tsx
import {writeln} from "../libs/console.ts";

/** 임시실행테스트 */

function test() {

  let count = 0
  let maxCount = 10;

  let intervalId = setInterval(() => {
    count++
    writeln(`test!!!!!!!!!!!!!!!!!!!!`)

    if (count >= maxCount) {
      clearInterval(intervalId)
    }
  }, 1000)
}

test()