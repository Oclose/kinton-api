/* eslint no-param-reassign: ["error", { "props": false }] */

const uuid = require('node-uuid');
const crypto = require('crypto');

module.exports = (Fleet) => {
  Fleet.disableRemoteMethod('create', true);
  Fleet.disableRemoteMethod('upsert', true);
  Fleet.disableRemoteMethod('updateAll', true);
  Fleet.disableRemoteMethod('updateAttributes', false);

  Fleet.disableRemoteMethod('find', true);
  Fleet.disableRemoteMethod('findById', true);
  Fleet.disableRemoteMethod('findOne', true);

  Fleet.disableRemoteMethod('deleteById', true);

  Fleet.disableRemoteMethod('count', true);
  Fleet.disableRemoteMethod('exists', true);

  Fleet.disableRemoteMethod('confirm', true);
  Fleet.disableRemoteMethod('resetPassword', true);
  Fleet.disableRemoteMethod('logout', true);

  Fleet.disableRemoteMethod('createChangeStream', true);

  Fleet.disableRemoteMethod('__get__user', false);

  Fleet.disableRemoteMethod('__create__mote', false);
  Fleet.disableRemoteMethod('__updateById__mote', false);

  Fleet.disableRemoteMethod('__get__mote', false);
  Fleet.disableRemoteMethod('__findById__mote', false);

  Fleet.disableRemoteMethod('__delete__mote', false);
  Fleet.disableRemoteMethod('__destroyById__mote', false);

  Fleet.disableRemoteMethod('__count__mote', false);

  Fleet.observe('before save', (ctx, next) => {
    if (ctx.isNewInstance) {
      ctx.instance.uuid = uuid.v4();
    }

    next();
  });

  Fleet.prototype.registerMote = function registerMote(cb) {
    Fleet.findById(this.uuid, (findErr, fleet) => {
      if (findErr) {
        cb(findErr);
        return;
      }

      if (fleet) {
        const moteUuid = uuid.v4();
        const moteSecret =
          crypto
          .createHash('sha256')
          .update(uuid.v4())
          .update('pepitogrillo')
          .digest('hex');

        fleet.mote.create({
          uuid: moteUuid,
          secret: moteSecret,
        }, (createErr) => {
          if (createErr) {
            cb(createErr);
            return;
          }

          cb(null, moteUuid, moteSecret);
        });
      }
    });
  };

  Fleet.remoteMethod(
    'registerMote', {
      accepts: [],
      returns: [{
        arg: 'uuid',
        type: 'string',
      }, {
        arg: 'secret',
        type: 'string',
      }],
      description: [
        'Register a new mote.',
      ],
      isStatic: false,
    }
  );
};
