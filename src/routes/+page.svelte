<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import Monaco from '../lib/custom/Monaco.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<!-- Header -->
	<header class="border-b">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold">Text Compare</h1>
				<div class="space-x-2">
					<!-- <Button variant="outline" on:click={handleClear}>Clear</Button>
					<Button on:click={handleCompare}>Compare</Button> -->
				</div>
			</div>
		</div>
	</header>

	<!-- Editor Section -->
	<main class="container mx-auto flex-1 px-4 py-6">
		<div class="grid h-full grid-cols-1 gap-4">
			<Monaco
				originalText="Original content here"
				modifiedText="Modified content here"
				language="javascript"
			></Monaco>
		</div>
	</main>
</div>

<style>
	:global(.monaco-editor) {
		height: 100% !important;
		width: 100% !important;
	}
</style>
