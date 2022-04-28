<script lang="ts">
	// import { session } from '$app/stores';
	// import { user } from '$lib/session-store';
	import { supabase } from '$lib/supabase-client';
	import SvgIcon from '$components/Icons/SvgIcon.svelte';
	import { notionLogo } from '$components/Icons/icons';

	let loading = false;
	let email: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signIn(
				{ email },
				{ redirectTo: window.location.origin }
			);
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error: any) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};

	// Notion version
	async function signInWithNotion() {
		const { user, session, error } = await supabase.auth.signIn(
			{
				provider: 'notion'
			},
			{ redirectTo: window.location.origin }
		);
		console.log({ user, session, error });
	}
</script>

<form class="max-w-prose m-auto" on:submit|preventDefault={handleLogin}>
	<h1 class="text-4xl mb-8">Log in with email</h1>
	<div class="my-4">
		<input class="w-full" type="email" placeholder="email@example.com" bind:value={email} />
	</div>
	<div class="my-4">
		<button class="button w-96 max-w-full mx-auto" type="submit" disabled={loading}>
			{loading ? 'Loading' : 'Send magic link'}
		</button>
	</div>
</form>

<hr class="my-8" />

<!-- Notion version -->
<form class="max-w-prose m-auto" on:submit|preventDefault={signInWithNotion}>
	<h1 class="text-4xl mb-8">Log in with Notion</h1>
	<div class="my-4">
		<button
			class="button w-96 max-w-full mx-auto bg-slate-700 text-white hover:bg-slate-100 hover:text-slate-700"
			type="submit"
			disabled={loading}
		>
			<SvgIcon class="inline mx-2" size="1.4rem" icon={notionLogo} />{loading
				? 'Loading'
				: 'Login with Notion'}
		</button>
	</div>
</form>
