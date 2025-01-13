<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Mail, Twitter, Github } from 'lucide-svelte';
</script>

<title>Contact Us - Text Compare Tool</title>

<meta
	name="description"
	content="Get in touch with us about Text Compare Tool. We'd love to hear your feedback and suggestions."
/>

<div class="container mx-auto max-w-4xl px-4 py-12 md:px-6">
	<Card.Root class="shadow-lg">
		<Card.Header class="space-y-2">
			<Card.Title class="text-3xl font-bold">Contact Us</Card.Title>
			<Card.Description class="text-xl text-muted-foreground">
				We'd love to hear from you
			</Card.Description>
		</Card.Header>
		<Card.Content class="prose dark:prose-invert max-w-none">
			<div class="space-y-6">
				<p class="text-lg leading-7">
					We value your feedback and are here to help. If you have any questions, suggestions, or
					concerns, please don't hesitate to reach out.
				</p>

				<div class="grid gap-6 md:grid-cols-2">
					<div class="flex flex-col items-center rounded-lg bg-muted/50 p-6">
						<Mail class="mb-4 h-8 w-8 text-primary" />
						<h3 class="text-lg font-semibold">Email</h3>
						<p class="text-center text-sm">rinturajc@gmail.com</p>
					</div>

					<div class="flex flex-col items-center rounded-lg bg-muted/50 p-6">
						<Github class="mb-4 h-8 w-8 text-primary" />
						<h3 class="text-lg font-semibold">GitHub</h3>
						<a href="https://github.com/rinturaj/textcompare" class="text-center text-sm"
							>https://github.com/rinturaj/textcompare</a
						>
					</div>
				</div>

				<div class="mt-6 rounded-lg bg-muted/50 p-6">
					<p class="text-sm leading-7">
						For bug reports and feature requests, please visit our GitHub repository and create an
						issue.
					</p>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
