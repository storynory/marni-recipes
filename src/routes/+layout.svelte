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
<style>

@font-face {
  font-family: "Delius";
  src: url("/fonts/Delius/Delius:-Regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 600;          /* important for consistent matching */
  font-display: fallback;        /* or `optional` – see below */
  unicode-range: U+0000-00FF;
}


@font-face {
  font-family: "Fraunces";
  src: url("/fonts/Fraunces/Fraunces-latin-basic.woff2") format("woff2");
  font-style: normal;
  font-weight: 600;          /* important for consistent matching */
  font-display: fallback;        /* or `optional` – see below */
  unicode-range: U+0000-00FF;
}

@font-face {
  font-family: "Quicksand";
  src: url("/fonts/Quicksand/Quicksand-Bold.woff2") format("woff2");
  font-style: normal;
  font-weight: 600;          /* important for consistent matching */
  font-display: fallback;        /* or `optional` – see below */
  unicode-range: U+0000-00FF;
}
 


h1,
h2,
h3,
h4,
.h1,
.brand-font {
  font-family:"{data.settings.fontFamily}, sans-serif";
}


</style>
</svelte:head>

<Header />
 
 <div class="page">
           <main class="bg-light">
                {@render children()}

             </main>


    </div>
<Footer></Footer>


