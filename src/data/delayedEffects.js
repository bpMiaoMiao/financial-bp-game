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
  "coupon_addiction": {
    "title": "用户被教育成等券下单",
    "desc": "短期转化冲上去了，后面却越来越离不开补贴。",
    "effect": {
      "growth": -3,
      "cash": -3
    },
    "hidden": {
      "marginHealth": -4,
      "customerTrust": -1
    },
    "relations": {
      "sales": -1
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
  "supplier_lock": {
    "title": "供应商开始卡你交付",
    "desc": "压款省下来的现金，开始变成供应风险。",
    "effect": {
      "growth": -4
    },
    "hidden": {
      "riskExposure": 6,
      "executionDebt": 2
    },
    "relations": {
      "ops": -2,
      "finance": -1
    }
  },
  "payroll_risk": {
    "title": "发薪消息开始传开",
    "desc": "你还没正式说什么，组织里已经开始不安。",
    "effect": {
      "team": -5,
      "trust": -1
    },
    "hidden": {
      "orgFatigue": 4,
      "politicalHeat": 2
    },
    "relations": {
      "hr": -2
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
  "settlement_mismatch": {
    "title": "平台结算和预期差太多",
    "desc": "看起来是时间差，实际差出了利润和现金。",
    "effect": {
      "cash": -7
    },
    "hidden": {
      "executionDebt": 2,
      "marginHealth": -3
    },
    "relations": {
      "finance": -1,
      "sales": -1
    }
  },
  "expectation_lockin": {
    "title": "临时答应的事被当成正式承诺",
    "desc": "你以为先过一关，别人却已经记成标准动作。",
    "effect": {
      "trust": -2
    },
    "hidden": {
      "bossDependency": 4,
      "politicalHeat": 1
    },
    "relations": {
      "boss": 1
    }
  },
  "backfill_weekend": {
    "title": "周末加班开始常态化",
    "desc": "这次补的是一版预测，下次补的可能就是团队耐心。",
    "effect": {
      "team": -4
    },
    "hidden": {
      "orgFatigue": 5,
      "executionDebt": 1
    },
    "relations": {
      "hr": -1
    }
  },
  "public_promise_gap": {
    "title": "公开目标开始反噬",
    "desc": "当初讲出去有多顺，回头兑现就有多痛。",
    "effect": {
      "trust": -4
    },
    "hidden": {
      "politicalHeat": 4,
      "bossDependency": 2
    },
    "relations": {
      "boss": -1
    }
  },
  "boundary_erosion": {
    "title": "边界又退了一步",
    "desc": "老板越来越习惯把灰区交给你。",
    "effect": {
      "team": -2
    },
    "hidden": {
      "bossDependency": 6,
      "politicalHeat": 2
    },
    "relations": {
      "boss": 2,
      "finance": -1
    }
  },
  "investor_question": {
    "title": "投资人追问落地细节",
    "desc": "故事没人反对，但关键问题一个都绕不过。",
    "effect": {
      "trust": -3
    },
    "hidden": {
      "politicalHeat": 3,
      "dataMaturity": -1
    },
    "relations": {
      "boss": -1
    }
  },
  "rework_whiplash": {
    "title": "你改过的东西又被推翻",
    "desc": "为了照顾场面做的加工，最后变成新的返工。",
    "effect": {
      "team": -3
    },
    "hidden": {
      "executionDebt": 4,
      "orgFatigue": 2
    },
    "relations": {
      "finance": -1
    }
  },
  "shadow_authority": {
    "title": "组织默认你有更多权力",
    "desc": "可权力来的时候，总伴着更多模糊责任。",
    "effect": {
      "trust": 1
    },
    "hidden": {
      "bossDependency": 5,
      "politicalHeat": 3
    },
    "relations": {
      "boss": 2,
      "hr": -1
    }
  },
  "capacity_gap": {
    "title": "组织缺口被放大",
    "desc": "关键岗位长期空缺，越来越多事开始掉地上。",
    "effect": {
      "team": -6,
      "growth": -4
    },
    "hidden": {
      "orgFatigue": 6,
      "executionDebt": 5
    },
    "relations": {
      "hr": -2,
      "ops": -1
    }
  },
  "resignation_wave": {
    "title": "第二波离职风险",
    "desc": "大家表面没说，但心已经开始散了。",
    "effect": {
      "team": -8,
      "trust": -2
    },
    "hidden": {
      "orgFatigue": 7,
      "politicalHeat": 3
    },
    "relations": {
      "hr": -2,
      "finance": -3
    }
  },
  "morale_dip": {
    "title": "团队开始集体泄气",
    "desc": "不是爆炸，而是慢慢没人愿意多走一步。",
    "effect": {
      "team": -5
    },
    "hidden": {
      "orgFatigue": 5
    },
    "relations": {
      "hr": -1
    }
  },
  "recruiting_miss": {
    "title": "岗位空窗拖出了业务伤口",
    "desc": "不是没有人投，是候选人开始挑你们。",
    "effect": {
      "growth": -3,
      "team": -3
    },
    "hidden": {
      "orgFatigue": 3
    },
    "relations": {
      "hr": -2
    }
  },
  "manager_trust_drop": {
    "title": "中层不再相信绩效解释",
    "desc": "规则一旦被怀疑，所有沟通成本都会变高。",
    "effect": {
      "trust": -3
    },
    "hidden": {
      "politicalHeat": 4,
      "orgFatigue": 2
    },
    "relations": {
      "hr": -2
    }
  },
  "overtime_backlash": {
    "title": "周末加班引发反弹",
    "desc": "短期效率没问题，长期人心开始出问题。",
    "effect": {
      "team": -6
    },
    "hidden": {
      "orgFatigue": 6,
      "politicalHeat": 2
    },
    "relations": {
      "hr": -2
    }
  },
  "onboarding_slip": {
    "title": "新经理上岗后撞了墙",
    "desc": "没人带的空降，不会自动变成成熟战力。",
    "effect": {
      "team": -3,
      "growth": -2
    },
    "hidden": {
      "executionDebt": 3,
      "orgFatigue": 1
    },
    "relations": {
      "hr": -1,
      "ops": -1
    }
  },
  "margin_reckoning": {
    "title": "利润质量被追问",
    "desc": "量冲起来了，但老板开始问：钱呢？",
    "effect": {
      "trust": -4,
      "cash": -4
    },
    "hidden": {
      "marginHealth": -6,
      "politicalHeat": 3
    },
    "relations": {
      "boss": -2,
      "sales": 1
    }
  },
  "fee_spike_followup": {
    "title": "抽佣变化吃掉了利润",
    "desc": "你以为只是费用项波动，结果已经在改业务结构。",
    "effect": {
      "cash": -5
    },
    "hidden": {
      "marginHealth": -5
    },
    "relations": {
      "finance": -1
    }
  },
  "repair_cost_creep": {
    "title": "售后返修开始拖利润",
    "desc": "最难看的成本，往往不是前台能马上看到的。",
    "effect": {
      "cash": -4
    },
    "hidden": {
      "marginHealth": -4,
      "customerTrust": -2
    },
    "relations": {
      "ops": -1
    }
  },
  "clearance_habit": {
    "title": "用户开始等你清仓",
    "desc": "清掉的是库存，留下的是更差的价格预期。",
    "effect": {
      "growth": -3
    },
    "hidden": {
      "customerTrust": -2,
      "marginHealth": -3
    },
    "relations": {
      "sales": -1
    }
  },
  "rebate_reconciliation": {
    "title": "返点结算变成扯皮",
    "desc": "当时看着只是激励，后面却成了利润黑洞。",
    "effect": {
      "cash": -5
    },
    "hidden": {
      "marginHealth": -5,
      "politicalHeat": 2
    },
    "relations": {
      "sales": -1,
      "finance": -1
    }
  },
  "project_margin_slip": {
    "title": "定制项目利润继续下探",
    "desc": "案例没拿稳，利润先没了。",
    "effect": {
      "cash": -4,
      "trust": -1
    },
    "hidden": {
      "marginHealth": -6,
      "executionDebt": 2
    },
    "relations": {
      "finance": -1
    }
  },
  "price_protection_hit": {
    "title": "价格保护开始层层蔓延",
    "desc": "一旦开了口，后面每个客户都觉得自己该有。",
    "effect": {
      "cash": -4
    },
    "hidden": {
      "marginHealth": -4,
      "customerTrust": -1
    },
    "relations": {
      "sales": -1
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
  "warehouse_congestion": {
    "title": "仓里开始打结",
    "desc": "调拨解决了一部分问题，也制造了新的错漏。",
    "effect": {
      "team": -3
    },
    "hidden": {
      "executionDebt": 4,
      "orgFatigue": 2
    },
    "relations": {
      "ops": -1
    }
  },
  "moq_cash_drag": {
    "title": "高 MOQ 让现金更沉",
    "desc": "单价省了点，现金灵活性却被吃掉更多。",
    "effect": {
      "cash": -5
    },
    "hidden": {
      "riskExposure": 3
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
  },
  "data_credibility_hit": {
    "title": "大家开始不信数字了",
    "desc": "最麻烦的不是数据错，而是谁都能拿自己的版本说服自己。",
    "effect": {
      "trust": -5
    },
    "hidden": {
      "dataMaturity": -5,
      "politicalHeat": 4,
      "executionDebt": 3
    },
    "relations": {
      "boss": -1,
      "finance": -3,
      "sales": -1
    }
  },
  "close_delay": {
    "title": "月结延迟正式被看见",
    "desc": "你想把质量守住，但其他人只看到节奏没了。",
    "effect": {
      "trust": -3
    },
    "hidden": {
      "executionDebt": 4,
      "orgFatigue": 3
    },
    "relations": {
      "finance": -2
    }
  },
  "reconciliation_fatigue": {
    "title": "手工对账开始拖垮节奏",
    "desc": "每次都能补上，但每次都在消耗组织信用。",
    "effect": {
      "team": -3
    },
    "hidden": {
      "executionDebt": 5,
      "orgFatigue": 3
    },
    "relations": {
      "finance": -1
    }
  },
  "permission_breach": {
    "title": "权限问题真的出了口子",
    "desc": "以前觉得只是松一点，后来才发现是没人能追责。",
    "effect": {
      "trust": -2
    },
    "hidden": {
      "riskExposure": 5,
      "politicalHeat": 2
    },
    "relations": {
      "legal": -2,
      "finance": -1
    }
  },
  "excel_version_sprawl": {
    "title": "Excel 版本开始满天飞",
    "desc": "现在最贵的不是算错，而是谁都以为自己那版是对的。",
    "effect": {
      "team": -2
    },
    "hidden": {
      "executionDebt": 5,
      "dataMaturity": -3
    },
    "relations": {
      "finance": -2,
      "sales": -1
    }
  },
  "erp_cutover_noise": {
    "title": "ERP 切换带来一波混乱",
    "desc": "系统是上了，但流程和习惯没那么快跟上。",
    "effect": {
      "team": -3,
      "trust": -1
    },
    "hidden": {
      "executionDebt": 4,
      "dataMaturity": 2
    },
    "relations": {
      "ops": -1,
      "finance": -1
    }
  },
  "dashboard_blindspot": {
    "title": "关键决策期看板失明",
    "desc": "没人真的瞎，但所有人都比平时更像在赌。",
    "effect": {
      "trust": -2
    },
    "hidden": {
      "dataMaturity": -3,
      "executionDebt": 2
    },
    "relations": {
      "boss": -1
    }
  },
  "audit_followup": {
    "title": "审计开始追补材料",
    "desc": "你以为先过了门，现在才发现后面还有房间。",
    "effect": {
      "team": -2
    },
    "hidden": {
      "politicalHeat": 4,
      "riskExposure": 3
    },
    "relations": {
      "legal": -1
    }
  },
  "blame_sticks": {
    "title": "这口锅开始固定在你身上",
    "desc": "当时只是帮忙稳场，现在大家默认就是你负责。",
    "effect": {
      "trust": -3
    },
    "hidden": {
      "politicalHeat": 5,
      "bossDependency": 2
    },
    "relations": {
      "boss": 1,
      "finance": -2
    }
  },
  "compliance_heat": {
    "title": "例外审批引来更多目光",
    "desc": "流程没违规，不代表没有人会拿它做文章。",
    "effect": {
      "trust": -2
    },
    "hidden": {
      "politicalHeat": 5,
      "riskExposure": 4
    },
    "relations": {
      "legal": -2
    }
  },
  "vendor_question": {
    "title": "供应商关系被拿出来聊了",
    "desc": "以前大家装作看不见，现在已经有人开始记录。",
    "effect": {
      "trust": -2
    },
    "hidden": {
      "politicalHeat": 4,
      "riskExposure": 3
    },
    "relations": {
      "legal": -1,
      "ops": -1
    }
  },
  "credibility_loss": {
    "title": "你说的话开始没那么好使了",
    "desc": "不是因为你错了，而是大家开始记得你以前怎么圆过。",
    "effect": {
      "trust": -4
    },
    "hidden": {
      "politicalHeat": 3,
      "bossDependency": 1
    },
    "relations": {
      "boss": -1
    }
  },
  "white_lie_interest": {
    "title": "那句没说全的话开始计息",
    "desc": "当时省下来的尴尬，后来都带着更高利息回来。",
    "effect": {
      "trust": -3
    },
    "hidden": {
      "politicalHeat": 4,
      "dataMaturity": -1
    },
    "relations": {
      "boss": -1
    }
  },
  "political_heatwave": {
    "title": "组织里明显开始热起来了",
    "desc": "很多会还在开，真正的判断已经转入气氛。",
    "effect": {
      "team": -2
    },
    "hidden": {
      "politicalHeat": 6
    },
    "relations": {
      "boss": -1,
      "sales": -1
    }
  }
};
