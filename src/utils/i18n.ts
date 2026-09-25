export const ui = {
  pl: {
    'nav.home': 'Strona Główna',
    'nav.blog': 'Artykuły',
    'nav.tags': 'Tagi',
    'nav.about': 'O mnie',
    'search.placeholder': 'Szukaj artykułów...',
    'blog.readTime': 'min czytania',
    'blog.tags': 'Tagi',
    'blog.publishedOn': 'Opublikowano',
    'footer.rights': 'Wszelkie prawa zastrzeżone.',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Articles',
    'nav.tags': 'Tags',
    'nav.about': 'About',
    'search.placeholder': 'Search articles...',
    'blog.readTime': 'min read',
    'blog.tags': 'Tags',
    'blog.publishedOn': 'Published on',
    'footer.rights': 'All rights reserved.',
  },
  nl: {
    'nav.home': 'Home',
    'nav.blog': 'Artikelen',
    'nav.tags': 'Tags',
    'nav.about': 'Over mij',
    'search.placeholder': 'Zoek artikelen...',
    'blog.readTime': 'min leestijd',
    'blog.tags': 'Tags',
    'blog.publishedOn': 'Gepubliceerd op',
    'footer.rights': 'Alle rechten voorbehouden.',
  },
} as const;

export const defaultLang = 'pl';

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
