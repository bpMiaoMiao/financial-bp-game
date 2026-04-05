export const chainEvents = [
  {
    "id": "cash_alert",
    "priority": 10,
    "role": "资金经理",
    "avatar": "🚨",
    "title": "账上这点钱，最多只够再撑一个半月。",
    "desc": "资金经理把现金表转过来，像在提醒你前面的乐观已经到期了。",
    "conditions": {
      "allFlags": [
        "long_terms"
      ],
      "hiddenMin": {
        "executionDebt": 22
      }
    },
    "left": {
      "label": "全面收缩",
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
        "hard_cut"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续冲",
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
        "double_down"
      ],
      "schedule": []
    }
  },
  {
    "id": "collection_crunch",
    "priority": 9,
    "role": "应收主管",
    "avatar": "📬",
    "title": "这些客户像商量好了一样，谁都不急着打款。",
    "desc": "应收主管没再绕弯，直接把回款表摊到你面前。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "long_terms",
            "bad_debt_signal"
          ]
        },
        {
          "statMax": {
            "cash": 34
          },
          "hiddenMin": {
            "riskExposure": 34
          }
        }
      ]
    },
    "left": {
      "label": "收紧授信",
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
        "credit_control"
      ],
      "schedule": []
    },
    "right": {
      "label": "再给空间",
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
        "keep_shipping"
      ],
      "schedule": []
    }
  },
  {
    "id": "supplier_stop_ship",
    "priority": 9,
    "role": "采购经理",
    "avatar": "🛑",
    "title": "供应商真停了，前面省下的钱现在开始反咬你。",
    "desc": "采购经理把停发通知递过来，语气里一点余地都没有。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "supplier_pressure",
            "delay_supplier_payment"
          ]
        },
        {
          "allFlags": [
            "advance_payment",
            "supplier_moq"
          ],
          "statMax": {
            "cash": 36
          }
        }
      ]
    },
    "left": {
      "label": "先打款保供",
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
        "save_supply"
      ],
      "schedule": []
    },
    "right": {
      "label": "接受停发",
      "effect": {
        "cash": 8,
        "team": -3,
        "trust": -1
      },
      "hidden": {
        "riskExposure": 2,
        "politicalHeat": 1
      },
      "relations": {
        "finance": 2,
        "hr": -1
      },
      "flags": [
        "supply_break"
      ],
      "schedule": []
    }
  },
  {
    "id": "payroll_crunch",
    "priority": 9,
    "role": "HRBP",
    "avatar": "⏳",
    "title": "还没到发薪日，下面已经开始在互相打听了。",
    "desc": "HRBP说得很轻，但你知道这意味着组织已经闻到味了。",
    "conditions": {
      "allFlags": [
        "payroll_watch"
      ],
      "statMax": {
        "cash": 30
      }
    },
    "left": {
      "label": "先补现金",
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
        "save_payroll"
      ],
      "schedule": []
    },
    "right": {
      "label": "先晚几天",
      "effect": {
        "cash": 8,
        "team": -3,
        "trust": -1
      },
      "hidden": {
        "orgFatigue": 3,
        "politicalHeat": 2
      },
      "relations": {
        "finance": 2,
        "hr": -1
      },
      "flags": [
        "delay_payroll"
      ],
      "schedule": []
    }
  },
  {
    "id": "runway_bridge",
    "priority": 8,
    "role": "老板",
    "avatar": "🪜",
    "title": "按现在这烧法，跑道可能连一个季度都撑不满。",
    "desc": "老板第一次不讲故事了，只问你还能拖多久。",
    "conditions": {
      "statMax": {
        "cash": 26
      },
      "statMin": {
        "growth": 54
      }
    },
    "left": {
      "label": "先借桥",
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
        "runway_bridge"
      ],
      "schedule": []
    },
    "right": {
      "label": "先收战线",
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
        "shrink_front"
      ],
      "schedule": []
    }
  },
  {
    "id": "board_cash_probe",
    "priority": 8,
    "role": "董事",
    "avatar": "🧾",
    "title": "董事不再看增长了，开始盯着你问钱在哪。",
    "desc": "场面还算客气，但问题已经不再是表上那层热闹。",
    "conditions": {
      "roundMin": 7,
      "statMax": {
        "cash": 38
      },
      "statMin": {
        "trust": 42
      }
    },
    "left": {
      "label": "讲真结构",
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
        "cash_probe_truth"
      ],
      "schedule": []
    },
    "right": {
      "label": "先讲故事",
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
        "cash_probe_story"
      ],
      "schedule": []
    }
  },
  {
    "id": "resignation",
    "priority": 9,
    "role": "核心BP",
    "avatar": "📨",
    "title": "他这次不是抱怨，是真把离职单放你桌上了。",
    "desc": "你知道这不是一个人的情绪，是前面很多轮透支一起到了点。",
    "conditions": {
      "alternatives": [
        {
          "hiddenMin": {
            "orgFatigue": 42
          }
        },
        {
          "allFlags": [
            "freeze_hiring",
            "burn_team"
          ]
        }
      ]
    },
    "left": {
      "label": "留",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6
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
      "label": "放",
      "effect": {
        "cash": 7,
        "team": -9
      },
      "hidden": {
        "orgFatigue": 8,
        "politicalHeat": 2
      },
      "relations": {
        "hr": -4,
        "finance": -2
      },
      "flags": [
        "lose_core"
      ],
      "schedule": []
    }
  },
  {
    "id": "finance_meltdown",
    "priority": 9,
    "role": "财务分析师",
    "avatar": "🫠",
    "title": "财务这边快绷不住了，所有烂活一起压过来了。",
    "desc": "分析师说这话的时候，已经连装镇定都懒得装了。",
    "conditions": {
      "hiddenMin": {
        "orgFatigue": 46,
        "executionDebt": 28
      }
    },
    "left": {
      "label": "砍需求保人",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -6,
        "executionDebt": -3
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
      "label": "继续硬顶",
      "effect": {
        "cash": 7,
        "team": -9
      },
      "hidden": {
        "orgFatigue": 8,
        "executionDebt": 3
      },
      "relations": {
        "hr": -4,
        "finance": -2
      },
      "flags": [
        "burn_team"
      ],
      "schedule": []
    }
  },
  {
    "id": "manager_walkout",
    "priority": 8,
    "role": "中层经理",
    "avatar": "🚪",
    "title": "中层准备一起摊牌",
    "desc": "他们不是不干，是不想再在同一套逻辑里干。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "middle_manager_blame",
            "performance_push"
          ]
        },
        {
          "allFlags": [
            "performance_delay"
          ],
          "hiddenMin": {
            "politicalHeat": 34
          }
        },
        {
          "allFlags": [
            "performance_delay"
          ],
          "hiddenMin": {
            "orgFatigue": 34
          }
        }
      ]
    },
    "left": {
      "label": "马上沟通",
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
        "manager_walkout"
      ],
      "schedule": []
    },
    "right": {
      "label": "先不回应",
      "effect": {
        "cash": 3,
        "trust": -4
      },
      "hidden": {
        "politicalHeat": 2
      },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "manager_cold"
      ],
      "schedule": []
    }
  },
  {
    "id": "culture_split",
    "priority": 8,
    "role": "HRD",
    "avatar": "🧩",
    "title": "团队开始分成两派",
    "desc": "一派要结果，一派要边界，彼此已经听不进去。",
    "conditions": {
      "alternatives": [
        {
          "statMax": {
            "team": 38
          },
          "hiddenMin": {
            "politicalHeat": 38
          }
        },
        {
          "allFlags": [
            "weekend_overtime",
            "ceo_weekend_call"
          ],
          "hiddenMin": {
            "orgFatigue": 34
          }
        },
        {
          "allFlags": [
            "burn_team",
            "ceo_weekend_call"
          ],
          "hiddenMin": {
            "orgFatigue": 36
          }
        }
      ]
    },
    "left": {
      "label": "重建规则",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -4,
        "politicalHeat": -5
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "culture_repair"
      ],
      "schedule": []
    },
    "right": {
      "label": "先压住",
      "effect": {
        "cash": 7,
        "team": -9
      },
      "hidden": {
        "orgFatigue": 4,
        "politicalHeat": 6
      },
      "relations": {
        "hr": -4,
        "finance": -2
      },
      "flags": [
        "culture_split"
      ],
      "schedule": []
    }
  },
  {
    "id": "boss_dependency",
    "priority": 8,
    "role": "老板",
    "avatar": "🪑",
    "title": "这事你拍吧，我信你。",
    "desc": "老板把灰区轻轻一推，像信任，也像把边界一并推给你。",
    "conditions": {
      "alternatives": [
        {
          "relationMin": {
            "boss": 66
          },
          "hiddenMin": {
            "bossDependency": 40
          }
        },
        {
          "allFlags": [
            "cross_line_approval"
          ],
          "relationMin": {
            "boss": 58
          },
          "hiddenMin": {
            "bossDependency": 32
          }
        }
      ]
    },
    "left": {
      "label": "接",
      "effect": {
        "trust": 4,
        "growth": 2,
        "team": -1
      },
    "hidden": {
      "bossDependency": 3
    },
      "relations": {
        "boss": 3,
        "sales": 1
      },
      "flags": [
        "boss_confidant"
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
      "bossDependency": -4
    },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "protect_boundary"
      ],
      "schedule": []
    }
  },
  {
    "id": "stand_side",
    "priority": 8,
    "role": "老板",
    "avatar": "⚖️",
    "title": "这回你得站一边",
    "desc": "老板希望你明确支持他选的方向。",
    "conditions": {
      "hiddenMin": {
        "politicalHeat": 40
      },
      "relationMin": {
        "boss": 58
      }
    },
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
        "stand_side"
      ],
      "schedule": []
    },
    "right": {
      "label": "不站队",
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
        "stay_professional"
      ],
      "schedule": []
    }
  },
  {
    "id": "promise_settlement",
    "priority": 8,
    "role": "老板助理",
    "avatar": "📣",
    "title": "之前放出去的话开始追债",
    "desc": "当时谁都想先把场面稳住，现在轮到兑现。",
    "conditions": {
      "roundMin": 7,
      "alternatives": [
        {
          "allFlags": [
            "public_promise"
          ]
        },
        {
          "allFlags": [
            "board_deck_polish"
          ],
          "hiddenMin": {
            "bossDependency": 30
          }
        },
        {
          "allFlags": [
            "sign_fast"
          ],
          "hiddenMin": {
            "bossDependency": 34
          }
        }
      ]
    },
    "left": {
      "label": "先补承诺",
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
        "promise_patch"
      ],
      "schedule": []
    },
    "right": {
      "label": "重新校准",
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
        "promise_reset"
      ],
      "schedule": []
    }
  },
  {
    "id": "owner_override",
    "priority": 8,
    "role": "老板",
    "avatar": "🧨",
    "title": "老板绕过你直接拍了",
    "desc": "你辛苦搭的边界，被一句话越过去。",
    "conditions": {
      "hiddenMin": {
        "bossDependency": 50
      },
      "statMin": {
        "trust": 58
      }
    },
    "left": {
      "label": "跟上执行",
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
        "owner_override"
      ],
      "schedule": []
    },
    "right": {
      "label": "把风险留痕",
      "effect": {
        "trust": -3,
        "team": 4
      },
    "hidden": {
      "bossDependency": -4
    },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "owner_risk_note"
      ],
      "schedule": []
    }
  },
  {
    "id": "trust_crack",
    "priority": 8,
    "role": "老板",
    "avatar": "🧊",
    "title": "老板开始不太信你了",
    "desc": "不是公开翻脸，但明显已经不再优先听你。",
    "conditions": {
      "statMax": {
        "trust": 38
      },
      "hiddenMin": {
        "bossDependency": 24
      }
    },
    "left": {
      "label": "重新贴近",
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
        "rebuild_trust"
      ],
      "schedule": []
    },
    "right": {
      "label": "保持距离",
      "effect": {
        "trust": -3,
        "team": 4
      },
    "hidden": {
      "bossDependency": -4
    },
      "relations": {
        "boss": -3,
        "hr": 1
      },
      "flags": [
        "cool_relation"
      ],
      "schedule": []
    }
  },
  {
    "id": "customer_backlash",
    "priority": 8,
    "role": "客服主管",
    "avatar": "💥",
    "title": "客户投诉开始连片出现",
    "desc": "质量、交付、售后几个问题一起爆了。",
    "conditions": {
      "hiddenMax": {
        "customerTrust": 38
      }
    },
    "left": {
      "label": "补救",
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
        "control_risk"
      ],
      "schedule": []
    },
    "right": {
      "label": "先压着",
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
        "avoid_conflict"
      ],
      "schedule": []
    }
  },
  {
    "id": "margin_truth_day",
    "priority": 8,
    "role": "老板",
    "avatar": "🧾",
    "title": "量这么好看，钱怎么还是没留下来？",
    "desc": "老板终于把那句所有人都在回避的话，当面问了出来。",
    "conditions": {
      "hiddenMax": {
        "marginHealth": 38
      },
      "statMin": {
        "growth": 58
      }
    },
    "left": {
      "label": "讲真话",
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
        "deep_analysis"
      ],
      "schedule": []
    },
    "right": {
      "label": "先讲规模",
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
        "avoid_conflict"
      ],
      "schedule": []
    }
  },
  {
    "id": "price_war_spiral",
    "priority": 8,
    "role": "平台运营",
    "avatar": "🌀",
    "title": "价格战开始失控",
    "desc": "你原本只是想抢一波，现在行业都跟进了。",
    "conditions": {
      "allFlags": [
        "heavy_discount",
        "marketplace_coupon"
      ]
    },
    "left": {
      "label": "先止血",
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
        "price_war_stop"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续跟",
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
        "price_war_follow"
      ],
      "schedule": []
    }
  },
  {
    "id": "channel_dumping",
    "priority": 8,
    "role": "渠道经理",
    "avatar": "📉",
    "title": "渠道开始低价甩货了，前面压出去的货在回头抽你。",
    "desc": "渠道经理脸色很差，像终于承认这波已经压不住了。",
    "conditions": {
      "allFlags": [
        "channel_rebate",
        "inventory_push"
      ]
    },
    "left": {
      "label": "立刻控价",
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
        "channel_control"
      ],
      "schedule": []
    },
    "right": {
      "label": "先放着卖",
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
        "channel_blind"
      ],
      "schedule": []
    }
  },
  {
    "id": "vip_client_threat",
    "priority": 8,
    "role": "KA负责人",
    "avatar": "📞",
    "title": "核心客户说要换供应商",
    "desc": "不是因为价格，而是开始怀疑你交付不稳。",
    "conditions": {
      "hiddenMax": {
        "customerTrust": 42
      },
      "hiddenMin": {
        "riskExposure": 28
      }
    },
    "left": {
      "label": "先稳客户",
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
        "vip_client_save"
      ],
      "schedule": []
    },
    "right": {
      "label": "让销售再谈",
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
        "vip_client_talk"
      ],
      "schedule": []
    }
  },
  {
    "id": "inventory_lock",
    "priority": 8,
    "role": "供应链总监",
    "avatar": "🔒",
    "title": "仓里看着很满，账户里却快被锁干了。",
    "desc": "供应链总监把盘点表和现金表并排给你看，意思再明白不过。",
    "conditions": {
      "allFlags": [
        "inventory_push",
        "supplier_moq"
      ],
      "statMax": {
        "cash": 38
      }
    },
    "left": {
      "label": "清库存",
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
        "inventory_unlock"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续扛",
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
        "inventory_lock"
      ],
      "schedule": []
    }
  },
  {
    "id": "warehouse_overflow",
    "priority": 8,
    "role": "仓储经理",
    "avatar": "🏚️",
    "title": "仓里已经挤爆了",
    "desc": "再不调整，错发漏发就是时间问题。",
    "conditions": {
      "allFlags": [
        "warehouse_transfer",
        "inventory_push"
      ]
    },
    "left": {
      "label": "加班加人清仓",
      "effect": {
        "team": 10,
        "cash": -8,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -5
      },
      "relations": {
        "hr": 3,
        "finance": 2
      },
      "flags": [
        "warehouse_rescue"
      ],
      "schedule": []
    },
    "right": {
      "label": "先暂停收货",
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
        "warehouse_pause"
      ],
      "schedule": []
    }
  },
  {
    "id": "seasonal_hangover",
    "priority": 7,
    "role": "商品经理",
    "avatar": "🍃",
    "title": "季节货开始压身上",
    "desc": "当时押得很笃定，现在每一天都在贬值。",
    "conditions": {
      "allFlags": [
        "festival_promo",
        "seasonal_bet"
      ],
      "roundMin": 7
    },
    "left": {
      "label": "立刻出清",
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
        "seasonal_hangover"
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
        "hold_seasonal"
      ],
      "schedule": []
    }
  },
  {
    "id": "forecast_trust_break",
    "priority": 7,
    "role": "老板",
    "avatar": "📉",
    "title": "没人再信预测了",
    "desc": "每次都解释说情况变了，但大家已经不买账。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "gmv_target",
            "manual_forecast"
          ],
          "hiddenMax": {
            "dataMaturity": 32
          }
        },
        {
          "allFlags": [
            "month_end_patch",
            "silent_fix"
          ],
          "hiddenMax": {
            "dataMaturity": 34
          }
        },
        {
          "allFlags": [
            "report_error",
            "month_end_patch"
          ],
          "hiddenMax": {
            "dataMaturity": 36
          }
        }
      ]
    },
    "left": {
      "label": "重做预测体系",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -5
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "forecast_rebuild"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续人工兜",
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
        "forecast_patch"
      ],
      "schedule": []
    }
  },
  {
    "id": "data_escalation",
    "priority": 8,
    "role": "财务总监",
    "avatar": "🧠",
    "title": "现在大家争的已经不是数，是谁有资格定义那套数。",
    "desc": "财务总监把话说透了，你也知道这事再也回不到技术问题。",
    "conditions": {
      "alternatives": [
        {
          "hiddenMin": {
            "executionDebt": 34
          },
          "hiddenMax": {
            "dataMaturity": 32
          }
        },
        {
          "allFlags": [
            "avoid_conflict",
            "silent_fix"
          ],
          "hiddenMin": {
            "executionDebt": 28
          }
        },
        {
          "allFlags": [
            "manual_reconcile",
            "month_end_patch"
          ],
          "hiddenMin": {
            "executionDebt": 28
          }
        }
      ]
    },
    "left": {
      "label": "统一机制",
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
        "data_governance"
      ],
      "schedule": []
    },
    "right": {
      "label": "先让业务跑",
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
        "data_loose"
      ],
      "schedule": []
    }
  },
  {
    "id": "close_failure",
    "priority": 8,
    "role": "财务经理",
    "avatar": "📚",
    "title": "月结正式失败",
    "desc": "不是晚一点的问题，是已经没人相信这轮数了。",
    "conditions": {
      "alternatives": [
        {
          "roundMin": 8,
          "hiddenMin": {
            "executionDebt": 38
          },
          "statMax": {
            "team": 45
          }
        },
        {
          "roundMin": 7,
          "allFlags": [
            "close_rush",
            "manual_reconcile"
          ],
          "hiddenMin": {
            "executionDebt": 28
          }
        },
        {
          "roundMin": 7,
          "allFlags": [
            "close_rush",
            "month_end_patch"
          ],
          "hiddenMin": {
            "executionDebt": 30
          }
        }
      ]
    },
    "left": {
      "label": "停下来重做",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -5
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "close_failure"
      ],
      "schedule": []
    },
    "right": {
      "label": "先交版本",
      "effect": {
        "cash": 7,
        "team": -9
      },
      "hidden": {
        "orgFatigue": 3,
        "executionDebt": 5
      },
      "relations": {
        "hr": -4,
        "finance": -2
      },
      "flags": [
        "submit_dirty_close"
      ],
      "schedule": []
    }
  },
  {
    "id": "audit_shock",
    "priority": 8,
    "role": "审计经理",
    "avatar": "🔦",
    "title": "审计把那个例外点出来了，现在不是解释两句能过的。",
    "desc": "之前你们都说还能圆，现在它已经正式变成一页说明材料。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "audit_entry",
            "compliance_exception"
          ]
        },
        {
          "allFlags": [
            "audit_entry"
          ],
          "hiddenMin": {
            "riskExposure": 34
          }
        },
        {
          "allFlags": [
            "compliance_exception"
          ],
          "hiddenMin": {
            "riskExposure": 38
          }
        },
        {
          "hiddenMin": {
            "riskExposure": 45
          }
        }
      ]
    },
    "left": {
      "label": "立刻补证据",
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
        "audit_shock"
      ],
      "schedule": []
    },
    "right": {
      "label": "先降影响",
      "effect": {
        "cash": 3,
        "trust": -4
      },
    "hidden": {
      "politicalHeat": 2,
    },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "audit_spin"
      ],
      "schedule": []
    }
  },
  {
    "id": "boardroom_illusion",
    "priority": 8,
    "role": "老板",
    "avatar": "🎬",
    "title": "会上每个人都在讲好消息，只有你知道底下已经松了。",
    "desc": "气氛越轻松，你越清楚再不打断，后面就只会更难讲。",
    "conditions": {
      "alternatives": [
        {
          "roundMin": 9,
          "hiddenMin": {
            "executionDebt": 30
          }
        },
        {
          "allFlags": [
            "investor_story",
            "meeting_rewrite"
          ],
          "hiddenMin": {
            "bossDependency": 32
          }
        },
        {
          "allFlags": [
            "shadow_committee"
          ],
          "hiddenMin": {
            "politicalHeat": 34
          }
        }
      ]
    },
    "left": {
      "label": "现在打断",
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
        "professional_pushback"
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
    },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "avoid_conflict"
      ],
      "schedule": []
    }
  },
  {
    "id": "project_blackhole",
    "priority": 7,
    "role": "项目经理",
    "avatar": "🕳️",
    "title": "这个项目开始吞预算了，当初点头有多快，现在就有多痛。",
    "desc": "项目经理每周都来补一个洞，像在提醒你前面的草率还没算完。",
    "conditions": {
      "allFlags": [
        "owner_friend_project",
        "favored_vendor"
      ]
    },
    "left": {
      "label": "立即止损",
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
        "project_blackhole"
      ],
      "schedule": []
    },
    "right": {
      "label": "再顶一段",
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
        "project_keepalive"
      ],
      "schedule": []
    }
  },
  {
    "id": "blame_meeting",
    "priority": 7,
    "role": "老板",
    "avatar": "🪓",
    "title": "本来是来救火的，结果这场会直接开成了追责。",
    "desc": "你心里很清楚，今天谁被留在台上，后面谁就很难再下来。",
    "conditions": {
      "alternatives": [
        {
          "hiddenMin": {
            "politicalHeat": 45
          },
          "statMin": {
            "trust": 40
          }
        },
        {
          "allFlags": [
            "take_project_blame"
          ],
          "hiddenMin": {
            "politicalHeat": 34
          }
        },
        {
          "allFlags": [
            "private_chat_leak"
          ],
          "hiddenMin": {
            "politicalHeat": 34
          }
        }
      ]
    },
    "left": {
      "label": "保规则",
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
        "blame_meeting"
      ],
      "schedule": []
    },
    "right": {
      "label": "保场面",
      "effect": {
        "cash": 3,
        "trust": -4
      },
    "hidden": {
      "politicalHeat": 2,
    },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "save_face"
      ],
      "schedule": []
    }
  },
  {
    "id": "legal_red_flag",
    "priority": 7,
    "role": "法务顾问",
    "avatar": "🚩",
    "title": "法务已经亮红牌了，这事再往前就不是经营问题了。",
    "desc": "法务顾问没有抬音量，但全场都知道这次不是提醒。",
    "conditions": {
      "alternatives": [
        {
          "hiddenMin": {
            "riskExposure": 52
          },
          "relationMax": {
            "legal": 46
          }
        },
        {
          "allFlags": [
            "compliance_exception"
          ],
          "hiddenMin": {
            "riskExposure": 40
          }
        },
        {
          "allFlags": [
            "favored_vendor"
          ],
          "hiddenMin": {
            "riskExposure": 38
          }
        },
        {
          "allFlags": [
            "favor_pass"
          ],
          "hiddenMin": {
            "riskExposure": 34
          }
        }
      ]
    },
    "left": {
      "label": "马上收口",
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
        "legal_red_flag"
      ],
      "schedule": []
    },
    "right": {
      "label": "先做完这单",
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
        "ignore_legal"
      ],
      "schedule": []
    }
  },
  {
    "id": "white_lie_exposed",
    "priority": 7,
    "role": "老板助理",
    "avatar": "🫥",
    "title": "之前那句没讲全的话，现在被人正面问回来了。",
    "desc": "当时省掉的一点尴尬，现在已经长成整场会的重心。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "need_white_lie",
            "strategy_slide_spin"
          ]
        },
        {
          "allFlags": [
            "need_white_lie",
            "board_deck_polish"
          ]
        },
        {
          "allFlags": [
            "need_white_lie",
            "silent_fix"
          ]
        }
      ]
    },
    "left": {
      "label": "补全真相",
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
        "white_lie_exposed"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续圆",
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
        "double_white_lie"
      ],
      "schedule": []
    }
  },
  {
    "id": "vendor_interest_probe",
    "priority": 7,
    "role": "采购经理",
    "avatar": "🧾",
    "title": "外部开始问供应商关系",
    "desc": "事情未必有问题，但解释成本已经很高。",
    "conditions": {
      "allFlags": [
        "favored_vendor"
      ],
      "hiddenMin": {
        "politicalHeat": 32
      }
    },
    "left": {
      "label": "公开比价",
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
        "vendor_probe"
      ],
      "schedule": []
    },
    "right": {
      "label": "先压一下",
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
        "vendor_cover"
      ],
      "schedule": []
    }
  },
  {
    "id": "customer_refund_wave",
    "priority": 7,
    "role": "售后主管",
    "avatar": "🌊",
    "title": "退款不再是一波波的了，它开始变成一条线往下掉。",
    "desc": "售后主管把趋势线拉给你看，像在说这次真的不是波动。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "refund_ignore"
          ]
        },
        {
          "hiddenMax": {
            "customerTrust": 40
          },
          "hiddenMin": {
            "marginHealth": 30
          }
        }
      ]
    },
    "left": {
      "label": "专项处理",
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
        "refund_rescue"
      ],
      "schedule": []
    },
    "right": {
      "label": "先压成本",
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
        "refund_cost_cut"
      ],
      "schedule": []
    }
  },
  {
    "id": "ops_shadow_process",
    "priority": 7,
    "role": "运营总监",
    "avatar": "🧭",
    "title": "业务自己绕开了流程",
    "desc": "因为他们觉得等你这边太慢。",
    "conditions": {
      "hiddenMin": {
        "executionDebt": 32
      },
      "allFlags": [
        "skip_review"
      ]
    },
    "left": {
      "label": "重建流程",
      "effect": {
        "team": 4,
        "trust": 3,
        "cash": -7
      },
      "hidden": {
        "dataMaturity": 10,
        "executionDebt": -5
      },
      "relations": {
        "ops": 2,
        "finance": 3,
        "boss": 1
      },
      "flags": [
        "ops_process_reset"
      ],
      "schedule": []
    },
    "right": {
      "label": "先默认存在",
      "effect": {
        "cash": 3,
        "trust": -4
      },
    "hidden": {
      "executionDebt": 3,
      "politicalHeat": 1
    },
      "relations": {
        "boss": 1,
        "finance": -2,
        "legal": -1
      },
      "flags": [
        "ops_shadow_process"
      ],
      "schedule": []
    }
  },
  {
    "id": "headcount_frozen_market",
    "priority": 7,
    "role": "HRBP",
    "avatar": "🥶",
    "title": "市场上都知道你们不招了",
    "desc": "后面想再开岗，候选人会先问一句是不是又要停。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "freeze_hiring",
            "salary_guard"
          ]
        },
        {
          "allFlags": [
            "freeze_hiring"
          ],
          "hiddenMin": {
            "orgFatigue": 34
          }
        },
        {
          "allFlags": [
            "hiring_fail"
          ],
          "hiddenMin": {
            "orgFatigue": 30
          }
        }
      ]
    },
    "left": {
      "label": "重新开放招聘",
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
        "reopen_hiring"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续守",
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
        "keep_freeze"
      ],
      "schedule": []
    }
  },
  {
    "id": "office_romance_flashpoint",
    "priority": 8,
    "role": "HRBP",
    "avatar": "🫢",
    "title": "办公室那点事，已经不是私事了。",
    "desc": "汇报线、排班和评价都开始被人往那层关系上想。",
    "conditions": {
      "allFlags": [
        "office_romance_ignored"
      ],
      "hiddenMin": {
        "politicalHeat": 34
      }
    },
    "left": {
      "label": "调岗回避",
      "effect": {
        "team": 2,
        "trust": -1
      },
      "hidden": {
        "politicalHeat": -4,
        "riskExposure": -2
      },
      "relations": {
        "hr": 2,
        "legal": 1
      },
      "flags": [
        "romance_contained"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续压着",
      "effect": {
        "trust": 2,
        "team": -4
      },
      "hidden": {
        "politicalHeat": 6,
        "riskExposure": 5
      },
      "relations": {
        "hr": -2,
        "legal": -2
      },
      "flags": [
        "romance_buried"
      ],
      "schedule": []
    }
  },
  {
    "id": "promotion_revolt",
    "priority": 8,
    "role": "HRBP",
    "avatar": "📣",
    "title": "名单一发，下面就开始说这事早定好了。",
    "desc": "现在已经不只是没升上去的人不服，旁边的人也开始重新判断规则。",
    "conditions": {
      "allFlags": [
        "promotion_rigged"
      ],
      "hiddenMin": {
        "politicalHeat": 34
      }
    },
    "left": {
      "label": "重开评审",
      "effect": {
        "team": 3,
        "trust": -2
      },
    "hidden": {
      "politicalHeat": -3,
    },
      "relations": {
        "hr": 2,
        "boss": -1
      },
      "flags": [
        "rerun_promo"
      ],
      "schedule": []
    },
    "right": {
      "label": "硬压过去",
      "effect": {
        "trust": 2,
        "team": -5
      },
      "hidden": {
        "politicalHeat": 6,
        "orgFatigue": 3
      },
      "relations": {
        "boss": 1,
        "hr": -2
      },
      "flags": [
        "force_promo"
      ],
      "schedule": []
    }
  },
  {
    "id": "nepotism_probe",
    "priority": 8,
    "role": "法务经理",
    "avatar": "🧾",
    "title": "有人开始问，这几笔安排是不是都太“巧”了。",
    "desc": "一旦有人把熟人、费用和供应商放到一张纸上，事情就不会再按人情走。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "nepotism_hire"
          ]
        },
        {
          "allFlags": [
            "favor_pass"
          ]
        },
        {
          "allFlags": [
            "vendor_dinner"
          ]
        }
      ],
      "hiddenMin": {
        "riskExposure": 34
      }
    },
    "left": {
      "label": "立刻自查",
      "effect": {
        "cash": -3,
        "trust": -1
      },
      "hidden": {
        "riskExposure": -5,
        "politicalHeat": 1
      },
      "relations": {
        "legal": 2,
        "finance": 1
      },
      "flags": [
        "self_audit"
      ],
      "schedule": []
    },
    "right": {
      "label": "先压消息",
      "effect": {
        "trust": 2,
        "cash": 1
      },
      "hidden": {
        "riskExposure": 6,
        "politicalHeat": 5
      },
      "relations": {
        "legal": -2,
        "boss": 1
      },
      "flags": [
        "bury_probe"
      ],
      "schedule": []
    }
  },
  {
    "id": "clique_split",
    "priority": 7,
    "role": "中台经理",
    "avatar": "🧩",
    "title": "那个小圈子已经不是抱团，是开始左右资源了。",
    "desc": "项目分配、信息流向和谁先知道，都被几个人悄悄改了顺序。",
    "conditions": {
      "allFlags": [
        "clique_tolerated"
      ],
      "alternatives": [
        {
          "hiddenMin": {
            "orgFatigue": 34
          }
        },
        {
          "hiddenMin": {
            "politicalHeat": 32
          }
        }
      ]
    },
    "left": {
      "label": "拆组重排",
      "effect": {
        "team": 2,
        "cash": -4
      },
      "hidden": {
        "politicalHeat": -2,
        "executionDebt": 1
      },
      "relations": {
        "hr": 1,
        "sales": -1
      },
      "flags": [
        "clique_reset"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续放着",
      "effect": {
        "growth": -3,
        "team": -4
      },
      "hidden": {
        "politicalHeat": 5,
        "orgFatigue": 3
      },
      "relations": {
        "sales": -2,
        "hr": -1
      },
      "flags": [
        "clique_harden"
      ],
      "schedule": []
    }
  },
  {
    "id": "collections_war_room",
    "priority": 9,
    "role": "资金经理",
    "avatar": "📞",
    "title": "今天开始不是做经营，是做催款。",
    "desc": "财务、销售、法务被拉进同一个群里，大家盯着的是同一张应收表。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "keep_shipping",
            "double_down"
          ]
        },
        {
          "allFlags": [
            "keep_shipping",
            "cash_probe_story"
          ]
        },
        {
          "allFlags": [
            "delay_payroll",
            "keep_shipping"
          ],
          "statMax": {
            "cash": 26
          }
        }
      ]
    },
    "left": {
      "label": "全面催收",
      "effect": {
        "cash": 9,
        "growth": -6,
        "trust": -2
      },
      "hidden": {
        "riskExposure": -2,
        "politicalHeat": 1
      },
      "relations": {
        "finance": 3,
        "sales": -3,
        "legal": 1
      },
      "flags": [
        "collections_war_room"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续拖着",
      "effect": {
        "growth": 4,
        "cash": -10,
        "trust": -2
      },
      "hidden": {
        "riskExposure": 5,
        "executionDebt": 2
      },
      "relations": {
        "sales": 2,
        "finance": -3
      },
      "flags": [
        "receivable_spin"
      ],
      "schedule": []
    }
  },
  {
    "id": "default_backstop",
    "priority": 9,
    "role": "老板助理",
    "avatar": "🧷",
    "title": "大家已经默认，灰区最后都会落到你这。",
    "desc": "老板还没开口，其他人已经先把不确定的事往你这边推。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "boss_confidant",
            "promise_patch"
          ]
        },
        {
          "allFlags": [
            "owner_override",
            "boss_confidant"
          ]
        },
        {
          "allFlags": [
            "stand_side",
            "boss_confidant"
          ],
          "hiddenMin": {
            "bossDependency": 52
          }
        }
      ]
    },
    "left": {
      "label": "继续兜住",
      "effect": {
        "trust": 5,
        "growth": 2,
        "team": -4
      },
      "hidden": {
        "bossDependency": 6,
        "politicalHeat": 2
      },
      "relations": {
        "boss": 3,
        "hr": -1
      },
      "flags": [
        "be_backstop"
      ],
      "schedule": []
    },
    "right": {
      "label": "把边界写清",
      "effect": {
        "trust": -4,
        "team": 3
      },
      "hidden": {
        "bossDependency": -6,
        "dataMaturity": 2
      },
      "relations": {
        "boss": -3,
        "legal": 2
      },
      "flags": [
        "boundary_reset"
      ],
      "schedule": []
    }
  },
  {
    "id": "numbers_hearing",
    "priority": 9,
    "role": "财务总监",
    "avatar": "🎯",
    "title": "这次不是要版本，是要解释为什么每个版本都不一样。",
    "desc": "会议开始对着同一个数字争来历，数字本身已经失去保护你的位置。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "forecast_patch",
            "data_loose"
          ]
        },
        {
          "allFlags": [
            "submit_dirty_close",
            "data_loose"
          ]
        },
        {
          "allFlags": [
            "forecast_patch",
            "avoid_conflict"
          ],
          "hiddenMin": {
            "executionDebt": 34
          }
        }
      ]
    },
    "left": {
      "label": "统一口径",
      "effect": {
        "trust": -3,
        "cash": -2,
        "team": -1
      },
      "hidden": {
        "dataMaturity": 5,
        "executionDebt": -3
      },
      "relations": {
        "finance": 3,
        "boss": -1
      },
      "flags": [
        "numbers_hearing"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续圆过去",
      "effect": {
        "trust": 2,
        "growth": 2
      },
      "hidden": {
        "dataMaturity": -5,
        "politicalHeat": 3,
        "bossDependency": 2
      },
      "relations": {
        "boss": 2,
        "finance": -3
      },
      "flags": [
        "spin_numbers"
      ],
      "schedule": []
    }
  },
  {
    "id": "quiet_quitting",
    "priority": 8,
    "role": "HRD",
    "avatar": "🫥",
    "title": "没人提离职，但也没人真在往前推了。",
    "desc": "会照开、活照做，只是大家都开始只做能留下痕迹的那部分。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "keep_freeze",
            "culture_split"
          ]
        },
        {
          "allFlags": [
            "manager_cold",
            "burn_team"
          ]
        },
        {
          "allFlags": [
            "lose_core",
            "culture_split"
          ]
        }
      ]
    },
    "left": {
      "label": "补人补钱",
      "effect": {
        "cash": -8,
        "team": 5,
        "trust": 1
      },
      "hidden": {
        "orgFatigue": -5,
        "executionDebt": -2
      },
      "relations": {
        "hr": 3,
        "finance": 1
      },
      "flags": [
        "thaw_team"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续压强度",
      "effect": {
        "cash": 3,
        "team": -6,
        "growth": -2
      },
      "hidden": {
        "orgFatigue": 6,
        "politicalHeat": 2
      },
      "relations": {
        "hr": -3,
        "sales": -1
      },
      "flags": [
        "quiet_quit"
      ],
      "schedule": []
    }
  },
  {
    "id": "channel_revolt",
    "priority": 8,
    "role": "渠道经理",
    "avatar": "📦",
    "title": "渠道已经不等你的规则了，开始自己找活路。",
    "desc": "价盘还挂在墙上，真实成交价已经在群里另走一套。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "channel_blind",
            "price_war_follow"
          ]
        },
        {
          "allFlags": [
            "channel_blind",
            "inventory_lock"
          ]
        },
        {
          "allFlags": [
            "price_war_follow",
            "inventory_lock"
          ]
        }
      ]
    },
    "left": {
      "label": "强行收口",
      "effect": {
        "growth": -5,
        "cash": -3,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 3,
        "customerTrust": 1
      },
      "relations": {
        "sales": -2,
        "finance": 1
      },
      "flags": [
        "channel_cleanup"
      ],
      "schedule": []
    },
    "right": {
      "label": "默认放开",
      "effect": {
        "growth": 4,
        "cash": 2
      },
      "hidden": {
        "marginHealth": -5,
        "customerTrust": -2,
        "politicalHeat": 2
      },
      "relations": {
        "sales": 2,
        "finance": -2
      },
      "flags": [
        "channel_freefall"
      ],
      "schedule": []
    }
  },
  {
    "id": "inventory_writeoff_day",
    "priority": 8,
    "role": "财务经理",
    "avatar": "🏷️",
    "title": "这批货今天不只是占仓，要正式进减值了。",
    "desc": "之前还可以解释成慢，现在得把损失正经写进表里。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "warehouse_pause",
            "hold_seasonal"
          ]
        },
        {
          "allFlags": [
            "inventory_lock",
            "warehouse_pause"
          ]
        },
        {
          "allFlags": [
            "seasonal_hangover",
            "inventory_lock"
          ]
        }
      ]
    },
    "left": {
      "label": "认减值",
      "effect": {
        "cash": -7,
        "trust": -2
      },
      "hidden": {
        "marginHealth": 3,
        "riskExposure": -1
      },
      "relations": {
        "finance": 2,
        "boss": -1
      },
      "flags": [
        "inventory_writeoff_day"
      ],
      "schedule": []
    },
    "right": {
      "label": "先挪着放",
      "effect": {
        "cash": -2,
        "trust": 1
      },
      "hidden": {
        "executionDebt": 3,
        "marginHealth": -4
      },
      "relations": {
        "ops": 1,
        "finance": -2
      },
      "flags": [
        "stash_dead_stock"
      ],
      "schedule": []
    }
  },
  {
    "id": "audit_committee",
    "priority": 9,
    "role": "审计经理",
    "avatar": "🧨",
    "title": "这事被单独拉成专项了。",
    "desc": "它已经不是一张单子、一次解释能过的事，而是有人开始系统地看你们到底怎么做事。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "audit_spin",
            "bury_probe"
          ]
        },
        {
          "allFlags": [
            "ignore_legal",
            "vendor_cover"
          ]
        },
        {
          "allFlags": [
            "double_white_lie",
            "audit_spin"
          ]
        },
        {
          "allFlags": [
            "legal_red_flag",
            "audit_spin"
          ]
        }
      ]
    },
    "left": {
      "label": "全面自查",
      "effect": {
        "cash": -5,
        "trust": -3
      },
      "hidden": {
        "riskExposure": -6,
        "politicalHeat": 2
      },
      "relations": {
        "legal": 3,
        "finance": 2
      },
      "flags": [
        "audit_committee"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续灭火",
      "effect": {
        "trust": 1,
        "cash": 2
      },
      "hidden": {
        "riskExposure": 7,
        "bossDependency": 2,
        "politicalHeat": 3
      },
      "relations": {
        "boss": 1,
        "legal": -3
      },
      "flags": [
        "audit_smother"
      ],
      "schedule": []
    }
  },
  {
    "id": "buffer_role_reveal",
    "priority": 8,
    "role": "财务总监",
    "avatar": "🪞",
    "title": "你突然发现，大家找你的不是判断，是缓冲。",
    "desc": "能解释的你先解释，能接住的你先接住，久了以后，大家像忘了这本来不是你的职责。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "go_explain",
            "version_first"
          ]
        },
        {
          "allFlags": [
            "catch_between",
            "explain_not_decide"
          ]
        },
        {
          "allFlags": [
            "default_receiver",
            "seat_routine"
          ]
        }
      ]
    },
    "left": {
      "label": "继续接住",
      "effect": {
        "trust": 2,
        "growth": 2,
        "team": -3
      },
      "hidden": {
        "bossDependency": 3,
        "politicalHeat": 2
      },
      "relations": {
        "boss": 2,
        "sales": 1
      },
      "flags": [
        "be_buffer"
      ],
      "schedule": []
    },
    "right": {
      "label": "把话说破",
      "effect": {
        "trust": -3,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 3,
        "bossDependency": -2
      },
      "relations": {
        "boss": -2,
        "finance": 2
      },
      "flags": [
        "reject_buffer"
      ],
      "schedule": []
    }
  },
  {
    "id": "seat_without_power",
    "priority": 9,
    "role": "HRD",
    "avatar": "🪑",
    "title": "你坐在会上，但这个位置从来没真正把决定权给过你。",
    "desc": "你离问题很近，离拍板却始终差着那半步。越往中间站，越像是为了替别人先接掉那一下。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "be_buffer",
            "temporary_plug"
          ]
        },
        {
          "allFlags": [
            "default_receiver",
            "explain_not_decide"
          ]
        },
        {
          "allFlags": [
            "seat_routine",
            "go_explain"
          ],
          "hiddenMin": {
            "bossDependency": 40
          }
        }
      ]
    },
    "left": {
      "label": "继续扛住",
      "effect": {
        "trust": 3,
        "team": -4
      },
      "hidden": {
        "bossDependency": 4,
        "orgFatigue": 3
      },
      "relations": {
        "boss": 2,
        "hr": -1
      },
      "flags": [
        "seat_without_power"
      ],
      "schedule": []
    },
    "right": {
      "label": "不再代接",
      "effect": {
        "trust": -4,
        "team": 2
      },
      "hidden": {
        "bossDependency": -4,
        "dataMaturity": 2
      },
      "relations": {
        "boss": -3,
        "legal": 1
      },
      "flags": [
        "drop_buffer_mask"
      ],
      "schedule": []
    }
  },
  {
    "id": "replacement_ready",
    "priority": 9,
    "role": "新分析师",
    "avatar": "🗂️",
    "title": "你第一次发现，他们已经在按这个位置的下一个人做准备了。",
    "desc": "交接模板是现成的，口径话术是现成的，甚至连“先把这段顶过去”这句话，都像是说过不止一遍。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "seat_without_power",
            "seat_cost"
          ]
        },
        {
          "allFlags": [
            "be_buffer",
            "normal_turnover",
            "temporary_plug"
          ]
        },
        {
          "allFlags": [
            "seat_without_power",
            "temporary_plug"
          ],
          "hiddenMin": {
            "orgFatigue": 42
          }
        }
      ]
    },
    "left": {
      "label": "把这轮做完",
      "effect": {
        "cash": 2,
        "trust": 1,
        "team": -3
      },
      "hidden": {
        "orgFatigue": 4,
        "bossDependency": 2
      },
      "relations": {
        "boss": 1,
        "hr": -1
      },
      "flags": [
        "finish_this_turn"
      ],
      "schedule": []
    },
    "right": {
      "label": "留一句真话",
      "effect": {
        "trust": -2,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 3,
        "politicalHeat": 2
      },
      "relations": {
        "finance": 2,
        "hr": 1,
        "boss": -1
      },
      "flags": [
        "leave_note"
      ],
      "schedule": []
    }
  },
  {
    "id": "paper_runway",
    "priority": 9,
    "role": "资金经理",
    "avatar": "🪫",
    "title": "账上看着还能转，实际上全靠一笔笔往后挪。",
    "desc": "回款、借款和内部调拨被你们拼成了一条表面还在运转的跑道，但谁都知道那不是正常飞法。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "long_terms",
            "bridge_loan"
          ]
        },
        {
          "allFlags": [
            "bad_debt_signal",
            "fund_pool_shift"
          ]
        },
        {
          "allFlags": [
            "long_terms",
            "fund_pool_shift"
          ],
          "hiddenMin": {
            "executionDebt": 28
          }
        }
      ]
    },
    "left": {
      "label": "把洞摊开",
      "effect": {
        "cash": -4,
        "trust": -1
      },
      "hidden": {
        "executionDebt": -2,
        "riskExposure": -3
      },
      "relations": {
        "finance": 2,
        "boss": -1
      },
      "flags": [
        "runway_named"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续挪着走",
      "effect": {
        "cash": 1,
        "trust": 2
      },
      "hidden": {
        "executionDebt": 4,
        "riskExposure": 4,
        "politicalHeat": 1
      },
      "relations": {
        "boss": 1,
        "finance": -2
      },
      "flags": [
        "paper_runway"
      ],
      "schedule": []
    }
  },
  {
    "id": "numbers_hostage",
    "priority": 9,
    "role": "财务总监",
    "avatar": "📚",
    "title": "数字已经不是拿来看清问题的，是拿来让问题继续往下走的。",
    "desc": "你们一边补口径、一边修话术，最后留在桌上的不再是数字本身，而是一个谁都暂时能讲下去的版本。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "manual_reconcile",
            "close_rush_patch"
          ]
        },
        {
          "allFlags": [
            "meeting_rewrite",
            "board_deck_polish"
          ]
        },
        {
          "allFlags": [
            "manual_reconcile",
            "board_deck_polish"
          ],
          "hiddenMax": {
            "dataMaturity": 34
          },
          "hiddenMin": {
            "executionDebt": 34
          }
        }
      ]
    },
    "left": {
      "label": "停下重算",
      "effect": {
        "trust": -3,
        "team": -1
      },
      "hidden": {
        "dataMaturity": 4,
        "executionDebt": -4,
        "bossDependency": -1
      },
      "relations": {
        "finance": 2,
        "boss": -1
      },
      "flags": [
        "rebuild_numbers"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续给版本",
      "effect": {
        "trust": 2,
        "growth": 1
      },
      "hidden": {
        "dataMaturity": -3,
        "executionDebt": 4,
        "bossDependency": 3,
        "politicalHeat": 2
      },
      "relations": {
        "boss": 2,
        "finance": -2
      },
      "flags": [
        "numbers_hostage"
      ],
      "schedule": []
    }
  },
  {
    "id": "hallway_silence",
    "priority": 8,
    "role": "HRBP",
    "avatar": "🚪",
    "title": "走廊里安静得过头了，像大家都学会了把情绪省给自己。",
    "desc": "没人吵，也没人闹，但很多人已经不再把问题往桌上放，只把力气往下收。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "freeze_hiring",
            "weekend_overtime"
          ]
        },
        {
          "allFlags": [
            "burn_team",
            "hold_salary"
          ]
        },
        {
          "allFlags": [
            "freeze_hiring",
            "burn_team"
          ],
          "hiddenMin": {
            "orgFatigue": 38
          }
        }
      ]
    },
    "left": {
      "label": "补人补喘息",
      "effect": {
        "cash": -4,
        "team": 3
      },
      "hidden": {
        "orgFatigue": -5,
        "executionDebt": -1
      },
      "relations": {
        "hr": 2,
        "boss": -1
      },
      "flags": [
        "hallway_opened"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续顶住",
      "effect": {
        "cash": 1,
        "trust": 1,
        "team": -2
      },
      "hidden": {
        "orgFatigue": 5,
        "politicalHeat": 2
      },
      "relations": {
        "hr": -2,
        "boss": 1
      },
      "flags": [
        "hallway_silence"
      ],
      "schedule": []
    }
  },
  {
    "id": "trained_to_wait",
    "priority": 8,
    "role": "渠道经理",
    "avatar": "🛒",
    "title": "客户和渠道都学会了，再等等，价格还会掉。",
    "desc": "你们前面一轮轮放出去的折扣和返利，已经把“现在买”训练成了最不划算的决定。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "festival_promo",
            "marketplace_coupon"
          ]
        },
        {
          "allFlags": [
            "channel_rebate",
            "low_margin_big_order"
          ]
        },
        {
          "allFlags": [
            "festival_promo",
            "channel_rebate"
          ],
          "hiddenMax": {
            "customerTrust": 40
          }
        }
      ]
    },
    "left": {
      "label": "把口子收回来",
      "effect": {
        "growth": -4,
        "trust": -1
      },
      "hidden": {
        "marginHealth": 4,
        "customerTrust": 2
      },
      "relations": {
        "sales": -1,
        "finance": 1
      },
      "flags": [
        "price_reset"
      ],
      "schedule": []
    },
    "right": {
      "label": "再冲一轮",
      "effect": {
        "growth": 2,
        "cash": 1
      },
      "hidden": {
        "marginHealth": -5,
        "customerTrust": -4
      },
      "relations": {
        "sales": 1,
        "finance": -2
      },
      "flags": [
        "trained_to_wait"
      ],
      "schedule": []
    }
  },
  {
    "id": "proxy_signature",
    "priority": 9,
    "role": "老板助理",
    "avatar": "✍️",
    "title": "很多人其实不是在等老板拍板，是在等你先把名字放上去。",
    "desc": "你突然发现，很多承诺和例外并不是先经过决策，而是先经过你这层默认会配合的签字动作。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "public_promise",
            "need_boss_backing"
          ]
        },
        {
          "allFlags": [
            "cross_line_approval",
            "owner_friend_project"
          ]
        },
        {
          "allFlags": [
            "sign_fast",
            "favored_vendor"
          ]
        }
      ],
      "hiddenMin": {
        "bossDependency": 36
      }
    },
    "left": {
      "label": "把名字收回来",
      "effect": {
        "trust": -3,
        "team": 1
      },
      "hidden": {
        "bossDependency": -4,
        "riskExposure": -2,
        "politicalHeat": 1
      },
      "relations": {
        "boss": -2,
        "legal": 1
      },
      "flags": [
        "signature_withdrawn"
      ],
      "schedule": []
    },
    "right": {
      "label": "先签再说",
      "effect": {
        "trust": 2,
        "cash": 1
      },
      "hidden": {
        "bossDependency": 5,
        "riskExposure": 4,
        "politicalHeat": 2
      },
      "relations": {
        "boss": 2,
        "legal": -2
      },
      "flags": [
        "proxy_signature"
      ],
      "schedule": []
    }
  },
  {
    "id": "quality_claim_room",
    "priority": 8,
    "role": "客服负责人",
    "avatar": "📦",
    "title": "售后、采购和客服第一次坐在了一张桌上，谁都不再愿意只讲单点问题。",
    "desc": "前面那些被你们拆开处理的返修、替代料和补件，终于长成了一个不得不整体面对的质量问题。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "procurement_substitute",
            "return_repair_cost"
          ]
        },
        {
          "allFlags": [
            "returns_restock",
            "parts_borrow"
          ]
        },
        {
          "allFlags": [
            "replacement_parts",
            "procurement_substitute"
          ],
          "hiddenMax": {
            "customerTrust": 40
          }
        }
      ]
    },
    "left": {
      "label": "承认整批排查",
      "effect": {
        "cash": -4,
        "trust": -1
      },
      "hidden": {
        "customerTrust": 3,
        "marginHealth": 1,
        "riskExposure": -1
      },
      "relations": {
        "ops": 1,
        "sales": -1
      },
      "flags": [
        "quality_batch_fix"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续拆开处理",
      "effect": {
        "cash": 1,
        "trust": 1
      },
      "hidden": {
        "customerTrust": -4,
        "riskExposure": 3
      },
      "relations": {
        "ops": -1,
        "sales": 1
      },
      "flags": [
        "quality_split"
      ],
      "schedule": []
    }
  },
  {
    "id": "inventory_mirage",
    "priority": 8,
    "role": "仓储主管",
    "avatar": "📉",
    "title": "一边断货，一边压货，仓里终于长成了最难解释的样子。",
    "desc": "你们同时在补爆款、囤旧货、追紧急补货，最后连仓自己都开始长成一张看不懂的报表。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "inventory_push",
            "hot_sku_stockout"
          ]
        },
        {
          "allFlags": [
            "emergency_restock",
            "slow_moving_overhang"
          ]
        },
        {
          "allFlags": [
            "inventory_push",
            "emergency_restock"
          ],
          "hiddenMin": {
            "executionDebt": 28
          }
        }
      ]
    },
    "left": {
      "label": "先清仓再补",
      "effect": {
        "cash": -2,
        "growth": -2,
        "team": 1
      },
      "hidden": {
        "executionDebt": -2,
        "marginHealth": 2
      },
      "relations": {
        "ops": 2
      },
      "flags": [
        "inventory_reset"
      ],
      "schedule": []
    },
    "right": {
      "label": "两头继续顶",
      "effect": {
        "growth": 1,
        "cash": -2,
        "team": -2
      },
      "hidden": {
        "executionDebt": 4,
        "orgFatigue": 2
      },
      "relations": {
        "ops": -2
      },
      "flags": [
        "inventory_mirage"
      ],
      "schedule": []
    }
  },
  {
    "id": "middle_seat_protocol",
    "priority": 9,
    "role": "老财务BP",
    "avatar": "🪑",
    "title": "你突然发现，很多人并不是临时来找你，他们只是在按这个位置的默认流程办事。",
    "desc": "解释、缓冲、翻译、改话术，这些动作像一套早就存在的 protocol，而不是这次刚好轮到你多做一点。",
    "conditions": {
      "alternatives": [
        {
          "allFlags": [
            "go_explain",
            "version_first"
          ]
        },
        {
          "allFlags": [
            "catch_between",
            "explain_not_decide"
          ]
        },
        {
          "allFlags": [
            "go_explain",
            "meeting_rewrite"
          ],
          "hiddenMin": {
            "bossDependency": 34,
            "politicalHeat": 34
          }
        }
      ]
    },
    "left": {
      "label": "把流程打断",
      "effect": {
        "trust": -2,
        "team": 2
      },
      "hidden": {
        "bossDependency": -3,
        "politicalHeat": -2,
        "dataMaturity": 1
      },
      "relations": {
        "boss": -2,
        "finance": 1
      },
      "flags": [
        "break_middle_protocol"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续照做",
      "effect": {
        "trust": 1,
        "team": -2
      },
      "hidden": {
        "bossDependency": 3,
        "politicalHeat": 2,
        "orgFatigue": 2
      },
      "relations": {
        "boss": 1,
        "finance": -1
      },
      "flags": [
        "middle_seat_protocol"
      ],
      "schedule": []
    }
  }
];
