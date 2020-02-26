const _ = require('underscore');

module.exports = function (config) {
	this.tickers = {};
	const api = require('./exchange-api')(config);

	this.loadRates = () => {
		if (!config.exchangeRates.enabled) {
			return false;
		}

		return api.getPriceTicker((err, result) => {
			if (result) {
				_.each(result.BTC, (ticker, key) => {
					if (!result.SHIFT[key]) {
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
