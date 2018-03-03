import { Model } from 'objection'
import User from "./user"

export default class Token extends Model {
  static get tableName() {
    return 'tokens';
  }

  static get relationMappings() { return {
    user: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: 'users.id',
        to: 'tokens.user_id'
      }
    }
  }}
}