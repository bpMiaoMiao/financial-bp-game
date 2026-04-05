export const storyChains = [
  {
    "id": "predecessor_archive",
    "storyArc": "predecessor_trace",
    "priority": 8,
    "role": "共享盘",
    "avatar": "🗂️",
    "title": "共享盘里还有个前任留下的文件夹，名字像是写给后来的人看的。",
    "desc": "目录看起来被删过一轮，只剩几张你现在每天都在改的表，像有人来不及把整个痕迹带走。",
    "conditions": {
      "roundMin": 9,
      "alternatives": [
        {
          "allFlags": [
            "seat_cost",
            "temporary_plug"
          ]
        },
        {
          "allFlags": [
            "ask_why_me",
            "default_receiver"
          ]
        },
        {
          "allFlags": [
            "seat_routine",
            "normal_turnover"
          ]
        }
      ]
    },
    "left": {
      "label": "打开看看",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "bossDependency": -1
      },
      "relations": {
        "finance": 1
      },
      "flags": [
        "predecessor_trace_opened"
      ],
      "schedule": []
    },
    "right": {
      "label": "先别碰",
      "effect": {
        "trust": 1
      },
      "hidden": {
        "executionDebt": 1,
        "orgFatigue": 1
      },
      "relations": {
        "boss": 1
      },
      "flags": [
        "predecessor_trace_dismissed"
      ],
      "schedule": []
    }
  },
  {
    "id": "predecessor_comment_layer",
    "storyArc": "predecessor_trace",
    "priority": 8,
    "role": "前任的批注",
    "avatar": "📝",
    "title": "你点开的那份表里，批注像在提前回答你这几个月的每一次犹豫。",
    "desc": "那个人写过的话并不激烈，只是太像你最近嘴边反复出现、却总来不及讲完的那几句。",
    "conditions": {
      "roundMin": 10,
      "alternatives": [
        {
          "allFlags": [
            "predecessor_trace_opened",
            "version_first"
          ]
        },
        {
          "allFlags": [
            "predecessor_trace_opened",
            "meeting_rewrite"
          ]
        },
        {
          "allFlags": [
            "predecessor_trace_opened",
            "go_explain"
          ]
        }
      ]
    },
    "left": {
      "label": "继续往下看",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 2,
        "orgFatigue": 1
      },
      "relations": {
        "finance": 1,
        "boss": -1
      },
      "flags": [
        "predecessor_trace_read"
      ],
      "schedule": []
    },
    "right": {
      "label": "关掉当没见过",
      "effect": {
        "trust": 1
      },
      "hidden": {
        "bossDependency": 1,
        "politicalHeat": 1
      },
      "relations": {
        "boss": 1
      },
      "flags": [
        "predecessor_trace_erased"
      ],
      "schedule": []
    }
  },
  {
    "id": "predecessor_calendar_echo",
    "storyArc": "predecessor_trace",
    "priority": 9,
    "role": "HRBP",
    "avatar": "📆",
    "title": "你忽然发现，前任最后几周的日历，和你最近这几周长得几乎一样。",
    "desc": "一串串会名、备注和临时加塞的时间段排得过分相似，像这个位置本来就会把人推成同一种样子。",
    "conditions": {
      "roundMin": 12,
      "alternatives": [
        {
          "allFlags": [
            "predecessor_trace_read",
            "temporary_plug"
          ]
        },
        {
          "allFlags": [
            "predecessor_trace_read",
            "version_first"
          ]
        },
        {
          "allFlags": [
            "predecessor_trace_opened",
            "middle_seat_protocol"
          ]
        }
      ]
    },
    "left": {
      "label": "把交接留在系统里",
      "effect": {
        "trust": -2,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 2,
        "bossDependency": -2
      },
      "relations": {
        "finance": 1,
        "hr": 1
      },
      "flags": [
        "predecessor_trace_logged"
      ],
      "schedule": []
    },
    "right": {
      "label": "先把这轮顶完",
      "effect": {
        "trust": 2,
        "team": -2
      },
      "hidden": {
        "bossDependency": 2,
        "orgFatigue": 2
      },
      "relations": {
        "boss": 1,
        "hr": -1
      },
      "flags": [
        "predecessor_trace_loop"
      ],
      "schedule": []
    }
  },
  {
    "id": "friend_project_scope",
    "storyArc": "friend_project",
    "priority": 8,
    "role": "老板朋友",
    "avatar": "🎣",
    "title": "你接下来的不像一个项目，更像一串还没写进项目书里的要求。",
    "desc": "范围、口径和资源都在边聊边长，像真正要被先确认的从来不是回本，而是谁会继续把它接着。",
    "conditions": {
      "roundMin": 8,
      "alternatives": [
        {
          "allFlags": [
            "owner_friend_project",
            "need_boss_backing"
          ]
        },
        {
          "allFlags": [
            "owner_friend_project",
            "public_promise"
          ]
        },
        {
          "allFlags": [
            "owner_friend_project",
            "meeting_rewrite"
          ]
        }
      ]
    },
    "left": {
      "label": "先把范围钉住",
      "effect": {
        "trust": -2,
        "growth": -1
      },
      "hidden": {
        "bossDependency": -1,
        "riskExposure": -1
      },
      "relations": {
        "boss": -1,
        "legal": 1
      },
      "flags": [
        "friend_project_scope_fixed"
      ],
      "schedule": []
    },
    "right": {
      "label": "先答应下来",
      "effect": {
        "trust": 2,
        "growth": 1
      },
      "hidden": {
        "bossDependency": 2,
        "politicalHeat": 1
      },
      "relations": {
        "boss": 1,
        "sales": 1
      },
      "flags": [
        "friend_project_scope_blurred"
      ],
      "schedule": []
    }
  },
  {
    "id": "friend_project_relabel",
    "storyArc": "friend_project",
    "priority": 8,
    "role": "老板助理",
    "avatar": "🏷️",
    "title": "这个项目第三次改名了，像每换一个会场，它就能换一次存在理由。",
    "desc": "你终于开始分不清大家是在推进项目，还是在替它寻找一个这周更适合摆上桌的身份。",
    "conditions": {
      "roundMin": 10,
      "alternatives": [
        {
          "allFlags": [
            "friend_project_scope_blurred",
            "board_deck_polish"
          ]
        },
        {
          "allFlags": [
            "friend_project_scope_blurred",
            "meeting_rewrite"
          ]
        },
        {
          "allFlags": [
            "owner_friend_project",
            "favored_vendor",
            "need_boss_backing"
          ]
        }
      ]
    },
    "left": {
      "label": "按真实用途写",
      "effect": {
        "trust": -2,
        "cash": -1
      },
      "hidden": {
        "dataMaturity": 2,
        "bossDependency": -1
      },
      "relations": {
        "finance": 1,
        "boss": -1
      },
      "flags": [
        "friend_project_relabel_true"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续换个说法",
      "effect": {
        "trust": 2,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 1,
        "bossDependency": 2,
        "politicalHeat": 1
      },
      "relations": {
        "boss": 1,
        "finance": -1
      },
      "flags": [
        "friend_project_relabel_shifted"
      ],
      "schedule": []
    }
  },
  {
    "id": "friend_project_sinkhole",
    "storyArc": "friend_project",
    "priority": 9,
    "role": "财务总监",
    "avatar": "🕳️",
    "title": "你终于看清这个项目不需要回本，它只需要一直有人愿意往里填。",
    "desc": "预算、关系、供应商和例外在它身上连成了一张网，像它真正的用途从来就不是经营本身。",
    "conditions": {
      "roundMin": 12,
      "alternatives": [
        {
          "allFlags": [
            "friend_project_relabel_shifted",
            "proxy_signature"
          ]
        },
        {
          "allFlags": [
            "friend_project_scope_blurred",
            "favored_vendor",
            "board_deck_polish"
          ]
        },
        {
          "allFlags": [
            "friend_project_relabel_shifted",
            "public_promise"
          ]
        }
      ]
    },
    "left": {
      "label": "现在截断",
      "effect": {
        "cash": -3,
        "trust": -3,
        "team": 1
      },
      "hidden": {
        "riskExposure": -2,
        "bossDependency": -3
      },
      "relations": {
        "boss": -2,
        "finance": 1
      },
      "flags": [
        "friend_project_cut"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续遮住",
      "effect": {
        "cash": 1,
        "trust": 2
      },
      "hidden": {
        "riskExposure": 3,
        "bossDependency": 2,
        "politicalHeat": 2
      },
      "relations": {
        "boss": 2,
        "finance": -1
      },
      "flags": [
        "friend_project_feed"
      ],
      "schedule": []
    }
  },
  {
    "id": "showcase_visit",
    "storyArc": "showcase_narrative",
    "priority": 8,
    "role": "品牌负责人",
    "avatar": "🪟",
    "title": "这场参观更像试镜，不像生意。",
    "desc": "路线、屏幕、讲稿和样板间都被排得很满，像对方真正想看的不是你们卖什么，而是这家公司还能不能继续把自己演稳。",
    "conditions": {
      "roundMin": 8,
      "alternatives": [
        {
          "allFlags": [
            "board_deck_polish",
            "investor_story"
          ]
        },
        {
          "allFlags": [
            "public_promise",
            "board_deck_polish"
          ]
        },
        {
          "allFlags": [
            "flagship_launch",
            "investor_story"
          ]
        }
      ]
    },
    "left": {
      "label": "配合排演",
      "effect": {
        "trust": 2,
        "growth": 1
      },
      "hidden": {
        "bossDependency": 1,
        "dataMaturity": -1
      },
      "relations": {
        "boss": 1,
        "sales": 1
      },
      "flags": [
        "showcase_staged"
      ],
      "schedule": []
    },
    "right": {
      "label": "保留真实现场",
      "effect": {
        "trust": -2,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 2
      },
      "relations": {
        "boss": -1,
        "ops": 1
      },
      "flags": [
        "showcase_unmasked"
      ],
      "schedule": []
    }
  },
  {
    "id": "showcase_exception",
    "storyArc": "showcase_narrative",
    "priority": 8,
    "role": "大客户经理",
    "avatar": "🎫",
    "title": "对方提的第一批例外，不像采购条件，更像在试你们会把戏接到哪一步。",
    "desc": "账期、包装、返修和汇报方式都被提成了“最好能再灵活一点”，像他真正在确认的不是方案，而是你们会不会为了把台搭稳继续往后退。",
    "conditions": {
      "roundMin": 10,
      "alternatives": [
        {
          "allFlags": [
            "showcase_staged",
            "meeting_rewrite"
          ]
        },
        {
          "allFlags": [
            "showcase_staged",
            "need_boss_backing"
          ]
        },
        {
          "allFlags": [
            "showcase_staged",
            "go_explain"
          ]
        }
      ]
    },
    "left": {
      "label": "先答应例外",
      "effect": {
        "growth": 2,
        "trust": 1
      },
      "hidden": {
        "customerTrust": -2,
        "executionDebt": 1
      },
      "relations": {
        "sales": 1,
        "finance": -1
      },
      "flags": [
        "showcase_exception_yes"
      ],
      "schedule": []
    },
    "right": {
      "label": "把话收回来",
      "effect": {
        "growth": -2,
        "trust": -2
      },
      "hidden": {
        "dataMaturity": 1,
        "customerTrust": 1
      },
      "relations": {
        "sales": -1,
        "finance": 1
      },
      "flags": [
        "showcase_exception_no"
      ],
      "schedule": []
    }
  },
  {
    "id": "showcase_not_customer",
    "storyArc": "showcase_narrative",
    "priority": 9,
    "role": "来访方负责人",
    "avatar": "🧭",
    "title": "你慢慢意识到，对方来这一趟，不是为了下单，而是为了判断这家公司还值不值得被继续摆上桌。",
    "desc": "他问得最多的不是价格，而是你们还能不能继续把同一个故事讲稳。那一刻你突然明白，自己接的从来不只是业务，而是这家公司被继续相信的资格。",
    "conditions": {
      "roundMin": 12,
      "alternatives": [
        {
          "allFlags": [
            "showcase_exception_yes",
            "public_promise"
          ]
        },
        {
          "allFlags": [
            "showcase_exception_yes",
            "investor_story"
          ]
        },
        {
          "allFlags": [
            "showcase_staged",
            "need_boss_backing",
            "board_deck_polish"
          ]
        }
      ]
    },
    "left": {
      "label": "继续把台搭下去",
      "effect": {
        "trust": 2,
        "growth": 1
      },
      "hidden": {
        "bossDependency": 2,
        "customerTrust": -2,
        "politicalHeat": 1
      },
      "relations": {
        "boss": 1,
        "sales": 1
      },
      "flags": [
        "showcase_belief_maintained"
      ],
      "schedule": []
    },
    "right": {
      "label": "把戏停在今天",
      "effect": {
        "trust": -3,
        "cash": -1
      },
      "hidden": {
        "dataMaturity": 2,
        "bossDependency": -1
      },
      "relations": {
        "boss": -1,
        "finance": 1
      },
      "flags": [
        "showcase_stage_cut"
      ],
      "schedule": []
    }
  },
  {
    "id": "watchlist_name",
    "storyArc": "hr_watchlist",
    "priority": 8,
    "role": "HRBP",
    "avatar": "📋",
    "title": "HRBP把一张观察名单递给你时手停了一下，像忽然意识到这份东西本来不该让你看懂。",
    "desc": "名单上写的不是谁强谁弱，而是谁“暂时不能动”、谁“适合先谈”、谁“能先接住变化”。你第一次意识到，这张表管的可能不是人，而是冲突先落到谁身上。",
    "conditions": {
      "roundMin": 8,
      "alternatives": [
        {
          "allFlags": [
            "performance_push",
            "delay_promotion"
          ]
        },
        {
          "allFlags": [
            "promotion_rigged",
            "middle_manager_blame"
          ]
        },
        {
          "allFlags": [
            "performance_delay",
            "shared_service_request"
          ]
        }
      ]
    },
    "left": {
      "label": "问这名单怎么算的",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "politicalHeat": 1,
        "dataMaturity": 1
      },
      "relations": {
        "hr": 1
      },
      "flags": [
        "hr_watchlist_seen"
      ],
      "schedule": []
    },
    "right": {
      "label": "装作没看见",
      "effect": {
        "trust": 1
      },
      "hidden": {
        "orgFatigue": 1,
        "bossDependency": 1
      },
      "relations": {
        "hr": -1,
        "boss": 1
      },
      "flags": [
        "hr_watchlist_ignored"
      ],
      "schedule": []
    }
  },
  {
    "id": "watchlist_columns",
    "storyArc": "hr_watchlist",
    "priority": 8,
    "role": "HRBP",
    "avatar": "🗃️",
    "title": "你后来再看那份名单，才发现最刺眼的一列叫“承压稳定性”。",
    "desc": "那列分数高的人，不是业绩最好的人，而是最不容易在会上翻脸、最适合把变化吞进自己肚子里的人。你开始明白，这张表也许一直在替公司挑谁更适合被先拿去缓冲。",
    "conditions": {
      "roundMin": 10,
      "alternatives": [
        {
          "allFlags": [
            "hr_watchlist_seen",
            "default_receiver"
          ]
        },
        {
          "allFlags": [
            "hr_watchlist_seen",
            "go_explain"
          ]
        },
        {
          "allFlags": [
            "hr_watchlist_seen",
            "temporary_plug"
          ]
        }
      ]
    },
    "left": {
      "label": "问这一列谁定的",
      "effect": {
        "trust": -2,
        "team": 1
      },
      "hidden": {
        "politicalHeat": 1,
        "bossDependency": -1
      },
      "relations": {
        "hr": 1,
        "boss": -1
      },
      "flags": [
        "hr_watchlist_questioned"
      ],
      "schedule": []
    },
    "right": {
      "label": "帮她把话圆过去",
      "effect": {
        "trust": 2
      },
      "hidden": {
        "bossDependency": 1,
        "orgFatigue": 1
      },
      "relations": {
        "hr": 1,
        "boss": 1
      },
      "flags": [
        "hr_watchlist_smoothed"
      ],
      "schedule": []
    }
  },
  {
    "id": "watchlist_rotation",
    "storyArc": "hr_watchlist",
    "priority": 9,
    "role": "HRD",
    "avatar": "♻️",
    "title": "你终于明白，那份名单真正管理的不是人才，而是冲突该先压在谁身上。",
    "desc": "有人适合先安抚，有人适合先牺牲，有人适合先顶住。而你这个位置，像是默认不写在名单上，却始终排在最前面的一类。",
    "conditions": {
      "roundMin": 12,
      "alternatives": [
        {
          "allFlags": [
            "hr_watchlist_questioned",
            "seat_cost"
          ]
        },
        {
          "allFlags": [
            "hr_watchlist_smoothed",
            "normal_turnover"
          ]
        },
        {
          "allFlags": [
            "hr_watchlist_seen",
            "replacement_ready"
          ]
        }
      ]
    },
    "left": {
      "label": "把这份逻辑记下来",
      "effect": {
        "trust": -2,
        "team": 2
      },
      "hidden": {
        "dataMaturity": 1,
        "bossDependency": -2
      },
      "relations": {
        "hr": 1,
        "finance": 1
      },
      "flags": [
        "hr_watchlist_logged"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续当作没看懂",
      "effect": {
        "trust": 2,
        "team": -1
      },
      "hidden": {
        "orgFatigue": 2,
        "bossDependency": 1
      },
      "relations": {
        "boss": 1,
        "hr": -1
      },
      "flags": [
        "hr_watchlist_buried"
      ],
      "schedule": []
    }
  },
  {
    "id": "vendor_ledger_gap",
    "storyArc": "vendor_shadow",
    "priority": 8,
    "role": "采购经理",
    "avatar": "🧾",
    "title": "采购递给你两套供应商对账表，说法都能圆，只有抬头和付款路径对不上。",
    "desc": "他没直接让你帮忙遮，只问你想看业务版本，还是看“会里更省事”的版本。",
    "conditions": {
      "roundMin": 8,
      "alternatives": [
        {
          "allFlags": [
            "favored_vendor",
            "vendor_dinner"
          ]
        },
        {
          "allFlags": [
            "favored_vendor",
            "owner_friend_project"
          ]
        },
        {
          "allFlags": [
            "supplier_private_dinner",
            "need_boss_backing"
          ]
        }
      ]
    },
    "left": {
      "label": "要真实台账",
      "effect": {
        "trust": -1,
        "cash": -1
      },
      "hidden": {
        "dataMaturity": 2,
        "politicalHeat": 1
      },
      "relations": {
        "finance": 1,
        "ops": -1
      },
      "flags": [
        "vendor_shadow_open"
      ],
      "schedule": []
    },
    "right": {
      "label": "先看能过会的版本",
      "effect": {
        "trust": 1,
        "cash": 1
      },
      "hidden": {
        "riskExposure": 1,
        "bossDependency": 1
      },
      "relations": {
        "boss": 1,
        "finance": -1
      },
      "flags": [
        "vendor_shadow_blurred"
      ],
      "schedule": []
    }
  },
  {
    "id": "vendor_split_quote",
    "storyArc": "vendor_shadow",
    "priority": 8,
    "role": "法务经理",
    "avatar": "🧷",
    "title": "法务把两家看起来不相干的供应商并到一页时，你第一次看见它们背后像连着同一个人。",
    "desc": "报价可以分开，抬头可以分开，真正要走的关系却像从来就没打算分开。",
    "conditions": {
      "roundMin": 10,
      "alternatives": [
        {
          "allFlags": [
            "vendor_shadow_open",
            "favored_vendor"
          ]
        },
        {
          "allFlags": [
            "vendor_shadow_blurred",
            "vendor_cover"
          ]
        },
        {
          "allFlags": [
            "vendor_shadow_open",
            "proxy_signature"
          ]
        }
      ]
    },
    "left": {
      "label": "顺着往下查",
      "effect": {
        "trust": -2
      },
      "hidden": {
        "riskExposure": -1,
        "dataMaturity": 2
      },
      "relations": {
        "legal": 1,
        "boss": -1
      },
      "flags": [
        "vendor_shadow_traced"
      ],
      "schedule": []
    },
    "right": {
      "label": "先按拆开的版本走",
      "effect": {
        "trust": 2
      },
      "hidden": {
        "riskExposure": 2,
        "politicalHeat": 1
      },
      "relations": {
        "boss": 1,
        "legal": -1
      },
      "flags": [
        "vendor_shadow_split"
      ],
      "schedule": []
    }
  },
  {
    "id": "vendor_service_fee",
    "storyArc": "vendor_shadow",
    "priority": 9,
    "role": "财务总监",
    "avatar": "🪙",
    "title": "你最后看明白，采购体系维护的有时不是供货效率，而是一条不能断的关系回路。",
    "desc": "单价、服务费、项目支持和“顺手帮忙”一起摊开后，你第一次意识到有些预算存在的意义，从来就不是经营本身。",
    "conditions": {
      "roundMin": 12,
      "alternatives": [
        {
          "allFlags": [
            "vendor_shadow_traced",
            "friend_project_feed"
          ]
        },
        {
          "allFlags": [
            "vendor_shadow_split",
            "vendor_cover"
          ]
        },
        {
          "allFlags": [
            "vendor_shadow_traced",
            "audit_committee"
          ]
        }
      ]
    },
    "left": {
      "label": "现在截断回路",
      "effect": {
        "cash": -2,
        "trust": -2
      },
      "hidden": {
        "riskExposure": -2,
        "bossDependency": -1
      },
      "relations": {
        "boss": -1,
        "legal": 1
      },
      "flags": [
        "vendor_shadow_cut"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续替它找说法",
      "effect": {
        "cash": 1,
        "trust": 2
      },
      "hidden": {
        "riskExposure": 3,
        "politicalHeat": 2
      },
      "relations": {
        "boss": 2,
        "finance": -1
      },
      "flags": [
        "vendor_shadow_routed"
      ],
      "schedule": []
    }
  },
  {
    "id": "bi_snapshot_outlier",
    "storyArc": "bi_anomaly",
    "priority": 8,
    "role": "BI经理",
    "avatar": "📉",
    "title": "BI 半夜给你发了一张截图，说这条曲线如果是真的，那白天会上讲的就只能有一版是演的。",
    "desc": "图上有几处陡得不自然的尖峰，像有人不是在修业务，而是在修一条更适合被端上桌的走势。",
    "conditions": {
      "roundMin": 8,
      "alternatives": [
        {
          "allFlags": [
            "bi_hire",
            "manual_forecast"
          ]
        },
        {
          "allFlags": [
            "data_permission",
            "board_deck_polish"
          ]
        },
        {
          "allFlags": [
            "data_patch",
            "investor_story"
          ]
        }
      ]
    },
    "left": {
      "label": "把原图留下",
      "effect": {
        "trust": -1
      },
      "hidden": {
        "dataMaturity": 2,
        "bossDependency": -1
      },
      "relations": {
        "finance": 1,
        "boss": -1
      },
      "flags": [
        "bi_anomaly_seen"
      ],
      "schedule": []
    },
    "right": {
      "label": "让他发一版能讲的",
      "effect": {
        "trust": 2
      },
      "hidden": {
        "executionDebt": 1,
        "dataMaturity": -1
      },
      "relations": {
        "boss": 1,
        "finance": -1
      },
      "flags": [
        "bi_anomaly_staged"
      ],
      "schedule": []
    }
  },
  {
    "id": "bi_anomaly_explanation",
    "storyArc": "bi_anomaly",
    "priority": 8,
    "role": "BI经理",
    "avatar": "🧮",
    "title": "你们往前追那几处尖峰时，发现它们对齐的不是经营节奏，而是几场关键汇报和外部会面。",
    "desc": "那一刻你开始分不清数据是在解释业务，还是业务一直在配合某个更需要被展示的数据版本活着。",
    "conditions": {
      "roundMin": 10,
      "alternatives": [
        {
          "allFlags": [
            "bi_anomaly_seen",
            "meeting_rewrite"
          ]
        },
        {
          "allFlags": [
            "bi_anomaly_staged",
            "public_promise"
          ]
        },
        {
          "allFlags": [
            "bi_anomaly_seen",
            "numbers_hostage"
          ]
        }
      ]
    },
    "left": {
      "label": "继续找源头",
      "effect": {
        "trust": -2
      },
      "hidden": {
        "dataMaturity": 2,
        "politicalHeat": 1
      },
      "relations": {
        "finance": 1,
        "boss": -1
      },
      "flags": [
        "bi_anomaly_traced"
      ],
      "schedule": []
    },
    "right": {
      "label": "写一版解释口径",
      "effect": {
        "trust": 2
      },
      "hidden": {
        "executionDebt": 1,
        "bossDependency": 1
      },
      "relations": {
        "boss": 1,
        "finance": -1
      },
      "flags": [
        "bi_anomaly_explained"
      ],
      "schedule": []
    }
  },
  {
    "id": "bi_anomaly_owner",
    "storyArc": "bi_anomaly",
    "priority": 9,
    "role": "BI经理",
    "avatar": "🧠",
    "title": "BI 最后问你的不是哪版更真，而是：如果两版都要留，那以后到底谁来替它们一起活着？",
    "desc": "你第一次意识到，这条线真正争的已经不是分析权，而是谁愿意继续替一份被修过的真相背书、解释、挨骂，然后把它带进下一场会。",
    "conditions": {
      "roundMin": 12,
      "alternatives": [
        {
          "allFlags": [
            "bi_anomaly_traced",
            "numbers_discredited"
          ]
        },
        {
          "allFlags": [
            "bi_anomaly_explained",
            "go_explain"
          ]
        },
        {
          "allFlags": [
            "bi_anomaly_traced",
            "version_first"
          ]
        }
      ]
    },
    "left": {
      "label": "留可追的痕迹",
      "effect": {
        "trust": -2,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 2,
        "bossDependency": -1
      },
      "relations": {
        "finance": 1,
        "legal": 1
      },
      "flags": [
        "bi_anomaly_logged"
      ],
      "schedule": []
    },
    "right": {
      "label": "把版本继续折进去",
      "effect": {
        "trust": 2
      },
      "hidden": {
        "executionDebt": 2,
        "bossDependency": 1
      },
      "relations": {
        "boss": 1,
        "finance": -1
      },
      "flags": [
        "bi_anomaly_folded"
      ],
      "schedule": []
    }
  },
  {
    "id": "warehouse_night_shift",
    "storyArc": "warehouse_backdoor",
    "priority": 8,
    "role": "仓库主管",
    "avatar": "🚚",
    "title": "仓库主管深夜给你发消息，说有些货位今晚移动不是为了发货，是为了让明天看起来还像正常运转。",
    "desc": "他没说这是命令，只说“如果你明早要来，最好先知道你看到的可能不是今天真正的仓”。那语气不像求助，像是在提醒你这地方早就学会替别人演示稳定。",
    "conditions": {
      "roundMin": 8,
      "alternatives": [
        {
          "allFlags": [
            "inventory_push",
            "warehouse_transfer"
          ]
        },
        {
          "allFlags": [
            "inventory_push",
            "showcase_staged"
          ]
        },
        {
          "allFlags": [
            "inventory_lock",
            "warehouse_rescue"
          ]
        }
      ]
    },
    "left": {
      "label": "去看真实货位",
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "executionDebt": -1
      },
      "relations": {
        "ops": 1
      },
      "flags": [
        "warehouse_backdoor_seen"
      ],
      "schedule": []
    },
    "right": {
      "label": "先配合把明天过掉",
      "effect": {
        "trust": 1,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 1,
        "bossDependency": 1
      },
      "relations": {
        "ops": -1,
        "boss": 1
      },
      "flags": [
        "warehouse_backdoor_allowed"
      ],
      "schedule": []
    }
  },
  {
    "id": "warehouse_photo_row",
    "storyArc": "warehouse_backdoor",
    "priority": 8,
    "role": "仓库主管",
    "avatar": "📸",
    "title": "你第二次进仓时终于看懂：前面摆着的是给镜头看的排面，后面堆着的才是今天真正没处理掉的东西。",
    "desc": "一边是为参观、会议和截图准备的整齐，另一边是退货、返工和临时挪出来的空位。你第一次明白，仓库不是乱，是被要求同时服务两个现实。",
    "conditions": {
      "roundMin": 10,
      "alternatives": [
        {
          "allFlags": [
            "warehouse_backdoor_seen",
            "showcase_staged"
          ]
        },
        {
          "allFlags": [
            "warehouse_backdoor_allowed",
            "inventory_mirage"
          ]
        },
        {
          "allFlags": [
            "warehouse_backdoor_seen",
            "inventory_lock"
          ]
        }
      ]
    },
    "left": {
      "label": "把真实布局拉出来",
      "effect": {
        "trust": -2,
        "cash": -1
      },
      "hidden": {
        "dataMaturity": 2,
        "politicalHeat": 1
      },
      "relations": {
        "ops": 1,
        "boss": -1
      },
      "flags": [
        "warehouse_backdoor_real"
      ],
      "schedule": []
    },
    "right": {
      "label": "保住前排的样子",
      "effect": {
        "trust": 2,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 1,
        "customerTrust": -1
      },
      "relations": {
        "boss": 1,
        "ops": -1
      },
      "flags": [
        "warehouse_backdoor_show"
      ],
      "schedule": []
    }
  },
  {
    "id": "warehouse_two_books",
    "storyArc": "warehouse_backdoor",
    "priority": 9,
    "role": "仓储总监",
    "avatar": "📚",
    "title": "你终于接受这仓里一直有两本账：一本写给操作，一本写给被看见。",
    "desc": "真正邪门的不是有人在做样子，而是所有人都默认这两本账要同时存在，只是最后总要有一个人负责把它们翻译成同一个现实。而那个人，越来越像你。",
    "conditions": {
      "roundMin": 12,
      "alternatives": [
        {
          "allFlags": [
            "warehouse_backdoor_real",
            "inventory_mirage"
          ]
        },
        {
          "allFlags": [
            "warehouse_backdoor_show",
            "showcase_not_customer"
          ]
        },
        {
          "allFlags": [
            "warehouse_backdoor_allowed",
            "inventory_writeoff_day"
          ]
        }
      ]
    },
    "left": {
      "label": "并成一本账",
      "effect": {
        "trust": -3,
        "cash": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 2,
        "bossDependency": -1
      },
      "relations": {
        "ops": 1,
        "finance": 1
      },
      "flags": [
        "warehouse_backdoor_merge"
      ],
      "schedule": []
    },
    "right": {
      "label": "继续两本都留着",
      "effect": {
        "trust": 2,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 2,
        "bossDependency": 1
      },
      "relations": {
        "boss": 1,
        "ops": -1
      },
      "flags": [
        "warehouse_backdoor_split"
      ],
      "schedule": []
    }
  }
];
