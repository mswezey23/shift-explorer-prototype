import AppFilters from './filters.module';

AppFilters.filter('currency', (numberFilter, shiftFilter) => (amount, currency, decimalPlaces) => {
	const shift = shiftFilter(amount);
	let factor = 1;

	if (currency.tickers && currency.tickers.SHIFT && currency.tickers.SHIFT[currency.symbol]) {
		factor = currency.tickers.SHIFT[currency.symbol];
	} else if (currency.symbol !== 'SHIFT') {
		// Exchange rate not available for current symbol
		return 'N/A';
	}

	const decimals = (currency.symbol === 'SHIFT' || currency.symbol === 'BTC') ? decimalPlaces : 2;
	if (decimals && shift > 0) {
		return numberFilter((shift * factor), decimals);
	}
	return numberFilter((shift * factor), 8).replace(/\.?0+$/, '');
});
