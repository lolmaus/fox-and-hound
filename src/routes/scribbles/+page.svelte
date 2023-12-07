<script lang="ts">
	export let data;
</script>

<h1>Scribbles</h1>

<div>
	{#await data.streamed}
		Loading scribbles...
	{:then scribbleUserObjects}
		{#if scribbleUserObjects.length}
			<ul>
				{#each scribbleUserObjects as scribbleUser}
					<li>
						<p>{scribbleUser.scribble.body}</p>
						<p>By {scribbleUser.user?.name}</p>
					</li>
				{/each}
			</ul>
		{:else}
			<p>There are no scribbles yet.</p>
		{/if}
	{:catch error}
		Something wrong happened: {error.message}
	{/await}
</div>
