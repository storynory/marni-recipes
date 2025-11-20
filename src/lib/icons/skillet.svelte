<svg
	class="skillet"
	
	height="48"
    width="48"
	viewBox="0 -960 960 960"
	
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	<path
		d="m178-560q5-38-3-65.5t-35-66.5q-26-38-34-70.5t-3-77.5h57q-5 37 3.5 64.5t36.5 66.5q26 37 33.5 70.5t1.5 78.5zm170 0q5-38-3-65.5t-35-66.5q-26-38-34-70.5t-3-77.5h57q-5 37 3 64.5t36 66.5q26 37 34 70.5t2 78.5zm170 0q5-38-3-65.5t-35-66.5q-26-38-34-70.5t-3-77.5h57q-5 37 3 64.5t36 66.5q26 37 34 70.5t2 78.5zm-318 400q-51 0-85.5-34.5t-34.5-85.5v-200h580q0-32 16-58.5t45-36.5l189-64 19 57-189 63q-11 4-15.5 15.5t-4.5 23.5v200q0 50-34.5 85t-85.5 35zm0-60h400q26 0 43-17.5t17-42.5v-140h-520v140q0 26 17 43t43 17z"
	/>
</svg>
<style>
    .skillet {
	display: inline-block;
    vertical-align: middle;
    position: relative;
  
	/* Make transforms behave nicely on SVG */
	transform-box: fill-box;
	transform-origin: 25% 65%; /* pivot roughly where the handle meets the pan */

	/* Intro “pop in” on page load */
	animation: skillet-sizzle 600ms ease-out 150ms both;
}

/* Fun wobble + subtle glow on hover / keyboard focus */
.skillet:hover,
.skillet:focus-visible {
	animation: skillet-sizzle 900ms ease-in-out infinite;
	filter: drop-shadow(0 0 6px rgba(0, 99, 78, 0.4));
	cursor: pointer;
}

/* Optional: softer colour shift on hover */
.skillet:hover path,
.skillet:focus-visible path {
	fill: #038a64;
}

/* Intro: pop up, overshoot a bit, then settle */
@keyframes skillet-intro {
	0% {
		opacity: 0;
		transform: translateY(18px) scale(0.7) rotate(-12deg);
	   
    }
	60% {
		opacity: 1;
		transform: translateY(-4px) scale(1.06) rotate(6deg);
	}
	100% {
		opacity: 1;
		transform: translateY(0) scale(1) rotate(0deg);
	}
}

/* Hover: little “sizzling wiggle” */
@keyframes skillet-sizzle {
	0%,
	100% {
		transform: rotate(-4deg) translateY(0);
        	filter: drop-shadow(0 0 6px rgba(0, 99, 78, 0.4));
	}
	25% {
		transform: rotate(3deg) translateY(-1px);
	}
	50% {
		transform: rotate(-2deg) translateY(1px);
	}
	75% {
		transform: rotate(2deg) translateY(-1px);
	}
    
}

/* Respect reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {
	.skillet {
		animation: none;
	}

	.skillet:hover,
	.skillet:focus-visible {
		animation: none;
		filter: none;
	}
}
 .skillet {
    fill:#333;
}

</style>