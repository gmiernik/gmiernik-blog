import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { remarkPlantUML } from './src/plugins/remark-plantuml.ts';

export default defineConfig({
  site: 'https://gmiernik-blog.pages.dev',
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'nl'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [remarkPlantUML],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
