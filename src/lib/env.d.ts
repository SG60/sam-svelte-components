/// <reference types="vite/client" />

// this file contains custom env variable types

interface ImportMetaEnv {
	readonly VITE_SUPABASE_URL: string;
	readonly VITE_SUPABASE_ANON_KEY: string;
	// more env variables...
}
