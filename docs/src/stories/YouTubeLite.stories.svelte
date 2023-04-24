<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import { YouTubeLite } from '@samsveltecomponents/youtube-lite';
</script>

<Meta
	title="embeds/youtube-lite/YouTube Lite"
	component={YouTubeLite}
	argTypes={{
		title: { control: 'text' },
		id: { control: 'text' }
	}}
/>

<Template let:args><YouTubeLite {...args} /></Template>

<Story
	name="standard"
	args={{ id: 'dByckr7h1Zk', title: 'Video Title' }}
	parameters={{ chromatic: { disableSnapshot: true } }}
/>
