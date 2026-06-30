export default {
  lang: {
    zh: '简体中文',
    zh_TW: '繁体中文',
    en: 'English',
    en_UK: '繁体中文',
    jp: '日本語',
    sp: 'Spanish',
  },
  uploadPhoto: {
    title: '选择方式',
    options: {
      gallery: '相册',
      takePhoto: '拍照'
    }
  },
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
      },
      history: {
        title: 'OTC记录',
        tabs: {
          subscribed: 'Subscribed',
          inProgress: 'In progress',
          IPOSuccessful: 'IPO successful'
        },
      },
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
      signature: {
        title: '签名',
        cancel: '取消',
        confirm: '确认',
        openmore: '多开',
        tnc1: 'Confirmation and Acceptance of Agreement.These Terms and Conditions govern the terms and conditionsof use between the user of the stock trading platform service(hereinafter referred to as "the Service") and Lampert CapitalMarkets (hereinafter referred to as "the Company").By clicking the "Agree" button during the registration process,the user is deemed to have agreed to all the terms and conditions of these Terms and Conditions.',
        tnc2: 'Amendment of Agreement \n The Company reserves the right to revise these Terms and Conditions from time to time as needed. The revised terms and conditions will become effective immediately uponpublication.If the user does not agree to the revised terms and conditions,the user must immediately cease using the Service.',
      },
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
      },
      history: {
        title: '贷款记录',
        tabs: {
          reviewing: '审核中',
          reject: '拒绝',
          inProgress: '进行中',
          expired: '逾期',
          repaid: '已还款'
        },
        loanTerm: '贷款期限',
        createTime: '申请时间',
        loanTime: '放款时间'
      },
      detail: {
        title: '贷款详情',
        repay: '还款',
        status: '状态',
        loanNo: '贷款编号',
        loanAmount: '贷款金额',
        loanTerm: '贷款期限',
        loanRate: '贷款比率',
        dailyInterestRate: '日利率',
        loanTime: '放款时间'
      }
    },
    blockTrade: {
      title: 'Block Trade',
      subscribeBtn: '订阅',
      tabs: {
        subscribed: 'Subscribed',
        inProgress: 'In progress',
        IPOSuccessful: 'IPO successful'
      },
      marketPrice: '市场价格（{{priceUnit}}）',
      priceDiff: '价格差（{{priceUnit}}）',
      publishPrice: '发行价 ({{priceUnit}})',
      priceUnit: 'NGN',
      discountRate: '折扣率',
      buyCount: '总认购数',
      buyTime: '认购日期',
      subscribe: {
        title: '订阅详情',
        submit: '提交',
        openDate: '开盘日期',
        closeDate: '收盘日期',
        matchDate: '配股日期',
        IPODate: '上市日期',
        IPOPrice: '发行价格',
        currency: 'NGN',
        stockCount: '分配股数',
        confirmPrice: '最终要约价格'
      }
    },
  },
  ipo: {
    title: 'IPO',
    publishPrice: '发行价',
    currency: 'USD',
    deadline: '截止日期',
    dayRest: '<0>{{day}}</0> day left',
    daysRest: '<0>{{day}}</0> days left',
    progress: '进度',
    subscribeBtn: '订阅',
    subscribe: {
      title: 'IPO申购',
      confirm: '确认',
      publishPrice: '发行价',
      deadline: '截止日期',
      buyCount: '購買數量',
      amount: '金额',
      frozenAmount: '冻结资金'
    },
    history: {
      title: '首次公開發行歷史',
      tabs: {
        all: 'ALL',
        submitted: 'Submitted',
        winner: 'Winner',
        No: 'No',
        canceled: 'Canceled',
        paid: 'Paid'
      }
    },
    historyDetail: {
      title: '详情',
      newStockPrice: '新股价格',
      count: '数量',
      subscribeTime: '订阅日期',
      startTime: '起始时间',
      endTime: '截止日期',
      IPOTime: '上市日期',
      selectedPrice: '中签价格',
      selectedCount: '中签数量',
      payAmount: '需支付的价格',
      paidAmount: '已支付金额',
      payingAmount: '剩余待支付金额'
    }
  },
  assets: {
    title: '交易',
    expectTotalAssets: '预计总资产（{{currency}}）',
    currency: '₦',
    dailyReturn: '每日增益',
    stockTotalAssets: '股票總價值',
    enteringAssets: '待入账',
    historicalIncome: '歷史收益',
    cashBalance: '現金餘額',
    frozenAmount: '凍結資金',
    pendingSubscription: '待處理訂閱',
    tabs: {
      recharge: '充值',
      withdraw: '提现',
      exchange: '兑换',
      records: '历史记录'
    },
    holdingStocks: '我的持股',
    orders: '訂單',
    holdingStocksTabs: {
      symbolAndName: '符号/名称',
      priceAndQuantity: '價值/數量',
      currentPriceAndCost: '現價/成本',
      profitAndLoss: '損益'
    },
    ordersTabs: {
      symbolAndName: '符号/名称',
      tradeType: '方向',
      priceAndQuantity: '數量/價值',
      profitAndLoss: '盈亏'
    },
    tradeType: {
      buy: '买入',
      sell: '卖出'
    },
    withdraw: {
      title: '提现',
      withdrawBtn: '提现',
      incomeAmount: '到账数量',
      availableAmount: '可用 {{anount}} {{currency}}',
      selectCurrency: {
        label: '选择币种'
      },
      withdrawAddress: {
        label: '提币地址',
        placeholder: '输入或长按粘贴地址'
      },
      quantity: {
        all: '全部',
        label: '数量',
        placeholder: '最小提币数量 200'
      },
      tips: '最小提币数量为：100 ETH （OMNI)。\n为保障资金安全，我们会对提币进行人工审核，请耐心等待工作人员联系。\n请务必确认电脑及浏览器安全，防止信息被篡改或泄露。',
      records: {
        title: '提现记录',
        success: '成功',
        confirming: '区块确认中',
        reviewing: '审核中',
        error: '失败'
      },
      record: {
        title: '提现记录',
        type: '类型',
        status: '状态',
        withdrawAddress: '提币地址',
        blockchainTradeId: '区块链交易ID',
        time: '时间',
        errorReason: '失败原因'
      }
    },
    exchange: {
      title: '兑换',
      rate: '汇率',
      selectCurrency: '选择币种',
      quantity: '兑换數量',
      availableCount: '可兑换 ≈ {{count}}',
      address: '充币地址',
      tips: '您充值至上述地址后，需要整个网络节点的确认，12次网确认后到帐，12次网络确认后可到账。\n最小充值金额：1 USDT, 小于最小充值额的充值将不会上帐且无法退回。\n您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。\n请务必确认电脑及浏览器安全，防止信息被篡改或泄露。',
      copytAddress: '复制地址',
      saveQrcode: '保存二维码',
      grantAccess: {
        title: '权限未开启',
        content: '请在系统设置中允许访问您的相册，否则无法使用此功能。',
        enable: '去开启'
      },
      saveQrcodeToast: {
        title: '提示',
        successContent: '保存成功，请前往相册查看。',
        errorContent: '保存失败，请稍后重试。'
      },
      records: {
        title: '兑换记录',
        success: '成功',
      },
      record: {
        title: '兑换详情',
        type: '类型',
        currencyOrigin: '源货币',
        topupAddress: '充值地址',
        time: '时间'
      }
    },
    records: {
      title: '历史记录',
      tabs: {
        trade: '交易',
        recharge: '充值',
        withdraw: '提现',
      },
      filters: {
        all: '全部',
        commissionEntrustingSales: '委托卖出佣金',
        IPOTransactionIncome: 'IPO交易入账',
        IPOTransactionSubscription: 'OTC交易订阅',
        commissionSales: '委托卖出',
        frozen: '冻结',
        fee: '手续费'
      }
    },
    record: {
      title: '账单详情',
      type: '类型',
      status: '状态',
      withdrawAddress: '提币地址',
      fee: '手续费',
      blockchainTradeId: '区块链交易ID',
      time: '时间',
      stockName: '股票名称',
      quantity: '数量',
      price: '价值'
    }
  },
  news: {
    title: '新闻',
    detial: {
      title: '新闻详情'
    }
  },
  profile: {
    verification: '身份验证',
    pwd: '密码',
    lang: '语言',
    logout: '登出',
    links: {
      aboutUs: '关于我们',
      service: '服务'
    },
    aboutUs: {
      links: {
        companyInfo: '公司简介',
        tnc: '服务条款',
        privacy: '隐私政策',
        security: '安全性'
      }
    },
    changePWD: {
      title: '修改登录密码',
      confirmBtn: '确认修改',
      oldPassword: {
        placeholder: '请输入原登录密码',
        required: '请输入原登录密码',
      },
      newPassword: {
        placeholder: '请输入新登录密码(8-20位，字母与数字组合)',
        required: '请输入新登录密码',
        invalid: '密码不符合要求'
      },
      confirmPassword: {
        placeholder: '请再次输入新密码',
        required: '请再次输入新密码',
        invalid: '确认密码与登录密码不一致'
      }
    },
    verifications: {
      title: '身份验证',
      confirmBtn: '提交',
      baseInfo: {
        title: '基本信息采集',
        tips: '为了您的资金安全，需验证您的身份才可以进行其他操作；认证信息一经认证不能修改，请务必如实填写',
        realName: {
          placeholder: '请输入真实姓名',
          required: '请输入真实姓名'
        },
        idNo: {
          placeholder: '请输入身份证号',
          required: '请输入身份证号',
        }
      },
      identifyInfo: {
        title: '上传您的身份证正反面照片',
        topSide: {
          title: '正面',
          required: '上传您的身份证正面照片'
        },
        btmSide: {
          title: '反面',
          required: '上传您的身份证反面照片'
        }
      }
    },
    services: {
      title: '在线客服'
    }
  },
  auth: {
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
        placeholder: '登录密码(8-20位,包含字母与数字)',
        invalid: '密码不符合要求'
      },
      confirmPassword: {
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
        placeholder: '登录密码(8-20位,包含字母与数字)',
        invalid: '密码不符合要求'
      },
      confirmPassword: {
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
