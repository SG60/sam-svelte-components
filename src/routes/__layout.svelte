<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<header class="grid justify-center w-full">
	<nav class="w-fit">
		<ul class="flex flex-row">
			<li class:active={$page.url.pathname === base + '/'}>
				<a class="nav-link" sveltekit:prefetch href="{base}/">Home</a>
			</li>
			<li class:active={$page.url.pathname === base + '/about'}>
				<a class="nav-link" sveltekit:prefetch href="{base}/about">About</a>
			</li>
		</ul>
	</nav>
</header>

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	.nav-link:hover {
		@apply bg-blue-700/20;
	}
	.nav-link {
		@apply mx-4;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
