import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";

// Use environment variable to choose which app to serve
// Default to handle app for testing
const appFile = process.env.TEST_APP === "basic" ? "index.html" : "index-handle.html";

export default defineConfig({
    plugins: [
        svelte({
            compilerOptions: {
                compatibility: {
                    componentApi: 4
                }
            }
        })
    ],
    root: "tests/app",
    server: {
        port: 5173
    },
    build: {
        rollupOptions: {
            input: `tests/app/${appFile}`
        }
    }
});
