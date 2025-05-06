// tailwind.config.js
const colors = require("tailwindcss/colors");

module.exports = {
	theme: {
		extend: {
			colors: {
				gunmetal: {
					100: "#dce1e3",
					200: "#b8c4c7",
					300: "#94a7ab",
					400: "#708a8f",
					500: "#4c6d73", // midpoint
					600: "#3d585c",
					700: "#2e4346",
					800: "#1f3036", // original
					900: "#141f22",
				},
				charcoal: {
					100: "#dbe2e4",
					200: "#b6c4c9",
					300: "#90a7ae",
					400: "#6b8993",
					500: "#456b78", // midpoint
					600: "#375760",
					700: "#294348",
					800: "#1b2e30",
					900: "#0d1a18",
				},
				cadet: {
					100: "#f1f3f2",
					200: "#dde2e0",
					300: "#c9d1cd",
					400: "#b5c0ba",
					500: "#a1afA8",
					600: "#8e9a96", // original
					700: "#737d7a",
					800: "#585f5d",
					900: "#3d4240",
				},
				eggshell: {
					100: "#fdfbf6",
					200: "#fbf8ef",
					300: "#f8f5e7",
					400: "#f5f1e0",
					500: "#f3edd9",
					600: "#f2ebd9", // original
					700: "#e3dccb",
					800: "#c9c3b4",
					900: "#afaa9d",
				},
				columbia: {
					100: "#f6f9fa",
					200: "#ecf3f5",
					300: "#e1edf0",
					400: "#d7e7eb",
					500: "#cde1e6",
					600: "#cedde2", // original
					700: "#b2c1c5",
					800: "#96a5a9",
					900: "#7a898c",
				},
			},
		},
	},
};
