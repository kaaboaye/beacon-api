import * as Hapi from 'Hapi';
import Config from "./Config";
import Controllers from './controllers';
import {string} from "joi";

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

    Controllers.forEach(controller => {
      server.route(controller);
    });

    return server;
  } catch (err) {
    console.log('Error starting server: ', err);
    throw err;
  }
}
