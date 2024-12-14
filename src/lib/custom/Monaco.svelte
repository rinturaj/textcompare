<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as monaco from 'monaco-editor';
	import editorWorker from './../../../node_modules/monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from './../../../node_modules/monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from './../../../node_modules/monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from './../../../node_modules/monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from './../../../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	// import 'monaco-editor/min/vs/editor/editor.main.css';
	import './monaco.css';

	let editorElement: HTMLDivElement;
	let diffEditor: monaco.editor.IStandaloneDiffEditor;
	let originalModel: monaco.editor.ITextModel | null = null;
	let modifiedModel: monaco.editor.ITextModel | null = null;

	export let originalText = '';
	export let modifiedText = '';
	export let language = 'text';

	function loadDiffContent(original: string, modified: string, language: string) {
		// Dispose old models first
		if (originalModel) {
			originalModel.dispose();
		}
		if (modifiedModel) {
			modifiedModel.dispose();
		}

		// Create new models
		originalModel = monaco.editor.createModel(original, language);
		modifiedModel = monaco.editor.createModel(modified, language);

		// Set the models only if diffEditor exists
		if (diffEditor) {
			diffEditor.setModel({
				original: originalModel,
				modified: modifiedModel
			});
		}
	}

	onMount(async () => {
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
			theme: 'vs-dark',
			renderSideBySide: true,
			enableSplitViewResizing: true,
			originalEditable: true,
			minimap: {
				autohide: true,
				enabled: true,
				renderCharacters: false
			}
		});

		// Load initial content
		loadDiffContent(originalText, modifiedText, language);
	});

	onDestroy(() => {
		// Clear the diff editor model first
		if (diffEditor) {
			diffEditor.setModel(null);
		}

		// Then dispose the models
		if (originalModel) {
			originalModel.dispose();
		}
		if (modifiedModel) {
			modifiedModel.dispose();
		}

		// Finally dispose the editor
		if (diffEditor) {
			diffEditor.dispose();
		}
	});

	// Watch for changes in input properties
	$: if (diffEditor && (originalText !== undefined || modifiedText !== undefined)) {
		loadDiffContent(originalText, modifiedText, language);
	}
</script>

<div class="flex h-screen w-full flex-col">
	<div class="flex-grow" bind:this={editorElement}></div>
</div>
