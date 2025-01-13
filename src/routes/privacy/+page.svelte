<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Shield, Database, Cookie } from 'lucide-svelte';
</script>

<title>Privacy Policy - Text Compare Tool</title>

<meta
	name="description"
	content="Read our privacy policy to understand how we handle your data at Text Compare Tool."
/>

<div class="container mx-auto max-w-4xl px-4 py-12 md:px-6">
	<Card.Root class="shadow-lg">
		<Card.Header class="space-y-2">
			<Card.Title class="text-3xl font-bold">Privacy Policy</Card.Title>
			<Card.Description class="text-muted-foreground">
				Last updated: {new Date().toLocaleDateString()}
			</Card.Description>
		</Card.Header>
		<Card.Content class="prose dark:prose-invert max-w-none">
			<div class="space-y-8">
				<div class="rounded-lg bg-muted/50 p-6">
					<div class="mb-4 flex items-center gap-3">
						<Shield class="h-6 w-6 text-primary" />
						<h3 class="m-0 text-xl font-semibold">Data Collection</h3>
					</div>
					<p>
						Text Compare Tool is committed to protecting your privacy. We do not collect or store
						any of the text content you compare using our tool. All comparisons are performed
						entirely in your browser.
					</p>
				</div>

				<div class="rounded-lg bg-muted/50 p-6">
					<div class="mb-4 flex items-center gap-3">
						<Database class="h-6 w-6 text-primary" />
						<h3 class="m-0 text-xl font-semibold">Usage Data</h3>
					</div>
					<p>
						We may collect anonymous usage statistics to help improve our service. This includes:
					</p>
					<ul class="mt-4 grid list-none gap-2 pl-0">
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-primary"></span>
							Browser type and version
						</li>
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-primary"></span>
							Operating system
						</li>
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-primary"></span>
							Page visit duration
						</li>
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-primary"></span>
							Features used
						</li>
					</ul>
				</div>

				<div class="rounded-lg bg-muted/50 p-6">
					<div class="mb-4 flex items-center gap-3">
						<Cookie class="h-6 w-6 text-primary" />
						<h3 class="m-0 text-xl font-semibold">Cookies</h3>
					</div>
					<p>
						We use essential cookies to remember your preferences (such as dark/light mode). No
						tracking cookies are used.
					</p>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
