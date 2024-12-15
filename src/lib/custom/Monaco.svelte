<script lang="ts">
	import { onDestroy, onMount, createEventDispatcher } from 'svelte';
	import * as monaco from 'monaco-editor';
	import editorWorker from './../../../node_modules/monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from './../../../node_modules/monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from './../../../node_modules/monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from './../../../node_modules/monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from './../../../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	import { lightTheme, darkTheme } from './monaco-themes';
	import './monaco.css';
	import { contentClear } from '../utils';
	import Button from '../components/ui/button/button.svelte';
	import { Eraser } from 'lucide-svelte';

	let editorElement: HTMLDivElement;
	let diffEditor: monaco.editor.IStandaloneDiffEditor;
	let originalModel: monaco.editor.ITextModel | null = null;
	let modifiedModel: monaco.editor.ITextModel | null = null;

	let additionsCount = 0;
	let deletionsCount = 0;

	export let originalText = '';
	export let modifiedText = '';
	export let language = 'text';
	export let isDark = true;

	contentClear.subscribe((data) => {
		if (!!data && data?.length > 0) updateContent('', '');
	});

	// Expose methods to parent component
	export function getOriginalValue(): string {
		return originalModel?.getValue() ?? '';
	}

	export function getModifiedValue(): string {
		return modifiedModel?.getValue() ?? '';
	}

	export function updateContent(original: string, modified: string) {
		loadDiffContent(original, modified, language);
	}

	function updateDiffCounts() {
		if (diffEditor) {
			const diffModel = diffEditor.getModel();
			if (diffModel) {
				const changes = diffEditor.getLineChanges() || [];
				additionsCount = changes.reduce(
					(acc, change) =>
						acc + (change.modifiedEndLineNumber - change.modifiedStartLineNumber + 1),
					0
				);
				deletionsCount = changes.reduce(
					(acc, change) =>
						acc + (change.originalEndLineNumber - change.originalStartLineNumber + 1),
					0
				);
			}
		}
	}

	function loadDiffContent(original: string, modified: string, language: string) {
		if (diffEditor) {
			// First set the diff editor model to null
			diffEditor.setModel(null);

			// Then dispose old models
			if (originalModel) {
				originalModel.dispose();
			}
			if (modifiedModel) {
				modifiedModel.dispose();
			}

			// Create new models
			originalModel = monaco.editor.createModel(original, language);
			modifiedModel = monaco.editor.createModel(modified, language);

			// Set the new models
			diffEditor.setModel({
				original: originalModel,
				modified: modifiedModel
			});

			// Update counts after model is set
			setTimeout(updateDiffCounts, 100);
		}
	}

	// Add new methods for merging
	export function acceptLeftChange(lineNumber: number) {
		const changes = diffEditor.getLineChanges() || [];
		const change = changes.find(
			(c) => c.originalStartLineNumber <= lineNumber && c.originalEndLineNumber >= lineNumber
		);

		if (change && modifiedModel && originalModel) {
			const originalText = originalModel.getValueInRange({
				startLineNumber: change.originalStartLineNumber,
				endLineNumber: change.originalEndLineNumber,
				startColumn: 1,
				endColumn: originalModel.getLineMaxColumn(change.originalEndLineNumber)
			});

			modifiedModel.pushEditOperations(
				[],
				[
					{
						range: {
							startLineNumber: change.modifiedStartLineNumber,
							endLineNumber: change.modifiedEndLineNumber,
							startColumn: 1,
							endColumn: modifiedModel.getLineMaxColumn(change.modifiedEndLineNumber)
						},
						text: originalText
					}
				],
				() => null
			);
		}
	}

	export function acceptRightChange(lineNumber: number) {
		const changes = diffEditor.getLineChanges() || [];
		const change = changes.find(
			(c) => c.modifiedStartLineNumber <= lineNumber && c.modifiedEndLineNumber >= lineNumber
		);

		if (change && modifiedModel && originalModel) {
			const modifiedText = modifiedModel.getValueInRange({
				startLineNumber: change.modifiedStartLineNumber,
				endLineNumber: change.modifiedEndLineNumber,
				startColumn: 1,
				endColumn: modifiedModel.getLineMaxColumn(change.modifiedEndLineNumber)
			});

			originalModel.pushEditOperations(
				[],
				[
					{
						range: {
							startLineNumber: change.originalStartLineNumber,
							endLineNumber: change.originalEndLineNumber,
							startColumn: 1,
							endColumn: originalModel.getLineMaxColumn(change.originalEndLineNumber)
						},
						text: modifiedText
					}
				],
				() => null
			);
		}
	}

	// Add methods to accept all changes
	export function acceptAllLeft() {
		if (originalModel && modifiedModel) {
			modifiedModel.setValue(originalModel.getValue());
		}
	}

	export function acceptAllRight() {
		if (originalModel && modifiedModel) {
			originalModel.setValue(modifiedModel.getValue());
		}
	}

	const dispatch = createEventDispatcher();

	onMount(() => {
		// Register custom themes
		monaco.editor.defineTheme('customLight', lightTheme);
		monaco.editor.defineTheme('customDark', darkTheme);

		self.MonacoEnvironment = {
			getWorker: function (_: any, label: string) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};

		diffEditor = monaco.editor.createDiffEditor(editorElement, {
			automaticLayout: true,
			theme: isDark ? 'customDark' : 'customLight',
			renderSideBySide: true,
			enableSplitViewResizing: true,
			originalEditable: true,
			renderSideBySideInlineBreakpoint: 100,

			minimap: {
				autohide: false,
				enabled: false,
				renderCharacters: false
			}
		});

		// Add listener for diff updates
		diffEditor.onDidUpdateDiff(() => {
			updateDiffCounts();
		});

		// Load initial content
		loadDiffContent(originalText, modifiedText, language);

		// Add change listeners
		if (originalModel) {
			originalModel.onDidChangeContent(() => {
				dispatch('originalChange', getOriginalValue());
			});
		}

		if (modifiedModel) {
			modifiedModel.onDidChangeContent(() => {
				dispatch('modifiedChange', getModifiedValue());
			});
		}
		// Dispatch load event when Monaco is ready
		dispatch('load', 'Monaco is ready');

		return () => {
			if (diffEditor) {
				diffEditor.setModel(null);
			}

			if (originalModel) {
				originalModel.dispose();
			}
			if (modifiedModel) {
				modifiedModel.dispose();
			}

			if (diffEditor) {
				diffEditor.dispose();
			}
		};
	});

	onDestroy(() => {
		if (diffEditor) {
			diffEditor.setModel(null);
		}

		if (originalModel) {
			originalModel.dispose();
		}
		if (modifiedModel) {
			modifiedModel.dispose();
		}

		if (diffEditor) {
			diffEditor.dispose();
		}
	});

	// Watch for changes in input properties
	$: if (diffEditor && (originalText !== undefined || modifiedText !== undefined)) {
		loadDiffContent(originalText, modifiedText, language);
	}

	// Watch for theme changes
	$: if (diffEditor) {
		monaco.editor.setTheme(isDark ? 'customDark' : 'customLight');
	}
	function clearLeft() {
		updateContent('', modifiedText);
		originalText = '';
	}
	function clearRight() {
		updateContent(originalText, '');
		modifiedText = '';
	}
