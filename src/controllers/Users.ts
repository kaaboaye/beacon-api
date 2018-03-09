import {Rank, User} from "../entity/User";
import {validate} from "class-validator";
import {debug, log} from "util";
import {Session} from "../entity/Session";

const Users = [];
const path = '/users';

Users.push({
  path,
  method: 'get',
  handler: async (request, h) => {
    const users = await User.find();

    return {users};
  }
});

Users.push({
    path,
    method: 'post',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return {
            error: {
              name: 'NoPayload'
            }
          }
        }
        const {username, mail, name, last_name, phone_number} = request.payload;

        const u = new User();
        u.username = username;
        u.mail = mail;
        u.name = name;
        u.last_name = last_name;
        u.phone_number = phone_number;
        u.rank = Rank.User;

        const err = await validate(u);
        if (err.length > 0) {
          return {err};
        }

        await u.save();
        return {id: u.id};
      }
      catch (err) {
        switch (err.name) {
          case 'QueryFailedError': {
            const {name, message, detail} = err;

            return {
              error: {name, message, detail}
            }
          }
        }

        throw err;
      }
    }
});

export default Users;
