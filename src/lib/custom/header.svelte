<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	// import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Moon, Plus, Sun, Upload } from 'lucide-svelte';
	import { LifeBuoy } from 'lucide-svelte';
	import { Github } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { toggleMode } from 'mode-watcher';
	import { contentClear } from '../utils';

	function updateContent() {
		contentClear.update((x) => 'Next');
	}
</script>

<header class="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
	<nav
		class="hidden w-full gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
	>
		<a href="##" class="flex items-center gap-2 text-lg font-semibold md:text-base">
			<Package2 class="h-6 w-6" />
		</a>
		<a href="##" class=" transition-colors hover:text-foreground">
			Text Compare Tool

			<small>- v.0.0.1</small>
		</a>
	</nav>

	<div class="flex flex-row items-center gap-2 md:ml-auto">
		<Button class="mr-2" size="icon" variant="outline">
			<LifeBuoy strokeWidth={1}></LifeBuoy>
		</Button>
		<!-- <Button class="mr-2" size="icon" variant="outline">
			<Github strokeWidth={1}></Github>
		</Button> -->
		<Button class="mr-2" on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
		<div class=" h-100 mr-1 border-l-2 border-opacity-15"></div>
	</div>
</header>
