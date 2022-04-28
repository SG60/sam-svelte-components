<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	// import { base } from '$app/paths';
	import SvgIcon from '$components/Icons/SvgIcon.svelte';
	import { notionLogo, calendar, update } from '$components/Icons/icons';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">Synchronise Notion & GCal</div>
	</h1>
	<div class="flex flex-row items-center">
		<SvgIcon class="mx-[0.8rem]" size="200px" icon={notionLogo} />
		<SvgIcon class="mx-[0.8rem]" size="60px" icon={update} />
		<SvgIcon class="mx-[0.8rem]" size="200px" icon={calendar} />
	</div>
	<div class="py-4" />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		padding-top: 2rem;
		padding-bottom: 4rem;
	}
</style>
