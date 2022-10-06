<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import SoundCloud from '$lib/SoundCloud.svelte';
</script>

<Meta
	title="Embeds/SoundCloud"
	component={SoundCloud}
	argTypes={{
		title: { control: 'text' },
		url: { control: 'text' },
		height: { control: 'number', defaultValue: 166 },
		color: { control: 'text', defaultValue: '4f6cec' }
	}}
/>

<Template let:args><SoundCloud {...args} /></Template>

<Story
	name="track"
	args={{ url: 'https://soundcloud.com/samgreening/frames' }}
	parameters={{ chromatic: { disableSnapshot: true } }}
/>

<Story
	name="playlist"
	args={{ url: 'https://soundcloud.com/samgreening/sets/edward-thomas-songs', height: 300 }}
	parameters={{ chromatic: { disableSnapshot: true } }}
/>
