"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./entity/User");
var Session_1 = require("./entity/Session");
var ShortToken_1 = require("./entity/ShortToken");
var Beacon_1 = require("./entity/Beacon");
var BeaconLocation_1 = require("./entity/BeaconLocation");
exports.ConnectionConfig = {
    type: "postgres",
    host: "beaconsocialdb.postgres.database.azure.com",
    username: "mieszko@beaconsocialdb",
    password: "Zxcvbnm123",
    database: "postgres",
    port: 5432,
    ssl: true,
    synchronize: true,
    logging: true,
    entities: [
        User_1.User,
        Session_1.Session,
        ShortToken_1.ShortToken,
        Beacon_1.Beacon,
        BeaconLocation_1.BeaconLocation
    ]
};
//# sourceMappingURL=DataBase.js.map