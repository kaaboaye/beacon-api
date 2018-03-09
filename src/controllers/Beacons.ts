import {Beacon} from "../entity/Beacon";

const Beacons = [];
const path = '/beacons';

Beacons.push({
  path,
  method: 'get',
  handler: async (request, h) => {
    const {user} = request.auth.credentials;

    return await Beacon.find({
      where: {
        owner: user.id
      }
    });
  }
});

Beacons.push({
  path,
  method: 'post',
  handler: async (request, h) => {
    try {
      if (!request.payload) {
        throw new Error('NoPayload');
      }

      const {user} = request.auth.credentials;
      const {name, description} = request.payload;

      const beacon = new Beacon();
      beacon.owner = user;
      beacon.name = name;
      beacon.description = description;
      beacon.created_at = new Date();
      await beacon.save();

      return beacon;
    }
    catch (e) {
      const handler: string[] = [
        'NoPayload'
      ];

      if (handler.includes(e.message)) {
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

export default Beacons;