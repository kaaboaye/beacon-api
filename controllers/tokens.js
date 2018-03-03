import Moment from 'moment'

import Config from "../Config"
import Token from "../models/token";

const Tokens = []
const path = Config.path + 'tokens'

Tokens.push({
  path,
  method: 'get',
  handler: (request, h) => {
    return Token.query()
  }
})

Tokens.push({
  path: path + '/{user_id}',
  method: 'get',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const { user_id } = request.params

    // Generate the token_str
    const token = Math.floor(Math.random()*1000000)

    let token_str = ''
    // Token to str
    if (10 > token) {
      token_str = '00000' + token;
    }
    else if (100 > token) {
      token_str = '0000' + token;
    }
    else if (1000 > token) {
      token_str = '000' + token;
    }
    else if (10000 > token) {
      token_str = '00' + token;
    }
    else if (100000 > token) {
      token_str = '0' + token;
    }
    else {
      token_str = '' + token;
    }

    // Create token
    const r = await Token.query()
      .insert({
        user_id, token,
        expire_at: Moment().add(Config.token_lifetime, 'minutes').calendar(),
        created_at: new Date()
      })
      .catch(error => { return { error } })

    if (r.error) {
      return { error: r.error }
    }

    return {
      czy_wiem_ze_kazdy_sie_moze_zalogowac: "tak",
      token: token_str
    }
  }
})

export default Tokens