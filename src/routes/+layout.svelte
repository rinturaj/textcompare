<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Header from '../lib/custom/header.svelte';
	let { children } = $props();
</script>

<Header></Header>
<ModeWatcher />

<main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4">
	<div class="grid w-full grid-cols-[180px_1fr] items-start gap-2">
		<nav
			class="grid gap-4 text-sm text-muted-foreground"
			data-x-chunk-name="dashboard-04-chunk-0"
			data-x-chunk-description="A sidebar navigation with links to general, security, integrations, support, organizations, and advanced settings."
			data-x-chunk-container="chunk-container after:right-0"
		>
			<div class="mx-auto grid w-full gap-2">
				<h1 class="text-xl font-semibold">
					Welcome to

					<span class="font-extrabold text-black">TextCompare </span>
				</h1>
			</div>

			<a href="##" class="font-semibold text-primary"> Exciting new features are coming soon! 🚀</a>
			<!-- <a href="##">Security</a>
			<a href="##">Integrations</a>
			<a href="##">Support</a>
			<a href="##">Organizations</a>
			<a href="##">Advanced</a> -->
		</nav>
		<div class="grid gap-1">
			<div class="h-full">
				{@render children()}
			</div>
		</div>
	</div>
</main>
