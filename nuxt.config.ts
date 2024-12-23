/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-06 21:40:49
 */
import yaml from "@rollup/plugin-yaml";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-12-01",
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
      },
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    "~/assets/style/normalize.css",
    "~/assets/style/variable.css",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  plugins:[
    "~/xjie-config/xjie.config.g.ts"
  ],
  vite: {
    plugins: [
      yaml({ include: '**/*.yml' }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `
            @use "~/assets/scss/common/common.scss" as *;
            `
        },
      },
    },
    optimizeDeps: {
      include: ["dialog-polyfill"],
    },
  },
});
