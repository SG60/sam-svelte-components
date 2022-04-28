const preprocess = require('svelte-preprocess');
const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-svelte-csf',
		'@storybook/addon-a11y',
		'@storybook/addon-storysource'
	],
	framework: '@storybook/svelte',
	core: {
		builder: '@storybook/builder-vite'
	},
	svelteOptions: {
		preprocess: preprocess()
	},
	async viteFinal(config, { configType }) {
		// customise the Vite config here
		//
		// config.resolve.alias.lib = '../src/lib';

		// return the customised config
		return {
			...config,
			resolve: {
				alias: {
					$lib: path.resolve('./src/lib'),
					$app: path.resolve('node_modules/@sveltejs/kit/assets/app'),
					$components: path.resolve('./src/lib/components'),
					$utils: path.resolve('./src/lib/utils')
				}
			}
		};
	}
};
