<script type="ts">
	export let id: string;
	export let title = 'YouTube Video';

	onMount(async () => {
		await import('@justinribeiro/lite-youtube');
	});
	import { onMount } from 'svelte';
</script>

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
	<lite-youtube videoid={id} videotitle={title} />
</div>
