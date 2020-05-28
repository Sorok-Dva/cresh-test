module.exports = class Env {
  static get current() {
    return process.env.ENV
  }

  static get isTest() {
    return 'test' === Env.current
  }

  static get isLocal() {
    return 'local' === Env.current
  }

  static get isDev() {
    return 'development' === Env.current
  }

  static get isPreProd() {
    return 'pre-prod' === Env.current
  }

  static get isProd() {
    return 'production' === Env.current
  }
};