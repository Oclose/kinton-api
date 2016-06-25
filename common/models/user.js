/* eslint no-param-reassign: ["error", { "props": false }] */

const uuid = require('node-uuid');
const crypto = require('crypto');

module.exports = (User) => {
  User.prototype.generateFleetKey = function generateFleetKey(cb) {
    let key = uuid();

    key = crypto.createHash('sha256')
      .update(key)
      .update('kinton')
      .digest('hex');

    this.fleetKey.create({
      key,
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
