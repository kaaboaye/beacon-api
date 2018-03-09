import {Purpose} from "./Token";
import {createHmac} from "crypto";

const secret = 'BraciaBolecZabiliJFK';

export interface AuthorisationTokenPayload {
  UserId: number;
  Purpose: Purpose;
  ExpirationDate: Date
}

export class AuthorisationToken {
  static Generate(payload: AuthorisationTokenPayload): string {
    const data: string = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = this.getSignature(data);

    return `${data}.${signature}`;
  }

  static Verify(token: string) {
    const [data, signature, more] = token.split('.');

    if (!data || !signature || more) {
      throw new Error('AuthorisationTokenIncorrectFormat');
    }

    const check = this.getSignature(data);

    return signature == check;
  }

  static GetPayload(token: string): AuthorisationTokenPayload {
    let data = token.split('.')[0];
    data = Buffer.from(data, 'base64').toString();

    return JSON.parse(data);
  }

  private static getSignature(data: string): string {
    return createHmac('sha512', secret)
      .update(data)
      .digest('base64');
  }
}