export const EXIT = 0
export const NO_EXIT = 1
export const NO_EXIT_PRESERVE_DISPLAY = 2

export default class Signal {
  message = ''

  constructor(signal, message) {
    this.signal = signal
    if (message) {
      this.message = message
    }
  }

  isExit() {
    return this.signal === EXIT
  }

  getMessage() {
    return this.message
  }

  clearDisplay() {
    return this.signal !== NO_EXIT_PRESERVE_DISPLAY
  }
}
