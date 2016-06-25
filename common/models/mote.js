/* eslint no-param-reassign: ["error", { "props": false }] */

const uuid = require('node-uuid');
const crypto = require('crypto');

// const app = require('../../server/server');

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

  Mote.disableRemoteMethod('__get__fleet', false);

  Mote.observe('before save', (ctx, next) => {
    if (ctx.instance && ctx.isNewInstance) {
      const moteUuid = uuid.v4();
      const moteSecret =
        crypto
        .createHash('sha256')
        .update(uuid.v4())
        .update('pepitogrillo')
        .digest('hex');

      ctx.instance.uuid = moteUuid;
      ctx.instance.secret = moteSecret;
    }

    next();
  });
};
