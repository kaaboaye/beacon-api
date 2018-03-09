import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, getRepository, JoinColumn} from "typeorm";
import {IsBase64, IsEnum} from 'class-validator';
import 'reflect-metadata';
import {User} from "./User";
import {Purpose} from "../helpers/Token";
import {AuthorisationTokenPayload} from "../helpers/AuthorisationToken";

export const ShortTokenExceptions: string[] = [
  'ShortTokenInvalid',
  'ShortTokenExpired',
  'ShortTokenWrongPurpose'
];

@Entity()
export class ShortToken extends BaseEntity {

  // Columns

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  @IsEnum(Purpose)
  purpose: Purpose;

  @Column({
    type: 'timestamp'
  })
  expire_at: Date;

  @Column({
    type: 'timestamp'
  })
  created_at: Date;

  // Static

  static Generate(): string {
    // Take random integer
    const num: number = Math.floor(Math.random() * 99999999);

    // Convert the number to the string
    let token: string = num.toString();
    token = token.padStart(8, '0');

    // Insert '-' in the middle
    token = token.substr(0, 4) + '-' + token.substr(4);

    return token;
  }

  static async Verify(token: string, purpose: Purpose) {
    const st = await ShortToken.findOne({
      where: {
        token
      },
      order: {
        created_at: 'DESC'
      },
      relations: ['user']
    });

    if (!st) {
      throw new Error('ShortTokenInvalid');
    }

    if (new Date().getTime() > st.expire_at.getTime()) {
      throw new Error('ShortTokenExpired');
    }

    if (st.purpose !== purpose) {
      throw new Error('ShortTokenWrongPurpose');
    }

    return st.user.id;
  }
}
