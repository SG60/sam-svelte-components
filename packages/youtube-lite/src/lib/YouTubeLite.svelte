<script>
	import { BROWSER } from 'esm-env';

	/** @type {{ id: string, title: string | undefined }} */
	let { id, title = 'YouTube Video' } = $props();

	if (BROWSER) {
		// This custom element import only works in the browser
		import('@justinribeiro/lite-youtube');
	}
</script>

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
	<lite-youtube videoid={id} videotitle={title}></lite-youtube>
</div>
