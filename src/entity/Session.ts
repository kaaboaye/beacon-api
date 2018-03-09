import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, getConnection} from "typeorm";
import {IsBase64} from 'class-validator';
import 'reflect-metadata';
import {User} from "./User";
import {SessionToken} from "../helpers/SessionToken";
import Config from "../Config";

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsBase64()
  token: string;

  @ManyToOne(type => User, user => user.id, {
    nullable: false
  })
  user: User;

  @Column({
    type: 'timestamp'
  })
  expire_at: Date;

  @Column({
    type: 'timestamp'
  })
  created_at: Date;

  // Static

  static async SetUp(userId: number, expire_at?: Date) {
    if (!expire_at) {
      expire_at = new Date(); // Session expires after X days
      expire_at.setDate(expire_at.getDate() + Config.sessionTime);
    }

    const token = SessionToken.Generate();

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Session)
      .values({
        token,
        user: {id: userId},
        expire_at,
        created_at: new Date()
      } as any)
      .execute();

    return {
      session: {
        token,
        expire_at
      }
    };
  }
}