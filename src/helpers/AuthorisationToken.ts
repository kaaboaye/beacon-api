import {Purpose} from "./Token";
import {createHmac} from "crypto";

const secret = 'BraciaBolecZabiliJFK';

export interface AuthorisationTokenPayload {
  UserId: number;
  Purpose: Purpose;
  ExpirationDate: Date
}

export const AuthorisationTokenExceptions: string[] = [
  'AuthorisationTokenIncorrectFormat',
  'AuthorisationTokenInvalid',
  'AuthorisationTokenExpired',
  'AuthorisationTokenWrongPurpose'
];

export class AuthorisationToken {
  static Generate(payload: AuthorisationTokenPayload): string {
    const data: string = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = this.getSignature(data);

    return `${data}.${signature}`;
  }

  static Verify(token: string, purpose: Purpose): AuthorisationTokenPayload {
    const [data, signature, more] = token.split('.');

    if (!data || !signature || more) {
      throw new Error('AuthorisationTokenIncorrectFormat');
    }

    // Check the signature
    if (this.getSignature(data) !== signature) {
      throw new Error('AuthorisationTokenInvalid');
    }

    // Get payload
    const payload = JSON.parse(Buffer.from(data, 'base64').toString()) as AuthorisationTokenPayload;

    // Check if expired
    if (new Date().getTime() > new Date(payload.ExpirationDate).getTime()) {
      throw new Error('AuthorisationTokenExpired');
    }

    // Check purpose
    if (purpose !== payload.Purpose) {
      throw new Error('AuthorisationTokenWrongPurpose');
    }

    return payload;
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