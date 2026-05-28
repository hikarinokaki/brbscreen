import { defineConfig } from "vite";

export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.png'],
  server: {
    cors: false
  },
  base: "/brbscreen",
});
