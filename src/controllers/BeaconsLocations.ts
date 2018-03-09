import {BeaconLocation} from "../entity/BeaconLocation";
import {Beacon} from "../entity/Beacon";
import {Location} from '../helpers/Location';

const BeaconsLocations = [];
const path = '/beacons/{beaconId}/locations';

BeaconsLocations.push({
  path,
  method: 'get',
  handler: async (request, h) => {
    return await BeaconLocation.find();
  }
});

BeaconsLocations.push({
  path,
  method: 'post',
  handler: async (request, h) => {
    try {
      if (!request.payload) {
        throw new Error('NoPayload');
      }

      const {beaconId} = request.params;
      const {user} = request.auth.credentials;
      const {x, y} = request.payload;

      const location = new BeaconLocation();
      location.beacon = {id: beaconId} as any;
      location.reporter = user;
      location.location = `(${x},${y})` as any;
      location.created_at = new Date();
      await location.save();

      return location;
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

export default BeaconsLocations;