<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import SoundCloud from '@samsveltecomponents/core/SoundCloud.svelte';
	import YouTube from '@samsveltecomponents/core/YouTube.svelte';
</script>

<Meta
	title="Embeds/YouTube"
	component={SoundCloud}
	argTypes={{
		title: { control: 'text' },
		id: { control: 'text' },
		autoplay: { control: 'boolean' }
	}}
/>

<Template let:args><YouTube {...args} /></Template>

<Story
	name="standard"
	args={{ id: 'dByckr7h1Zk' }}
	parameters={{ chromatic: { disableSnapshot: true } }}
/>

<Story
	name="autoplay"
	args={{ id: 'dByckr7h1Zk', autoplay: true }}
	parameters={{ chromatic: { disableSnapshot: true } }}
/>
