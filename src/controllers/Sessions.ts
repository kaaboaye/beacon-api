import {Session} from "../entity/Session";
import {User} from "../entity/User";
import {AuthorisationToken} from "../helpers/AuthorisationToken";
import {ShortToken} from "../entity/ShortToken";
import {Purpose, Type} from "../helpers/Token";
import {SessionToken} from "../helpers/SessionToken";

const Sessions = [];
const path = '/sessions';

Sessions.push({
  path,
  method: 'get',
  handler: async (request, h) => {
    return await Session.find();
  }
});

Sessions.push({
  path: path + '/new',
  method: 'post',
  handler: async (request, h) => {
    try {
      // Check if there is any payload
      if (!request.payload) {
        return {
          error: {
            name: 'NoPayload'
          }
        }
      }
      const {login} = request.payload;

      // Get User ID
      const user = await User.GetIdByLogin(login);
      if (!user) {
        return {
          error: {
            name: 'NoSuchUser'
          }
        }
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
      console.error(e);
      return {error: e.name};
    }
  }
});

Sessions.push({
  path: path + '/validate',
  method: 'post',
  handler: async (request, h) => {
    try {
      // Check if there is any payload
      if (!request.payload) {
        return {
          error: {
            name: 'NoPayload'
          }
        }
      }

      const {type, token} = request.payload;
      let uid = -1;

      // Validate the token
      switch (type) {

        // Check AuthorisationToken
        case Type.AuthorisationToken: {
          // Check if valid
          if (!AuthorisationToken.Verify(token)) {
            return {
              error: {
                name: 'InvalidAuthorisationToken'
              }
            }
          }

          // Get payload
          const payload = AuthorisationToken.GetPayload(token);

          // Check if expired
          if (new Date().getTime() > new Date(payload.ExpirationDate).getTime()) {
            return {
              error: {
                name: 'ExpiredAuthorisationToken'
              }
            }
          }

          // Check purpose
          if (Purpose.Login !== payload.Purpose) {
            return {
              error: {
                name: 'WrongPurposeAuthorisationToken'
              }
            }
          }

          // Set User id
          uid = payload.UserId;

          break;
        }


        // Check ShortToken
        case Type.ShortToken: {
          const st = await ShortToken.GetValidToken(token);

          // Check if such token exist and didn't expired
          if (!st) {
            return {
              error: {
                name: 'InvalidShortToken'
              }
            }
          }

          // Check purpose
          if (Purpose.Login !== st.purpose) {
            return {
              error: {
                name: 'WrongPurposeShortToken'
              }
            }
          }

          // Set User id
          uid = st.userId;

          break;
        }
      }

      if (-1 === uid) {
        return {
          error: {
            name: 'NoToken'
          }
        }
      }

      // Set up the session
      const session = new Session();
      session.user = uid as any;
      session.token = SessionToken.Generate();
      session.expire_at = new Date();
      session.created_at = new Date();
      await session.save();

      return session;
    }
    catch (e) {
      switch (e.message) {
        case 'AuthorisationTokenIncorrectFormat':
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