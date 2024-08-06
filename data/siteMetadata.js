/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'beyond the wired',
  author: 'wiru',
  headerTitle: 'wiru',
  description: 'In the end, everyone is connected.',
  language: 'en-us',
  theme: 'dark',
  siteUrl: 'https://williansfaria.com',
  siteRepo: 'https://github.com/wllfaria/williansfaria.com',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'offwiru@gmail.com',
  github: 'https://github.com/wllfaria',
  x: 'https://twitter.com/4wiru',
  locale: 'en-US',
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
