import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import path from 'path';

// const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		appDir: 'internal',
		prerender: {
			default: true
		},
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/lib/components'),
					$utils: path.resolve('./src/lib/utils')
				}
			}
		}
	}
};

export default config;
