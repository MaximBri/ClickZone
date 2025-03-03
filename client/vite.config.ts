import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import StylelintPlugin from 'vite-plugin-stylelint';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgoConfig: {
            multipass: true,
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                    convertColors: {
                      currentColor: true,
                    },
                  },
                },
              },
            ],
          },
        },
      }),
      StylelintPlugin({
        fix: true,
        cache: false,
        include: ['src/**/*.scss'],
      }),
    ],
    base: '/ClickZone/',
    build: {
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.log('proxy error', err);
            });

            proxy.on('proxyReq', (_proxyReq, req) => {
              console.log('Sending Request to:', req.url);
            });

            proxy.on('proxyRes', (_proxyRes, req) => {
              console.log('Received Response from:', req.url);
            });
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/app/styles/_variables.scss" as *;
            @use "@/app/styles/_mixins.scss" as *;
          `,
        },
      },
    },
  };
});
