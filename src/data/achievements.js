import { storyArcLengths } from "./storyChains";
import { MAINLINE_STORY_ARCS } from "./storyMainlines";
import { SIDE_STORY_ARCS } from "./storySidechains";

const CORE_MAINLINE_ARCS = MAINLINE_STORY_ARCS.filter((arc) => arc !== "mainline_reveal");
export const TRACKED_STORY_ARCS = [...CORE_MAINLINE_ARCS, ...SIDE_STORY_ARCS];

const REGULAR_ENDING_IDS = ["cash_crash", "org_collapse", "trust_break", "growth_stall"];
const SPECIAL_ENDING_IDS = ["numbers_discredited", "silent_walkout", "public_meltdown"];

export const achievementCategoryOrder = ["主线", "真相", "故事", "结局", "读法", "生存", "见闻"];

const arcCompletionStage = (arc) => storyArcLengths[arc] || Infinity;
const isArcComplete = (progress, arc) => (progress.storyProgress?.[arc] || 0) >= arcCompletionStage(arc);

export const completedArcCount = (progress, arcs = TRACKED_STORY_ARCS) =>
  arcs.filter((arc) => isArcComplete(progress, arc)).length;

export const unlockedKnowledgeCount = (progress) =>
  Object.values(progress.knowledge || {}).filter(Boolean).length;

export const seenEndingIds = (progress) => Object.keys(progress.stats?.endingsSeen || {});
export const seenRegularEndingCount = (progress) =>
  REGULAR_ENDING_IDS.filter((id) => progress.stats?.endingsSeen?.[id]).length;
export const seenSpecialEndingCount = (progress) =>
  SPECIAL_ENDING_IDS.filter((id) => progress.stats?.endingsSeen?.[id]).length;

const category = (label) => label;

