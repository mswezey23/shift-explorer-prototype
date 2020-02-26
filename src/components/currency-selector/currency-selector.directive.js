import AppCurrency from './currency-selector.module';
import template from './currency-selector.html';

AppCurrency.directive('currencySelector', ($rootScope, $timeout) => {
	const CurrencySelectorLink = () => {
		$timeout(() => {
			$rootScope.currency.symbol = (localStorage && localStorage.getItem('shift_explorer-currency')) || 'SHIFT';
		});
	};

	const CurrencySelectorCtrl = function () {
		this.setCurrency = (currency) => {
			$rootScope.currency.symbol = currency;
			if (localStorage) {
				localStorage.setItem('shift_explorer-currency', currency);
			}
		};
	};

	return {
		restrict: 'E',
		replace: true,
		controller: CurrencySelectorCtrl,
		controllerAs: 'cs',
		link: CurrencySelectorLink,
		template,
	};
});
