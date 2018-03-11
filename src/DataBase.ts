import {ConnectionOptions} from "typeorm";
import {User} from "./entity/User";
import {Session} from "./entity/Session";
import {ShortToken} from "./entity/ShortToken";
import {Beacon} from "./entity/Beacon";
import {BeaconLocation} from "./entity/BeaconLocation";

export const ConnectionConfig: ConnectionOptions = {
  type: "postgres",
  host: "beaconsocialdb.postgres.database.azure.com",
  username: "mieszko",
  password: "Zxcvbnm123",
  database: "mieszko@beaconsocialdb",
  port: 32000,
  synchronize: true,
  logging: true,
  entities: [
    User,
    Session,
    ShortToken,
    Beacon,
    BeaconLocation
  ]
};
