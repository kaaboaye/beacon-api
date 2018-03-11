import {ConnectionOptions} from "typeorm";
import {User} from "./entity/User";
import {Session} from "./entity/Session";
import {ShortToken} from "./entity/ShortToken";
import {Beacon} from "./entity/Beacon";
import {BeaconLocation} from "./entity/BeaconLocation";

export const ConnectionConfig: ConnectionOptions = {
  type: "postgres",
  host: "h.kaye.ovh",
  username: "postgres",
  password: "mysecretpassword",
  database: "postgres",
  port: 32768,
  ssl: false,
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


// export const ConnectionConfig: ConnectionOptions = {
//   type: "postgres",
//   host: "beaconsocialdb.postgres.database.azure.com",
//   username: "mieszko@beaconsocialdb",
//   password: "Zxcvbnm123",
//   database: "postgres",
//   port: 5432,
//   ssl: true,
//   synchronize: true,
//   logging: true,
//   entities: [
//     User,
//     Session,
//     ShortToken,
//     Beacon,
//     BeaconLocation
//   ]
// };
