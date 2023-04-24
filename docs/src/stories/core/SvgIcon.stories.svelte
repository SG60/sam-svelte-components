<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import SvgIcon from '@samsveltecomponents/core/Icons/SvgIcon.svelte';
	import '@samsveltecomponents/core/Icons/icons';
	import * as icons from '@samsveltecomponents/core/Icons/icons';
</script>

<Meta
	title="SvgIcon"
	component={SvgIcon}
	argTypes={{
		icon: {
			defaultValue: '',
			control: 'select',
			options: icons,
			type: {
				name: 'string',
				required: true
			},
			table: { type: { summary: 'iconInfo' }, defaultValue: { summary: '' } }
		},
		size: { control: 'text' },
		focusable: { control: 'boolean' },
		color: { control: 'color' },
		extraClasses: { control: 'text', name: 'class' },
		title: { control: 'text' }
	}}
/>

<Template let:args><SvgIcon {...args} class={args.extraClasses} /></Template>

<Story name="Basic" args={{ icon: icons.githubLogo }} />
<Story name="Large Red Notion" args={{ icon: icons.notionLogo, color: 'red', size: '6rem' }} />
<Story
	name="Extra Classes"
	args={{ icon: icons.githubLogo, extraClasses: 'rotate-45 text-red-500' }}
/>
