import User from "./models/user";

async function validate(request, username, token, h) {
  token = parseInt(token)

  return await User.query()
    .findOne({
      email: username
    })
    .eager('tokens')
    .modifyEager('tokens', tokens => {
      tokens.where({ token })
    })
    .then(user => {
      const isValid = user.tokens.length > 0

      if (!isValid) {
        return { credentials: null, isValid: false }
      }

      return {
        isValid,
        credentials: user
      }
    })
    .catch(error => {return { credentials: null, isValid: false }})
}



export { validate }