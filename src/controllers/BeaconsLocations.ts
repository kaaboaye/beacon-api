import {BeaconLocation} from "../entity/BeaconLocation";
import {Beacon} from "../entity/Beacon";
import {Location} from '../helpers/Location';
import {getRepository} from "typeorm";

const BeaconsLocations = [];
const path = '/beacons/{beaconId}/locations';

BeaconsLocations.push({
  path,
  method: 'get',
  handler: async (request, h) => {
    try {
      const {user} = request.auth.credentials;
      const {beaconId} = request.params;

      const beacon = await Beacon.findOneById(beaconId, {
        where: {
          id: beaconId,
          owner: user.id
        },
        relations: ['locations']
      });

      if (!beacon) {
        throw new Error('UserDoesNotOwnSuchBeacon');
      }

      return beacon.locations;
    }
    catch (e) {
      const handler: string[] = [
        'UserDoesNotOwnSuchBeacon'
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