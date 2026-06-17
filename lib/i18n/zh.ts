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
      username: {
        required: '账号不能为空',
        invalid: '请输入有效的邮箱或手机号',
        placeholder: '请输入手机号或电子邮箱',
      },
      password: {
        required: '密码不能为空',
        placeholder: '请输入密码',
      },
      button: '登录',
      register: '注册',
      forgotPwd: '忘记密码'
    },
    register: {
      title: '注册',
      phone: '手机号注册',
      email: '邮箱注册',
      invitationCode: {
        placeholder: '请输入6位邀请码（选填）'
      },
      password: {
        require: '请输入登录密码',
        placeholder: '登录密码（8-20位，包含字母与数字）',
        invalid: '密码不符合要求'
      },
      comfirmPassword: {
        require: '请输入确认登录密码',
        placeholder: '确认登录密码',
        invalid: '确认密码与登录密码不一致'
      },
      tncAgreement: '我已阅读并接受',
      tnc: '《用户服务协议》',
      hasAccount: '已有账号？',
      login: '登录',
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
        getVerifyCode: '获取验证码',
      },
      emailType: {
        require: '请输入电子邮箱',
        placeholder: '请输入电子邮箱',
        invalid: '邮箱号格式错误',
        wasTaken: '此邮箱已被使用'
      },
      success: {
        info: '恭喜，您已注册成功！',
        button: '返回登陆'

      },
      fail: {
        info: '抱歉，注册失败',
        button: '返回'
      }
    },
    countryCode: {
      title: '选择国家地区'
    },
    forgot: {
      title: '找回密码',
      confimr: '确认',
      username: {
        require: '请输入手机号/邮箱/UID',
        placeholder: '请输入手机号/邮箱/UID',
        // invalid: '请输入有效的邮箱或手机号',
      },
      verifyCode: {
        require: '请输入验证码',
        placeholder: '请输入验证码',
        invalid: '请输入6位验证码',
        getVerifyCode: '获取验证码',
      },
      password: {
        require: '请输入登录密码',
        placeholder: '登录密码（8-20位，包含字母与数字）',
        invalid: '密码不符合要求'
      },
      comfirmPassword: {
        require: '请输入确认登录密码',
        placeholder: '确认登录密码',
        invalid: '确认密码与登录密码不一致'
      },
      success: {
        info: '恭喜，密码已经重置成功！',
        button: '返回登陆'
      }
    }
  }
} as const;
