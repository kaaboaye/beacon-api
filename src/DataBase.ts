import {ConnectionOptions} from "typeorm";
import {User} from "./entity/User";
import {Session} from "./entity/Session";
import {ShortToken} from "./entity/ShortToken";
import {Beacon} from "./entity/Beacon";

export const ConnectionConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "mysecretpassword",
  database: "postgres",
  port: 32000,
  synchronize: true,
  logging: true,
  entities: [
    User,
    Session,
    ShortToken,
    Beacon
  ]
};
