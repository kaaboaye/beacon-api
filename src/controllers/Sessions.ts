import {Session} from "../entity/Session";
import {User} from "../entity/User";
import {
  AuthorisationToken, AuthorisationTokenExceptions,
  AuthorisationTokenPayload
} from "../helpers/AuthorisationToken";
import {ShortToken, ShortTokenExceptions} from "../entity/ShortToken";
import {Purpose, Type} from "../helpers/Token";

const Sessions = [];
const path = '/sessions';

Sessions.push({
  path,
  method: 'get',
  handler: async (request, h) => {
    const s = await Session.find();

    return s;
  }
});

Sessions.push({
  path: path + '/new',
  method: 'post',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    try {
      // Check if there is any payload
      if (!request.payload) {
        throw new Error('NoPayload');
      }
      const {login} = request.payload;

      // Get User ID
      const user = await User.GetIdByLogin(login);
      if (!user) {
        throw new Error('NoSuchUser');
      }

      // Generate the tokens
      let expire = new Date();
      expire.setMinutes(expire.getMinutes() + 15);

      const authToken = AuthorisationToken.Generate({
        UserId: user.id,
        Purpose: Purpose.Login,
        ExpirationDate: expire
      });

      const shortToken = new ShortToken();
      shortToken.token = ShortToken.Generate();
      shortToken.user = user;
      shortToken.purpose = Purpose.Login;
      shortToken.created_at = new Date();
      shortToken.expire_at = expire;
      await shortToken.save();

      // Send tokens via email. But later

      return {
        to_jest_mail: false,
        AuthorisationToken: authToken,
        ShortToken: shortToken.token
      };
    }
    catch (e) {
      const handler: string[] = [
        'NoPayload',
        'NoSuchUser',
      ];

      if (handler.includes(e.message)) {
        return {
          error: {
            message: e.message
          }
        };
      }

      throw e;
    }
  }
});

Sessions.push({
  path: path + '/new',
  method: 'put',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    try {
      // Check if there is any payload
      if (!request.payload) {
        throw new Error('NoPayload');
      }

      const {type, token} = request.payload;
      let uid: number;

      // Validate the token
      switch (type) {

        // Check AuthorisationToken
        case Type.AuthorisationToken: {
          uid = AuthorisationToken.Verify(token, Purpose.Login).UserId;
          break;
        }

        // Check ShortToken
        case Type.ShortToken: {
          uid = await ShortToken.Verify(token, Purpose.Login);
          break;
        }

        default:
          throw new Error('BadTokenType');
      }

      // Set up the session
      return await Session.SetUp(uid);
    }
    catch (e) {
      const handler: string[] = [
        'NoPayload',
        'BadTokenType',
        ...AuthorisationTokenExceptions,
        ...ShortTokenExceptions
      ];

      if (handler.includes(e.message)) {
        return {
          error: {
            message: e.message
          }
        };
      }

      throw e;
    }
  }
});

Sessions.push({
  path: path + '/auth/{token}',
  method: 'get',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    try {
      const {token} = request.params;
      if (!token) {
        throw new Error('NoToken');
      }

      const payload = AuthorisationToken.Verify(token, Purpose.Login);

      return await Session.SetUp(payload.UserId);
    }
    catch (e) {
      const handler: string[] = [
        'NoToken',
        ...AuthorisationTokenExceptions
      ];

      if (handler.includes(e.message)) {
        return {
          error: {
            message: e.message
          }
        };
      }

      throw e;
    }
  }
});

export default Sessions;