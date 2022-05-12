import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { version } from '../package.json';

addons.setConfig({
	theme: create({
		base: 'light',
		brandTitle: `Sam Svelte Components v.${version}`,
		brandUrl: 'https://github.com/SG60/sam-svelte-components'
	})
});
