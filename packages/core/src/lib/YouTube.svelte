<script lang="ts">
	export let id: string;
	export let title = 'YouTube Video';
	const ytHost = 'https://www.youtube.com';
	export let autoplay = false;
</script>

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
	<iframe
		loading="lazy"
		src="{ytHost}/embed/{id}?autoplay={autoplay ? 1 : 0}"
		style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;"
		allowfullscreen
		{title}
	/>
</div>
