<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<title>About - Text Compare Tool</title>

<meta
	name="description"
	content="Learn more about Text Compare Tool - A powerful tool for comparing and editing text side by side."
/>

<div class="container mx-auto max-w-4xl px-4 py-12 md:px-6">
	<Card.Root class="shadow-lg">
		<Card.Header class="space-y-2">
			<Card.Title class="text-3xl font-bold">About Us</Card.Title>
			<Card.Description class="text-xl text-muted-foreground">
				Discover the story behind Text Compare Tool
			</Card.Description>
		</Card.Header>
		<Card.Content class="prose dark:prose-invert max-w-none">
			<div class="space-y-6">
				<p class="text-lg leading-7">
					Text Compare Tool is a powerful web application designed to make text comparison and
					editing as simple and efficient as possible.
				</p>

				<div class="rounded-lg bg-muted/50 p-6">
					<h3 class="mb-4 text-xl font-semibold">Our Mission</h3>
					<p>
						Our mission is to provide developers, writers, and professionals with a reliable and
						user-friendly tool for comparing and analyzing text differences.
					</p>
				</div>

				<div>
					<h3 class="mb-4 text-xl font-semibold">Key Features</h3>
					<ul class="grid list-none gap-3 pl-0">
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-primary"></span>
							Side-by-side text comparison
						</li>
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-primary"></span>
							Line-by-line difference highlighting
						</li>
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-primary"></span>
							Easy acceptance of changes
						</li>
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-primary"></span>
							Dark and light mode support
						</li>
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-primary"></span>
							Responsive design
						</li>
					</ul>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
