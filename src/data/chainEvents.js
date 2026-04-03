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
        "orgFatigue": 2,
        "executionDebt": 1
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
        "orgFatigue": 2,
        "executionDebt": 1
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
      "label": "放",
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
      "label": "继续硬顶",
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
      "allFlags": [
        "middle_manager_blame",
        "performance_push"
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
        "politicalHeat": 2,
        "bossDependency": 2
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
      "statMax": {
        "team": 38
      },
      "hiddenMin": {
        "politicalHeat": 38
      }
    },
    "left": {
      "label": "重建规则",
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
        "orgFatigue": 8,
        "executionDebt": 4
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
      "relationMin": {
        "boss": 66
      },
      "hiddenMin": {
        "bossDependency": 40
      }
    },
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
        "boss_confidant"
      ],
      "schedule": [
        {
          "after": 3,
          "type": "boundary_erosion"
        }
      ]
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
      "allFlags": [
        "public_promise"
      ],
      "roundMin": 8
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
        "politicalHeat": -2,
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
        "politicalHeat": -2,
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
        "orgFatigue": -6,
        "executionDebt": -2
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
      "allFlags": [
        "gmv_target",
        "manual_forecast"
      ],
      "hiddenMax": {
        "dataMaturity": 32
      }
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
        "executionDebt": -4,
        "orgFatigue": -1
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
      "hiddenMin": {
        "executionDebt": 34
      },
      "hiddenMax": {
        "dataMaturity": 32
      }
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
      "roundMin": 8,
      "hiddenMin": {
        "executionDebt": 38
      },
      "statMax": {
        "team": 45
      }
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
        "executionDebt": -4,
        "orgFatigue": -1
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
        "orgFatigue": 8,
        "executionDebt": 4
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
        "bossDependency": 2
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
      "roundMin": 9,
      "hiddenMin": {
        "executionDebt": 30
      }
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
        "bossDependency": 2
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
      "hiddenMin": {
        "politicalHeat": 45
      },
      "statMin": {
        "trust": 40
      }
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
        "bossDependency": 2
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
      "hiddenMin": {
        "riskExposure": 52
      },
      "relationMax": {
        "legal": 46
      }
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
      "allFlags": [
        "need_white_lie",
        "strategy_slide_spin"
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
        "executionDebt": -4,
        "orgFatigue": -1
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
        "politicalHeat": 2,
        "bossDependency": 2
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
      "allFlags": [
        "freeze_hiring",
        "salary_guard"
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
  }
];
