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
    login: {
      accountPlaceholder: '请输入手机号或电子邮箱',
      passwordPlaceholder: '请输入密码',
      accountRequired: '账号不能为空',
      passwordRequired: '密码不能为空',
    }
  }
} as const;
