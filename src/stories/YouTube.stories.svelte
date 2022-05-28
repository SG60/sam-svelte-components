<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import SoundCloud from '$lib/SoundCloud.svelte';
	import YouTube from '$lib/YouTube.svelte';
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

<Story name="default" args={{ id: 'dByckr7h1Zk' }} />
<Story name="autoplay" args={{ id: 'dByckr7h1Zk', autoplay: true }} />
