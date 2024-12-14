import { type ClassValue, clsx } from 'clsx';
import { writable, type Writable } from 'svelte/store';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export let contentClear: Writable<string> = writable<string>('');
