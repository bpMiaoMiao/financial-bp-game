export const storyChains = [
  {
    "id": "predecessor_archive",
    "storyArc": "predecessor_trace",
    "priority": 8,
    "role": "共享盘",
    "avatar": "🗂️",
    "title": "共享盘角落里还留着一个前任的文件夹，名字短得像谁都懒得再解释它原本属于谁。",
    "desc": "里面没什么戏剧性的东西，只有几张你现在也在天天改的表。真正让人发愣的是，它们改到最后一版时，看起来已经和你现在手里的差不多了。",
    "conditions": {
      "roundMin": 8,
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
    "title": "那份表的批注一点开，不像交接，更像有人在格子边上偷偷记了几句怕会上说不出口的话。",
    "desc": "批注很短，都是“先别正面撞”“这版先过会”“解释留给明天”。你看着看着才发现，它们不像经验，更像一种已经被练熟的动作。",
    "conditions": {
      "roundMin": 9,
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
    "id": "predecessor_meeting_grid",
    "storyArc": "predecessor_trace",
    "priority": 8,
    "role": "会议纪要",
    "avatar": "🧩",
    "title": "你把前任最后那几周的会议纪要摊开后，发现每次大一点的冲突最后都会被翻成差不多的三步。",
    "desc": "先做一版能讲的，再找一个人去说，最后把真正的代价往后拖一天。你起初还觉得只是熟悉，直到你发现自己这几周也差不多在这么排。",
    "conditions": {
      "roundMin": 11,
      "alternatives": [
        {
          "allFlags": [
            "predecessor_trace_read",
            "version_first"
          ]
        },
        {
          "allFlags": [
            "predecessor_trace_read",
            "go_explain"
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
      "label": "照着今天再顶一轮",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_watchlist_is_allocation"
            ]
          },
          "label": "知道这套轮换，也先把今天顶完",
          "flags": [
            "predecessor_trace_loop",
            "predecessor_trace_accepted"
          ]
        }
      ],
      "effect": {
        "trust": 2,
        "team": -1
      },
      "hidden": {
        "bossDependency": 1,
        "orgFatigue": 1
      },
      "relations": {
        "boss": 1
      },
      "flags": [
        "predecessor_trace_loop"
      ],
      "schedule": []
    },
    "right": {
      "label": "把这套排法记下来",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_watchlist_is_allocation"
            ]
          },
          "label": "把这套轮换写进交接里",
          "flags": [
            "predecessor_trace_logged",
            "predecessor_trace_named_loop"
          ]
        }
      ],
      "effect": {
        "trust": -2,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "bossDependency": -1
      },
      "relations": {
        "finance": 1,
        "hr": 1
      },
      "flags": [
        "predecessor_trace_logged"
      ],
      "schedule": []
    }
  },
  {
    "id": "predecessor_calendar_echo",
    "storyArc": "predecessor_trace",
    "priority": 9,
    "grantsKnowledge": [
      "knows_predecessor_loop"
    ],
    "role": "HRBP",
    "avatar": "📆",
    "title": "你把前任最后几周的日历翻出来时，发现会名和备注几乎能和你这几周一一对上。",
    "desc": "不是那种大事相似，而是连“先补一版”“会后单聊”“你去说更合适”这种零碎备注都近得过分。你第一次有点分不清，是你在重复前任，还是这位置本来就会把人排成这样。",
    "conditions": {
      "roundMin": 13,
      "alternatives": [
        {
          "allFlags": [
            "predecessor_trace_named_loop",
            "temporary_plug"
          ]
        },
        {
          "allFlags": [
            "predecessor_trace_accepted",
            "version_first"
          ]
        },
        {
          "allFlags": [
            "predecessor_trace_named_loop",
            "middle_seat_protocol"
          ]
        }
      ]
    },
    "left": {
      "label": "把这位置当回事写进去",
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
        "predecessor_trace_truth_written"
      ],
      "schedule": []
    },
    "right": {
      "label": "把这套日历继续排下去",
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
        "predecessor_trace_truth_swallowed"
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
    "title": "你接手时拿到的不是完整项目书，而是一串散在微信、会议纪要和老板口头里的要求。",
    "desc": "范围每过一周就多一点，名字却每次都还叫那个名字。奇怪的不是它没边界，而是周围每个人都像默认边界可以晚点再说。",
    "conditions": {
      "roundMin": 7,
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
    "title": "这个项目又改名了，新的抬头比上一次更体面，也更像一件没人好意思追问用途的事。",
    "desc": "资料里的目标、预算和归口全都轻轻挪了一下，像不是在重做项目，而是在替它重新找一个这周更方便继续活下去的说法。",
    "conditions": {
      "roundMin": 9,
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
    "id": "friend_project_table_note",
    "storyArc": "friend_project",
    "priority": 8,
    "role": "财务BP",
    "avatar": "🗒️",
    "title": "项目过会前夜，你把几版材料摊在桌上，才发现真正变得最快的不是内容，而是它每次被重新定义的理由。",
    "desc": "有时它是增长，有时它是品牌，有时又只是“先别让关系冷下来”。你开始怀疑，它真正稳定的功能可能根本不写在任何一页纸上。",
    "conditions": {
      "roundMin": 11,
      "alternatives": [
        {
          "allFlags": [
            "friend_project_scope_blurred",
            "meeting_rewrite"
          ]
        },
        {
          "allFlags": [
            "friend_project_relabel_shifted",
            "board_deck_polish"
          ]
        },
        {
          "allFlags": [
            "friend_project_scope_blurred",
            "favored_vendor"
          ]
        }
      ]
    },
    "left": {
      "label": "继续按能推进的版本排",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_showcase_is_performance"
            ]
          },
          "label": "按关系需要继续改写它",
          "flags": [
            "friend_project_relabel_shifted",
            "friend_project_mask_rewritten"
          ]
        }
      ],
      "effect": {
        "trust": 2,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 1,
        "bossDependency": 1,
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
    },
    "right": {
      "label": "把真实用途写出来",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_showcase_is_performance"
            ]
          },
          "label": "按真实用途和关系写",
          "flags": [
            "friend_project_relabel_true",
            "friend_project_named_for_relation"
          ]
        }
      ],
      "effect": {
        "trust": -2,
        "cash": -1
      },
      "hidden": {
        "dataMaturity": 1,
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
    }
  },
  {
    "id": "friend_project_sinkhole",
    "storyArc": "friend_project",
    "priority": 9,
    "grantsKnowledge": [
      "knows_friend_project_real_purpose"
    ],
    "role": "财务总监",
    "avatar": "🕳️",
    "title": "你顺着预算和例外一路往下看，终于发现这个项目最稳定的从来不是回报，而是总有人替它把下一段接下去。",
    "desc": "供应商、口径、借口和追加资源最后都绕回同一个地方。它不像一个做得好不好的项目，更像一个不能当场停下来的洞。",
    "conditions": {
      "roundMin": 13,
      "requiresKnowledge": [
        "knows_showcase_is_performance"
      ],
      "alternatives": [
        {
          "allFlags": [
            "friend_project_mask_rewritten",
            "proxy_signature"
          ]
        },
        {
          "allFlags": [
            "friend_project_named_for_relation",
            "favored_vendor",
            "board_deck_polish"
          ]
        },
        {
          "allFlags": [
            "friend_project_mask_rewritten",
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
    "title": "这场参观流程排得很满，像大家真正担心的不是看不看得懂，而是会不会哪一段突然看起来不够像样。",
    "desc": "路线、屏幕、讲稿和停留点都被提前标好了。你一开始只觉得这次接待做得过细，细到不像在接客，更像在排练。",
    "conditions": {
      "roundMin": 7,
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
    "title": "对方第一轮提的不是价格，而是一串“最好再灵活一点”的例外。",
    "desc": "账期、包装、返修和汇报方式都被轻轻往外推了一格。你慢慢感觉到，他像不是在试方案，而是在试你们这边谁会先松口。",
    "conditions": {
      "roundMin": 9,
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
    "id": "showcase_walkthrough_pause",
    "storyArc": "showcase_narrative",
    "priority": 8,
    "role": "接待负责人",
    "avatar": "🚪",
    "title": "参观路线走到一半时，对方突然停下来，问的不是产品，而是“你们平时也是按这个顺序运转吗”。",
    "desc": "那一下大家都安静了一瞬，像所有人都明白他其实在问这套场面有多少是今天临时搭出来的，又有多少会被继续当成日常。",
    "conditions": {
      "roundMin": 11,
      "alternatives": [
        {
          "allFlags": [
            "showcase_staged",
            "showcase_exception_yes"
          ]
        },
        {
          "allFlags": [
            "showcase_staged",
            "public_promise"
          ]
        },
        {
          "allFlags": [
            "showcase_unmasked",
            "board_deck_polish"
          ]
        }
      ]
    },
    "left": {
      "label": "替现场把话接住",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_predecessor_loop"
            ]
          },
          "label": "继续替这场展示把台搭稳",
          "flags": [
            "showcase_staged",
            "showcase_stage_read"
          ]
        }
      ],
      "effect": {
        "trust": 2,
        "growth": 1
      },
      "hidden": {
        "bossDependency": 1,
        "customerTrust": -1
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
      "label": "把例外摊回桌面",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_predecessor_loop"
            ]
          },
          "label": "把这层样子先撤一点",
          "flags": [
            "showcase_exception_no",
            "showcase_exception_named"
          ]
        }
      ],
      "effect": {
        "trust": -2,
        "growth": -1
      },
      "hidden": {
        "dataMaturity": 1,
        "customerTrust": 1
      },
      "relations": {
        "boss": -1,
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
    "grantsKnowledge": [
      "knows_showcase_is_performance"
    ],
    "role": "来访方负责人",
    "avatar": "🧭",
    "title": "会快结束时你才反应过来，对方真正看重的不是这单怎么下，而是你们这家公司还能不能继续摆出同一个样子。",
    "desc": "他问得最细的地方都不在价格上，而在“以后会不会变”“流程会不会乱”“讲法能不能一直一样”。你那时才听出来，这趟来的人看的是稳定，不是产品。",
    "conditions": {
      "roundMin": 13,
      "requiresKnowledge": [
        "knows_predecessor_loop"
      ],
      "alternatives": [
        {
          "allFlags": [
            "showcase_exception_buffered",
            "public_promise"
          ]
        },
        {
          "allFlags": [
            "showcase_exception_buffered",
            "investor_story"
          ]
        },
        {
          "allFlags": [
            "showcase_stage_read",
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
    "title": "HRBP把一张观察名单递给你时手停了一下，像忽然意识到这页不该让你看太久。",
    "desc": "名单上没有明显的高低，只是标着“暂时不能动”“适合先谈”“可承压”。你一开始只觉得这是人事语言，越看越觉得这些词不像在写人，更像在排顺序。",
    "conditions": {
      "roundMin": 7,
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
    "title": "你第二次翻那份名单时，才发现最刺眼的一列叫“承压稳定性”。",
    "desc": "分高的人不一定最强，只是更不容易在会上翻脸、更适合先把难听的话消化掉。那一列看久了，不像能力项，像使用说明。",
    "conditions": {
      "roundMin": 9,
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
    "id": "watchlist_meeting_order",
    "storyArc": "hr_watchlist",
    "priority": 8,
    "role": "HRBP",
    "avatar": "🪜",
    "title": "你后来发现，那份名单不仅排谁先谈，还排谁先去参加哪种会、谁先被放进哪种气氛里。",
    "desc": "有些人总被安排在“先安抚”的会里，有些人总是在“先讲道理”的会里。你第一次觉得它像不是在排管理动作，而是在排每个人该先接哪种震动。",
    "conditions": {
      "roundMin": 11,
      "alternatives": [
        {
          "allFlags": [
            "hr_watchlist_seen",
            "hr_watchlist_questioned"
          ]
        },
        {
          "allFlags": [
            "hr_watchlist_smoothed",
            "default_receiver"
          ]
        },
        {
          "allFlags": [
            "hr_watchlist_seen",
            "seat_cost"
          ]
        }
      ]
    },
    "left": {
      "label": "记住谁总在前面",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_predecessor_loop"
            ]
          },
          "label": "记住这像一张轮换表",
          "flags": [
            "hr_watchlist_logged",
            "watchlist_rotation_named"
          ]
        }
      ],
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "politicalHeat": 1
      },
      "relations": {
        "hr": 1
      },
      "flags": [
        "hr_watchlist_logged"
      ],
      "schedule": []
    },
    "right": {
      "label": "先把这轮排过去",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_predecessor_loop"
            ]
          },
          "label": "知道也先当作普通安排",
          "flags": [
            "hr_watchlist_buried",
            "watchlist_rotation_accepted"
          ]
        }
      ],
      "effect": {
        "trust": 2,
        "team": -1
      },
      "hidden": {
        "orgFatigue": 1,
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
    "id": "watchlist_rotation",
    "storyArc": "hr_watchlist",
    "priority": 9,
    "grantsKnowledge": [
      "knows_watchlist_is_allocation"
    ],
    "role": "HRD",
    "avatar": "♻️",
    "title": "你终于明白，那份名单真正排的不是人才，而是变化先落到谁身上。",
    "desc": "有人适合先安抚，有人适合先牺牲，有人适合先顶住。最怪的是，你这位置明明不在表里，却总像排在最前面。",
    "conditions": {
      "roundMin": 13,
      "alternatives": [
        {
          "allFlags": [
            "watchlist_rotation_named",
            "seat_cost"
          ]
        },
        {
          "allFlags": [
            "watchlist_rotation_accepted",
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
      "roundMin": 7,
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
      "roundMin": 9,
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
      "roundMin": 11,
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
    "title": "BI 半夜给你发了一张截图，说这条曲线和白天会上那版，不可能同时都算真的。",
    "desc": "图上有几处尖峰陡得不自然，像有人动的不是业务，而是那条更适合被端上桌的走势。",
    "conditions": {
      "roundMin": 7,
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
    "desc": "那几次修正总在要上桌前发生。你第一次不太愿意承认，数据像不是在解释业务，而是在等业务来配合它。",
    "conditions": {
      "roundMin": 9,
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
    "id": "bi_room_version",
    "storyArc": "bi_anomaly",
    "priority": 8,
    "role": "财务BP",
    "avatar": "🪞",
    "title": "你把那几次曲线异动和会议时间并在一页上时，第一页第一次不像分析报告，更像排练记录。",
    "desc": "异常不是随业务长出来的，而总在要上桌前被抹平、改名或解释掉。你终于开始怀疑，数字不是在追现实，而是在追下一场会需要它长成什么样。",
    "conditions": {
      "roundMin": 11,
      "alternatives": [
        {
          "allFlags": [
            "bi_anomaly_seen",
            "bi_anomaly_traced"
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
            "bi_anomaly_seen",
            "version_first"
          ]
        }
      ]
    },
    "left": {
      "label": "给它留原始痕迹",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_showcase_is_performance"
            ]
          },
          "label": "给原图留一条活路",
          "flags": [
            "bi_anomaly_logged",
            "bi_truth_kept_raw"
          ]
        }
      ],
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
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
      "label": "先写成解释口径",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_showcase_is_performance"
            ]
          },
          "label": "先把它翻成能过会的话",
          "flags": [
            "bi_anomaly_folded",
            "bi_truth_translated"
          ]
        }
      ],
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
        "bi_anomaly_folded"
      ],
      "schedule": []
    }
  },
  {
    "id": "bi_anomaly_owner",
    "storyArc": "bi_anomaly",
    "priority": 9,
    "grantsKnowledge": [
      "knows_numbers_need_a_narrator"
    ],
    "role": "BI经理",
    "avatar": "🧠",
    "title": "BI 最后问你的不是哪版更真，而是：如果两版都得留，以后谁负责一直把它们讲圆。",
    "desc": "你那时才反应过来，这条线争的早不是分析权，而是谁来替一份修过的真相继续活在会里、版本里和你的嘴里。",
    "conditions": {
      "roundMin": 13,
      "requiresKnowledge": [
        "knows_showcase_is_performance"
      ],
      "alternatives": [
        {
          "allFlags": [
            "bi_truth_kept_raw",
            "numbers_discredited"
          ]
        },
        {
          "allFlags": [
            "bi_truth_translated",
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
    "title": "仓库主管深夜给你发消息，说今晚有几排货位要挪，但不是因为明天真有那批货要发。",
    "desc": "他没说是谁让挪的，只说“你明早要来看的话，最好先知道看到的不一定是今天真正的仓”。那语气平得过头，像这件事已经做过不止一次。",
    "conditions": {
      "roundMin": 7,
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
    "title": "你第二次进仓时终于看懂：前排摆的是能被拍进去的整齐，后排堆的才是今天真正没消化掉的东西。",
    "desc": "一边是给参观、会议和截图准备的排面，一边是退货、返工和临时挪出来的空位。仓不是简单地乱，而是被要求同时对两种看法负责。",
    "conditions": {
      "roundMin": 9,
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
    "id": "warehouse_route_overlay",
    "storyArc": "warehouse_backdoor",
    "priority": 8,
    "role": "仓储总监",
    "avatar": "🗺️",
    "title": "仓储总监把明早参观路线和今晚调位路线叠在一起给你看时，你第一次发现两套箭头根本不是为同一件事画的。",
    "desc": "一套路线是为了让人看到“还在正常运转”，另一套路线是为了把今天真正处理不掉的东西塞到镜头之外。它们居然长期能同时存在，才是最怪的地方。",
    "conditions": {
      "roundMin": 11,
      "alternatives": [
        {
          "allFlags": [
            "warehouse_backdoor_seen",
            "warehouse_backdoor_real"
          ]
        },
        {
          "allFlags": [
            "warehouse_backdoor_allowed",
            "showcase_staged"
          ]
        },
        {
          "allFlags": [
            "warehouse_backdoor_show",
            "inventory_mirage"
          ]
        }
      ]
    },
    "left": {
      "label": "把两套路都摊开",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_showcase_is_performance"
            ]
          },
          "label": "承认仓里一直有两套现实",
          "flags": [
            "warehouse_backdoor_real",
            "warehouse_double_reality_seen"
          ]
        }
      ],
      "effect": {
        "trust": -2,
        "cash": -1
      },
      "hidden": {
        "dataMaturity": 1,
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
      "label": "继续保住展示那套",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_showcase_is_performance"
            ]
          },
          "label": "先让两套现实继续并排活着",
          "flags": [
            "warehouse_backdoor_show",
            "warehouse_double_reality_kept"
          ]
        }
      ],
      "effect": {
        "trust": 2,
        "growth": 1
      },
      "hidden": {
        "executionDebt": 1,
        "bossDependency": 1
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
    "grantsKnowledge": [
      "knows_double_reality"
    ],
    "role": "仓储总监",
    "avatar": "📚",
    "title": "你终于接受这仓里一直有两本账：一本写给操作，一本写给被看见。",
    "desc": "真正邪门的不是有人做样子，而是所有人都默认这两本账得一起留着，只是最后总要有人把它们翻译成同一个现实。而那件事，越来越像你的工作。",
    "conditions": {
      "roundMin": 13,
      "requiresKnowledge": [
        "knows_showcase_is_performance"
      ],
      "alternatives": [
        {
          "allFlags": [
            "warehouse_double_reality_seen",
            "inventory_mirage"
          ]
        },
        {
          "allFlags": [
            "warehouse_double_reality_kept",
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
  },
  {
    "id": "mainline_empty_seat",
    "storyArc": "mainline_reveal",
    "priority": 11,
    "role": "老板助理",
    "avatar": "🪑",
    "title": "行政把一张空着的名牌先放到了会议室里，问你交接模板要不要提前整理一版。",
    "desc": "她语气轻得像只是在确认流程。可你第一次真切地感觉到，这位置真正稳定的从来不是名字，而是总有人要坐进去，把上一轮没接完的东西重新接起来。",
    "conditions": {
      "roundMin": 15,
      "requiresKnowledge": [
        "knows_predecessor_loop",
        "knows_showcase_is_performance",
        "knows_friend_project_real_purpose"
      ],
      "storyProgressMin": {
        "predecessor_trace": 4,
        "showcase_narrative": 4,
        "friend_project": 4
      },
      "alternatives": [
        {
          "allFlags": [
            "predecessor_trace_named_loop",
            "showcase_stage_read",
            "friend_project_mask_rewritten"
          ]
        },
        {
          "allFlags": [
            "predecessor_trace_accepted",
            "showcase_exception_buffered",
            "friend_project_named_for_relation"
          ]
        },
        {
          "allFlags": [
            "predecessor_trace_named_loop",
            "showcase_exception_named",
            "friend_project_mask_rewritten"
          ]
        }
      ]
    },
    "left": {
      "label": "把交接提纲拉出来",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_watchlist_is_allocation",
              "knows_numbers_need_a_narrator"
            ]
          },
          "label": "把这位置怎么接事的逻辑拉出来",
          "flags": [
            "mainline_reveal_opened",
            "mainline_truth_faced"
          ]
        }
      ],
      "effect": {
        "trust": -1,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 1,
        "bossDependency": -1
      },
      "relations": {
        "finance": 1,
        "boss": -1
      },
      "flags": [
        "mainline_reveal_opened"
      ],
      "schedule": []
    },
    "right": {
      "label": "先把纸翻过去",
      "variants": [
        {
          "when": {
            "requiresKnowledge": [
              "knows_watchlist_is_allocation",
              "knows_numbers_need_a_narrator"
            ]
          },
          "label": "先让下一个人继续接",
          "flags": [
            "mainline_reveal_delayed",
            "mainline_truth_deferred"
          ]
        }
      ],
      "effect": {
        "trust": 1
      },
      "hidden": {
        "orgFatigue": 1,
        "politicalHeat": 1
      },
      "relations": {
        "boss": 1
      },
      "flags": [
        "mainline_reveal_delayed"
      ],
      "schedule": []
    }
  },
  {
    "id": "mainline_nameplate",
    "storyArc": "mainline_reveal",
    "priority": 12,
    "role": "你自己",
    "avatar": "🪪",
    "title": "你终于明白，这家公司真正稳定的，不是方法，也不是人，而是这个位置总能把冲突先接成还能继续开的下一轮。",
    "desc": "前任留下的表、那场被排稳的接待、那个始终不肯停下来的项目，最后都指向同一个地方：你以为自己在做经营，很多时候却是在替这套系统把本该当场爆开的东西先接住。 ",
    "trueEnding": {
      "id": "true_ending",
      "special": true,
      "trueEnding": true,
      "title": "真结局：位置不是空缺，是机制",
      "text": "你终于看清，这个岗位被反复换人，不是因为总有人做不好，而是因为它本来就被用来先接冲突、先翻译代价、先替系统把场面维持到下一轮。",
      "memo": "你一直以为自己在做经营判断。走到最后才明白，很多判断根本不属于这个位置，可后果总会先落到这个位置上。",
      "handoff": "这一次，交接没有立刻开始。会议室难得空了一会儿，像公司第一次不得不承认：它一直需要的，从来不是下一个更合适的人，而是一个总得有人坐进去的位置。"
    },
    "conditions": {
      "roundMin": 16,
      "requiresKnowledge": [
        "knows_predecessor_loop",
        "knows_showcase_is_performance",
        "knows_friend_project_real_purpose",
        "knows_watchlist_is_allocation",
        "knows_numbers_need_a_narrator",
        "knows_double_reality"
      ],
      "storyProgressMin": {
        "predecessor_trace": 4,
        "showcase_narrative": 4,
        "friend_project": 4,
        "hr_watchlist": 4,
        "bi_anomaly": 4,
        "warehouse_backdoor": 4
      },
      "alternatives": [
        {
          "allFlags": [
            "mainline_truth_faced",
            "buffer_role_reveal"
          ]
        },
        {
          "allFlags": [
            "mainline_truth_faced",
            "replacement_ready"
          ]
        },
        {
          "allFlags": [
            "mainline_truth_deferred",
            "seat_without_power"
          ]
        }
      ]
    },
    "left": {
      "label": "把真相写进交接里",
      "effect": {
        "trust": -2,
        "team": 1
      },
      "hidden": {
        "dataMaturity": 2,
        "bossDependency": -2
      },
      "relations": {
        "finance": 1,
        "boss": -2
      },
      "flags": [
        "mainline_truth_written"
      ],
      "schedule": []
    },
    "right": {
      "label": "把位置留给下一个人自己看懂",
      "effect": {
        "team": -1
      },
      "hidden": {
        "orgFatigue": 1,
        "politicalHeat": 1
      },
      "relations": {
        "boss": -1,
        "hr": -1
      },
      "flags": [
        "mainline_truth_withheld"
      ],
      "schedule": []
    }
  }
];

export const storyArcLengths = storyChains.reduce((acc, event) => {
  acc[event.storyArc] = (acc[event.storyArc] || 0) + 1;
  return acc;
}, {});
