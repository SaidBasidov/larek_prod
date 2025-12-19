import { defineConfig } from "vite";

export default defineConfig({
  base: "/larek_prod/",
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["./src/scss"],
      },
    },
  },
});
