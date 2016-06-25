/* eslint no-param-reassign: ["error", { "props": false }] */

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
};
