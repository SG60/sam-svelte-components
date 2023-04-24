<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import YouTubeLite from '@samsveltecomponents/youtube-lite/YouTubeLite.svelte';

	export let portableText: CustomBlockComponentProps<{
		id: string;
		title?: string;
	}>;

	const { id, title } = portableText.value;
</script>

<YouTubeLite {id} {title} />
