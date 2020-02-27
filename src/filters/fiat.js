import AppFilters from './filters.module';

AppFilters.filter('fiat', () => (amount) => {
  if (Number.isNaN(amount)) {
    return (0).toFixed(2);
  }
  return (parseInt(amount, 10) / 1e8).toFixed(2);
});
