
import AppTools from '../../app/app-tools.module';
import template from './transaction-item.html';

const transactionsItem = AppTools.directive('transactionItem', () => ({
  template,
  restrict: 'A',
  scope: {
    tx: '=',
    address: '=',
  },
}));

export default transactionsItem;
