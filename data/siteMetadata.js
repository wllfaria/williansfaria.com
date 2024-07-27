/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'wiru',
  author: 'wiru',
  headerTitle: 'wiru',
  description: 'my silly puter place where I share deep nerdy things',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://williansfaria.com',
  siteRepo: 'https://github.com/wllfaria/williansfaria.com',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'offwiru@gmail.com',
  github: 'https://github.com/wllfaria',
  x: 'https://twitter.com/4wiru',
  locale: 'en-US',
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
  },
}

module.exports = siteMetadata
