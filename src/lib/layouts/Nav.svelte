<script lang="ts">
	import { page } from '$app/state';
	let isMenuOpen = $state(false);
	let mobileMenu: HTMLDivElement;

	const handleScroll = () => {
		if (window.scrollY > 50) {
			scrolled = true;
		} else {
			scrolled = false;
		}
	};

	function toggleMenu(event: MouseEvent) {
		event.stopPropagation();
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (isMenuOpen && mobileMenu && !mobileMenu.contains(event.target as Node)) {
			closeMenu();
		}
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && isMenuOpen) {
			closeMenu();
		}
	}

	let scrolled = $state(false);
	const activeLi = (path: string) => (path === page.url.pathname ? 'font-bold' : 'hover:font-bold');
</script>

<nav
	class={`fixed top-0 z-50 flex w-full items-center justify-between px-8 md:px-32 text-white transition-all duration-300 ${scrolled ? 'bg-primary-700 py-4 shadow-lg' : 'py-8'}`}
>
	<div>
		<a href="/" class="transition-transform duration-300 hover:scale-105">
			<h3>😊 Wisnu Pramoedya</h3>
		</a>
	</div>

	<!-- Desktop Navigation -->
	<ul class="hidden md:flex items-center gap-16">
		<li class={`${activeLi('/')} transition-all duration-300 hover:text-white/90`}>
			<a href="/">Home</a>
		</li>
		<li class={`${activeLi('/blogs')} transition-all duration-300 hover:text-white/90`}>
			<a href="/blogs">Blogs</a>
		</li>
	</ul>

	<!-- Mobile Navigation -->
	<!-- Mobile Hamburger -->
	<button
		class="md:hidden z-60 relative w-6 h-6 flex flex-col justify-center items-center"
		onclick={toggleMenu}
		aria-label="Toggle menu"
	>
		<span
			class={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}
		></span>
		<span
			class={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
		></span>
		<span
			class={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}
		></span>
	</button>

	<!-- Mobile Menu Overlay -->
	{#if isMenuOpen}
		<div
			class="fixed inset-0 bg-black/50 z-40 md:hidden"
			onclick={closeMenu}
			onkeydown={handleKeydown}
			role="button"
			tabindex="0"
		></div>
	{/if}

	<!-- Mobile Menu Overlay -->
	<div
		bind:this={mobileMenu}
		class={`fixed top-0 right-0 h-full w-64 bg-primary-700 z-50 transform transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
	>
		<div class="flex flex-col pt-24 px-8">
			<a
				href="/"
				class={`${activeLi('/')} py-4 text-lg transition-all duration-300 hover:text-white/90`}
				onclick={closeMenu}
			>
				Home
			</a>
			<a
				href="/blogs"
				class={`${activeLi('/blogs')} py-4 text-lg transition-all duration-300 hover:text-white/90`}
				onclick={closeMenu}
			>
				Blogs
			</a>
		</div>
	</div>
</nav>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} onscroll={handleScroll} />
