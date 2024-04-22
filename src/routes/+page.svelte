<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	/**
	 * @type {Array<{ link: String, url: String }>}
	 */
	let column1 = [];
	/**
	 * @type {Array<{ link: String, url: String }>}
	 */
	let column2 = [];
	/**
	 * @type {Array<{ link: String, url: String }>}
	 */
	let column3 = [];
	/**
	 * @type {Array<{ link: String, url: String }>}
	 */
	let column4 = [];

	let data = [];
	let total = '---';

	onMount(async () => {
		const res = await fetch('/_api/lightshot/getElements?number=50').then((res) => res.json());
		data = res.elements;
		total = res.totals;

		let elementSize = Math.floor(data.length / 4);
		column1 = data.slice(0, elementSize);
		column2 = data.slice(elementSize, elementSize * 2);
		column3 = data.slice(elementSize * 2, elementSize * 3);
		column4 = data.slice(elementSize * 3, elementSize * 4);
	});

	function getRandomHeight() {
		return Math.floor(Math.random() * 200) + 100;
	}

	function handleImageLoad(event) {
		event.target.style.height = 'auto';
	}
</script>

<div class="background"></div>

<div class="homepage">
	<div class="center">
		<h1>Find random screenshot in lightshot</h1>
		<p>
			Lightshot is a tool that allows you to take a screenshot of your screen and share it with a
			link. This is a collection of random screenshots taken by people around the world.
		</p>
		<button
			class="call-to-action"
			on:click={() => {
				goto('/generator');
			}}><i class="fa-solid fa-rocket"></i> Get random lightshot</button
		>
		<p>+ {total} collected</p>
	</div>
</div>

<div class="container">
	<div class="column number1">
		{#each column1 as element}
			<a href={element.url} target="_blank">
				<img
					src={'/_api/image?link=' + btoa(element.link)}
					alt="random screenshot"
					style="height: {getRandomHeight()}px;"
					on:load={handleImageLoad}
				/>
			</a>
		{/each}
	</div>
	<div class="column number2">
		{#each column2 as element}
			<a href={element.url} target="_blank">
				<img
					src={'/_api/image?link=' + btoa(element.link)}
					alt="random screenshot"
					style="height: {getRandomHeight()}px;"
					on:load={handleImageLoad}
				/>
			</a>
		{/each}
	</div>
	<div class="column number3">
		{#each column3 as element}
			<a href={element.url} target="_blank">
				<img
					src={'/_api/image?link=' + btoa(element.link)}
					alt="random screenshot"
					style="height: {getRandomHeight()}px;"
					on:load={handleImageLoad}
				/>
			</a>
		{/each}
	</div>
	<div class="column number4">
		{#each column4 as element}
			<a href={element.url} target="_blank">
				<img
					src={'/_api/image?link=' + btoa(element.link)}
					alt="random screenshot"
					style="height: {getRandomHeight()}px;"
					on:load={handleImageLoad}
				/>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.background {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: -1;
		background: radial-gradient(63.94% 63.94% at 50% 100%, rgb(var(--primary-300)) 0, white 100%);
	}

	.homepage {
		padding: 10rem 0;
		position: relative;

		.center {
			text-align: center;
			width: 90vw;
			margin: 0 auto;
			h1 {
				font-size: 4.5rem;
				font-weight: 500;
			}

			p {
				max-width: 730px;
				margin: 1.5rem auto 0 auto;
				color: rgb(var(--primary-600));
				font-weight: 400;
				text-wrap: balance;
			}

			.call-to-action {
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
	}

	.container {
		display: flex;
		justify-content: space-between;
		position: relative;
		gap: 1rem;
		width: 80vw;
		margin: 0 auto;

		.column {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			flex-basis: 0;
			flex-grow: 1;
			height: 100%;
			margin: 0;
			position: relative;
			top: 0;
			width: 15vw;
			box-sizing: border-box;

			a {
				img {
					border: 2px solid rgb(var(--primary-300));
					border-radius: 5px;
					transition: all 0.3s ease-in-out;
					width: 100%;
					height: auto;
					margin: 0;
					padding: 0;
					min-width: -webkit-fill-available;

					&:hover {
						border-color: rgb(var(--primary-500));
						scale: 1.03;
					}
				}
			}
		}
	}

	@media (max-width: 1000px) {
		.number4 {
			display: none !important;
		}
	}

	@media (max-width: 850px) {
		.number3 {
			display: none !important;
		}
	}

	@media (max-width: 750px) {
		.homepage {
			padding: 5rem 0;
			position: relative;

			.center {
				width: 98vw;
				h1 {
					font-size: 2.5rem !important;
					font-weight: 500;
				}
			}
		}
	}

	@media (max-width: 650px) {
		.number2 {
			display: none !important;
		}
	}
</style>
