import Config from "../Config"
import User from "../models/user";

const Users = []
const path = Config.path + 'users'

Users.push({
  path,
  method: 'get',
  handler: (request, h) => {
    return User.query()
  }
})

Users.push({
  path,
  method: 'post',
  handler: async (request, h) => {
    const { email, name, last_name, phone_number } = request.payload

    return await User.query()
      .insert({
        email, name, last_name, phone_number,
        active: true,
        created_at: new Date()
      })
      .catch(error => {
        return { error }
      })
  }
})

export default Users