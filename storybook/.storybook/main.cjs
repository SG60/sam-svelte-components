const preprocess = require('svelte-preprocess');
const path = require('path');
// use 'mergeConfig' to recursively merge Vite options
const { mergeConfig } = require('vite');

module.exports = {
	stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx|svelte)'],
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
		// return the customized config
		return mergeConfig(config, {
			// customize the Vite config here
			resolve: {
				alias: {
					$lib: path.resolve('./src/lib'),
					$app: path.resolve('node_modules/@sveltejs/kit/assets/app'),
					$utils: path.resolve('./src/lib/utils'),
					// '@samsveltecomponents/core': path.resolve('../packages/core/src/lib'),
					// '@samsveltecomponents/youtube-lite': path.resolve('../packages/youtube-lite/src/lib')
				}
			}
		});
	}
};