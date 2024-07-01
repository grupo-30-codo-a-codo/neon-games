import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        about: resolve("src/pages/about.html"),
        cart: resolve("src/pages/cart.html"),
        contact: resolve("src/pages/contact.html"),
        products: resolve("src/pages/products.html"),
        dashboard: resolve("src/pages/dashboard.html"),
      },
    },
  },
});
