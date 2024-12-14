<script lang="ts">
	import Monaco from '$lib/custom/Monaco.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Header from '../lib/custom/header.svelte';
	import { ModeWatcher, mode } from 'mode-watcher';

	let monacoComponent: Monaco;
	let originalCode = `Please Enter your text here`;
	let modifiedCode = `Please Enter your text here`;

	function handleOriginalChange(event: CustomEvent) {
		originalCode = event.detail;
	}

	function handleModifiedChange(event: CustomEvent) {
		modifiedCode = event.detail;
	}

	function handleAcceptLeft(lineNumber: number) {
		monacoComponent.acceptLeftChange(lineNumber);
	}

	function handleAcceptRight(lineNumber: number) {
		monacoComponent.acceptRightChange(lineNumber);
	}

	function handleAcceptAllLeft() {
		monacoComponent.acceptAllLeft();
	}

	function handleAcceptAllRight() {
		monacoComponent.acceptAllRight();
	}
</script>

<title>Text Compare Tool - Compare and Edit Texts Easily</title>

<meta
	name="description"
	content="Use our Text Compare Tool to easily compare and edit two pieces of text side by side. Accept changes line by line or all at once for efficient editing."
/>

<div class="">
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-2xl font-semibold text-muted-foreground"
				>Text Compare Tool - Compare and Edit Texts Easily</Card.Title
			>
			<Card.Description
				>This tool allows you to compare two pieces of text side by side. You can edit the original
				and modified texts, and accept changes as needed. Use the buttons to accept changes line by
				line or all at once.</Card.Description
			>
		</Card.Header>
		<Card.CardContent class="h-[80vh] ">
			<Monaco
				bind:this={monacoComponent}
				originalText={originalCode}
				modifiedText={modifiedCode}
				language="javascript"
				isDark={$mode == 'dark'}
				on:originalChange={handleOriginalChange}
				on:modifiedChange={handleModifiedChange}
			/>
		</Card.CardContent>
	</Card.Root>
</div>
