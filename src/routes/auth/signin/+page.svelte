<script lang="ts">
	async function signInAsAlice() {
		await fetch('/auth/signin', {
			method: 'POST',
			body: JSON.stringify(
				{
					userId: 'alice',
				},
				null,
				2
			),
		});

		location.href = '/';
	}
</script>

<button on:click={signInAsAlice}> Sign in as Alice </button>
