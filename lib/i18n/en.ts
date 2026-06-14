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
      username: {
        required: 'Account cannot be empty',
        invalid: 'Please enter a valid email or phone number',
        placeholder: 'Please enter your phone number or email',
      },
      password: {
        required: 'Password cannot be empty',
        placeholder: 'Please enter your password',
      },
    }
  }
} as const;
