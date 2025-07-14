import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// Read package.json for library name
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        // Ensure compatibility with Svelte 3, 4, and 5
        compatibility: {
          componentApi: 4
        }
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'SvelteDndAction',
      // Generate both ES and UMD builds
      formats: ['es', 'umd'],
      fileName: (format) => format === 'es' ? 'index.mjs' : 'index.js'
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ['svelte', 'svelte/internal', 'svelte/store'],
      output: {
        // Global variables for UMD build
        globals: {
          svelte: 'Svelte',
          'svelte/internal': 'SvelteInternal',
          'svelte/store': 'SvelteStore'
        }
      }
    },
    // Ensure source maps are generated
    sourcemap: true,
    // Output directory
    outDir: 'dist',
    // Empty the output directory before building
    emptyOutDir: true
  }
});