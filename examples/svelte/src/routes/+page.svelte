<script>
	import { variants } from '@catppuccin/palette';
	let selected = 'mocha';
</script>

<svelte:head>
	<title>Catppuccin + TailwindCSS!</title>
</svelte:head>

<html class={selected ? selected : ''}>
	<body class="h-screen bg-base text-text">
		<div class="container max-w-lg mx-auto transition-colors space-y-2 py-2">
			<div class="space-y-2 text-center">
				<img
					class="mx-auto"
					src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png"
					width="100"
					alt="Logo"
				/>
				<h1>Catppuccin for Tailwind CSS</h1>
				<div class="flex max-w-fit border rounded border-overlay0 items-center mx-auto">
					<span class="rounded-l whitespace-nowrap px-2">Current flavour:</span>
					<select
						bind:value={selected}
						class="focus:rounded-r focus:ring-pink focus:border-pink bg-overlay0 w-full p-1 text-text"
						name="colorscheme"
					>
						{#each Object.keys(variants) as variant}
							<option value={variant}>{variant}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="flex flex-wrap gap-2">
				{#each Object.keys(variants.mocha) as color}
					<div
						class={'flex items-center shadow-md rounded justify-center h-24 w-24 bg-' +
							color}
					>
						<span class="bg-base/20 text-text rounded-lg p-1">
							{color}
						</span>
					</div>
				{/each}
			</div>
		</div>
	</body>
</html>
