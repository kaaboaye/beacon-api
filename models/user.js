import { Model } from 'objection'
import Token from "./token"

export default class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() { return {
    tokens: {
      relation: Model.HasManyRelation,
      modelClass: Token,
      join: {
        from: 'users.id',
        to: 'tokens.user_id'
      }
    }
  }
}}