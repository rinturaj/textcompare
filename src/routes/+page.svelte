<script lang="ts">
	import Monaco from '$lib/custom/Monaco.svelte';

	let monacoComponent: Monaco;
	let originalCode = `function example() {
    console.log("Hello");
    return true;
    // Original comment
}`;
	let modifiedCode = `function example() {
    console.log("Hello World!");
    // Added a new comment
    return false;
    // Another change
}`;
	let isDarkTheme = true;

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

	function updateContent() {
		monacoComponent.updateContent('// New original content', '// New modified content');
	}

	function toggleTheme() {
		isDarkTheme = !isDarkTheme;
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Text Diff Viewer</h1>
	<div class="mt-4 space-x-2">
		<button
			class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			on:click={updateContent}
		>
			Update Content
		</button>
		<button
			class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
			on:click={toggleTheme}
		>
			Toggle Theme
		</button>
	</div>
	<div class="h-[600px] rounded border border-gray-300">
		<Monaco
			bind:this={monacoComponent}
			originalText={originalCode}
			modifiedText={modifiedCode}
			language="javascript"
			isDark={isDarkTheme}
			on:originalChange={handleOriginalChange}
			on:modifiedChange={handleModifiedChange}
		/>
	</div>
</div>
