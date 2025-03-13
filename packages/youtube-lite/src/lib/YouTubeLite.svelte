<script lang="ts">
	import { browser } from '$app/environment';
	export let id: string;
	export let title = 'YouTube Video';

	if (browser) {
		// This custom element import only works in the browser
		import('@justinribeiro/lite-youtube');
	}
</script>

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
	<lite-youtube videoid={id} videotitle={title}></lite-youtube>
</div>
