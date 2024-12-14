import * as monaco from 'monaco-editor';

// Light theme with mesh background
export const lightTheme: monaco.editor.IStandaloneThemeData = {
	base: 'vs',
	inherit: true,
	rules: [],
	colors: {
		'editor.background': '#ffffff',
		'editor.foreground': '#000000',
		'editor.lineHighlightBackground': '#f0f0f0',
		'editor.selectionBackground': '#add6ff',
		'editorGutter.background': '#f8f8f8',
		'editor.inactiveSelectionBackground': '#e5ebf1'
	}
};

// Dark theme with mesh background
export const darkTheme: monaco.editor.IStandaloneThemeData = {
	base: 'vs-dark',
	inherit: true,
	rules: [],
	colors: {
		'editor.background': '#1a1b1e',
		'editor.foreground': '#d4d4d4',
		'editor.lineHighlightBackground': '#2a2b2e',
		'editor.selectionBackground': '#264f78',
		'editorGutter.background': '#1e1f23',
		'editor.inactiveSelectionBackground': '#3a3d41'
	}
};
