export default {
  tab: {
    home: '首页',
    ipo: 'IPO',
    assets: '资产',
    news: '资讯',
    profile: '个人资料',
  },
  divider: {
    text: '没有更多'
  },
  empty: {
    text: '未搜到数据'
  },
  modal: {
    confirmText: '确认',
    cancelText: '取消',
  },
  home: {
    searchbar: {
      placeholder: '股票名称/代码'
    },
    tabs: {
      KSE: 'KSE',
      USS: 'US Stocks'
    },
    category: {
      OTC: 'OTC',
      blockTrade: 'Block trade',
      preMarket: 'Pre-market',
      creditLoan: 'Credit loan'
    },
    title: 'STOCK',
    more: '更多',
    mains: {
      symbol: 'Symbol',
      price: 'Price',
      chg: 'Chg'
    },
    OTC: {
      issuePrice: '发行价',
      minPurchaseQuantity: '最小购买数量',
      startTime: '开始时间',
      endTime: '截止时间',
      IPOTime: '上市日期',
      subscribe: '订阅',
      purchaseQuantity: '購買數量',
      amount: '金额',
      frozenAmount: '冻结资金',
      detail: {
        title: '订阅详情',
        confirm: '确认',
        confirmTitle: '申请大量交易？',
        confirmContent: '请确认你是否申请大量交易'
      }
    },
    market: {
      title: '行情',
      long: '开多',
      short: '开空',
      open: '开',
      last: '昨收',
      high: '高',
      low: '低',
      vol: 'Vol',
      TO: 'T/O',
      orderBook: '订单簿',
      priceVol: '价格量',
      orderBookKeys: {
        buy: '买盘',
        sale: '卖盘',
        buyCount: '数量({{unit}})',
        saleCount: '数量({{unit}})',
        unit: '张',
        price: '价格({{currency}})',
        currency: 'USDT'
      },
      priceVolKeys: {
        time: '时间',
        dealPrice: '成交价格({{currency}})',
        currency: 'USDT',
        dealVol: '数量({{unit}})',
        unit: '张',
      }
    },
    loan: {
      title: '贷款',
      historyText: '贷款记录',
      currency: '円',
      loanForm: {
        loanTerm: {
          label: '貸款期限',
          placeholder: '选择期限',
          require: '选择期限',
          termOption: '{{term}}天'
        },
        loanAmount: {
          label: '貸款金額',
          placeholder: '金額',
          require: '貸款金額'
        },
        loanAmountAvailable: {
          label: '可貸金額: {{amount}} {{currency}}'
        },
        loanRate: {
          label: '貸款比率',
        },
        totalLoanAmount: {
          label: '總貸款金額'
        },
        dailyInterestRate: {
          label: '日利率'
        },
        confirm: '确认'
      }
    },
    loanHistory: {
      title: '贷款记录',
      tabs: {
        reviewing: '审核中',
        reject: '拒绝',
        pending: '进行中',
        expired: '逾期',
        repaid: '已还款'
      },
      loanTerm: '贷款期限',
      createTime: '申请时间',
      loanTime: '放款时间'
    },
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
  },
} as const;
