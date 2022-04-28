<script>
	import { user } from '$lib/session-store';
	import { supabase } from '$lib/supabase-client';
	import Auth from '$components/Auth.svelte';
	import Profile from '$components/Profile.svelte';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((__dirname, session) => {
		user.set(session.user);
	});
</script>

<svelte:head><title>Dashboard</title></svelte:head>

<div class="">
	{#if $user}
		<Profile />
	{:else}
		<Auth />
	{/if}
</div>
