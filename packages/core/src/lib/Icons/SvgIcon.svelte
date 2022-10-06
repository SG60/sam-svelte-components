<script lang="ts">
	import type { iconInfo } from './icons';
	export let icon: iconInfo;
	export let title = icon.title;
	export let size = '1rem';
	export let focusable: 'true' | 'false' = 'false';
	export let color = '';
	let extraClasses = '';
	export { extraClasses as class };
</script>

<svg
	class={extraClasses}
	width={size}
	height={size}
	viewBox="0 0 {icon.viewBox[0]} {icon.viewBox[1]}"
	{focusable}
	style:color
	style:fill="currentColor"
>
	{#if title}
		<title>{title}</title>
	{/if}
	<g>
		{@html icon.svg}
	</g>
</svg>
