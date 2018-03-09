import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import 'reflect-metadata';
import {User} from "./User";
import {Beacon} from "./Beacon";
import {Location} from '../helpers/Location'

@Entity()
export class BeaconLocation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Beacon, beacon => beacon.id, {
    nullable: false
  })
  beacon: Beacon;

  @ManyToOne(type => User, reporter => reporter.id, {
    nullable: false
  })
  reporter: User;

  @Column({
    type: 'point'
  })
  location: Location;

  @Column({
    type: 'timestamp'
  })
  created_at: Date;
}