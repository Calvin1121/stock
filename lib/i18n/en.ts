export default {
  tab: {
    home: 'Home',
    ipo: 'IPO',
    assets: 'Assets',
    news: 'News',
    profile: 'Profile'
  },
  home: {
    searchbar: {
      placeholder: 'Stock name / code'
    },
    tabs: {
      KSE: '',
      USS: ''
    },
    KSE: {
      tabs: {
        OTC: '',
        blockTrade: '',
        preMarket: '',
        creditLoan: '',
        BlockTrade: '',
        PreMarket: '',
        CreditLoan: ''
      },
      title: '',
      more: '',
      main: {
        symbol: '',
        price: '',
        chg: ''
      },
      mains: {
        symbol: '',
        price: '',
        chg: ''
      }
    }
  },
  ipo: {
    title: 'IPO',
    upcoming: 'Upcoming',
    history: 'History',
    subscribe: 'Subscribe'
  },
  assets: {
    title: 'Assets',
    totalAssets: 'Total Assets',
    dailyReturn: 'Daily Return',
    holdings: 'Holdings'
  },
  news: {
    title: 'News',
    latest: 'Latest',
    recommended: 'Recommended',
    search: 'Search'
  },
  profile: {
    title: 'Profile',
    settings: 'Settings',
    about: 'About'
  },
  auth: {
    lang: {
      select: 'Switch Language',
      en: 'English',
      zh: '中文',
      cancel: 'Cancel'
    },
    login: {
      username: {
        required: 'Account cannot be empty',
        invalid: 'Please enter a valid email or phone number',
        placeholder: 'Please enter your phone number or email'
      },
      password: {
        required: 'Password cannot be empty',
        placeholder: 'Please enter your password'
      },
      button: 'Login',
      register: 'Register',
      forgotPwd: 'Forgot password'
    },
    register: {
      phone: 'Phone',
      email: 'Email',
      invitationCode: {
        placeholder: '请输入6位邀请码（选填）'
      },
      password: {
        require: '请输入登录密码',
        placeholder: 'Password（8-20位，包含字母与数字）',
        invalid: '密码不符合要求'
      },
      comfirmPassword: {
        require: '请确认登录密码',
        placeholder: '确认登录密码',
        invalid: '确认密码与登录密码不一致'
      },
      tncAgreement: '我已阅读并接受',
      tnc: '《用户服务协议》',
      hasAccount: '已有账号？',
      phoneType: {
        require: '请输入手机号',
        placeholder: '请输入手机号',
        invalid: '手机号格式错误',
        wasTaken: '此号码已被使用'
      },
      verifyCode: {
        require: '请输入验证码',
        placeholder: '请输入验证码',
        invalid: '请输入6位验证码',
        getVerifyCode: '获取验证码'
      },
      emailType: {
        require: '请输入电子邮箱',
        placeholder: '请输入电子邮箱',
        invalid: '邮箱号格式错误',
        wasTaken: '此邮箱已被使用'
      },
      countryCode: {
        title: ''
      },
      login: '',
      title: '',
      success: {
        info: '',
        button: ''
      },
      fail: {
        info: '',
        button: ''
      }
    },
    countryCode: {
      title: ''
    },
    forgot: {
      title: '',
      username: {
        require: '',
        placeholder: ''
      },
      verifyCode: {
        require: '',
        placeholder: '',
        invalid: '',
        getVerifyCode: ''
      },
      password: {
        require: '',
        placeholder: '',
        invalid: ''
      },
      comfirmPassword: {
        require: '',
        placeholder: '',
        invalid: ''
      },
      success: {
        info: '',
        button: ''
      },
      confimr: ''
    }
  }
} as const;
