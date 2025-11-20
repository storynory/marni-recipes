import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';



export default defineConfig({
    plugins:
    
        [
         
            sveltekit()
        ],
	css: {
		// Tell Vite to use LightningCSS instead of PostCSS
		transformer: 'lightningcss',
		lightningcss: {
			drafts: {
				customMedia: true, // @custom-media --mob …
				
			}
			// you can add `targets` here later if you want fine-grained prefixing
		}
	},
	build: {
        // Use LightningCSS as the CSS minifier too
        
		cssMinify: 'lightningcss'
	}
});
