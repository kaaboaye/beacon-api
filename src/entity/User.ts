import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, getRepository} from "typeorm";
import {IsAlpha, IsAlphanumeric, IsEmail, IsEnum, IsMobilePhone, Length} from 'class-validator';
import 'reflect-metadata';
import {Session} from "./Session";
import {Beacon} from "./Beacon";
import {ShortToken} from "./ShortToken";
import {BeaconLocation} from "./BeaconLocation";

export enum Rank {
  User
}

@Entity()
export class User extends BaseEntity {

  // Columns

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  @Length(3)
  @IsAlphanumeric()
  username: string;

  @Column({
    unique: true
  })
  @IsEmail()
  mail: string;

  @Column()
  @Length(3)
  @IsAlpha()
  name: string;

  @Column()
  @Length(3)
  @IsAlpha()
  last_name: string;

  @Column({
      length: 20
  })
  @IsMobilePhone('en-US')
  phone_number: string;

  @Column()
  @IsEnum(Rank)
  rank: Rank;

  @Column({
    default: 'true'
  })
  active: boolean;

  @Column({
    type: 'timestamp',
    default: 'NOW()'
  })
  created_at: Date;

  // Relations

  @OneToMany(type => Session, sessions => sessions.user)
  sessions: Session[];

  @OneToMany(type => ShortToken, short_token => short_token.user)
  short_tokens: ShortToken[];

  @OneToMany(type => Beacon, beacon => beacon.owner)
  beacons: Beacon[];

  @OneToMany(type => BeaconLocation, location => location.reporter)
  beacon_locations: BeaconLocation[];

  // Queries

  static GetByLogin(login: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('user')
      .select(['user.id', 'user.mail'])
      .where('user.username = :login', {login})
      .orWhere('user.mail = :login', {login})
      .getOne();
  }
}