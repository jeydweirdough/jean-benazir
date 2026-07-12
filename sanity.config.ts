import { buildLegacyTheme, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure, SINGLETON_TYPES } from "./sanity/structure";

// Mirrors the portfolio site's own look & feel (src/index.css) so the Studio
// doesn't feel like a disconnected admin tool bolted onto the brand.
const portfolioTheme = buildLegacyTheme({
  "--font-family-base": "'Poppins', sans-serif",
  "--font-family-monospace": "'Poppins', monospace",

  "--black": "#0A1931",
  "--white": "#ffffff",

  "--brand-primary": "#1A3D63",

  "--component-bg": "#ffffff",
  "--component-text-color": "#0A1931",

  "--main-navigation-color": "#1A3D63",
  "--main-navigation-color--inverted": "#ffffff",

  "--focus-color": "#4A7FA7",

  "--default-button-color": "#334155",
  "--default-button-primary-color": "#1A3D63",
  "--default-button-success-color": "#2f9e44",
  "--default-button-warning-color": "#e8590c",
  "--default-button-danger-color": "#e03131",

  "--state-info-color": "#4A7FA7",
  "--state-success-color": "#2f9e44",
  "--state-warning-color": "#e8590c",
  "--state-danger-color": "#e03131",

  "--gray-base": "#64748B",
  "--gray": "#64748B",
});

export default defineConfig({
  name: "default",
  title: "Jean Portfolio",

  projectId: "r21fiqjr",
  dataset: "production",

  basePath: "/admin",

  theme: portfolioTheme,

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Profile is a one-off document — keep it from being duplicated or
    // spawned again from the global "create new document" menu.
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => !SINGLETON_TYPES.includes(template.templateId));
      }
      return prev;
    },
    actions: (prev, context) =>
      SINGLETON_TYPES.includes(context.schemaType)
        ? prev.filter(({ action }) => action !== "duplicate")
        : prev,
  },
});
