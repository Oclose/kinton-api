/* eslint no-param-reassign: ["error", { "props": false }] */
const uuid = require('node-uuid');
const crypto = require('crypto');

const app = require('../../server/server');

module.exports = (User) => {
  User.prototype.generateFleetKey = (cb) => {
    const FleetKey = app.models.FleetKey;
    let key = uuid();

    key = crypto.createHash('sha256')
      .update(key)
      .update('kinton')
      .digest('hex');

    FleetKey.create({
      key,
      ownerId: this.id,
    }, (err, fleetKey) => {
      if (err) {
        return cb(err);
      }

      return cb(null, fleetKey.key);
    });
  };

  User.remoteMethod(
    'generateFleetKey', {
      http: {
        verb: 'get',
      },
      returns: {
        arg: 'key',
        type: 'string',
      },
      description: [
        'Generate a new Fleet Key for the user.',
      ],
      isStatic: false,
    }
  );
};
