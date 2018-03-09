import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import {IsBase64} from 'class-validator';
import 'reflect-metadata';
import {User} from "./User";

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsBase64()
  token: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({
    type: 'timestamp'
  })
  expire_at: Date;

  @Column({
    type: 'timestamp'
  })
  created_at: Date;
}