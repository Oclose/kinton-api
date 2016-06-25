/* eslint no-param-reassign: ["error", { "props": false }] */

const uuid = require('node-uuid');
const crypto = require('crypto');

const app = require('../../server/server');

module.exports = (Mote) => {
  Mote.disableRemoteMethod('create', true);
  Mote.disableRemoteMethod('upsert', true);
  Mote.disableRemoteMethod('updateAll', true);
  Mote.disableRemoteMethod('updateAttributes', false);

  Mote.disableRemoteMethod('find', true);
  Mote.disableRemoteMethod('findById', true);
  Mote.disableRemoteMethod('findOne', true);

  Mote.disableRemoteMethod('deleteById', true);

  Mote.disableRemoteMethod('count', true);
  Mote.disableRemoteMethod('exists', true);

  Mote.disableRemoteMethod('confirm', true);
  Mote.disableRemoteMethod('resetPassword', true);
  Mote.disableRemoteMethod('logout', true);

  Mote.disableRemoteMethod('createChangeStream', true);

  Mote.disableRemoteMethod('__get__user', false);

  Mote.register = (key, cb) => {
    const FleetKey = app.models.fleetKey;
    const User = app.models.user;

    const moteUuid = uuid.v4();
    const moteSecret =
      crypto
      .createHash('sha256')
      .update(uuid.v4())
      .update('pepitogrillo')
      .digest('hex');

    FleetKey.findById(key, (findErr, fleetKey) => {
      if (findErr) {
        cb(findErr);
        return;
      }

      User.findById(fleetKey.ownerId, (findUserErr, user) => {
        if (findUserErr) {
          cb(findUserErr);
          return;
        }

        user.mote.create({
          uuid: moteUuid,
          secret: moteSecret,
        }, (createErr) => {
          if (createErr) {
            cb(createErr);
            return;
          }

          cb(null, moteUuid, moteSecret);
        });
      });
    });
  };

  Mote.remoteMethod(
    'register', {
      accepts: {
        arg: 'fleetKey',
        type: 'string',
        required: true,
      },
      returns: [{
        arg: 'uuid',
        type: 'string',
      }, {
        arg: 'secret',
        type: 'string',
      }],
      description: [
        'Obtains an uuid and secret.',
      ],
    }
  );
};
