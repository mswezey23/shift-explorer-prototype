import AppFilters from './filters.module';

AppFilters.filter('round', () => (height) => {
  if (Number.isNan(height)) {
    return 0;
  }
  return Math.ceil(height / 101);
});
