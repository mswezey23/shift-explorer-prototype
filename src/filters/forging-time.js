import AppFilters from './filters.module';

AppFilters.filter('forgingTime', () => (seconds) => {
  if (seconds === 0) {
    return 'Now!';
  }
  const minutes = Math.floor(seconds / 60);
  seconds -= (minutes * 60);
  if (minutes && seconds) {
    return `${minutes} min ${seconds} sec`;
  } if (minutes) {
    return `${minutes} min `;
  }
  return `${seconds} sec`;
});
