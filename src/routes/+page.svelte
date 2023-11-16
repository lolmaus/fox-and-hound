<script lang="ts">
	export let data;
</script>

<h1>Welcome to SvelteKit!</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p data-testid="page-view-count">
	{#await data.streamed.views}
		Loading view count...
	{:then views}
		This page has been viewed

		<span data-testid="page-view-count-value">
			{views}
		</span>

		times.
	{:catch error}
		Something wrong happened: {error.message}
	{/await}
</p>
