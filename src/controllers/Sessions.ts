import {Session} from "../entity/Session";
import {User} from "../entity/User";
import {
  AuthorisationToken, AuthorisationTokenExceptions,
  AuthorisationTokenPayload
} from "../helpers/AuthorisationToken";
import {ShortToken, ShortTokenExceptions} from "../entity/ShortToken";
import {Purpose, Type} from "../helpers/Token";
import Config from "../Config";
import {createTransport} from "nodemailer";

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
      const user = await User.GetByLogin(login);
      if (!user) {
        throw new Error('NoSuchUser');
      }

      console.log(user);

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

      const mailer = createTransport({
        service: 'gmail',
        auth: {
          user: 'beacon.society.mailer@gmail.com',
          pass: '46cb33aa9629024c6d3045fecda87d9d6752e9d8da686a651fb754e2c11f69d2'
        }
      });

      mailer.sendMail({
        from: 'beacon.society.mailer@gmail.com',
        to: user.mail,
        subject: `Authorisation Tokens for ${user.username}`,
        html: `<p><a href="${Config.apiUrl}/sessions/auth/${encodeURIComponent(authToken)}">Click</a></p>
               <p>or provide following token: <pre>${shortToken.token}</pre></p>`
          });

      return {
        to_jest_mail: true,
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