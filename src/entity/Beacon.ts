import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import 'reflect-metadata';
import {User} from "./User";
import {BeaconLocation} from "./BeaconLocation";

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

  // Relations

  @OneToMany(type => BeaconLocation, location => location.beacon)
  locations: BeaconLocation[];
}