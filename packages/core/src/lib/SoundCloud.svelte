<script lang="ts">
	export let url: string;
	export let title = 'SoundCloud Player';
	export let height = 166;
	export let color = '4f6cec';
</script>

<div>
	<iframe
		{title}
		width="100%"
		{height}
		scrolling="no"
		frameborder="no"
		src="https://w.soundcloud.com/player/?url={url}&amp;color={color}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"
	/>
</div>
