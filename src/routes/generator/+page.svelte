<script>
	import { onMount } from 'svelte';

	let link = null;
	let generate = false;

	const getRandomLightshot = async () => {
		generate = false;
		const res = await fetch('/_api/lightshot').then((res) => res.json());

		link = res.link;
		generate = true;
	};

	onMount(async () => {
		getRandomLightshot();
	});
</script>

<div class="container">
	{#if link}
		<img src={link} alt="random screenshot" />
	{/if}
	<button disabled={!generate} on:click={getRandomLightshot}
		><i class="fa-solid fa-magnifying-glass"></i> Find new Lightshot</button
	>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: inherit;
		gap: 1rem;

		img {
			max-height: 80dvh;
			max-width: 80dvw;
		}

		button {
			margin-top: 2.5rem;
			border-radius: 9999px;
			padding: 0.625rem 0.875rem;
			cursor: pointer;
			transition: scale 0.3s ease-in-out;
			background-color: rgb(var(--primary-100));
			border: 2px solid rgb(var(--primary-300));

			&:hover {
				scale: 1.03;
			}
		}
	}
</style>
