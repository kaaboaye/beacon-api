import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import 'reflect-metadata';
import {User} from "./User";

@Entity()
export class Beacon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(type => User, user => user.id, {
    nullable: false
  })
  owner: User;

  @Column({
    type: 'timestamp'
  })
  created_at: Date;
}