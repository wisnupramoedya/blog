/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'https://gql.hashnode.com/'
	},
	runtimeDir: '.houdini',
	plugins: {
		'houdini-svelte': {}
	},
	scalars: {
		DateTime: {
			type: 'DateTime',
			unmarshal(val) {
				return val ? new Date(val) : null;
			},
			marshal(date) {
				return date && date.getTime();
			}
		}
	}
};

export default config;
