// Vite Plugins
import { sveltekit } from '@sveltejs/kit/vite';

import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	resolve: {
		alias: {
			$utils: path.resolve('./src/lib/utils')
		}
	}
};

export default config;
