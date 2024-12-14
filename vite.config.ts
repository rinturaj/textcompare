import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api.js',
			'@monaco-editor/loader': 'monaco-editor/min/vs/loader.js'
		}
	},
	assetsInclude: ['**/*.ttf']
});
