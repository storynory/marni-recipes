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
  let font = data.settings.fontFamily;

	let prime = "#E3D2B7"; /* warm biscuit background */
	let clay = "#8C4B2E"; /* chestnut / clay */
  let accent = "#00634e"; 
	let light = "#F4E8D7"; /* soft cream */
  let text = "#333333" 
 </script>

<svelte:head>
	<link rel="icon" href={favicon} />
<style>
.bg-prime {
  background: --var(prime);
}
.bg-accent{
  background:--var(accent);
}
.bg-light {
  background:--var(light);
}
.bg-clay {
  background: --var(clay);
}
.txt-prime {
  background: --var(prime);
}
.txt-accent{
  background:--var(accent);
}
.txt-light {
  background:--var(light);
}
.txt-clay {
  background: --var(clay);
}

@font-face {
  font-family: 'Baloo 2';
  src: url('/fonts/Baloo2/Baloo2-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Comfortaa';
  src: url('/fonts/Comfortaa/Comfortaa-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/Fraunces/Fraunces-latin-basic.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Quicksand';
  src: url('/fonts/Quicksand/Quicksand-Bold-latin.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Varela Round';
  src: url('/fonts/VarelaRound/VarelaRound-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}



@font-face {
  font-family: "Delius";
  src: url("/fonts/Delius/Delius-Regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 600;          /* important for consistent matching */
  font-display: swap;        /* or `optional` – see below */
  unicode-range: U+0000-00FF;
}


h1,
h2,
h3,
h4,
.h1,
.brand-font {
  color: var(--text);
  font-family: var(--font), sans-serif;
}
a,
a:hover,  
.brand-font {
  color:var(--text);
}

body {
  color: var(--text);
  background: var(--light); 
}

.brd-tp {
border-top: 1px solid var(accent)
}

.brd-bottom {
  border-bottom: 1px solid var(accent);
}



  </style>
i</svelte:head>
<div  style ="
  --font:{font}; 
  --prime:{prime};
  --accent:{accent};
  --light:{light};
  --clay:{clay};
  --text:{text};
  "
   >
<Header />
 
 <div class="page">
           <main class="bg-light">
                {@render children()}
             </main>
 </div>
</div>
<Footer></Footer>