export const achievementDefs = [
  {
    id: "buffer_role_understood",
    icon: "🪞",
    title: "看懂位置",
    desc: "第一次拼出这个岗位真正的用途。",
    category: category("主线"),
    isUnlocked: (progress) => !!progress.mainlineProgress?.buffer_role_understood,
  },
  {
    id: "three_mainline_arcs",
    icon: "🪢",
    title: "暗线开始成形",
    desc: "跨局走完至少 3 条主线型支线。",
    category: category("主线"),
    isUnlocked: (progress) => completedArcCount(progress, CORE_MAINLINE_ARCS) >= 3,
  },
  {
    id: "all_mainline_arcs",
    icon: "🧩",
    title: "主线骨架齐了",
    desc: "走完全部 6 条主线型支线。",
    category: category("主线"),
    isUnlocked: (progress) => completedArcCount(progress, CORE_MAINLINE_ARCS) >= CORE_MAINLINE_ARCS.length,
  },
  {
    id: "true_ending_available",
    icon: "🚪",
    title: "门牌开始发亮",
    desc: "让真结局第一次具备出现条件。",
    category: category("主线"),
    isUnlocked: (progress) => !!progress.mainlineProgress?.true_ending_available,
  },
  {
    id: "true_ending_seen",
    icon: "🕯️",
    title: "真正的结局",
    desc: "见到真结局。",
    category: category("主线"),
    isUnlocked: (progress) => !!progress.mainlineProgress?.true_ending_seen,
  },

  {
    id: "predecessor_truth",
    icon: "🗂️",
    title: "前任不是个例",
    desc: "看懂前任痕迹线的真相。",
    category: category("真相"),
    isUnlocked: (progress) => !!progress.knowledge?.knows_predecessor_loop,
  },
  {
    id: "showcase_truth",
    icon: "🎭",
    title: "不是接待，是表演",
    desc: "看懂展示线真正服务的是什么。",
    category: category("真相"),
    isUnlocked: (progress) => !!progress.knowledge?.knows_showcase_is_performance,
  },
  {
    id: "friend_project_truth",
    icon: "🎣",
    title: "项目不是项目",
    desc: "看懂老板朋友项目的真实用途。",
    category: category("真相"),
    isUnlocked: (progress) => !!progress.knowledge?.knows_friend_project_real_purpose,
  },
  {
    id: "watchlist_truth",
    icon: "📋",
    title: "名单不是名单",
    desc: "看懂观察名单真正管理的是什么。",
    category: category("真相"),
    isUnlocked: (progress) => !!progress.knowledge?.knows_watchlist_is_allocation,
  },
  {
    id: "numbers_truth",
    icon: "📉",
    title: "数字也在找代言人",
    desc: "看懂数字版本真正争的不是准确，而是谁来替它活着。",
    category: category("真相"),
    isUnlocked: (progress) => !!progress.knowledge?.knows_numbers_need_a_narrator,
  },
  {
    id: "warehouse_truth",
    icon: "📚",
    title: "两本现实",
    desc: "看懂仓里为什么要同时服务两套现实。",
    category: category("真相"),
    isUnlocked: (progress) => !!progress.knowledge?.knows_double_reality,
  },
  {
    id: "all_truth_fragments",
    icon: "🧠",
    title: "碎片都对上了",
    desc: "拿到全部 6 块核心认知。",
    category: category("真相"),
    isUnlocked: (progress) => unlockedKnowledgeCount(progress) >= 6,
  },

  {
    id: "first_story_arc",
    icon: "🧵",
    title: "有线可循",
    desc: "跨局走完 1 条故事线。",
    category: category("故事"),
    isUnlocked: (progress) => completedArcCount(progress) >= 1,
  },
  {
    id: "three_story_arcs",
    icon: "🪡",
    title: "线索串起来了",
    desc: "跨局走完至少 3 条故事线。",
    category: category("故事"),
    isUnlocked: (progress) => completedArcCount(progress) >= 3,
  },
  {
    id: "side_story_finished",
    icon: "🕳️",
    title: "旁枝也有牙",
    desc: "走完 1 条普通故事支线。",
    category: category("故事"),
    isUnlocked: (progress) => completedArcCount(progress, SIDE_STORY_ARCS) >= 1,
  },
  {
    id: "all_story_arcs",
    icon: "🗺️",
    title: "公司全景图",
    desc: "走完当前全部故事支线。",
    category: category("故事"),
    isUnlocked: (progress) => completedArcCount(progress, TRACKED_STORY_ARCS) >= TRACKED_STORY_ARCS.length,
  },

  {
    id: "first_special_ending",
    icon: "☠️",
    title: "死得不普通",
    desc: "第一次见到特殊结局。",
    category: category("结局"),
    isUnlocked: (progress) => seenSpecialEndingCount(progress) >= 1,
  },
  {
    id: "three_handoffs",
    icon: "🪑",
    title: "又一任离开了",
    desc: "累计完成 3 次工作交接。",
    category: category("结局"),
    isUnlocked: (progress) => (progress.stats?.completedRuns || 0) >= 3,
  },
  {
    id: "ten_handoffs",
    icon: "🗃️",
    title: "这个位置一直在招人",
    desc: "累计完成 10 次工作交接。",
    category: category("结局"),
    isUnlocked: (progress) => (progress.stats?.completedRuns || 0) >= 10,
  },
  {
    id: "all_regular_endings",
    icon: "🪦",
    title: "四种普通死法",
    desc: "见过全部 4 种明面归零结局。",
    category: category("结局"),
    isUnlocked: (progress) => seenRegularEndingCount(progress) >= REGULAR_ENDING_IDS.length,
  },
  {
    id: "all_special_endings",
    icon: "⚠️",
    title: "三种邪门死法",
    desc: "见过全部 3 种特殊结局。",
    category: category("结局"),
    isUnlocked: (progress) => seenSpecialEndingCount(progress) >= SPECIAL_ENDING_IDS.length,
  },

  {
    id: "first_informed_choice",
    icon: "👂",
    title: "听懂话外音",
    desc: "第一次做出知情后的变体选择。",
    category: category("读法"),
    isUnlocked: (progress) => (progress.stats?.informedChoiceCount || 0) >= 1,
  },
  {
    id: "read_between_lines",
    icon: "🫥",
    title: "会看字缝了",
    desc: "累计做出 6 次知情后的变体选择。",
    category: category("读法"),
    isUnlocked: (progress) => (progress.stats?.informedChoiceCount || 0) >= 6,
  },
  {
    id: "speak_with_subtext",
    icon: "🗣️",
    title: "知道该怎么接话",
    desc: "累计做出 15 次知情后的变体选择。",
    category: category("读法"),
    isUnlocked: (progress) => (progress.stats?.informedChoiceCount || 0) >= 15,
  },

  {
    id: "survive_12",
    icon: "🗓️",
    title: "站稳一年",
    desc: "单局活过 12 回合。",
    category: category("生存"),
    isUnlocked: (progress) => (progress.stats?.highestRound || 0) >= 12,
  },
  {
    id: "survive_24",
    icon: "⏳",
    title: "还在桌上",
    desc: "单局活过 24 回合。",
    category: category("生存"),
    isUnlocked: (progress) => (progress.stats?.highestRound || 0) >= 24,
  },
  {
    id: "survive_36",
    icon: "🧱",
    title: "硬撑三年",
    desc: "单局活过 36 回合。",
    category: category("生存"),
    isUnlocked: (progress) => (progress.stats?.highestRound || 0) >= 36,
  },
  {
    id: "survive_48",
    icon: "🏢",
    title: "你还在工位上",
    desc: "单局活过 48 回合。",
    category: category("生存"),
    isUnlocked: (progress) => (progress.stats?.highestRound || 0) >= 48,
  },

  {
    id: "see_50_cards",
    icon: "🃏",
    title: "见多识广",
    desc: "跨局见过 50 张不同的事件卡。",
    category: category("见闻"),
    isUnlocked: (progress) => (progress.stats?.seenEventIds || []).length >= 50,
  },
  {
    id: "see_100_cards",
    icon: "📚",
    title: "牌池老油条",
    desc: "跨局见过 100 张不同的事件卡。",
    category: category("见闻"),
    isUnlocked: (progress) => (progress.stats?.seenEventIds || []).length >= 100,
  },
  {
    id: "see_150_cards",
    icon: "🧾",
    title: "什么场面都见过了",
    desc: "跨局见过 150 张不同的事件卡。",
    category: category("见闻"),
    isUnlocked: (progress) => (progress.stats?.seenEventIds || []).length >= 150,
  },
  {
    id: "make_100_choices",
    icon: "🫳",
    title: "这活开始熟了",
    desc: "跨局累计做出 100 次选择。",
    category: category("见闻"),
    isUnlocked: (progress) => (progress.stats?.totalChoices || 0) >= 100,
  },
  {
    id: "make_250_choices",
    icon: "🧮",
    title: "手比脑子先到会场",
    desc: "跨局累计做出 250 次选择。",
    category: category("见闻"),
    isUnlocked: (progress) => (progress.stats?.totalChoices || 0) >= 250,
  },
];

export const achievementMap = Object.fromEntries(achievementDefs.map((achievement) => [achievement.id, achievement]));

export function categoryProgress(progress, categoryLabel) {
  const items = achievementDefs.filter((item) => item.category === categoryLabel);
  const unlocked = items.filter((item) => !!progress.achievements?.[item.id]).length;
  return { total: items.length, unlocked };
}

export function applyAchievementUnlocks(progress) {
  const achievements = { ...(progress.achievements || {}) };
  const unlockedIds = [];

  for (const achievement of achievementDefs) {
    if (achievements[achievement.id]) continue;
    if (!achievement.isUnlocked(progress)) continue;
    achievements[achievement.id] = {
      unlockedAt: new Date().toISOString(),
    };
    unlockedIds.push(achievement.id);
  }

  if (!unlockedIds.length) {
    return { progress, unlockedIds: [] };
  }

  return {
    progress: {
      ...progress,
      achievements,
    },
    unlockedIds,
  };
}
