import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import StylelintPlugin from 'vite-plugin-stylelint';

// https://vite.dev/config/
export default defineConfig({
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
});
