import { defineConfig } from "vite";

//export default defineConfig({
//  server: {
//    cors: {
//      origin: [
//        // Allow specific origins
//        "http://localhost", // Example origin
//        "https://yourdomain.com"  // Add your production domain
//      ]
//    }
//  }
//});

export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.png'],
  server: {
    cors: false
  }
});
