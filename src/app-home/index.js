export default (angularRef) => {
  const HomeNgModule = angularRef.module('app-home', []);

  require('./app-home.ctrl')(HomeNgModule);
};