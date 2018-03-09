import * as Hapi from 'Hapi';
import Config from "./Config";
import Controllers from './controllers';
import {Session} from "./entity/Session";

export async function Init (): Promise<Hapi.Server> {
  try {
    const port = Config.port;
    const server = new Hapi.Server({
      port,
      debug: { request: ['error'] }
    });

    if (Config.routePrefix) {
      server.realm.modifiers.route.prefix = Config.routePrefix;
    }

    server.events.on('route', (route) => {
      console.log(`New route added: ${(route.method as string).toUpperCase()} ${route.path}`)
    });

    server.events.on('response', (r) =>{
      console.log(`${r.method.toUpperCase()} ${r.url.path} -> ${(r.response as any).statusCode}`)
    });

    await server.register(require('hapi-auth-bearer-token/lib'));
    await server.auth.strategy('simple', 'bearer-access-token', {
      validate: async (request, token: string, h) => {

        const session = await Session.findOne({
          where: {
            token
          },
          order: {
            created_at: 'DESC'
          },
          relations: ['user']
        });

        if (!session || new Date().getTime() > session.expire_at.getTime()) {
          return {isValid: false, credentials: {}};
        }

        return { isValid: true, credentials: session };
      }
    });

    server.auth.default('simple');

    Controllers.forEach(controller => {
      server.route(controller);
    });

    return server;
  } catch (err) {
    console.log('Error starting server: ', err);
    throw err;
  }
}