</script>

<div class="h-full w-full overflow-hidden">
	<div class="flex justify-between p-2">
		<div class=" left-2 top-2 z-10 flex items-center space-x-2 text-sm font-medium">
			<span
				class="rounded-md bg-red-100 px-3 py-1 text-red-800"
				class:dark:bg-red-900={isDark}
				class:dark:text-red-100={isDark}
			>
				- {deletionsCount} Removal
			</span>
			<Button size="sm" variant="outline" class="" on:click={() => acceptAllLeft()}
				>Accept All Left</Button
			>
			<Button class="" size="sm" color="primary" variant="outline" on:click={clearLeft}>
				<Eraser class="m-1" size={14} />
				Clear</Button
			>
		</div>
		<div class=" right-2 top-2 z-10 flex items-center space-x-2 text-sm font-medium">
			<Button class="" size="sm" color="primary" variant="outline" on:click={clearRight}>
				<Eraser class="m-1" size={14} />

				Clear</Button
			>

			<Button size="sm" variant="outline" class="" on:click={() => acceptAllRight()}
				>Accept All Right</Button
			>

			<span
				class="rounded-md bg-green-100 px-3 py-1 text-green-800"
				class:dark:bg-green-900={isDark}
				class:dark:text-green-100={isDark}
			>
				+ {additionsCount} Addition
			</span>
		</div>
	</div>
	<div class="relative flex h-full w-full flex-col overflow-hidden rounded-lg">
		<div class="editor-container flex-grow" bind:this={editorElement}></div>
	</div>
</div>

<style>
	:global(.monaco-editor) {
		/* border-radius: 0.5rem; */
		overflow: hidden;
	}

	:global(.monaco-editor .overflow-guard) {
		/* border-radius: 0.5rem; */
	}

	/* Mesh background patterns */
	:global(.monaco-editor.vs) {
		background-image: radial-gradient(#00000009 1px, transparent 1px);
		background-size: 16px 16px;
	}

	:global(.monaco-editor.vs-dark) {
		background-image: radial-gradient(#ffffff09 1px, transparent 1px);
		background-size: 16px 16px;
	}

	/* Additional styling for editor containers */
	:global(.monaco-editor .margin) {
		background: transparent !important;
	}

	:global(.monaco-editor .monaco-scrollable-element) {
		background: transparent !important;
	}

	/* Adjust content background opacity */
	:global(.monaco-editor.vs .monaco-editor-background) {
		background-color: rgba(255, 255, 255, 0.95) !important;
	}

	:global(.monaco-editor.vs-dark .monaco-editor-background) {
		background-color: rgba(26, 27, 30, 0.95) !important;
	}

	/* Additional styles for the counters */
	:global(.monaco-editor .diffOverview) {
		margin-top: 2rem;
	}

	/* Ensure counter badges are visible */
	:global(.monaco-editor .overflow-guard) {
		/* border-radius: 0.5rem; */
		margin-top: 1rem;
	}

	/* Add styles for the merge buttons */
	:global(.monaco-editor .merge-button) {
		position: absolute;
		z-index: 100;
		cursor: pointer;
		padding: 2px 4px;
		font-size: 12px;
		border-radius: 3px;
		/* background-color: var(--merge-button-bg); */
		/* color: var(--merge-button-fg); */
		opacity: 0;
		transition: opacity 0.2s;
	}

	:global(.monaco-editor .merge-button:hover) {
		opacity: 1 !important;
	}

	:global(.monaco-editor .line-insert:hover .merge-button),
	:global(.monaco-editor .line-delete:hover .merge-button) {
		opacity: 0.8;
	}
</style>
