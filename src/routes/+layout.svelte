<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Header from '../lib/custom/header.svelte';
	import * as Card from '../lib/components/ui/card/index';
	import Input from '../lib/components/ui/input/input.svelte';
	import Button from '../lib/components/ui/button/button.svelte';
	import Checkbox from '../lib/components/ui/checkbox/checkbox.svelte';
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
				<h1 class="text-xl font-semibold">Tabs</h1>
			</div>

			<a href="##" class="font-semibold text-primary"> New </a>
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
