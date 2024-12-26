import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const development = mode === 'development';
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      preact({
        prerender: {
          enabled: true,
          renderTarget: '#app',
          additionalPrerenderRoutes: ['/404'],
          previewMiddlewareEnabled: true,
          previewMiddlewareFallback: '/404',
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          relativeUrls: true,
          javascriptEnabled: true,
        },
      },
    },
    ...(development && {
      server: {
        proxy: {
          [env.VITE_API_PATH]: {
            target: env.VITE_PROXY_URL,
            changeOrigin: true,
            configure: (proxy, _options) => {
              proxy.on('error', (err, _req, _res) => {
                console.log('proxy error', err);
              });
              proxy.on('proxyReq', (proxyReq, req, _res) => {
                console.log('Sending Request to the Target:', req.method, proxyReq.host, req.url);
              });
              proxy.on('proxyRes', (proxyRes, req, _res) => {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              });
            },
          },
        },
      },
    }),
  };
});
