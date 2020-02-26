import AppFilters from './filters.module';

/**
 * @todo check the possibility of removing hard coded hashes
 */
AppFilters.filter('nethash', () => (nethash) => {
	if (nethash === 'cba57b868c8571599ad594c6607a77cad60cf0372ecde803004d87e679117c12') {
		return 'Testnet';
	} else if (nethash === '7337a324ef27e1e234d1e9018cacff7d4f299a09c2df9be460543b8f7ef652f1') {
		return 'Mainnet';
	}
	return 'Local';
});
