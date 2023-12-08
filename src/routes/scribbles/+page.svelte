<script lang="ts">
	import { page } from '$app/stores';
	export let data;
	export let form;
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

{#if $page.data.session}
	<form method="POST">
		<label>
			Add a scribble:
			<input type="text" name="body" autocomplete="off" />

			{#if form?.error && form?.errors}
				<ul class="notice-error">
					{#each form.errors as error}
						<li>{error.message} (not including whitespace)</li>
					{/each}
				</ul>
			{/if}
		</label>
	</form>
{/if}
