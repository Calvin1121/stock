export default {
  tab: {
    home: '首页',
    ipo: 'IPO',
    assets: '资产',
    news: '资讯',
    profile: '个人资料',
  },
  home: {
    title: '首页',
    marketOpen: '开市',
    marketClose: '收市',
    myPortfolio: '我的持仓',
  },
  ipo: {
    title: 'IPO',
    upcoming: '即将上市',
    history: '历史记录',
    subscribe: '申购',
  },
  assets: {
    title: '资产',
    totalAssets: '总资产',
    dailyReturn: '日收益',
    holdings: '持仓',
  },
  news: {
    title: '资讯',
    latest: '最新',
    recommended: '推荐',
    search: '搜索',
  },
  profile: {
    title: '个人资料',
    settings: '设置',
    about: '关于',
  },
  auth: {
    lang: {
      select: '切换语言',
      en: 'English',
      zh: '中文',
      cancel: '取消',
    },
    login: {
      accountPlaceholder: '请输入手机号或电子邮箱',
      passwordPlaceholder: '请输入密码',
      accountRequired: '账号不能为空',
      passwordRequired: '密码不能为空',
    }
  }
} as const;
