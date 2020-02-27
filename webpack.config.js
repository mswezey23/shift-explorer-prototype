/* eslint-disable import/no-dynamic-require */
module.exports = (env) => require(`./webpack.config.${env}.js`);
