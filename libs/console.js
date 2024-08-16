export function write(content) {
  process.stdout.write(content);
}

export function writeln(content) {
  process.stdout.write(`${content}\n`);
}

export function clear() {
  process.stdout.write('\x1B[2J\x1B[0f');
}

export function getDisplayLength(str) {
  let length = 0
  for (let char of str) {
    if (char.charCodeAt(0) > 255) {
      length += 2 // 한글 등 넓은 문자
    } else {
      length += 1 // 영문 등 좁은 문자
    }
  }
  return length
}