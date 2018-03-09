import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import {IsBase64} from 'class-validator';
import 'reflect-metadata';
import {User} from "./User";

@Entity()
export class Beacon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({ name: "userId" })
  owner: User;

  @Column({
    type: 'timestamp'
  })
  created_at: Date;
}