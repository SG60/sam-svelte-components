<script lang="ts">
	import { supabase } from '$lib/supabase-client';
	import { user } from '$lib/session-store';

	let loading = true;
	let username: string | null = null;
	let website: string | null = null;
	let avatar_url: string | null = null;

	function getProfile(_: any) {
		async function doTheWork() {
			try {
				loading = true;
				const user: any = supabase.auth.user();

				let { data, error, status } = await supabase
					.from('profiles')
					.select('username, website, avatar_url')
					.eq('id', user.id)
					.single();

				if (error && status !== 406) throw error;

				if (data) {
					username = data.username;
					website = data.website;
					avatar_url = data.avatar_url;
				}
			} catch (error: any) {
				alert(error.message);
			} finally {
				loading = false;
			}
		}
		doTheWork();
	}

	async function updateProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();

			const updates = {
				id: user?.id,
				username,
				website,
				avatar_url,
				updated_at: new Date()
			};

			let { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal' // don't return the value after inserting
			});
			if (error) throw error;
		} catch (error: any) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error: any) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<form use:getProfile class="max-w-prose m-auto" on:submit|preventDefault={updateProfile}>
	<div class="my-4">
		<label for="email" class="block">Email</label>
		<input class="w-full " type="email" name="email" id="email" value={$user.email} disabled />
	</div>
	<div class="my-4">
		<label for="username" class="block">Name</label>
		<input class="w-full " id="username" type="text" bind:value={username} />
	</div>
	<div class="my-4">
		<label for="website" class="block">Website</label>
		<input class="w-full" id="website" type="text" bind:value={website} />
	</div>

	<div class="my-4">
		<input
			type="submit"
			class="w-full bg-green-300 p-2 hover:bg-slate-100"
			value={loading ? 'Loading ...' : 'Update'}
			disabled={loading}
		/>
	</div>

	<div class="my-4">
		<button class="w-full bg-slate-300 p-2 hover:bg-red-200" on:click={signOut} disabled={loading}>
			Sign Out
		</button>
	</div>
</form>
