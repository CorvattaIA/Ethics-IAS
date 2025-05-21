import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
const isProduction = mode === 'production';
 // const basePath = isProduction ? '/Ethics-IAS/' : '/';
const basePath = "/";
  return {
    base: basePath,
    define: {
      'import.meta.env.BASE_URL': JSON.stringify(basePath),
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Ethics IAS',
          short_name: 'EthicsIAS',
          description: 'Ethical AI Consulting Services',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
      compression({
        ext: '.gz',
        algorithm: 'gzip',
        threshold: 10240,
      }),
    ],
    build: {
      target: 'esnext',
      minify: isProduction ? 'terser' : false,
      sourcemap: !isProduction,
      cssCodeSplit: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1600,
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
        format: {
          comments: false,
        },
      } : {},
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            framer: ['framer-motion'],
            ui: ['clsx', 'tailwind-merge', 'tailwindcss-animate'],
            vendor: ['uuid', 'prop-types'],
          },
          chunkFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      open: true,
      host: true,
    },
    preview: {
      port: 4173,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer(),
        ],
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        '@radix-ui/react-dialog',
        '@radix-ui/react-toast',
        '@emotion/react',
        '@emotion/styled',
      ],
      esbuildOptions: {
        target: 'es2020',
      },
    },
  };
});
