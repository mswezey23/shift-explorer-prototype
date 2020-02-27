import AppFilters from './filters.module';

AppFilters.filter('shift', () => (amount) => {
  if (Number.isNan(amount)) {
    return (0).toFixed(8);
  }
  return (parseInt(amount, 10) / 1e8).toFixed(8).replace(/\.?0+$/, '');
});
