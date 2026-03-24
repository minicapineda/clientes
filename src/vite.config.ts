import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "mfe_clientes",
            filename: "remoteEntry.js",
            exposes: {
              
                "./ListClients": "./src/features/panel/pages/ListClients/index.tsx",
            },
           
            shared: [
                "react", 
                "react-dom", 
                "react-router-dom", 
                "@mui/material", 
                "@emotion/react", 
                "@emotion/styled", 
                "@mui/x-data-grid"
            ],
        }),
    ],
    resolve: {
        alias: {
            src: "/app/src",
        },
    },
    server: {
        port: 5171,
        host: "0.0.0.0",
        strictPort: true,
        watch: {
            usePolling: true,
        },
    },
    preview: {
        port: 5171,
        host: "0.0.0.0",
        strictPort: true,
    },
    build: {
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
		manifest: true,
        modulePreload: false,
        assetsInlineLimit: 0,
        rollupOptions: {
            output: {
                format: "esm",
                entryFileNames: "assets/[name].js",
                chunkFileNames: "assets/[name].js",
                assetFileNames: "assets/[name].[ext]",
            },
        },
    },
});