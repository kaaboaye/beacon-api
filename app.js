import Hapi from 'Hapi'

import Controllers from './controllers'

import KnexLib from 'knex'
import knexfile from './knexfile'
import { Model } from 'objection'
import { validate } from './Auth'

(async () =>{
  const Knex = KnexLib(knexfile.development)
  Model.knex(Knex)

  const server = Hapi.Server({
    port: 3001,
    debug: {
      request: [
        'error',
        'uncaught'
      ]
    }
  })

  server.events.on('route', (route) => {
    console.log(`New route added: ${route.method.toUpperCase()} ${route.path}`)
  })

  server.events.on('start', () => {
    console.log(`Server started at ${ server.info.uri }`)
  })

  await server.register(require('hapi-auth-basic'))
  server.auth.strategy('simple', 'basic', {validate})
  server.auth.default('simple')

  Controllers.forEach(Controller => {
    server.route(Controller)
  })

  server.start( err => { console.error( err ) } )
})()
