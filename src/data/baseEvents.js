export const baseEvents = [
  {
    "id": "marketing_budget",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 8,
    "role": "电商负责人",
    "avatar": "📣",
    "title": "再加 80 万，我能把量冲起来。",
    "desc": "电商负责人盯着你，像是已经默认这笔钱会批下来。",
    "tags": [
      "增长",
      "现金"
    ],
    "pack": "增长",
    "left": {
      "label": "批",
      "effect": {
        "growth": 11,
        "cash": -12,
        "trust": 2
      },
      "hidden": {
        "executionDebt": 3,
        "marginHealth": -4
      },
      "relations": {
        "sales": 3,
        "boss": 1
      },
      "flags": [
        "push_growth"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "ad_payback_review"
        }
      ]
    },
    "right": {
      "label": "不批",
      "effect": {
        "cash": 6,
        "growth": -6,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "finance": 2,
        "sales": -2
      },
      "flags": [
        "guard_roi"
      ],
      "schedule": []
    }
  },
  {
    "id": "flagship_launch",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 7,
    "role": "商品负责人",
    "avatar": "🚀",
    "title": "窗口就两周，再不发就凉了。",
    "desc": "商品负责人把样品往前一推，催你现在给话。",
    "tags": [
      "增长",
      "库存"
    ],
    "pack": "增长",
    "left": {
      "label": "提前发",
      "effect": {
        "growth": 8,
        "cash": -8,
        "trust": 3
      },
      "hidden": {
        "customerTrust": 2,
        "marginHealth": -2
      },
      "relations": {
        "sales": 2,
        "boss": 2
      },
      "flags": [
        "flagship_launch"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "launch_returns"
        }
      ]
    },
    "right": {
      "label": "再磨一轮",
      "effect": {
        "cash": 4,
        "growth": -3,
        "trust": 1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "marginHealth": 2
      },
      "relations": {
        "finance": 1,
        "ops": 1
      },
      "flags": [
        "launch_delay"
      ],
      "schedule": []
    }
  },
  {
    "id": "live_stream_push",
    "phase": [
      "early",
      "mid",
      "late"
    ],
    "weight": 7,
    "role": "直播负责人",
    "avatar": "🎥",
    "title": "场次翻倍吧，不然下周 GMV 不好看。",
    "desc": "直播负责人把投流表摊开，等你点头。",
    "tags": [
      "增长",
      "现金"
    ],
    "pack": "增长",
    "left": {
      "label": "加场",
      "effect": {
        "growth": 11,
        "cash": -12,
        "trust": 2
      },
      "hidden": {
        "executionDebt": 3,
        "marginHealth": -4
      },
      "relations": {
        "sales": 3,
        "boss": 1
      },
      "flags": [
        "live_stream_push"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "streamer_roi_miss"
        }
      ]
    },
    "right": {
      "label": "控制节奏",
      "effect": {
        "cash": 6,
        "growth": -6,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "finance": 2,
        "sales": -2
      },
      "flags": [
        "stream_control"
      ],
      "schedule": []
    }
  },
  {
    "id": "festival_promo",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 8,
    "role": "渠道经理",
    "avatar": "🎉",
    "title": "这次再压一轮价，榜单我们就能上去。",
    "desc": "渠道经理嘴上说是机会，语气里全是催促。",
    "tags": [
      "增长",
      "利润质量"
    ],
    "pack": "增长",
    "left": {
      "label": "压价冲",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "festival_promo"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "promo_margin_gap"
        }
      ]
    },
    "right": {
      "label": "稳价格",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "protect_price"
      ],
      "schedule": []
    }
  },
  {
    "id": "celebrity_collab",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "品牌经理",
    "avatar": "🌟",
    "title": "要签明星联名吗？",
    "desc": "声量会很大，但成本和履约要求都不低。",
    "tags": [
      "增长",
      "客户"
    ],
    "pack": "增长",
    "left": {
      "label": "签",
      "effect": {
        "growth": 8,
        "cash": -8,
        "trust": 3
      },
      "hidden": {
        "customerTrust": 2,
        "marginHealth": -2
      },
      "relations": {
        "sales": 2,
        "boss": 2
      },
      "flags": [
        "celebrity_collab"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "collab_backlash"
        }
      ]
    },
    "right": {
      "label": "不签",
      "effect": {
        "cash": 4,
        "growth": -3,
        "trust": 1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "marginHealth": 2
      },
      "relations": {
        "finance": 1,
        "ops": 1
      },
      "flags": [
        "brand_focus"
      ],
      "schedule": []
    }
  },
  {
    "id": "affiliate_bounty",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 6,
    "role": "渠道运营",
    "avatar": "🧲",
    "title": "分销激励翻倍？",
    "desc": "短期很可能把单量拽起来，但羊毛党也会跟着进来。",
    "tags": [
      "增长",
      "风险"
    ],
    "pack": "增长",
    "left": {
      "label": "翻倍",
      "effect": {
        "growth": 11,
        "cash": -12,
        "trust": 2
      },
      "hidden": {
        "executionDebt": 3,
        "marginHealth": -4
      },
      "relations": {
        "sales": 3,
        "boss": 1
      },
      "flags": [
        "affiliate_bounty"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "affiliate_fraud"
        }
      ]
    },
    "right": {
      "label": "维持",
      "effect": {
        "cash": 6,
        "growth": -6,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "finance": 2,
        "sales": -2
      },
      "flags": [
        "keep_commission"
      ],
      "schedule": []
    }
  },
  {
    "id": "marketplace_coupon",
    "phase": [
      "early",
      "mid",
      "late"
    ],
    "weight": 7,
    "role": "平台运营",
    "avatar": "🧾",
    "title": "别人都在跟券，我们不跟就没流量了。",
    "desc": "平台运营把同行截图发给你，像在逼你别装看不见。",
    "tags": [
      "增长",
      "利润质量"
    ],
    "pack": "增长",
    "left": {
      "label": "跟券",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "marketplace_coupon"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "coupon_addiction"
        }
      ]
    },
    "right": {
      "label": "不跟",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "protect_margin"
      ],
      "schedule": []
    }
  },
  {
    "id": "new_sku_rush",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 7,
    "role": "商品企划",
    "avatar": "🆕",
    "title": "先上 12 个，爆品总得试出来。",
    "desc": "商品企划说得很笃定，像复杂度不是他的事。",
    "tags": [
      "增长",
      "库存"
    ],
    "pack": "增长",
    "left": {
      "label": "上",
      "effect": {
        "growth": 11,
        "cash": -12,
        "trust": 2
      },
      "hidden": {
        "executionDebt": 3,
        "marginHealth": -4
      },
      "relations": {
        "sales": 3,
        "boss": 1
      },
      "flags": [
        "new_sku_rush"
      ],
      "schedule": []
    },
    "right": {
      "label": "压缩到 4 个",
      "effect": {
        "cash": 4,
        "growth": -3,
        "trust": 1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "marginHealth": 2
      },
      "relations": {
        "finance": 1,
        "ops": 1
      },
      "flags": [
        "focus_sku"
      ],
      "schedule": []
    }
  },
  {
    "id": "gmv_target",
    "phase": [
      "early",
      "mid",
      "late"
    ],
    "weight": 7,
    "role": "老板",
    "avatar": "📈",
    "title": "这个月 GMV 必须翻红，你来想办法。",
    "desc": "老板把话发进群里，像是在隔空点你的名。",
    "tags": [
      "增长",
      "老板"
    ],
    "pack": "增长",
    "left": {
      "label": "我来拆解",
      "effect": {
        "trust": 4,
        "growth": 2,
        "team": -1
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 3
      },
      "relations": {
        "boss": 3,
        "sales": 1
      },
      "flags": [
        "gmv_target"
      ],
      "schedule": []
    },
    "right": {
      "label": "目标先校准",
      "effect": {
        "trust": -3,
        "team": 4
      },
      "hidden": {
        "politicalHeat": -2,
        "bossDependency": -4
      },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "target_pushback"
      ],
      "schedule": []
    }
  },
  {
    "id": "conversion_sprint",
    "phase": [
      "early"
    ],
    "weight": 6,
    "role": "增长经理",
    "avatar": "⚡",
    "title": "给我一周，我把转化再抬一截。",
    "desc": "增长经理像打了鸡血，默认大家都能跟着熬。",
    "tags": [
      "增长",
      "团队"
    ],
    "pack": "增长",
    "left": {
      "label": "冲",
      "effect": {
        "growth": 11,
        "cash": -12,
        "trust": 2
      },
      "hidden": {
        "executionDebt": 3,
        "marginHealth": -4
      },
      "relations": {
        "sales": 3,
        "boss": 1
      },
      "flags": [
        "conversion_sprint"
      ],
      "schedule": []
    },
    "right": {
      "label": "先补资源",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6,
        "executionDebt": -2
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "stabilize_before_sprint"
      ],
      "schedule": []
    }
  },
  {
    "id": "cross_border_test",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "国际业务",
    "avatar": "🌍",
    "title": "试水跨境渠道？",
    "desc": "机会不错，但税务、履约和退货都还没跑通。",
    "tags": [
      "增长",
      "风险"
    ],
    "pack": "增长",
    "left": {
      "label": "试",
      "effect": {
        "growth": 8,
        "cash": -8,
        "trust": 3
      },
      "hidden": {
        "customerTrust": 2,
        "marginHealth": -2
      },
      "relations": {
        "sales": 2,
        "boss": 2
      },
      "flags": [
        "cross_border_test"
      ],
      "schedule": []
    },
    "right": {
      "label": "先做沙盘",
      "effect": {
        "cash": 4,
        "growth": -3,
        "trust": 1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "marginHealth": 2
      },
      "relations": {
        "finance": 1,
        "ops": 1
      },
      "flags": [
        "cross_border_model"
      ],
      "schedule": []
    }
  },
  {
    "id": "regional_expansion",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "区域负责人",
    "avatar": "🗺️",
    "title": "要不要开新区域？",
    "desc": "新大区能拉增长，但地推和服务体系都得跟上。",
    "tags": [
      "增长",
      "团队"
    ],
    "pack": "增长",
    "left": {
      "label": "开",
      "effect": {
        "growth": 11,
        "cash": -12,
        "trust": 2
      },
      "hidden": {
        "executionDebt": 3,
        "marginHealth": -4
      },
      "relations": {
        "sales": 3,
        "boss": 1
      },
      "flags": [
        "regional_expansion"
      ],
      "schedule": []
    },
    "right": {
      "label": "先守老区",
      "effect": {
        "cash": 4,
        "growth": -3,
        "trust": 1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "marginHealth": 2
      },
      "relations": {
        "finance": 1,
        "ops": 1
      },
      "flags": [
        "defend_core_region"
      ],
      "schedule": []
    }
  },
  {
    "id": "bundle_offer",
    "phase": [
      "early",
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "电商运营",
    "avatar": "🎁",
    "title": "做组合装冲转化？",
    "desc": "客单价会上去，但毛利结构会更复杂。",
    "tags": [
      "增长",
      "利润质量"
    ],
    "pack": "增长",
    "left": {
      "label": "上组合",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "bundle_offer"
      ],
      "schedule": []
    },
    "right": {
      "label": "做高配版",
      "effect": {
        "growth": 4,
        "cash": 4,
        "trust": 2
      },
      "hidden": {
        "customerTrust": 3,
        "marginHealth": 4
      },
      "relations": {
        "sales": 1,
        "finance": 2
      },
      "flags": [
        "premium_bundle"
      ],
      "schedule": []
    }
  },
  {
    "id": "sample_giveaway",
    "phase": [
      "early"
    ],
    "weight": 5,
    "role": "市场经理",
    "avatar": "🧪",
    "title": "试用再放大一点，线索很快就能进来。",
    "desc": "市场经理说得很轻松，像无效线索不用人跟。",
    "tags": [
      "增长",
      "客户"
    ],
    "pack": "增长",
    "left": {
      "label": "扩",
      "effect": {
        "growth": 8,
        "cash": -8,
        "trust": 3
      },
      "hidden": {
        "customerTrust": 2,
        "marginHealth": -2
      },
      "relations": {
        "sales": 2,
        "boss": 2
      },
      "flags": [
        "sample_giveaway"
      ],
      "schedule": []
    },
    "right": {
      "label": "控量",
      "effect": {
        "cash": 6,
        "growth": -6,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "finance": 2,
        "sales": -2
      },
      "flags": [
        "sample_filter"
      ],
      "schedule": []
    }
  },
  {
    "id": "flash_sale_slot",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "平台小二",
    "avatar": "⏰",
    "title": "临时秒杀坑位来了",
    "desc": "今天拍板，明天就得备货和改价。",
    "tags": [
      "增长",
      "库存"
    ],
    "pack": "增长",
    "left": {
      "label": "接",
      "effect": {
        "growth": 6,
        "cash": -7,
        "team": -1
      },
      "hidden": {
        "orgFatigue": 3,
        "riskExposure": 2
      },
      "relations": {
        "ops": 2
      },
      "flags": [
        "flash_sale_slot"
      ],
      "schedule": []
    },
    "right": {
      "label": "不接",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "skip_flash_sale"
      ],
      "schedule": []
    }
  },
  {
    "id": "long_terms",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 7,
    "role": "销售总监",
    "avatar": "🤝",
    "title": "120 天账期，不给这单就悬了。",
    "desc": "销售总监盯着你，像在问你到底站哪边。",
    "tags": [
      "现金",
      "销售"
    ],
    "pack": "现金",
    "left": {
      "label": "给",
      "effect": {
        "growth": 8,
        "cash": -14,
        "trust": 1
      },
      "hidden": {
        "riskExposure": 6,
        "executionDebt": 2
      },
      "relations": {
        "sales": 3,
        "finance": -2
      },
      "flags": [
        "long_terms"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "receivable_pressure"
        }
      ]
    },
    "right": {
      "label": "不给",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "protect_cash"
      ],
      "schedule": []
    }
  },
  {
    "id": "advance_payment",
    "phase": [
      "early"
    ],
    "weight": 6,
    "role": "采购经理",
    "avatar": "💰",
    "title": "先付 30%，不然他们这批就不排了。",
    "desc": "采购经理把邮件转给你，像在说这笔钱今天就得出去。",
    "tags": [
      "现金",
      "库存"
    ],
    "pack": "现金",
    "left": {
      "label": "先付",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "advance_payment"
      ],
      "schedule": []
    },
    "right": {
      "label": "先卡住",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "supplier_hold"
      ],
      "schedule": []
    }
  },
  {
    "id": "supplier_pressure",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 7,
    "role": "供应链总监",
    "avatar": "🏭",
    "title": "再不结款，几家供应商真要停了。",
    "desc": "供应链总监语气发硬，像是已经被催了很多轮。",
    "tags": [
      "现金",
      "风险"
    ],
    "pack": "现金",
    "left": {
      "label": "先结一部分",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "supplier_pressure"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "supplier_lock"
        }
      ]
    },
    "right": {
      "label": "再压一压",
      "effect": {
        "cash": 8,
        "team": -3,
        "trust": -1
      },
      "hidden": {
        "orgFatigue": 2,
        "executionDebt": 1
      },
      "relations": {
        "finance": 2,
        "hr": -1
      },
      "flags": [
        "delay_supplier_payment"
      ],
      "schedule": []
    }
  },
  {
    "id": "payroll_warning",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 7,
    "role": "财务经理",
    "avatar": "💸",
    "title": "工资能发，但发完我们就只剩一口气了。",
    "desc": "财务经理半笑不笑地看着你，等你做那个难受的决定。",
    "tags": [
      "现金",
      "团队"
    ],
    "pack": "现金",
    "left": {
      "label": "先备钱",
      "effect": {
        "cash": 14,
        "trust": 1
      },
      "hidden": {
        "riskExposure": 5,
        "bossDependency": 2
      },
      "relations": {
        "boss": 2,
        "finance": -1
      },
      "flags": [
        "payroll_watch"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "payroll_risk"
        }
      ]
    },
    "right": {
      "label": "先控支出",
      "effect": {
        "cash": 8,
        "team": -3,
        "trust": -1
      },
      "hidden": {
        "orgFatigue": 2,
        "executionDebt": 1
      },
      "relations": {
        "finance": 2,
        "hr": -1
      },
      "flags": [
        "tight_budget"
      ],
      "schedule": []
    }
  },
  {
    "id": "bad_debt_signal",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "应收主管",
    "avatar": "🧾",
    "title": "这家客户再拖下去，账龄就真难看了。",
    "desc": "应收主管把名单递过来，像在提醒你别再装乐观。",
    "tags": [
      "现金",
      "风险"
    ],
    "pack": "现金",
    "left": {
      "label": "马上催",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "bad_debt_signal"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "bad_debt_writeoff"
        }
      ]
    },
    "right": {
      "label": "再缓缓",
      "effect": {
        "growth": 8,
        "cash": -14,
        "trust": 1
      },
      "hidden": {
        "riskExposure": 6,
        "executionDebt": 2
      },
      "relations": {
        "sales": 3,
        "finance": -2
      },
      "flags": [
        "soft_collection"
      ],
      "schedule": []
    }
  },
  {
    "id": "collection_team",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "法务顾问",
    "avatar": "⚖️",
    "title": "要不要让法务介入催收？",
    "desc": "一旦发函，销售关系会明显受伤。",
    "tags": [
      "现金",
      "合规"
    ],
    "pack": "现金",
    "left": {
      "label": "介入",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "legal_collection"
      ],
      "schedule": []
    },
    "right": {
      "label": "销售自己谈",
      "effect": {
        "growth": 8,
        "cash": -14,
        "trust": 1
      },
      "hidden": {
        "riskExposure": 6,
        "executionDebt": 2
      },
      "relations": {
        "sales": 3,
        "finance": -2
      },
      "flags": [
        "sales_collection"
      ],
      "schedule": []
    }
  },
  {
    "id": "bridge_loan",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "老板",
    "avatar": "🏦",
    "title": "要不先借个过桥，把下季度熬过去。",
    "desc": "老板说得很轻松，像借钱只是个技术动作。",
    "tags": [
      "现金",
      "老板"
    ],
    "pack": "现金",
    "left": {
      "label": "先借一笔",
      "effect": {
        "cash": 14,
        "trust": 1
      },
      "hidden": {
        "riskExposure": 5,
        "bossDependency": 2
      },
      "relations": {
        "boss": 2,
        "finance": -1
      },
      "flags": [
        "bridge_loan"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "bridge_loan_interest"
        }
      ]
    },
    "right": {
      "label": "再扛扛",
      "effect": {
        "cash": 8,
        "team": -3,
        "trust": -1
      },
      "hidden": {
        "orgFatigue": 2,
        "executionDebt": 1
      },
      "relations": {
        "finance": 2,
        "hr": -1
      },
      "flags": [
        "avoid_loan"
      ],
      "schedule": []
    }
  },
  {
    "id": "deposit_negotiation",
    "phase": [
      "early"
    ],
    "weight": 5,
    "role": "大客户经理",
    "avatar": "📜",
    "title": "预收定金能不能谈？",
    "desc": "对方如果接受，现金会很漂亮，但订单弹性会下降。",
    "tags": [
      "现金",
      "销售"
    ],
    "pack": "现金",
    "left": {
      "label": "去谈",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "deposit_negotiation"
      ],
      "schedule": []
    },
    "right": {
      "label": "先让利拿单",
      "effect": {
        "growth": 8,
        "cash": -14,
        "trust": 1
      },
      "hidden": {
        "riskExposure": 6,
        "executionDebt": 2
      },
      "relations": {
        "sales": 3,
        "finance": -2
      },
      "flags": [
        "order_first"
      ],
      "schedule": []
    }
  },
  {
    "id": "prepay_inventory",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 6,
    "role": "计划经理",
    "avatar": "📦",
    "title": "预付锁一批原料？",
    "desc": "价格看着要涨，现在锁能省后面很多麻烦。",
    "tags": [
      "现金",
      "库存"
    ],
    "pack": "现金",
    "left": {
      "label": "锁",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "prepay_inventory"
      ],
      "schedule": []
    },
    "right": {
      "label": "先观望",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "wait_material_price"
      ],
      "schedule": []
    }
  },
  {
    "id": "tax_payment",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "税务经理",
    "avatar": "🧮",
    "title": "税款先缓一缓，现金就能多留一口。",
    "desc": "税务经理看着你，像在试探你敢不敢踩这条线。",
    "tags": [
      "现金",
      "合规"
    ],
    "pack": "现金",
    "left": {
      "label": "申请缓缴",
      "effect": {
        "cash": 14,
        "trust": 1
      },
      "hidden": {
        "riskExposure": 5,
        "bossDependency": 2
      },
      "relations": {
        "boss": 2,
        "finance": -1
      },
      "flags": [
        "tax_payment"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "tax_audit_ping"
        }
      ]
    },
    "right": {
      "label": "按时缴掉",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "tax_clean"
      ],
      "schedule": []
    }
  },
  {
    "id": "capex_installment",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "IT负责人",
    "avatar": "🖥️",
    "title": "系统费改分期？",
    "desc": "一次性支出难受，但分期会多付不少钱。",
    "tags": [
      "现金",
      "系统"
    ],
    "pack": "现金",
    "left": {
      "label": "分期",
      "effect": {
        "cash": 14,
        "trust": 1
      },
      "hidden": {
        "riskExposure": 5,
        "bossDependency": 2
      },
      "relations": {
        "boss": 2,
        "finance": -1
      },
      "flags": [
        "capex_installment"
      ],
      "schedule": []
    },
    "right": {
      "label": "一次付清",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "pay_now"
      ],
      "schedule": []
    }
  },
  {
    "id": "fund_pool_shift",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "老板助理",
    "avatar": "🏷️",
    "title": "集团先借一点，下月就补回来。",
    "desc": "老板助理说得轻飘飘，像这钱不是业务的命。",
    "tags": [
      "现金",
      "老板"
    ],
    "pack": "现金",
    "left": {
      "label": "先借出去",
      "effect": {
        "trust": 4,
        "growth": 2,
        "team": -1
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 3
      },
      "relations": {
        "boss": 3,
        "sales": 1
      },
      "flags": [
        "fund_pool_shift"
      ],
      "schedule": []
    },
    "right": {
      "label": "钱留业务",
      "effect": {
        "trust": -4,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 3,
        "bossDependency": -1
      },
      "relations": {
        "boss": -4,
        "finance": 3
      },
      "flags": [
        "protect_fund_pool"
      ],
      "schedule": []
    }
  },
  {
    "id": "finance_fee",
    "phase": [
      "early",
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "财务分析师",
    "avatar": "💳",
    "title": "要不要上保理？",
    "desc": "费用不低，但应收会好看很多。",
    "tags": [
      "现金",
      "风险"
    ],
    "pack": "现金",
    "left": {
      "label": "上",
      "effect": {
        "cash": 14,
        "trust": 1
      },
      "hidden": {
        "riskExposure": 5,
        "bossDependency": 2
      },
      "relations": {
        "boss": 2,
        "finance": -1
      },
      "flags": [
        "factoring"
      ],
      "schedule": []
    },
    "right": {
      "label": "不上",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "hold_receivable"
      ],
      "schedule": []
    }
  },
  {
    "id": "settlement_delay",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "平台运营",
    "avatar": "🧱",
    "title": "平台钱又卡住了，这个月现金会更难看。",
    "desc": "平台运营皱着眉，像这口锅迟早会滚回你这。",
    "tags": [
      "现金",
      "增长"
    ],
    "pack": "现金",
    "left": {
      "label": "我们先垫",
      "effect": {
        "cash": 14,
        "trust": 1
      },
      "hidden": {
        "riskExposure": 5,
        "bossDependency": 2
      },
      "relations": {
        "boss": 2,
        "finance": -1
      },
      "flags": [
        "settlement_delay"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "settlement_mismatch"
        }
      ]
    },
    "right": {
      "label": "先停投放",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "pause_platform_spend"
      ],
      "schedule": []
    }
  },
  {
    "id": "bonus_payout",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "HRBP",
    "avatar": "🎯",
    "title": "奖金要按原方案发吗？",
    "desc": "发了现金更紧，不发士气会立刻掉。",
    "tags": [
      "现金",
      "团队"
    ],
    "pack": "现金",
    "left": {
      "label": "按原方案发",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6,
        "executionDebt": -2
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "bonus_payout"
      ],
      "schedule": []
    },
    "right": {
      "label": "延期发",
      "effect": {
        "cash": 8,
        "team": -3,
        "trust": -1
      },
      "hidden": {
        "orgFatigue": 2,
        "executionDebt": 1
      },
      "relations": {
        "finance": 2,
        "hr": -1
      },
      "flags": [
        "bonus_delay"
      ],
      "schedule": []
    }
  },
  {
    "id": "boss_temp_number",
    "phase": [
      "early",
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "老板",
    "avatar": "📞",
    "title": "先给我一版能讲的，明早我就要用。",
    "desc": "老板在电话那头没等你解释，已经默认今晚要出数。",
    "tags": [
      "老板",
      "数据"
    ],
    "pack": "老板",
    "left": {
      "label": "先拼一版",
      "effect": {
        "trust": 7,
        "team": -3
      },
      "hidden": {
        "executionDebt": 3,
        "bossDependency": 5
      },
      "relations": {
        "boss": 6,
        "finance": -2
      },
      "flags": [
        "boss_temp_number"
      ],
      "schedule": []
    },
    "right": {
      "label": "坚持校验",
      "effect": {
        "trust": -4,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 3,
        "bossDependency": -1
      },
      "relations": {
        "boss": -4,
        "finance": 3
      },
      "flags": [
        "professional_pushback"
      ],
      "schedule": []
    }
  },
  {
    "id": "overnight_forecast",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "老板",
    "avatar": "🌙",
    "title": "今晚把全年预测重做，我明早换个说法。",
    "desc": "老板说得很轻松，像周末和团队都不算成本。",
    "tags": [
      "老板",
      "数据"
    ],
    "pack": "老板",
    "left": {
      "label": "今晚改",
      "effect": {
        "trust": 7,
        "team": -3
      },
      "hidden": {
        "executionDebt": 3,
        "bossDependency": 5
      },
      "relations": {
        "boss": 6,
        "finance": -2
      },
      "flags": [
        "overnight_forecast"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "backfill_weekend"
        }
      ]
    },
    "right": {
      "label": "明天给正式版",
      "effect": {
        "trust": -4,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 3,
        "bossDependency": -1
      },
      "relations": {
        "boss": -4,
        "finance": 3
      },
      "flags": [
        "forecast_boundary"
      ],
      "schedule": []
    }
  },
  {
    "id": "boss_station",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 7,
    "role": "老板",
    "avatar": "🧍",
    "title": "会上你站我这边，别让我一个人扛。",
    "desc": "老板看着你，像把你的专业形象也一起借走。",
    "tags": [
      "老板",
      "政治"
    ],
    "pack": "老板",
    "left": {
      "label": "站",
      "effect": {
        "trust": 4,
        "growth": 2,
        "team": -1
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 3
      },
      "relations": {
        "boss": 3,
        "sales": 1
      },
      "flags": [
        "boss_station"
      ],
      "schedule": []
    },
    "right": {
      "label": "不站队",
      "effect": {
        "trust": -3,
        "team": 4
      },
      "hidden": {
        "politicalHeat": -2,
        "bossDependency": -4
      },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "neutral_stance"
      ],
      "schedule": []
    }
  },
  {
    "id": "sign_this_now",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 6,
    "role": "老板",
    "avatar": "✍️",
    "title": "先签吧，细节回头再补。",
    "desc": "老板把摘要推过来，留给你看的时间少得可怜。",
    "tags": [
      "老板",
      "风险"
    ],
    "pack": "老板",
    "left": {
      "label": "先签",
      "effect": {
        "trust": 7,
        "team": -3
      },
      "hidden": {
        "executionDebt": 3,
        "bossDependency": 5
      },
      "relations": {
        "boss": 6,
        "finance": -2
      },
      "flags": [
        "sign_fast"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "expectation_lockin"
        }
      ]
    },
    "right": {
      "label": "看完再签",
      "effect": {
        "trust": -4,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 3,
        "bossDependency": -1
      },
      "relations": {
        "boss": -4,
        "finance": 3
      },
      "flags": [
        "sign_review"
      ],
      "schedule": []
    }
  },
  {
    "id": "skip_review",
    "phase": [
      "early"
    ],
    "weight": 5,
    "role": "老板",
    "avatar": "🏃",
    "title": "这个流程先别走了",
    "desc": "老板说先抢窗口，流程下周再补。",
    "tags": [
      "老板",
      "合规"
    ],
    "pack": "老板",
    "left": {
      "label": "先冲",
      "effect": {
        "trust": 7,
        "team": -3
      },
      "hidden": {
        "executionDebt": 3,
        "bossDependency": 5
      },
      "relations": {
        "boss": 6,
        "finance": -2
      },
      "flags": [
        "skip_review"
      ],
      "schedule": []
    },
    "right": {
      "label": "流程不能省",
      "effect": {
        "trust": -4,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 3,
        "bossDependency": -1
      },
      "relations": {
        "boss": -4,
        "finance": 3
      },
      "flags": [
        "protect_process"
      ],
      "schedule": []
    }
  },
  {
    "id": "owner_friend_project",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "老板朋友",
    "avatar": "🫱",
    "title": "这个项目你先接着，都是自己人。",
    "desc": "老板朋友笑得很自然，像回报说不清也不算问题。",
    "tags": [
      "老板",
      "政治"
    ],
    "pack": "老板",
    "left": {
      "label": "接",
      "effect": {
        "trust": 4,
        "growth": 2,
        "team": -1
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 3
      },
      "relations": {
        "boss": 3,
        "sales": 1
      },
      "flags": [
        "owner_friend_project"
      ],
      "schedule": []
    },
    "right": {
      "label": "不接",
      "effect": {
        "trust": -3,
        "team": 4
      },
      "hidden": {
        "politicalHeat": -2,
        "bossDependency": -4
      },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "friend_project_hold"
      ],
      "schedule": []
    }
  },
  {
    "id": "board_deck_polish",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "老板助理",
    "avatar": "🖼️",
    "title": "董事会材料要更好看一点",
    "desc": "你知道“更好看”不是排版问题。",
    "tags": [
      "老板",
      "政治"
    ],
    "pack": "老板",
    "left": {
      "label": "润色一下",
      "effect": {
        "trust": 7,
        "team": -3
      },
      "hidden": {
        "executionDebt": 3,
        "bossDependency": 5
      },
      "relations": {
        "boss": 6,
        "finance": -2
      },
      "flags": [
        "board_deck_polish"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "public_promise_gap"
        }
      ]
    },
    "right": {
      "label": "按真实口径写",
      "effect": {
        "trust": -4,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 3,
        "bossDependency": -1
      },
      "relations": {
        "boss": -4,
        "finance": 3
      },
      "flags": [
        "deck_truth"
      ],
      "schedule": []
    }
  },
  {
    "id": "public_promise",
    "phase": [
      "late"
    ],
    "weight": 6,
    "role": "老板",
    "avatar": "📣",
    "title": "老板要在大会上放大话",
    "desc": "目标一旦公开，后面就很难再收回来。",
    "tags": [
      "老板",
      "增长"
    ],
    "pack": "老板",
    "left": {
      "label": "支持他讲",
      "effect": {
        "trust": 4,
        "growth": 2,
        "team": -1
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 3
      },
      "relations": {
        "boss": 3,
        "sales": 1
      },
      "flags": [
        "public_promise"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "public_promise_gap"
        }
      ]
    },
    "right": {
      "label": "劝他收一点",
      "effect": {
        "trust": -3,
        "team": 4
      },
      "hidden": {
        "politicalHeat": -2,
        "bossDependency": -4
      },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "promise_control"
      ],
      "schedule": []
    }
  },
  {
    "id": "boss_favorite_hire",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "HRD",
    "avatar": "🧑",
    "title": "老板想空降一个人",
    "desc": "岗位边界和汇报线都没想清楚。",
    "tags": [
      "老板",
      "团队"
    ],
    "pack": "老板",
    "left": {
      "label": "接收",
      "effect": {
        "trust": 4,
        "growth": 2,
        "team": -1
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 3
      },
      "relations": {
        "boss": 3,
        "sales": 1
      },
      "flags": [
        "favorite_hire"
      ],
      "schedule": []
    },
    "right": {
      "label": "先定职责",
      "effect": {
        "trust": -3,
        "team": 4
      },
      "hidden": {
        "politicalHeat": -2,
        "bossDependency": -4
      },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "hire_alignment"
      ],
      "schedule": []
    }
  },
  {
    "id": "investor_story",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "老板",
    "avatar": "💼",
    "title": "投资人要来听故事",
    "desc": "故事可以讲得很大，但你知道落地没那么快。",
    "tags": [
      "老板",
      "增长"
    ],
    "pack": "老板",
    "left": {
      "label": "先把故事撑起来",
      "effect": {
        "trust": 7,
        "team": -3
      },
      "hidden": {
        "executionDebt": 3,
        "bossDependency": 5
      },
      "relations": {
        "boss": 6,
        "finance": -2
      },
      "flags": [
        "investor_story"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "investor_question"
        }
      ]
    },
    "right": {
      "label": "讲保守一点",
      "effect": {
        "trust": -4,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 3,
        "bossDependency": -1
      },
      "relations": {
        "boss": -4,
        "finance": 3
      },
      "flags": [
        "investor_prudence"
      ],
      "schedule": []
    }
  },
  {
    "id": "need_boss_backing",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "销售总监",
    "avatar": "🪪",
    "title": "这个决策你帮老板背个书",
    "desc": "业务想借你的专业形象把争议压过去。",
    "tags": [
      "老板",
      "政治"
    ],
    "pack": "老板",
    "left": {
      "label": "背",
      "effect": {
        "trust": 4,
        "growth": 2,
        "team": -1
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 3
      },
      "relations": {
        "boss": 3,
        "sales": 1
      },
      "flags": [
        "need_boss_backing"
      ],
      "schedule": []
    },
    "right": {
      "label": "不背",
      "effect": {
        "trust": -3,
        "team": 4
      },
      "hidden": {
        "politicalHeat": -2,
        "bossDependency": -4
      },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "decline_endorse"
      ],
      "schedule": []
    }
  },
  {
    "id": "cross_line_approval",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "老板",
    "avatar": "🚪",
    "title": "老板越过流程直接拍板",
    "desc": "你是唯一知道后果的人，其他人都在等你表态。",
    "tags": [
      "老板",
      "政治"
    ],
    "pack": "老板",
    "left": {
      "label": "跟上",
      "effect": {
        "trust": 7,
        "team": -3
      },
      "hidden": {
        "executionDebt": 3,
        "bossDependency": 5
      },
      "relations": {
        "boss": 6,
        "finance": -2
      },
      "flags": [
        "cross_line_approval"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "shadow_authority"
        }
      ]
    },
    "right": {
      "label": "把边界说清",
      "effect": {
        "trust": -4,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 3,
        "bossDependency": -1
      },
      "relations": {
        "boss": -4,
        "finance": 3
      },
      "flags": [
        "boundary_reset"
      ],
      "schedule": []
    }
  },
  {
    "id": "meeting_rewrite",
    "phase": [
      "early",
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "老板助理",
    "avatar": "📝",
    "title": "会议纪要要改写一下",
    "desc": "原话太直，发出去会伤人。",
    "tags": [
      "老板",
      "政治"
    ],
    "pack": "老板",
    "left": {
      "label": "改",
      "effect": {
        "trust": 7,
        "team": -3
      },
      "hidden": {
        "executionDebt": 3,
        "bossDependency": 5
      },
      "relations": {
        "boss": 6,
        "finance": -2
      },
      "flags": [
        "meeting_rewrite"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "rework_whiplash"
        }
      ]
    },
    "right": {
      "label": "保留原意",
      "effect": {
        "trust": -4,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 3,
        "bossDependency": -1
      },
      "relations": {
        "boss": -4,
        "finance": 3
      },
      "flags": [
        "raw_minutes"
      ],
      "schedule": []
    }
  },
  {
    "id": "ceo_weekend_call",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "老板",
    "avatar": "📲",
    "title": "周末再碰一版",
    "desc": "老板习惯周末压一轮事，团队已经有点扛不住。",
    "tags": [
      "老板",
      "团队"
    ],
    "pack": "老板",
    "left": {
      "label": "接电话",
      "effect": {
        "trust": 7,
        "team": -3
      },
      "hidden": {
        "executionDebt": 3,
        "bossDependency": 5
      },
      "relations": {
        "boss": 6,
        "finance": -2
      },
      "flags": [
        "ceo_weekend_call"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "morale_dip"
        }
      ]
    },
    "right": {
      "label": "让周一再看",
      "effect": {
        "trust": -3,
        "team": 4
      },
      "hidden": {
        "politicalHeat": -2,
        "bossDependency": -4
      },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "weekend_boundary"
      ],
      "schedule": []
    }
  },
  {
    "id": "shadow_decision",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "老板",
    "avatar": "🪄",
    "title": "你先替我拍了",
    "desc": "老板开始把灰区判断默认为你的职责。",
    "tags": [
      "老板",
      "政治"
    ],
    "pack": "老板",
    "left": {
      "label": "我来拍",
      "effect": {
        "trust": 4,
        "growth": 2,
        "team": -1
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 3
      },
      "relations": {
        "boss": 3,
        "sales": 1
      },
      "flags": [
        "shadow_decision"
      ],
      "schedule": []
    },
    "right": {
      "label": "请老板自己定",
      "effect": {
        "trust": -3,
        "team": 4
      },
      "hidden": {
        "politicalHeat": -2,
        "bossDependency": -4
      },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "decision_return"
      ],
      "schedule": []
    }
  },
  {
    "id": "freeze_hiring",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 7,
    "role": "HRBP",
    "avatar": "🧑‍💼",
    "title": "先把招聘停了，不然现金顶不住。",
    "desc": "HRBP知道你会难受，但还是把这句话递到了你面前。",
    "tags": [
      "团队",
      "现金"
    ],
    "pack": "团队",
    "left": {
      "label": "停",
      "effect": {
        "cash": 7,
        "team": -9
      },
      "hidden": {
        "orgFatigue": 8,
        "executionDebt": 4
      },
      "relations": {
        "hr": -4,
        "finance": -2
      },
      "flags": [
        "freeze_hiring"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "capacity_gap"
        }
      ]
    },
    "right": {
      "label": "继续招",
      "effect": {
        "team": 6,
        "cash": -5,
        "growth": 3
      },
      "hidden": {
        "dataMaturity": 2,
        "orgFatigue": -2
      },
      "relations": {
        "hr": 2,
        "ops": 2
      },
      "flags": [
        "protect_team"
      ],
      "schedule": []
    }
  },
  {
    "id": "team_burn",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "财务BP",
    "avatar": "😮‍💨",
    "title": "大家已经连着熬两周了，再这么顶真要出事。",
    "desc": "财务BP声音压得很低，像是不想把疲惫说得太明显。",
    "tags": [
      "团队",
      "执行"
    ],
    "pack": "团队",
    "left": {
      "label": "补人",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6,
        "executionDebt": -2
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "protect_team"
      ],
      "schedule": []
    },
    "right": {
      "label": "再扛",
      "effect": {
        "cash": 7,
        "team": -9
      },
      "hidden": {
        "orgFatigue": 8,
        "executionDebt": 4
      },
      "relations": {
        "hr": -4,
        "finance": -2
      },
      "flags": [
        "burn_team"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "resignation_wave"
        }
      ]
    }
  },
  {
    "id": "core_exit_risk",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 7,
    "role": "HRBP",
    "avatar": "📨",
    "title": "他嘴上没说，但人已经在看机会了。",
    "desc": "HRBP把话说得很轻，像怕你听得太明白。",
    "tags": [
      "团队",
      "风险"
    ],
    "pack": "团队",
    "left": {
      "label": "立刻留人",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6,
        "executionDebt": -2
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "retain_core"
      ],
      "schedule": []
    },
    "right": {
      "label": "先观察",
      "effect": {
        "cash": 4,
        "team": -4,
        "growth": -2
      },
      "hidden": {
        "orgFatigue": 3
      },
      "relations": {
        "hr": -2,
        "ops": -1
      },
      "flags": [
        "core_exit_risk"
      ],
      "schedule": []
    }
  },
  {
    "id": "performance_push",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "HRD",
    "avatar": "📊",
    "title": "绩效要拉开吗？",
    "desc": "如果真拉开，几个中层可能会一起炸。",
    "tags": [
      "团队",
      "政治"
    ],
    "pack": "团队",
    "left": {
      "label": "拉开",
      "effect": {
        "team": 6,
        "cash": -5,
        "growth": 3
      },
      "hidden": {
        "dataMaturity": 2,
        "orgFatigue": -2
      },
      "relations": {
        "hr": 2,
        "ops": 2
      },
      "flags": [
        "performance_push"
      ],
      "schedule": []
    },
    "right": {
      "label": "先缓一季",
      "effect": {
        "cash": 4,
        "team": -4,
        "growth": -2
      },
      "hidden": {
        "orgFatigue": 3
      },
      "relations": {
        "hr": -2,
        "ops": -1
      },
      "flags": [
        "performance_delay"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "manager_trust_drop"
        }
      ]
    }
  },
  {
    "id": "headcount_fight",
    "phase": [
      "mid"
    ],
    "weight": 6,
    "role": "业务负责人",
    "avatar": "🪢",
    "title": "这个 HC 必须给业务",
    "desc": "大家都说自己最急，预算却只剩一个坑。",
    "tags": [
      "团队",
      "政治"
    ],
    "pack": "团队",
    "left": {
      "label": "给",
      "effect": {
        "team": 6,
        "cash": -5,
        "growth": 3
      },
      "hidden": {
        "dataMaturity": 2,
        "orgFatigue": -2
      },
      "relations": {
        "hr": 2,
        "ops": 2
      },
      "flags": [
        "headcount_fight"
      ],
      "schedule": []
    },
    "right": {
      "label": "不给",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "hc_hold"
      ],
      "schedule": []
    }
  },
  {
    "id": "middle_manager_blame",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "中层经理",
    "avatar": "🧱",
    "title": "这事真不是我这边的问题。",
    "desc": "中层经理们轮着开口，整场会像一场自保表演。",
    "tags": [
      "团队",
      "政治"
    ],
    "pack": "团队",
    "left": {
      "label": "摊开讲",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "middle_manager_blame"
      ],
      "schedule": []
    },
    "right": {
      "label": "先按住",
      "effect": {
        "cash": 3,
        "trust": -4
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 2
      },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "blame_contain"
      ],
      "schedule": []
    }
  },
  {
    "id": "reorg_rumor",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "老板助理",
    "avatar": "🔀",
    "title": "组织是不是要动了？下面已经在传了。",
    "desc": "老板助理还没正面回，你已经听到一圈人在试探口风。",
    "tags": [
      "团队",
      "老板"
    ],
    "pack": "团队",
    "left": {
      "label": "先解释",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6,
        "executionDebt": -2
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "reorg_rumor"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续装没事",
      "effect": {
        "cash": 4,
        "team": -4,
        "growth": -2
      },
      "hidden": {
        "orgFatigue": 3
      },
      "relations": {
        "hr": -2,
        "ops": -1
      },
      "flags": [
        "silent_reorg"
      ],
      "schedule": []
    }
  },
  {
    "id": "hiring_fail",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 5,
    "role": "招聘经理",
    "avatar": "🎣",
    "title": "招了三周还没人",
    "desc": "候选人都嫌节奏太硬、薪资太保守。",
    "tags": [
      "团队",
      "现金"
    ],
    "pack": "团队",
    "left": {
      "label": "提包和薪",
      "effect": {
        "team": 6,
        "cash": -5,
        "growth": 3
      },
      "hidden": {
        "dataMaturity": 2,
        "orgFatigue": -2
      },
      "relations": {
        "hr": 2,
        "ops": 2
      },
      "flags": [
        "hiring_fail"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "recruiting_miss"
        }
      ]
    },
    "right": {
      "label": "继续守价",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "salary_guard"
      ],
      "schedule": []
    }
  },
  {
    "id": "promotion_request",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "骨干员工",
    "avatar": "🏅",
    "title": "骨干想要升职",
    "desc": "不给怕流失，给了其他人会跟着要。",
    "tags": [
      "团队",
      "老板"
    ],
    "pack": "团队",
    "left": {
      "label": "给",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6,
        "executionDebt": -2
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "promotion_request"
      ],
      "schedule": []
    },
    "right": {
      "label": "先谈发展",
      "effect": {
        "cash": 4,
        "team": -4,
        "growth": -2
      },
      "hidden": {
        "orgFatigue": 3
      },
      "relations": {
        "hr": -2,
        "ops": -1
      },
      "flags": [
        "delay_promotion"
      ],
      "schedule": []
    }
  },
  {
    "id": "salary_adjustment",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "HRBP",
    "avatar": "💼",
    "title": "新人比老人开得高，下面已经有人炸了。",
    "desc": "HRBP摊开名单，像在提醒你这事压不住了。",
    "tags": [
      "团队",
      "现金"
    ],
    "pack": "团队",
    "left": {
      "label": "现在调整",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6,
        "executionDebt": -2
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "salary_adjustment"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续压着",
      "effect": {
        "cash": 8,
        "team": -3,
        "trust": -1
      },
      "hidden": {
        "orgFatigue": 2,
        "executionDebt": 1
      },
      "relations": {
        "finance": 2,
        "hr": -1
      },
      "flags": [
        "hold_salary"
      ],
      "schedule": []
    }
  },
  {
    "id": "training_budget",
    "phase": [
      "early"
    ],
    "weight": 4,
    "role": "HRD",
    "avatar": "📚",
    "title": "培训预算砍不砍？",
    "desc": "短期看最容易砍，但长远代价很隐蔽。",
    "tags": [
      "团队",
      "现金"
    ],
    "pack": "团队",
    "left": {
      "label": "保留",
      "effect": {
        "team": 6,
        "cash": -5,
        "growth": 3
      },
      "hidden": {
        "dataMaturity": 2,
        "orgFatigue": -2
      },
      "relations": {
        "hr": 2,
        "ops": 2
      },
      "flags": [
        "training_budget"
      ],
      "schedule": []
    },
    "right": {
      "label": "砍掉",
      "effect": {
        "cash": 8,
        "team": -3,
        "trust": -1
      },
      "hidden": {
        "orgFatigue": 2,
        "executionDebt": 1
      },
      "relations": {
        "finance": 2,
        "hr": -1
      },
      "flags": [
        "cut_training"
      ],
      "schedule": []
    }
  },
  {
    "id": "shared_service_request",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "财务共享负责人",
    "avatar": "🧾",
    "title": "要不要把一些活转共享中心？",
    "desc": "标准化会更好，但前面磨合会很痛。",
    "tags": [
      "团队",
      "系统"
    ],
    "pack": "团队",
    "left": {
      "label": "转",
      "effect": {
        "team": 6,
        "cash": -5,
        "growth": 3
      },
      "hidden": {
        "dataMaturity": 2,
        "orgFatigue": -2
      },
      "relations": {
        "hr": 2,
        "ops": 2
      },
      "flags": [
        "shared_service"
      ],
      "schedule": []
    },
    "right": {
      "label": "先维持",
      "effect": {
        "cash": 4,
        "team": -4,
        "growth": -2
      },
      "hidden": {
        "orgFatigue": 3
      },
      "relations": {
        "hr": -2,
        "ops": -1
      },
      "flags": [
        "keep_local"
      ],
      "schedule": []
    }
  },
  {
    "id": "cross_team_conflict",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "运营总监",
    "avatar": "⚔️",
    "title": "业务和财务又顶起来了",
    "desc": "谁都觉得自己是为了公司好。",
    "tags": [
      "团队",
      "政治"
    ],
    "pack": "团队",
    "left": {
      "label": "当面拆开讲",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "cross_team_conflict"
      ],
      "schedule": []
    },
    "right": {
      "label": "先各退一步",
      "effect": {
        "cash": 3,
        "trust": -4
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 2
      },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "freeze_conflict"
      ],
      "schedule": []
    }
  },
  {
    "id": "new_manager_onboard",
    "phase": [
      "early"
    ],
    "weight": 4,
    "role": "HRBP",
    "avatar": "🧭",
    "title": "新经理上岗要不要配人？",
    "desc": "不给支持，他大概率自己先乱掉。",
    "tags": [
      "团队",
      "执行"
    ],
    "pack": "团队",
    "left": {
      "label": "配",
      "effect": {
        "team": 6,
        "cash": -5,
        "growth": 3
      },
      "hidden": {
        "dataMaturity": 2,
        "orgFatigue": -2
      },
      "relations": {
        "hr": 2,
        "ops": 2
      },
      "flags": [
        "new_manager_onboard"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "onboarding_slip"
        }
      ]
    },
    "right": {
      "label": "先观察",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "solo_onboard"
      ],
      "schedule": []
    }
  },
  {
    "id": "weekend_overtime_policy",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "老板",
    "avatar": "🗓️",
    "title": "周末加班要不要默认化？",
    "desc": "短期效率会高，组织感受会很差。",
    "tags": [
      "团队",
      "老板"
    ],
    "pack": "团队",
    "left": {
      "label": "默认加班",
      "effect": {
        "cash": 7,
        "team": -9
      },
      "hidden": {
        "orgFatigue": 8,
        "executionDebt": 4
      },
      "relations": {
        "hr": -4,
        "finance": -2
      },
      "flags": [
        "weekend_overtime"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "overtime_backlash"
        }
      ]
    },
    "right": {
      "label": "设边界",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6,
        "executionDebt": -2
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "protect_weekend"
      ],
      "schedule": []
    }
  },
  {
    "id": "discount",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 8,
    "role": "运营经理",
    "avatar": "🏷️",
    "title": "再降 5 个点，量立刻能起来。",
    "desc": "运营经理说得很快，像是怕你先去算利润。",
    "tags": [
      "增长",
      "利润质量"
    ],
    "pack": "增长",
    "left": {
      "label": "降",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "heavy_discount"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "margin_reckoning"
        }
      ]
    },
    "right": {
      "label": "不降",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "guard_margin"
      ],
      "schedule": []
    }
  },
  {
    "id": "channel_rebate",
    "phase": [
      "early",
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "区域销售",
    "avatar": "🚗",
    "title": "不给返点，这波货经销商就不推了。",
    "desc": "区域销售把压力原封不动地送到了你桌上。",
    "tags": [
      "利润质量",
      "增长"
    ],
    "pack": "利润质量",
    "left": {
      "label": "给",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "channel_rebate"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "rebate_reconciliation"
        }
      ]
    },
    "right": {
      "label": "不给",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "protect_cash"
      ],
      "schedule": []
    }
  },
  {
    "id": "low_margin_big_order",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 7,
    "role": "KA负责人",
    "avatar": "📦",
    "title": "利润薄是薄，但这单太大了，真不接？",
    "desc": "KA 负责人语气发热，像规模本身就能替利润辩护。",
    "tags": [
      "利润质量",
      "增长"
    ],
    "pack": "利润质量",
    "left": {
      "label": "先接下来",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "low_margin_big_order"
      ],
      "schedule": []
    },
    "right": {
      "label": "宁可不接",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "skip_bad_order"
      ],
      "schedule": []
    }
  },
  {
    "id": "platform_fee_up",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "平台运营",
    "avatar": "🧾",
    "title": "平台抽佣又涨了，这口我们吃还是客户吃？",
    "desc": "平台运营盯着费率表，等你先认哪边疼。",
    "tags": [
      "利润质量",
      "增长"
    ],
    "pack": "利润质量",
    "left": {
      "label": "提价",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "raise_price"
      ],
      "schedule": []
    },
    "right": {
      "label": "我们自己扛",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "absorb_fee"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "fee_spike_followup"
        }
      ]
    }
  },
  {
    "id": "freight_cost_surge",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "物流经理",
    "avatar": "🚚",
    "title": "运费突然抬头",
    "desc": "客户期望不变，实际履约成本却在跳。",
    "tags": [
      "利润质量",
      "库存"
    ],
    "pack": "利润质量",
    "left": {
      "label": "调价补回",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "freight_cost_surge"
      ],
      "schedule": []
    },
    "right": {
      "label": "先扛着",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "freight_absorb"
      ],
      "schedule": []
    }
  },
  {
    "id": "return_repair_cost",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "售后负责人",
    "avatar": "🛠️",
    "title": "返修越来越贵了，再这么修下去不对劲。",
    "desc": "售后负责人把成本表递过来，像终于憋不住了。",
    "tags": [
      "利润质量",
      "客户"
    ],
    "pack": "利润质量",
    "left": {
      "label": "立专项",
      "effect": {
        "growth": 4,
        "cash": 4,
        "trust": 2
      },
      "hidden": {
        "customerTrust": 3,
        "marginHealth": 4
      },
      "relations": {
        "sales": 1,
        "finance": 2
      },
      "flags": [
        "repair_cost_fix"
      ],
      "schedule": []
    },
    "right": {
      "label": "先按旧政策",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "return_repair_cost"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "repair_cost_creep"
        }
      ]
    }
  },
  {
    "id": "bundle_margin_blur",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "财务分析师",
    "avatar": "🧺",
    "title": "组合装毛利看不清了",
    "desc": "销量很好，但单品层面已经算不明白。",
    "tags": [
      "利润质量",
      "数据"
    ],
    "pack": "利润质量",
    "left": {
      "label": "拆清楚",
      "effect": {
        "trust": 4,
        "team": -2
      },
      "hidden": {
        "dataMaturity": 6,
        "politicalHeat": 2
      },
      "relations": {
        "finance": 3,
        "sales": -1
      },
      "flags": [
        "bundle_margin_blur"
      ],
      "schedule": []
    },
    "right": {
      "label": "先按总盘看",
      "effect": {
        "trust": -4,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 4,
        "politicalHeat": 4,
        "dataMaturity": -3
      },
      "relations": {
        "finance": -3,
        "sales": 1
      },
      "flags": [
        "blur_margin"
      ],
      "schedule": []
    }
  },
  {
    "id": "premium_upgrade",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "品牌负责人",
    "avatar": "💎",
    "title": "推高端线？",
    "desc": "销量不会爆，但利润质量会更舒服。",
    "tags": [
      "利润质量",
      "客户"
    ],
    "pack": "利润质量",
    "left": {
      "label": "推",
      "effect": {
        "growth": 4,
        "cash": 4,
        "trust": 2
      },
      "hidden": {
        "customerTrust": 3,
        "marginHealth": 4
      },
      "relations": {
        "sales": 1,
        "finance": 2
      },
      "flags": [
        "premium_upgrade"
      ],
      "schedule": []
    },
    "right": {
      "label": "先不推",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "mass_market_first"
      ],
      "schedule": []
    }
  },
  {
    "id": "procurement_substitute",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "采购经理",
    "avatar": "🔁",
    "title": "换低价替代料？",
    "desc": "成本能降，但客诉风险也会一起上来。",
    "tags": [
      "利润质量",
      "风险"
    ],
    "pack": "利润质量",
    "left": {
      "label": "不换",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "quality_guard"
      ],
      "schedule": []
    },
    "right": {
      "label": "换",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "procurement_substitute"
      ],
      "schedule": []
    }
  },
  {
    "id": "coupon_stack",
    "phase": [
      "early",
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "平台运营",
    "avatar": "🧮",
    "title": "优惠券叠加失控了",
    "desc": "每一层都看着合理，合起来利润几乎没了。",
    "tags": [
      "利润质量",
      "增长"
    ],
    "pack": "利润质量",
    "left": {
      "label": "马上收口",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "coupon_stack"
      ],
      "schedule": []
    },
    "right": {
      "label": "先保销量",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "stack_more_coupons"
      ],
      "schedule": []
    }
  },
  {
    "id": "clearance_trade",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "商品经理",
    "avatar": "🧹",
    "title": "尾货清仓要不要做大？",
    "desc": "短期现金好看，但用户会被教育成等打折。",
    "tags": [
      "利润质量",
      "库存"
    ],
    "pack": "利润质量",
    "left": {
      "label": "做大",
      "effect": {
        "cash": 8,
        "growth": -3
      },
      "hidden": {
        "marginHealth": -4,
        "customerTrust": -1
      },
      "relations": {
        "ops": 1,
        "finance": 1
      },
      "flags": [
        "clearance_trade"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "clearance_habit"
        }
      ]
    },
    "right": {
      "label": "小范围做",
      "effect": {
        "growth": 4,
        "cash": 4,
        "trust": 2
      },
      "hidden": {
        "customerTrust": 3,
        "marginHealth": 4
      },
      "relations": {
        "sales": 1,
        "finance": 2
      },
      "flags": [
        "controlled_clearance"
      ],
      "schedule": []
    }
  },
  {
    "id": "commission_spike",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "销售总监",
    "avatar": "💼",
    "title": "销售提成要补一档",
    "desc": "没有提成很难推，没有利润也很难活。",
    "tags": [
      "利润质量",
      "团队"
    ],
    "pack": "利润质量",
    "left": {
      "label": "补",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "commission_spike"
      ],
      "schedule": []
    },
    "right": {
      "label": "不补",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "protect_commission_rate"
      ],
      "schedule": []
    }
  },
  {
    "id": "mixed_margin_confusion",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "财务BP",
    "avatar": "🧩",
    "title": "高低毛利产品混在一起卖",
    "desc": "总盘看起来不错，细拆其实风险很大。",
    "tags": [
      "利润质量",
      "数据"
    ],
    "pack": "利润质量",
    "left": {
      "label": "拆结构",
      "effect": {
        "trust": 4,
        "team": -2
      },
      "hidden": {
        "dataMaturity": 6,
        "politicalHeat": 2
      },
      "relations": {
        "finance": 3,
        "sales": -1
      },
      "flags": [
        "mixed_margin_confusion"
      ],
      "schedule": []
    },
    "right": {
      "label": "先看总盘",
      "effect": {
        "trust": -4,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 4,
        "politicalHeat": 4,
        "dataMaturity": -3
      },
      "relations": {
        "finance": -3,
        "sales": 1
      },
      "flags": [
        "margin_mix_blur"
      ],
      "schedule": []
    }
  },
  {
    "id": "price_protection",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "渠道负责人",
    "avatar": "🛡️",
    "title": "老客户要价格保护",
    "desc": "不给会吵，给了新单毛利也会被带下去。",
    "tags": [
      "利润质量",
      "客户"
    ],
    "pack": "利润质量",
    "left": {
      "label": "给有限保护",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "price_protection"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "price_protection_hit"
        }
      ]
    },
    "right": {
      "label": "不给",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "deny_price_protection"
      ],
      "schedule": []
    }
  },
  {
    "id": "custom_project_margin",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "项目经理",
    "avatar": "🧰",
    "title": "定制项目利润太薄",
    "desc": "项目组说先拿案例，财务看起来像白干。",
    "tags": [
      "利润质量",
      "增长"
    ],
    "pack": "利润质量",
    "left": {
      "label": "接",
      "effect": {
        "growth": 9,
        "cash": -5
      },
      "hidden": {
        "marginHealth": -8,
        "customerTrust": -2
      },
      "relations": {
        "sales": 2,
        "finance": -1
      },
      "flags": [
        "custom_project_margin"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "project_margin_slip"
        }
      ]
    },
    "right": {
      "label": "不接",
      "effect": {
        "cash": 6,
        "growth": -5,
        "trust": 1
      },
      "hidden": {
        "marginHealth": 6
      },
      "relations": {
        "finance": 3,
        "sales": -2
      },
      "flags": [
        "custom_margin_guard"
      ],
      "schedule": []
    }
  },
  {
    "id": "inventory_push",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 7,
    "role": "仓储经理",
    "avatar": "📦",
    "title": "这批货得先压，不然下月就要断。",
    "desc": "仓储经理语气很急，像断货已经在路上。",
    "tags": [
      "库存",
      "现金"
    ],
    "pack": "库存",
    "left": {
      "label": "压",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "inventory_push"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "inventory_backfire"
        }
      ]
    },
    "right": {
      "label": "不压",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "protect_cash"
      ],
      "schedule": []
    }
  },
  {
    "id": "hot_sku_stockout",
    "phase": [
      "early",
      "mid",
      "late"
    ],
    "weight": 7,
    "role": "仓库主管",
    "avatar": "🔥",
    "title": "再不给我补货，这个爆款今晚就见底了。",
    "desc": "仓库主管盯着库存表，话里都是火气。",
    "tags": [
      "库存",
      "增长"
    ],
    "pack": "库存",
    "left": {
      "label": "紧急补",
      "effect": {
        "growth": 6,
        "cash": -7,
        "team": -1
      },
      "hidden": {
        "orgFatigue": 3,
        "riskExposure": 2
      },
      "relations": {
        "ops": 2
      },
      "flags": [
        "hot_sku_stockout"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "stockout_penalty"
        }
      ]
    },
    "right": {
      "label": "先控节奏",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "stock_guard"
      ],
      "schedule": []
    }
  },
  {
    "id": "emergency_restock",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "采购经理",
    "avatar": "🚚",
    "title": "要快就只能空运，这笔钱你认不认？",
    "desc": "采购经理摊开时效表，像已经替你把痛点算好了。",
    "tags": [
      "库存",
      "现金"
    ],
    "pack": "库存",
    "left": {
      "label": "走空运",
      "effect": {
        "growth": 6,
        "cash": -7,
        "team": -1
      },
      "hidden": {
        "orgFatigue": 3,
        "riskExposure": 2
      },
      "relations": {
        "ops": 2
      },
      "flags": [
        "emergency_restock"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "expedite_cost"
        }
      ]
    },
    "right": {
      "label": "继续等船",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "slow_restock"
      ],
      "schedule": []
    }
  },
  {
    "id": "slow_moving_overhang",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "商品经理",
    "avatar": "🧱",
    "title": "这些货再不处理，就真要烂在仓里了。",
    "desc": "商品经理说得很直接，像终于没人愿意继续装看不见。",
    "tags": [
      "库存",
      "利润质量"
    ],
    "pack": "库存",
    "left": {
      "label": "立刻清仓",
      "effect": {
        "cash": -2,
        "team": 2,
        "trust": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "riskExposure": -2
      },
      "relations": {
        "ops": 2,
        "finance": 1
      },
      "flags": [
        "slow_moving_overhang"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "obsolete_writeoff"
        }
      ]
    },
    "right": {
      "label": "继续压着",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "hold_dead_stock"
      ],
      "schedule": []
    }
  },
  {
    "id": "safety_stock_dispute",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "计划经理",
    "avatar": "📐",
    "title": "这个安全库存，到底是保命还是压钱？",
    "desc": "计划经理把两套测算摆出来，等你决定信哪一边。",
    "tags": [
      "库存",
      "现金"
    ],
    "pack": "库存",
    "left": {
      "label": "往下调",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "lower_safety_stock"
      ],
      "schedule": []
    },
    "right": {
      "label": "维持高水位",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "high_safety_stock"
      ],
      "schedule": []
    }
  },
  {
    "id": "store_demand_noise",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "门店负责人",
    "avatar": "🏬",
    "title": "门店报数越来越虚了，谁都在往上抬。",
    "desc": "门店负责人说得像常识，仿佛失真已经成了默认玩法。",
    "tags": [
      "库存",
      "数据"
    ],
    "pack": "库存",
    "left": {
      "label": "按真实需求纠偏",
      "effect": {
        "trust": 4,
        "team": -2
      },
      "hidden": {
        "dataMaturity": 6,
        "politicalHeat": 2
      },
      "relations": {
        "finance": 3,
        "sales": -1
      },
      "flags": [
        "store_demand_noise"
      ],
      "schedule": []
    },
    "right": {
      "label": "先照单给",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "store_over_order"
      ],
      "schedule": []
    }
  },
  {
    "id": "warehouse_transfer",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "物流经理",
    "avatar": "🚛",
    "title": "跨仓一调，效率会上去，但现场肯定先乱。",
    "desc": "物流经理盯着你，像在等你替这阵混乱背书。",
    "tags": [
      "库存",
      "团队"
    ],
    "pack": "库存",
    "left": {
      "label": "现在调",
      "effect": {
        "cash": -2,
        "team": 2,
        "trust": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "riskExposure": -2
      },
      "relations": {
        "ops": 2,
        "finance": 1
      },
      "flags": [
        "warehouse_transfer"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "warehouse_congestion"
        }
      ]
    },
    "right": {
      "label": "先别动",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "keep_current_layout"
      ],
      "schedule": []
    }
  },
  {
    "id": "seasonal_bet",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 6,
    "role": "商品企划",
    "avatar": "🍂",
    "title": "这波季节货现在不押，后面就抢不到窗口了。",
    "desc": "商品企划话里全是机会，像押错以后不归他收场。",
    "tags": [
      "库存",
      "增长"
    ],
    "pack": "库存",
    "left": {
      "label": "先押货",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "seasonal_bet"
      ],
      "schedule": [
        {
          "after": 5,
          "type": "seasonal_markdown"
        }
      ]
    },
    "right": {
      "label": "只押一点",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "seasonal_caution"
      ],
      "schedule": []
    }
  },
  {
    "id": "supplier_moq",
    "phase": [
      "early"
    ],
    "weight": 5,
    "role": "采购经理",
    "avatar": "📏",
    "title": "供应商起订量抬高了",
    "desc": "不吃量就没价格，吃了量现金就更紧。",
    "tags": [
      "库存",
      "现金"
    ],
    "pack": "库存",
    "left": {
      "label": "接 MOQ",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "supplier_moq"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "moq_cash_drag"
        }
      ]
    },
    "right": {
      "label": "换供应商",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "search_new_supplier"
      ],
      "schedule": []
    }
  },
  {
    "id": "obsolescence_risk",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "产品经理",
    "avatar": "⌛",
    "title": "老型号快过时了",
    "desc": "现在不处理，后面只能用更差的价格出。",
    "tags": [
      "库存",
      "利润质量"
    ],
    "pack": "库存",
    "left": {
      "label": "提前清",
      "effect": {
        "cash": -2,
        "team": 2,
        "trust": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "riskExposure": -2
      },
      "relations": {
        "ops": 2,
        "finance": 1
      },
      "flags": [
        "obsolescence_risk"
      ],
      "schedule": []
    },
    "right": {
      "label": "再等等",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "obsolete_hold"
      ],
      "schedule": []
    }
  },
  {
    "id": "returns_restock",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "售后主管",
    "avatar": "↩️",
    "title": "退回来的货还能再卖吗？",
    "desc": "翻新一下能卖，但一旦出问题口碑更伤。",
    "tags": [
      "库存",
      "客户"
    ],
    "pack": "库存",
    "left": {
      "label": "严格分级",
      "effect": {
        "cash": -2,
        "team": 2,
        "trust": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "riskExposure": -2
      },
      "relations": {
        "ops": 2,
        "finance": 1
      },
      "flags": [
        "returns_restock"
      ],
      "schedule": []
    },
    "right": {
      "label": "能卖就卖",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "restock_fast"
      ],
      "schedule": []
    }
  },
  {
    "id": "dc_overload",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "仓储经理",
    "avatar": "🏗️",
    "title": "仓配中心快满了",
    "desc": "再挤下去，发货错漏会明显上升。",
    "tags": [
      "库存",
      "团队"
    ],
    "pack": "库存",
    "left": {
      "label": "加临时人手",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6,
        "executionDebt": -2
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "dc_overload"
      ],
      "schedule": []
    },
    "right": {
      "label": "再顶一顶",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "dc_squeeze"
      ],
      "schedule": []
    }
  },
  {
    "id": "forecast_gap",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "计划分析师",
    "avatar": "📉",
    "title": "预测又偏了，再这么偏下去没人会信了。",
    "desc": "计划分析师把误差曲线摊开，像在替系统求救。",
    "tags": [
      "库存",
      "数据"
    ],
    "pack": "库存",
    "left": {
      "label": "重做模型",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -4,
        "orgFatigue": -1
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "forecast_gap"
      ],
      "schedule": []
    },
    "right": {
      "label": "先人盯着",
      "effect": {
        "cash": 4,
        "team": -3
      },
      "hidden": {
        "executionDebt": 6,
        "dataMaturity": -2
      },
      "relations": {
        "ops": -2,
        "finance": -1
      },
      "flags": [
        "manual_forecast"
      ],
      "schedule": []
    }
  },
  {
    "id": "consignment_stock",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "渠道经理",
    "avatar": "🛒",
    "title": "做寄售库存吗？",
    "desc": "出货会更容易，但账和货都会变复杂。",
    "tags": [
      "库存",
      "现金"
    ],
    "pack": "库存",
    "left": {
      "label": "做",
      "effect": {
        "growth": 7,
        "cash": -10
      },
      "hidden": {
        "riskExposure": 4,
        "executionDebt": 3
      },
      "relations": {
        "ops": 3,
        "sales": 1
      },
      "flags": [
        "consignment_stock"
      ],
      "schedule": []
    },
    "right": {
      "label": "不做",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "avoid_consignment"
      ],
      "schedule": []
    }
  },
  {
    "id": "replacement_parts",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 4,
    "role": "售后主管",
    "avatar": "🔩",
    "title": "备件库存不够了",
    "desc": "现在补很贵，不补售后会连着炸。",
    "tags": [
      "库存",
      "客户"
    ],
    "pack": "库存",
    "left": {
      "label": "补",
      "effect": {
        "growth": 6,
        "cash": -7,
        "team": -1
      },
      "hidden": {
        "orgFatigue": 3,
        "riskExposure": 2
      },
      "relations": {
        "ops": 2
      },
      "flags": [
        "replacement_parts"
      ],
      "schedule": []
    },
    "right": {
      "label": "先拆借",
      "effect": {
        "cash": 6,
        "growth": -4
      },
      "hidden": {
        "marginHealth": 2
      },
      "relations": {
        "ops": -2,
        "finance": 1
      },
      "flags": [
        "parts_borrow"
      ],
      "schedule": []
    }
  },
  {
    "id": "build_system",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 7,
    "role": "IT负责人",
    "avatar": "💻",
    "title": "这笔系统费现在不花，后面大家都得拿命补。",
    "desc": "IT负责人难得把话说重，像是已经忍了很久。",
    "tags": [
      "系统",
      "数据"
    ],
    "pack": "系统",
    "left": {
      "label": "上",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -4,
        "orgFatigue": -1
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "build_system"
      ],
      "schedule": []
    },
    "right": {
      "label": "缓",
      "effect": {
        "cash": 4,
        "team": -3
      },
      "hidden": {
        "executionDebt": 6,
        "dataMaturity": -2
      },
      "relations": {
        "ops": -2,
        "finance": -1
      },
      "flags": [
        "delay_system"
      ],
      "schedule": []
    }
  },
  {
    "id": "data_fight",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "运营负责人",
    "avatar": "🧮",
    "title": "两套数谁都不服谁，经营会到底按哪套讲？",
    "desc": "运营负责人把矛盾直接摊开，不想再替任何人圆。",
    "tags": [
      "数据",
      "政治"
    ],
    "pack": "数据",
    "left": {
      "label": "统一口径",
      "effect": {
        "trust": 4,
        "team": -2
      },
      "hidden": {
        "dataMaturity": 6,
        "politicalHeat": 2
      },
      "relations": {
        "finance": 3,
        "sales": -1
      },
      "flags": [
        "data_alignment"
      ],
      "schedule": []
    },
    "right": {
      "label": "先各说各的",
      "effect": {
        "trust": -4,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 4,
        "politicalHeat": 4,
        "dataMaturity": -3
      },
      "relations": {
        "finance": -3,
        "sales": 1
      },
      "flags": [
        "avoid_conflict"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "data_credibility_hit"
        }
      ]
    }
  },
  {
    "id": "dashboard_delay",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "BI经理",
    "avatar": "📺",
    "title": "看板总慢半天",
    "desc": "运营已经开始拿截图代替正式报表。",
    "tags": [
      "数据",
      "系统"
    ],
    "pack": "数据",
    "left": {
      "label": "补资源重做",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -4,
        "orgFatigue": -1
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "dashboard_delay"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "dashboard_blindspot"
        }
      ]
    },
    "right": {
      "label": "先容忍",
      "effect": {
        "cash": 4,
        "team": -3
      },
      "hidden": {
        "executionDebt": 6,
        "dataMaturity": -2
      },
      "relations": {
        "ops": -2,
        "finance": -1
      },
      "flags": [
        "dashboard_patch"
      ],
      "schedule": []
    }
  },
  {
    "id": "close_rush",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "财务经理",
    "avatar": "📚",
    "title": "月结要来不及了",
    "desc": "单据和口径都还在飞，时间却只剩两天。",
    "tags": [
      "数据",
      "团队"
    ],
    "pack": "数据",
    "left": {
      "label": "砍范围保质量",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -4,
        "orgFatigue": -1
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "close_rush"
      ],
      "schedule": [
        {
          "after": 2,
          "type": "close_delay"
        }
      ]
    },
    "right": {
      "label": "大家再冲一下",
      "effect": {
        "cash": 4,
        "team": -3
      },
      "hidden": {
        "executionDebt": 6,
        "dataMaturity": -2
      },
      "relations": {
        "ops": -2,
        "finance": -1
      },
      "flags": [
        "close_rush_patch"
      ],
      "schedule": []
    }
  },
  {
    "id": "report_error",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "财务分析师",
    "avatar": "❗",
    "title": "上周那版报表有错，有人已经按它拍板了。",
    "desc": "财务分析师把更正发你之前，自己先沉默了两秒。",
    "tags": [
      "数据",
      "老板"
    ],
    "pack": "数据",
    "left": {
      "label": "马上更正",
      "effect": {
        "trust": 4,
        "team": -2
      },
      "hidden": {
        "dataMaturity": 6,
        "politicalHeat": 2
      },
      "relations": {
        "finance": 3,
        "sales": -1
      },
      "flags": [
        "report_error"
      ],
      "schedule": []
    },
    "right": {
      "label": "先悄悄改",
      "effect": {
        "trust": -4,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 4,
        "politicalHeat": 4,
        "dataMaturity": -3
      },
      "relations": {
        "finance": -3,
        "sales": 1
      },
      "flags": [
        "silent_fix"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "credibility_loss"
        }
      ]
    }
  },
  {
    "id": "manual_reconcile",
    "phase": [
      "early"
    ],
    "weight": 5,
    "role": "财务共享",
    "avatar": "🧾",
    "title": "又要手工对账",
    "desc": "系统没打通，很多表只能靠人一点点抹平。",
    "tags": [
      "数据",
      "团队"
    ],
    "pack": "数据",
    "left": {
      "label": "补接口",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -4,
        "orgFatigue": -1
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "manual_reconcile"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "reconciliation_fatigue"
        }
      ]
    },
    "right": {
      "label": "继续手工",
      "effect": {
        "cash": 4,
        "team": -3
      },
      "hidden": {
        "executionDebt": 6,
        "dataMaturity": -2
      },
      "relations": {
        "ops": -2,
        "finance": -1
      },
      "flags": [
        "manual_reconcile"
      ],
      "schedule": []
    }
  },
  {
    "id": "crm_finance_mismatch",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "销售运营",
    "avatar": "🔗",
    "title": "CRM 和财务的数又打架了，到底听谁的？",
    "desc": "销售运营摊着手，像这事拖下去也不是他的锅。",
    "tags": [
      "数据",
      "销售"
    ],
    "pack": "数据",
    "left": {
      "label": "现在对齐",
      "effect": {
        "trust": 4,
        "team": -2
      },
      "hidden": {
        "dataMaturity": 6,
        "politicalHeat": 2
      },
      "relations": {
        "finance": 3,
        "sales": -1
      },
      "flags": [
        "crm_finance_mismatch"
      ],
      "schedule": []
    },
    "right": {
      "label": "先让他们跑",
      "effect": {
        "trust": -4,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 4,
        "politicalHeat": 4,
        "dataMaturity": -3
      },
      "relations": {
        "finance": -3,
        "sales": 1
      },
      "flags": [
        "crm_flex"
      ],
      "schedule": []
    }
  },
  {
    "id": "forecast_model",
    "phase": [
      "early"
    ],
    "weight": 4,
    "role": "数据分析师",
    "avatar": "📐",
    "title": "要不要补预测模型？",
    "desc": "不是立刻见效，但会让后面很多决策少拍脑袋。",
    "tags": [
      "数据",
      "增长"
    ],
    "pack": "数据",
    "left": {
      "label": "做",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -4,
        "orgFatigue": -1
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "forecast_model"
      ],
      "schedule": []
    },
    "right": {
      "label": "先靠经验",
      "effect": {
        "cash": 4,
        "growth": -3,
        "trust": 1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "marginHealth": 2
      },
      "relations": {
        "finance": 1,
        "ops": 1
      },
      "flags": [
        "experience_first"
      ],
      "schedule": []
    }
  },
  {
    "id": "month_end_patch",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "财务BP",
    "avatar": "🩹",
    "title": "月末再补一层 Excel",
    "desc": "短期能救急，但大家都知道这不是办法。",
    "tags": [
      "数据",
      "执行"
    ],
    "pack": "数据",
    "left": {
      "label": "补",
      "effect": {
        "cash": 4,
        "team": -3
      },
      "hidden": {
        "executionDebt": 6,
        "dataMaturity": -2
      },
      "relations": {
        "ops": -2,
        "finance": -1
      },
      "flags": [
        "month_end_patch"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "excel_version_sprawl"
        }
      ]
    },
    "right": {
      "label": "不补，改流程",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -4,
        "orgFatigue": -1
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "patch_refuse"
      ],
      "schedule": []
    }
  },
  {
    "id": "bi_hire",
    "phase": [
      "early"
    ],
    "weight": 4,
    "role": "HRBP",
    "avatar": "🧠",
    "title": "要不要招个 BI？",
    "desc": "眼前不急，但一直缺这个角色。",
    "tags": [
      "数据",
      "团队"
    ],
    "pack": "数据",
    "left": {
      "label": "招",
      "effect": {
        "team": 6,
        "cash": -5,
        "growth": 3
      },
      "hidden": {
        "dataMaturity": 2,
        "orgFatigue": -2
      },
      "relations": {
        "hr": 2,
        "ops": 2
      },
      "flags": [
        "bi_hire"
      ],
      "schedule": []
    },
    "right": {
      "label": "先不招",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "delay_bi_hire"
      ],
      "schedule": []
    }
  },
  {
    "id": "tracking_missing",
    "phase": [
      "early",
      "mid"
    ],
    "weight": 5,
    "role": "增长经理",
    "avatar": "📍",
    "title": "关键埋点漏了",
    "desc": "现在继续投，你其实看不清钱花在哪。",
    "tags": [
      "数据",
      "增长"
    ],
    "pack": "数据",
    "left": {
      "label": "先补埋点",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -4,
        "orgFatigue": -1
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "tracking_missing"
      ],
      "schedule": []
    },
    "right": {
      "label": "先投再说",
      "effect": {
        "growth": 11,
        "cash": -12,
        "trust": 2
      },
      "hidden": {
        "executionDebt": 3,
        "marginHealth": -4
      },
      "relations": {
        "sales": 3,
        "boss": 1
      },
      "flags": [
        "tracking_blind"
      ],
      "schedule": []
    }
  },
  {
    "id": "board_kpi_reset",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "老板",
    "avatar": "🎯",
    "title": "董事会换 KPI 了",
    "desc": "以前的看板不够用了，解释成本会很高。",
    "tags": [
      "数据",
      "老板"
    ],
    "pack": "数据",
    "left": {
      "label": "重做口径",
      "effect": {
        "trust": 4,
        "team": -2
      },
      "hidden": {
        "dataMaturity": 6,
        "politicalHeat": 2
      },
      "relations": {
        "finance": 3,
        "sales": -1
      },
      "flags": [
        "board_kpi_reset"
      ],
      "schedule": []
    },
    "right": {
      "label": "先沿用旧口径",
      "effect": {
        "trust": -4,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 4,
        "politicalHeat": 4,
        "dataMaturity": -3
      },
      "relations": {
        "finance": -3,
        "sales": 1
      },
      "flags": [
        "keep_old_kpi"
      ],
      "schedule": []
    }
  },
  {
    "id": "data_permission",
    "phase": [
      "mid"
    ],
    "weight": 4,
    "role": "法务顾问",
    "avatar": "🔒",
    "title": "权限要不要收紧？",
    "desc": "收紧会影响效率，但现在谁都能改表也很危险。",
    "tags": [
      "数据",
      "合规"
    ],
    "pack": "数据",
    "left": {
      "label": "收紧",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -4,
        "orgFatigue": -1
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "data_permission"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "permission_breach"
        }
      ]
    },
    "right": {
      "label": "先不动",
      "effect": {
        "cash": 4,
        "team": -3
      },
      "hidden": {
        "executionDebt": 6,
        "dataMaturity": -2
      },
      "relations": {
        "ops": -2,
        "finance": -1
      },
      "flags": [
        "loose_permission"
      ],
      "schedule": []
    }
  },
  {
    "id": "shadow_excel",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "财务分析师",
    "avatar": "📊",
    "title": "每个部门都有自己的 Excel",
    "desc": "数字能对上已经靠运气了。",
    "tags": [
      "数据",
      "政治"
    ],
    "pack": "数据",
    "left": {
      "label": "统一模板",
      "effect": {
        "trust": 4,
        "team": -2
      },
      "hidden": {
        "dataMaturity": 6,
        "politicalHeat": 2
      },
      "relations": {
        "finance": 3,
        "sales": -1
      },
      "flags": [
        "shadow_excel"
      ],
      "schedule": []
    },
    "right": {
      "label": "先默认共存",
      "effect": {
        "trust": -4,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 4,
        "politicalHeat": 4,
        "dataMaturity": -3
      },
      "relations": {
        "finance": -3,
        "sales": 1
      },
      "flags": [
        "excel_shadow"
      ],
      "schedule": []
    }
  },
  {
    "id": "erp_cutover",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "IT负责人",
    "avatar": "🧱",
    "title": "ERP 切换窗口到了",
    "desc": "如果这次再拖，后面所有接口都得重排。",
    "tags": [
      "系统",
      "数据"
    ],
    "pack": "系统",
    "left": {
      "label": "切",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -4,
        "orgFatigue": -1
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "erp_cutover"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "erp_cutover_noise"
        }
      ]
    },
    "right": {
      "label": "再拖一季",
      "effect": {
        "cash": 4,
        "team": -3
      },
      "hidden": {
        "executionDebt": 6,
        "dataMaturity": -2
      },
      "relations": {
        "ops": -2,
        "finance": -1
      },
      "flags": [
        "erp_delay"
      ],
      "schedule": []
    }
  },
  {
    "id": "budget_meeting_targeted",
    "phase": [
      "mid"
    ],
    "weight": 6,
    "role": "老板",
    "avatar": "🎯",
    "title": "今天预算会，多半会先问到你。",
    "desc": "老板提前递了句话，像提醒，也像甩锅前的铺垫。",
    "tags": [
      "政治",
      "老板"
    ],
    "pack": "政治",
    "left": {
      "label": "把真问题讲出来",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "budget_meeting_targeted"
      ],
      "schedule": []
    },
    "right": {
      "label": "先讲过程",
      "effect": {
        "cash": 3,
        "trust": -4
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 2
      },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "soft_budget_story"
      ],
      "schedule": []
    }
  },
  {
    "id": "audit_entry",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "审计经理",
    "avatar": "🔍",
    "title": "审计提前进来了，之前那些口子可能遮不住了。",
    "desc": "审计经理说得很平，但每个字都不轻。",
    "tags": [
      "政治",
      "合规"
    ],
    "pack": "政治",
    "left": {
      "label": "先拉清单",
      "effect": {
        "trust": 3,
        "team": -2,
        "cash": -3
      },
      "hidden": {
        "politicalHeat": 6,
        "riskExposure": -1
      },
      "relations": {
        "boss": 2,
        "legal": 2,
        "sales": -2
      },
      "flags": [
        "audit_entry"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "audit_followup"
        }
      ]
    },
    "right": {
      "label": "先稳住现场",
      "effect": {
        "cash": 2,
        "growth": 2,
        "trust": -3
      },
      "hidden": {
        "politicalHeat": 4,
        "riskExposure": 3
      },
      "relations": {
        "boss": 1,
        "sales": 1,
        "legal": -2
      },
      "flags": [
        "audit_smooth"
      ],
      "schedule": []
    }
  },
  {
    "id": "project_blame",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "项目经理",
    "avatar": "🧨",
    "title": "这事明明不是财务拍的，最后又要你去解释。",
    "desc": "项目经理摊了摊手，像已经默认锅会落到你这。",
    "tags": [
      "政治",
      "老板"
    ],
    "pack": "政治",
    "left": {
      "label": "把责任链讲清",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "project_blame"
      ],
      "schedule": []
    },
    "right": {
      "label": "先扛一轮",
      "effect": {
        "cash": 3,
        "trust": -4
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 2
      },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "take_project_blame"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "blame_sticks"
        }
      ]
    }
  },
  {
    "id": "speak_for_boss",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "老板助理",
    "avatar": "🎤",
    "title": "老板不在，你来替他讲",
    "desc": "会上的火力不会因为人不在就减弱。",
    "tags": [
      "政治",
      "老板"
    ],
    "pack": "政治",
    "left": {
      "label": "我来讲",
      "effect": {
        "trust": 3,
        "team": -2,
        "cash": -3
      },
      "hidden": {
        "politicalHeat": 6,
        "riskExposure": -1
      },
      "relations": {
        "boss": 2,
        "legal": 2,
        "sales": -2
      },
      "flags": [
        "speak_for_boss"
      ],
      "schedule": []
    },
    "right": {
      "label": "换人讲",
      "effect": {
        "cash": 3,
        "trust": -4
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 2
      },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "defer_spokesperson"
      ],
      "schedule": []
    }
  },
  {
    "id": "business_pushes_blame",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "业务总监",
    "avatar": "🫳",
    "title": "流程太慢了，这锅别先扣业务头上。",
    "desc": "业务总监先把防线立好，再等你接不接这句话。",
    "tags": [
      "政治",
      "团队"
    ],
    "pack": "政治",
    "left": {
      "label": "锅别接",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "business_pushes_blame"
      ],
      "schedule": []
    },
    "right": {
      "label": "先接一轮",
      "effect": {
        "cash": 2,
        "growth": 2,
        "trust": -3
      },
      "hidden": {
        "politicalHeat": 4,
        "riskExposure": 3
      },
      "relations": {
        "boss": 1,
        "sales": 1,
        "legal": -2
      },
      "flags": [
        "contain_business_blame"
      ],
      "schedule": []
    }
  },
  {
    "id": "shadow_committee",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "老板",
    "avatar": "🕴️",
    "title": "有些事会外先定，会里只是走一遍。",
    "desc": "老板把话说得很淡，像规则本来就该这样弯着来。",
    "tags": [
      "政治",
      "老板"
    ],
    "pack": "政治",
    "left": {
      "label": "我进去",
      "effect": {
        "cash": 2,
        "growth": 2,
        "trust": -3
      },
      "hidden": {
        "politicalHeat": 4,
        "riskExposure": 3
      },
      "relations": {
        "boss": 1,
        "sales": 1,
        "legal": -2
      },
      "flags": [
        "shadow_committee"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "political_heatwave"
        }
      ]
    },
    "right": {
      "label": "把规则摊开",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "process_sunlight"
      ],
      "schedule": []
    }
  },
  {
    "id": "pilot_failure_spin",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "业务负责人",
    "avatar": "🎢",
    "title": "试点没成但不能讲太真",
    "desc": "如果现在说透，项目大概率直接停。",
    "tags": [
      "政治",
      "增长"
    ],
    "pack": "政治",
    "left": {
      "label": "先包装",
      "effect": {
        "cash": 3,
        "trust": -4
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 2
      },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "pilot_failure_spin"
      ],
      "schedule": []
    },
    "right": {
      "label": "说真话",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "pilot_truth"
      ],
      "schedule": []
    }
  },
  {
    "id": "capex_defense",
    "phase": [
      "mid"
    ],
    "weight": 5,
    "role": "IT负责人",
    "avatar": "🖨️",
    "title": "这笔投入你得去 defend",
    "desc": "很多人只会看到钱，不会看到风险。",
    "tags": [
      "政治",
      "系统"
    ],
    "pack": "政治",
    "left": {
      "label": "我来 defend",
      "effect": {
        "trust": 3,
        "team": -2,
        "cash": -3
      },
      "hidden": {
        "politicalHeat": 6,
        "riskExposure": -1
      },
      "relations": {
        "boss": 2,
        "legal": 2,
        "sales": -2
      },
      "flags": [
        "capex_defense"
      ],
      "schedule": []
    },
    "right": {
      "label": "先缩方案",
      "effect": {
        "cash": 10,
        "growth": -7,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 2,
        "riskExposure": -1
      },
      "relations": {
        "finance": 3,
        "sales": -3
      },
      "flags": [
        "capex_trim"
      ],
      "schedule": []
    }
  },
  {
    "id": "compliance_exception",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 6,
    "role": "法务顾问",
    "avatar": "⚠️",
    "title": "要不要走个例外审批？能过，但痕迹会很重。",
    "desc": "法务顾问看着你，像在提醒这口子开了就回不去。",
    "tags": [
      "政治",
      "合规"
    ],
    "pack": "政治",
    "left": {
      "label": "走这个口子",
      "effect": {
        "trust": 3,
        "team": -2,
        "cash": -3
      },
      "hidden": {
        "politicalHeat": 6,
        "riskExposure": -1
      },
      "relations": {
        "boss": 2,
        "legal": 2,
        "sales": -2
      },
      "flags": [
        "compliance_exception"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "compliance_heat"
        }
      ]
    },
    "right": {
      "label": "不走这个口子",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "compliance_guard"
      ],
      "schedule": []
    }
  },
  {
    "id": "regional_politics",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "区域总监",
    "avatar": "🧭",
    "title": "几个区域开始抢资源",
    "desc": "数据只是表层，真正的冲突在话语权。",
    "tags": [
      "政治",
      "团队"
    ],
    "pack": "政治",
    "left": {
      "label": "公开分规则",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "regional_politics"
      ],
      "schedule": []
    },
    "right": {
      "label": "先模糊处理",
      "effect": {
        "cash": 3,
        "trust": -4
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 2
      },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "regional_balance"
      ],
      "schedule": []
    }
  },
  {
    "id": "favored_vendor",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "采购经理",
    "avatar": "🎁",
    "title": "这家先别动，上面有人看着。",
    "desc": "采购经理把声音压低，像比价格更硬的是关系。",
    "tags": [
      "政治",
      "合规"
    ],
    "pack": "政治",
    "left": {
      "label": "按规重比",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "favored_vendor"
      ],
      "schedule": [
        {
          "after": 4,
          "type": "vendor_question"
        }
      ]
    },
    "right": {
      "label": "先照旧用",
      "effect": {
        "cash": 2,
        "growth": 2,
        "trust": -3
      },
      "hidden": {
        "politicalHeat": 4,
        "riskExposure": 3
      },
      "relations": {
        "boss": 1,
        "sales": 1,
        "legal": -2
      },
      "flags": [
        "vendor_compromise"
      ],
      "schedule": []
    }
  },
  {
    "id": "boardroom_illusion_seed",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "老板",
    "avatar": "🎬",
    "title": "会上全是好消息",
    "desc": "你知道盘子里有几块已经开始松了。",
    "tags": [
      "政治",
      "老板"
    ],
    "pack": "政治",
    "left": {
      "label": "现在提醒",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "boardroom_illusion_seed"
      ],
      "schedule": []
    },
    "right": {
      "label": "会后再说",
      "effect": {
        "cash": 3,
        "trust": -4
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 2
      },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "illusion_after_meeting"
      ],
      "schedule": []
    }
  },
  {
    "id": "need_white_lie",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "老板助理",
    "avatar": "🤐",
    "title": "有个细节先别讲",
    "desc": "不算造假，但一定算选择性表达。",
    "tags": [
      "政治",
      "老板"
    ],
    "pack": "政治",
    "left": {
      "label": "先不讲",
      "effect": {
        "cash": 2,
        "growth": 2,
        "trust": -3
      },
      "hidden": {
        "politicalHeat": 4,
        "riskExposure": 3
      },
      "relations": {
        "boss": 1,
        "sales": 1,
        "legal": -2
      },
      "flags": [
        "need_white_lie"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "white_lie_interest"
        }
      ]
    },
    "right": {
      "label": "必须讲",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "tell_full_story"
      ],
      "schedule": []
    }
  },
  {
    "id": "strategy_slide_spin",
    "phase": [
      "late"
    ],
    "weight": 5,
    "role": "战略负责人",
    "avatar": "🧭",
    "title": "这页战略图要更漂亮",
    "desc": "方向没有那么清楚，但大家都想看到确定性。",
    "tags": [
      "政治",
      "老板"
    ],
    "pack": "政治",
    "left": {
      "label": "先画大一点",
      "effect": {
        "cash": 2,
        "growth": 2,
        "trust": -3
      },
      "hidden": {
        "politicalHeat": 4,
        "riskExposure": 3
      },
      "relations": {
        "boss": 1,
        "sales": 1,
        "legal": -2
      },
      "flags": [
        "strategy_slide_spin"
      ],
      "schedule": []
    },
    "right": {
      "label": "按真实节奏写",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 5
      },
      "relations": {
        "finance": 2,
        "legal": 2,
        "boss": -1
      },
      "flags": [
        "strategy_realism"
      ],
      "schedule": []
    }
  },
  {
    "id": "cross_function_war",
    "phase": [
      "mid",
      "late"
    ],
    "weight": 5,
    "role": "财务BP",
    "avatar": "🔥",
    "title": "跨部门开始公开对线",
    "desc": "如果今天没人收口，后面只会更难合作。",
    "tags": [
      "政治",
      "团队"
    ],
    "pack": "政治",
    "left": {
      "label": "我来收口",
      "effect": {
        "trust": 3,
        "team": -2,
        "cash": -3
      },
      "hidden": {
        "politicalHeat": 6,
        "riskExposure": -1
      },
      "relations": {
        "boss": 2,
        "legal": 2,
        "sales": -2
      },
      "flags": [
        "cross_function_war"
      ],
      "schedule": []
    },
    "right": {
      "label": "先散会",
      "effect": {
        "cash": 3,
        "trust": -4
      },
      "hidden": {
        "politicalHeat": 2,
        "bossDependency": 2
      },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "postpone_conflict"
      ],
      "schedule": []
    }
  }
];
