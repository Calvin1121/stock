export default {
  lang: {
    zh: '简体中文',
    zh_TW: '繁体中文',
    en: 'English',
    en_UK: '繁体中文',
    jp: '日本語',
    sp: 'Spanish'
  },
  uploadPhoto: {
    title: '选择方式',
    options: {
      gallery: '相册',
      takePhoto: '拍照'
    },
    errors: {
      canceled: '取消上传',
      unselected: '未选择图片',
      unknown: '未知错误'
    }
  },
  tab: {
    home: 'Home',
    ipo: 'IPO',
    assets: 'Assets',
    news: 'News',
    profile: 'Profile'
  },
  divider: {
    text: '没有更多'
  },
  empty: {
    text: ''
  },
  modal: {
    confirmText: '',
    cancelText: ''
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
      purchaseQuantity: '',
      amount: '',
      frozenAmount: '',
      detail: {
        title: '',
        confirm: '',
        confirmTitle: '',
        confirmContent: ''
      },
      history: {
        title: '',
        tabs: {
          subscribed: '',
          inProgress: '',
          IPOSuccessful: ''
        }
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
      orderBook: '',
      priceVol: '',
      orderBookKeys: {
        buy: '',
        sale: '',
        buyCount: '',
        saleCount: '',
        unit: '',
        price: '',
        currency: ''
      },
      priceVolKeys: {
        time: '',
        dealPrice: '',
        currency: '',
        dealVol: '',
        unit: ''
      }
    },
    loan: {
      title: '',
      historyText: '',
      currency: '',
      signature: {
        title: '',
        cancel: '',
        confirm: '',
        openmore: '',
        tnc1: '',
        tnc2: ''
      },
      loanForm: {
        loanTerm: {
          label: '',
          placeholder: '',
          require: '',
          termOption: ''
        },
        loanAmount: {
          label: '',
          placeholder: '',
          require: ''
        },
        loanAmountAvailable: {
          label: ''
        },
        loanRate: {
          label: ''
        },
        totalLoanAmount: {
          label: ''
        },
        dailyInterestRate: {
          label: ''
        },
        confirm: ''
      },
      history: {
        title: '',
        tabs: {
          reviewing: '',
          reject: '',
          inProgress: '',
          expired: '',
          repaid: ''
        },
        loanTerm: '',
        createTime: '',
        loanTime: ''
      },
      detail: {
        title: '',
        repay: '',
        status: '',
        loanNo: '',
        loanAmount: '',
        loanTerm: '',
        loanRate: '',
        dailyInterestRate: '',
        loanTime: ''
      }
    },
    blockTrade: {
      title: '',
      subscribeBtn: '',
      tabs: {
        subscribed: '',
        inProgress: '',
        IPOSuccessful: ''
      },
      marketPrice: '',
      priceDiff: '',
      publishPrice: '',
      priceUnit: '',
      discountRate: '',
      buyCount: '',
      buyTime: '',
      subscribe: {
        title: '',
        submit: '',
        openDate: '',
        closeDate: '',
        matchDate: '',
        IPODate: '',
        IPOPrice: '',
        currency: '',
        stockCount: '',
        confirmPrice: ''
      }
    }
  },
  ipo: {
    title: 'IPO',
    publishPrice: '',
    currency: '',
    deadline: '',
    dayRest: '',
    daysRest: '',
    progress: '',
    subscribeBtn: '',
    subscribe: {
      title: '',
      confirm: '',
      publishPrice: '',
      deadline: '',
      buyCount: '',
      amount: '',
      frozenAmount: ''
    },
    history: {
      title: '',
      tabs: {
        all: '',
        submitted: '',
        winner: '',
        No: '',
        canceled: '',
        paid: 'Paid'
      }
    },
    historyDetail: {
      title: '',
      newStockPrice: '',
      count: '',
      subscribeTime: '',
      startTime: '',
      endTime: '',
      IPOTime: '',
      selectedPrice: '',
      selectedCount: '',
      payAmount: '',
      paidAmount: '',
      payingAmount: ''
    }
  },
  assets: {
    title: '资产',
    expectTotalAssets: '',
    currency: '',
    dailyReturn: '',
    stockTotalAssets: '',
    enteringAssets: '',
    historicalIncome: '',
    cashBalance: '',
    frozenAmount: '',
    pendingSubscription: '',
    tabs: {
      recharge: '',
      withdraw: '',
      exchange: '',
      records: ''
    },
    holdingStocks: '',
    orders: '',
    holdingStocksTabs: {
      symbolAndName: '',
      priceAndQuantity: '',
      currentPriceAndCost: '',
      profitAndLoss: ''
    },
    ordersTabs: {
      symbolAndName: '',
      tradeType: '',
      priceAndQuantity: '',
      profitAndLoss: ''
    },
    tradeType: {
      buy: '',
      sell: ''
    },
    withdraw: {
      title: '',
      withdrawBtn: '',
      incomeAmount: '',
      availableAmount: '',
      selectCurrency: {
        label: ''
      },
      withdrawAddress: {
        label: '',
        placeholder: ''
      },
      quantity: {
        all: '',
        label: '',
        placeholder: ''
      },
      tips: '',
      records: {
        title: '',
        success: '',
        confirming: '',
        reviewing: '',
        error: ''
      },
      record: {
        title: '',
        type: '',
        status: '',
        withdrawAddress: '',
        blockchainTradeId: '',
        time: '',
        errorReason: ''
      }
    },
    exchange: {
      title: '',
      rate: '',
      selectCurrency: '',
      quantity: '',
      availableCount: '',
      address: '',
      tips: '',
      copytAddress: '',
      saveQrcode: '',
      grantAccess: {
        title: '',
        content: '',
        enable: ''
      },
      saveQrcodeToast: {
        title: '',
        successContent: '',
        errorContent: ''
      },
      records: {
        title: '',
        success: ''
      },
      record: {
        title: '',
        type: '',
        currencyOrigin: '',
        topupAddress: '',
        time: ''
      }
    },
    records: {
      title: '',
      tabs: {
        trade: '',
        recharge: '',
        withdraw: ''
      },
      filters: {
        all: '',
        commissionEntrustingSales: '',
        IPOTransactionIncome: '',
        IPOTransactionSubscription: '',
        commissionSales: '',
        frozen: '',
        fee: ''
      }
    },
    record: {
      title: '',
      type: '',
      status: '',
      withdrawAddress: '',
      fee: '',
      blockchainTradeId: '',
      time: '',
      stockName: '',
      quantity: '',
      price: ''
    }
  },
  news: {
    title: '资讯',
    detial: {
      title: ''
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
      },
      result: {
        title: '身份验证',
        status: {
          verifying: '身份验证中，请耐心等待！',
          failed: '身份验证失败，身份证照片不符！',
          success: '身份验证成功！'
        },
        identifyInfo: {
          title: '身份信息',
          realName: '姓名',
          idNo: '身份证号',
          idPic: '身份证照片'
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
        placeholder: '请输入手机号或电子邮箱'
      },
      password: {
        required: '密码不能为空',
        placeholder: '请输入密码'
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
        getVerifyCode: '获取验证码'
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
        placeholder: '请输入手机号/邮箱/UID'
        // invalid: '请输入有效的邮箱或手机号',
      },
      verifyCode: {
        require: '请输入验证码',
        placeholder: '请输入验证码',
        invalid: '请输入6位验证码',
        getVerifyCode: '获取验证码'
      },
      password: {
        require: '请输入登录密码',
        placeholder: '登录密码（8-20位，包含字母与数字）',
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
  }
} as const;
