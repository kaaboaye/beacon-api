import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, getRepository, JoinColumn} from "typeorm";
import {IsBase64, IsEnum} from 'class-validator';
import 'reflect-metadata';
import {User} from "./User";
import {Purpose} from "../helpers/Token";

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

  // Queries

  static GetValidToken(token: string): Promise<any> {
    return getRepository(ShortToken)
      .createQueryBuilder('st')
      .select()
      .where('st = :token', {token})
      .andWhere('st.expire_at < NOW()')
      .orderBy({
        'st.created_at': "DESC"
      })
      .getOne();
  }

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
}
