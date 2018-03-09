import {randomBytes} from "crypto";

export class SessionToken {
  static Generate(): string {
    return randomBytes(64).toString('base64');
  }
}