<script lang="ts">
    // website/src/routes/+layout.svelte
	import favicon from '$lib/assets/favicon.svg';
  import { setContext } from 'svelte';
import '../app.css';
	let { children,data } = $props();
    import Header from "$lib/components/header/header.svelte"
     import Footer from "$lib/components/footer.svelte"

	// Make settings available to all child components
	setContext('siteSettings', data.settings);



</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
 
 <div class="page">
           <main class="bg-light">
                {@render children()}

             </main>


    </div>
<Footer></Footer>
