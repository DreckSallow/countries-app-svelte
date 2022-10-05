<div class="min-w-full w-full h-full flex items-center justify-center">
	<section class="p-6 text-3xl flex flex-col justify-between ">
		<div class="mb-10 break-all w-96">
			<header class="text-blue-400 font-semibold text-center mb-4">
				<h3 class="text-6xl mb-2">404</h3>
				<span class="mt-2 text-white text-xl">PAGE NOT FOUND!</span>
			</header>
			<p class="text-base mt-3 text-justify break-all">
				The page you request was not found. Please make sure the URL is correct. You do not know
				what to do?. Don't worry, you can go back or go to the home
			</p>
		</div>
		<div class="text-sm flex flex-row gap-10 mb-2 justify-center">
			<button
				class="rounded py-2 px-4 bg-blue-400"
				on:click={() => {
					window.history.back();
				}}>Go back</button
			>
			<a href="/" class="rounded py-2 px-4 bg-blue-400">Home</a>
		</div>
	</section>
</div>
