export const delayedEffects = {
  "ad_payback_review": {
    "title": "投放复盘：ROI 不如预期",
    "desc": "增长拉起来了，但回收速度比想象慢。",
    "effect": {
      "cash": -8,
      "trust": -2
    },
    "hidden": {
      "executionDebt": 4,
      "marginHealth": -3
    },
    "relations": {
      "finance": 1,
      "sales": -1
    }
  },
  "launch_returns": {
    "title": "新品首发后退货偏高",
    "desc": "你抢到了首发窗口，也一起抢回了一堆售后单。",
    "effect": {
      "cash": -5,
      "trust": -2
    },
    "hidden": {
      "customerTrust": -4,
      "executionDebt": 2
    },
    "relations": {
      "ops": -1,
      "sales": 1
    }
  },
  "streamer_roi_miss": {
    "title": "直播复盘不及预期",
    "desc": "场观很好看，但真实转化没有撑住成本。",
    "effect": {
      "cash": -7
    },
    "hidden": {
      "marginHealth": -4,
      "executionDebt": 2
    },
    "relations": {
      "sales": -1,
      "finance": 1
    }
  },
  "promo_margin_gap": {
    "title": "大促后毛利掉出预期",
    "desc": "量冲起来了，利润却比你最差版本还薄。",
    "effect": {
      "cash": -4,
      "trust": -2
    },
    "hidden": {
      "marginHealth": -7,
      "politicalHeat": 2
    },
    "relations": {
      "boss": -1,
      "finance": 1
    }
  },
  "collab_backlash": {
    "title": "联名履约出了口碑问题",
    "desc": "声量过去以后，留下来的都是兑现成本。",
    "effect": {
      "trust": -2
    },
    "hidden": {
      "customerTrust": -6,
      "riskExposure": 2
    },
    "relations": {
      "ops": -1,
      "boss": -1
    }
  },
  "affiliate_fraud": {
    "title": "分销渠道开始夹羊毛党",
    "desc": "订单变多了，但质量开始变形。",
    "effect": {
      "cash": -6
    },
    "hidden": {
      "riskExposure": 5,
      "customerTrust": -2
    },
    "relations": {
      "sales": -1,
      "finance": -1
    }
  },
  "receivable_pressure": {
    "title": "应收开始堆高",
    "desc": "收入很好看，账上的钱却没跟上。",
    "effect": {
      "cash": -10
    },
    "hidden": {
      "riskExposure": 6,
      "executionDebt": 3
    },
    "relations": {
      "finance": -1,
      "sales": -1
    }
  },
  "bad_debt_writeoff": {
    "title": "一笔应收开始像坏账",
    "desc": "之前的乐观估计，现在成了报表上的洞。",
    "effect": {
      "cash": -9,
      "trust": -2
    },
    "hidden": {
      "riskExposure": 7
    },
    "relations": {
      "finance": -2,
      "sales": -1
    }
  },
  "bridge_loan_interest": {
    "title": "过桥成本开始吃利润",
    "desc": "当时借到的钱救了命，现在利息开始回头要命。",
    "effect": {
      "cash": -5
    },
    "hidden": {
      "marginHealth": -4,
      "riskExposure": 2
    },
    "relations": {
      "finance": -1
    }
  },
  "tax_audit_ping": {
    "title": "税务那边来问细节了",
    "desc": "缓缴带来的喘息，换成了更高的解释成本。",
    "effect": {
      "trust": -2
    },
    "hidden": {
      "riskExposure": 5,
      "politicalHeat": 3
    },
    "relations": {
      "legal": -2
    }
  },
  "inventory_backfire": {
    "title": "库存开始压手",
    "desc": "你当时压的货，现在开始变成现金压力。",
    "effect": {
      "cash": -9,
      "trust": -2
    },
    "hidden": {
      "riskExposure": 5,
      "marginHealth": -2
    },
    "relations": {
      "finance": -1,
      "ops": -1
    }
  },
  "stockout_penalty": {
    "title": "断货开始带来处罚",
    "desc": "不是只少卖几单，平台和客户也开始找你算账。",
    "effect": {
      "growth": -4,
      "trust": -2
    },
    "hidden": {
      "customerTrust": -3,
      "riskExposure": 2
    },
    "relations": {
      "sales": -1
    }
  },
  "expedite_cost": {
    "title": "紧急补货把成本拉炸了",
    "desc": "速度买到了，利润也一起买没了。",
    "effect": {
      "cash": -6
    },
    "hidden": {
      "marginHealth": -4,
      "orgFatigue": 1
    },
    "relations": {
      "ops": 1,
      "finance": -1
    }
  },
  "obsolete_writeoff": {
    "title": "库存减值要入账了",
    "desc": "以前还能解释成慢，现在只能承认卖不掉。",
    "effect": {
      "cash": -7,
      "trust": -2
    },
    "hidden": {
      "riskExposure": 4,
      "marginHealth": -5
    },
    "relations": {
      "finance": -1
    }
  },
  "seasonal_markdown": {
    "title": "季节货只能打折出清",
    "desc": "押注本来是为了赢窗口，现在变成了止损。",
    "effect": {
      "cash": -4,
      "growth": -2
    },
    "hidden": {
      "marginHealth": -4,
      "customerTrust": -1
    },
    "relations": {
      "sales": -1
    }
  }
};
