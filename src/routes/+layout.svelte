<script>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '../app.scss';
	import { goto } from '$app/navigation';
</script>

<div class="page">
	<header>
		<div>
			<div on:click={() => goto('/')}><img src="/icon.png" alt="favicon" /> Lightshot Lows</div>
		</div>
	</header>
	<slot />
</div>

<style lang="scss">
	.page {
		min-height: 100vh;

		header {
			> div {
				display: flex;
				align-items: center;
				color: rgb(var(--primary-800));
				font-size: 1.1rem;
				font-weight: 500;

				> div {
					display: flex;
					align-items: center;
					flex-grow: 1;
					padding: 1rem;
					cursor: pointer;

					align-items: center;

					img {
						width: 30px;
					}
				}
			}
		}
	}
</style>
