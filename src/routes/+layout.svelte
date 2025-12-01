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
    const defaultColours = {
	prime: "#e3d2b7",
	accent: "#00634e",
	second: "#f4e8d7",
	gray: "#f8f9fa",
	text: "#333333"
};
let colors = data.settings.activeColourScheme ?? defaultColours;
 // let colors =  defaultColours;
  let prime = colors.prime; /* warm biscuit background */
  let accent = colors.accent; 
	let light = colors.second; /*soft cream */
  let text = colors.text;
 </script>

<svelte:head>
	<link rel="icon" href={favicon} />
<style>


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

.bg-prime {
  background-color: var(--prime);
}
.bg-accent {
  background-color: var(--accent);
}


.bg-white,.bg-light {
  background-color: var(--light);
}

.txt-prime {
  color: var(--prime);
}

.txt-accent {
  color: var(--accent);
}

.txt-white, txt-light {
  color: var(--accent);
}

body {
  color: var(--text);
}


h1,
h2,
h3,
h4,
.h1,
.brand-font {
  font-family: var(--font), sans-serif;
}

a,
a:hover  {
  color:var(--accent);
}


.brd-tp {
border-top: 1px solid var(--accent)
}

.brd-bottom {
  border-bottom: 1px solid var(--accent);
}

.card {
  border: 1px solid var(--accent);
}
  </style>
</svelte:head>
<div  class="bg-light" style ="
  --font:{font}; 
  --prime:{prime};
  --accent:{accent};
  --light:{light};
  --text:{text};

    --gray-light: #f8f9fa;
    --nav-cake: #b3433b;
    --nav-breakfast: #a86a10;
    --nav-lunch: #4c6b3c;
    --nav-dinner: #5b3b73;
    --nav-dessert: #c25b1a; 
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


