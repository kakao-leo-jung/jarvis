#!/usr/bin/env npx tsx
import {writeln} from "../libs/console.ts";

/** 임시실행테스트2 */

function test() {

  let count = 0
  let maxCount = 5;

  let intervalId = setInterval(() => {
    count++
    writeln(`222222222!!!!!!!!!!!!!!!!!!!!`)

    if (count >= maxCount) {
      clearInterval(intervalId)
    }
  }, 1000)
}

test()