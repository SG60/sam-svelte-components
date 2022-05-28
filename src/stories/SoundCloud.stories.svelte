<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import SoundCloud from '$lib/SoundCloud.svelte';
</script>

<Meta
	title="SoundCloud Embed"
	component={SoundCloud}
	argTypes={{
		// trackId: { control: 'text', defaultValue: '1202071039' },
		title: { control: 'text' },
		url: { control: 'text' },
		height: { control: 'select', options: [166, 300, 450, 600] },
		color: { control: 'text', defaultValue: '4f6cec' }
	}}
/>

<Template let:args><SoundCloud {...args} /></Template>

<Story name="default" args={{ url: 'https://soundcloud.com/samgreening/frames' }} />

<Story
	name="playlist"
	args={{ url: 'https://soundcloud.com/samgreening/sets/edward-thomas-songs', height: 300 }}
/>
