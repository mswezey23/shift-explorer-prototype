const _ = require('underscore');
const logger = require('./logger');

module.exports = function (config) {
  this.tickers = {};
  const api = require('./exchange-api')(config);

  this.loadRates = () => {
    if (!config.exchangeRates.enabled) {
      logger.info('Exchange Rates Disabled!');
      return false;
    }

    logger.info('Exchange Rates Enabled!');

    return api.getPriceTicker((err, result) => {
      if (result) {
        _.each(result.BTC, (ticker, key) => {
          if (!result.SHIFT[key]) {
            // logger.info(`Key: ${key}`);
            result.SHIFT[key] = result.SHIFT.BTC * ticker;
          }
        });
        this.tickers = result;
      }
    });
  };

  if (config.exchangeRates.enabled) {
    setInterval(this.loadRates, config.exchangeRates.updateInterval);
  }
};
