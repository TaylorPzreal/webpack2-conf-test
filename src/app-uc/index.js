export default (angularRef) => {

  const UCNgModule = angularRef.module('app-uc', []);

  // 引入各个Ctrl
  require('./js/controllers/base-module.ctrl').default(UCNgModule);
  require('./js/controllers/userinfo.ctrl').default(UCNgModule);
  require('./js/controllers/collection.ctrl').default(UCNgModule);

};
