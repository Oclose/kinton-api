/* eslint no-param-reassign: ["error", { "props": false }] */
const uuid = require('node-uuid');

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

  Fleet.observe('before save', (ctx, next) => {
    if (ctx.instance && ctx.isNewInstance) {
      const id = uuid.v4();

      ctx.instance.uuid = id;
    }

    next();
  });
};
