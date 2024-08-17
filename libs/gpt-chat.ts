import {MessageParam} from "@anthropic-ai/sdk/resources";

export class ChatSession {
  private messages: MessageParam[] = []

  addMessage(role, content) {
    this.messages.push({role, content});
  }

  getHistory(): MessageParam[] {
    return this.messages
  }

  clear() {
    this.messages = [];
  }
}