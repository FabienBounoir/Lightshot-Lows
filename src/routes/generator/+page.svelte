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

{#if link}
	<img src={link} alt="Can't display image: {link}" class={generate ? '' : 'loading-animation'} />
{:else}
	<p>Loading...</p>
{/if}

<button disabled={!generate} on:click={getRandomLightshot}
	><i class="fa-solid fa-magnifying-glass"></i> Find new Lightshot</button
>

<style lang="scss">
	.loading-animation {
		animation: opacity 0.8s ease-in-out infinite alternate;
	}

	@keyframes opacity {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0.4;
		}
	}

	img {
		max-height: 80dvh;
		max-width: 80dvw;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	button {
		position: fixed;
		bottom: 30px;
		left: 50%;
		transform: translate(-50%, 0);

		// margin-top: 2.5rem;
		border-radius: 9999px;
		padding: 0.625rem 0.875rem;
		cursor: pointer;
		transition: scale 0.3s ease-in-out;
		background-color: rgb(var(--primary-100));
		border: 2px solid rgb(var(--primary-300));

		&:hover {
			scale: 1.03;
		}

		&:disabled:hover {
			scale: 1;
		}

		&:disabled {
			background-color: rgb(var(--primary-300));
			border-color: rgb(var(--primary-300));
			color: rgb(var(--primary-100));
			cursor: not-allowed;
		}
	}
</style>
