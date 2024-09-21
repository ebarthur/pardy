import { presetForms } from "@julr/unocss-preset-forms";
import {
	defineConfig,
	presetIcons,
	presetWind,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	content: {
		filesystem: [
			"app/**/*.{html,js,ts,jsx,tsx,astro}",
			"public/**/*.{html,js,ts,jsx,tsx,astro}",
		],
	},
	presets: [presetWind({ dark: "media" }), presetIcons(), presetForms()],
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
