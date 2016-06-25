module.exports = (FleetKey) => {
  FleetKey.disableRemoteMethod('create', true);
  FleetKey.disableRemoteMethod('upsert', true);
  FleetKey.disableRemoteMethod('updateAll', true);
  FleetKey.disableRemoteMethod('updateAttributes', false);

  FleetKey.disableRemoteMethod('find', true);
  FleetKey.disableRemoteMethod('findById', true);
  FleetKey.disableRemoteMethod('findOne', true);

  FleetKey.disableRemoteMethod('deleteById', true);

  FleetKey.disableRemoteMethod('count', true);
  FleetKey.disableRemoteMethod('exists', true);

  FleetKey.disableRemoteMethod('confirm', true);
  FleetKey.disableRemoteMethod('resetPassword', true);
  FleetKey.disableRemoteMethod('logout', true);

  FleetKey.disableRemoteMethod('createChangeStream', true);

  FleetKey.disableRemoteMethod('__get__user', false);
};
