import angular from 'angular';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-animate';
import 'angular-ui-bootstrap';
import 'angular-gettext';
import 'angular-advanced-searchbox';
// import 'babel-polyfill';

// styles
import 'amstock3/amcharts/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'angular-advanced-searchbox/dist/angular-advanced-searchbox.min.css';
import '../assets/styles/common.css';
import '../assets/styles/flags.css';
import '../assets/styles/tableMobile.css';

// submodules
import '../components/blocks';
import '../components/address';
import '../components/transactions';
import '../components/delegate';
import '../components/delegate-monitor';
import '../components/top-accounts';
import '../components/search';
import '../components/header';
import '../components/footer';
import '../components/currency-selector';
import '../components/activity-graph';
import '../components/home';
import '../components/bread-crumb';
import '../components/market-watcher';
import '../components/network-monitor';

import '../filters';
import '../services';
import '../directives';
import './app-tools.module';
import '../shared';

const App = angular.module('shift_explorer', [
	'ngAnimate',
	'ngResource',
	'ui.router',
	'ui.bootstrap',
	'gettext',
	'angular-advanced-searchbox',
	'shift_explorer.breadCrumb',
	'shift_explorer.filters',
	'shift_explorer.services',
	'shift_explorer.header',
	'shift_explorer.footer',
	'shift_explorer.blocks',
	'shift_explorer.transactions',
	'shift_explorer.address',
	'shift_explorer.delegate',
	'shift_explorer.topAccounts',
	'shift_explorer.search',
	'shift_explorer.tools',
	'shift_explorer.currency',
	'shift_explorer.activityGraph',
	'shift_explorer.delegateMonitor',
	'shift_explorer.home',
	'shift_explorer.networkMonitor',
	'shift_explorer.marketWatcher',
]);

export default App;
