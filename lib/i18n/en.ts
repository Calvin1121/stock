export default {
  tab: {
    home: 'Home',
    ipo: 'IPO',
    assets: 'Assets',
    news: 'News',
    profile: 'Profile',
  },
  home: {
    title: 'Home',
    marketOpen: 'Market Open',
    marketClose: 'Market Close',
    myPortfolio: 'My Portfolio',
  },
  ipo: {
    title: 'IPO',
    upcoming: 'Upcoming',
    history: 'History',
    subscribe: 'Subscribe',
  },
  assets: {
    title: 'Assets',
    totalAssets: 'Total Assets',
    dailyReturn: 'Daily Return',
    holdings: 'Holdings',
  },
  news: {
    title: 'News',
    latest: 'Latest',
    recommended: 'Recommended',
    search: 'Search',
  },
  profile: {
    title: 'Profile',
    settings: 'Settings',
    about: 'About',
  },
  auth: {
    lang: {
      select: 'Switch Language',
      en: 'English',
      zh: '中文',
      cancel: 'Cancel',
    },
    login: {
      accountPlaceholder: 'Please enter your phone number or email',
      passwordPlaceholder: 'Please enter your password',
      accountRequired: 'Account cannot be empty',
      passwordRequired: 'Password cannot be empty',
    }
  }
} as const;
