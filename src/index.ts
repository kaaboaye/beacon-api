import * as App from './App'
import {createConnection} from "typeorm";
import {ConnectionConfig} from "./DataBase";
import {any} from "joi";
import {ApplicationState} from "hapi";
import 'reflect-metadata';

console.log(`Starting`);

// ##### DISABLED #####
// // Catch unhandling unexpected exceptions
// process.on('uncaughtException', (error: Error) => {
//   console.error(`uncaughtException ${error.message}`);
// });

// // Catch unhandling rejected promises
// process.on('unhandledRejection', (reason: any) => {
//   console.error(`unhandledRejection ${reason}`);
// });

(async () => {
  try {
    const server = await App.Init();

    // Connect to the database
    (server.app as any).connection = await createConnection(ConnectionConfig);

    await server.start();

    console.log('Server running at:', server.info.uri);
  } catch (err) {
    console.error('Error starting server: ', err.message);
    throw err;
  }
})();
