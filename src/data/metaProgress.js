export const META_PROGRESS_STORAGE_KEY = "reigns_bp_meta_progress_v1";

export const defaultMetaProgress = {
  achievements: {},
  knowledge: {
    knows_predecessor_loop: false,
    knows_showcase_is_performance: false,
    knows_friend_project_real_purpose: false,
    knows_watchlist_is_allocation: false,
    knows_numbers_need_a_narrator: false,
    knows_double_reality: false,
  },
  storyProgress: {
    predecessor_trace: 0,
    friend_project: 0,
    showcase_narrative: 0,
    hr_watchlist: 0,
    vendor_shadow: 0,
    bi_anomaly: 0,
    warehouse_backdoor: 0,
    mainline_reveal: 0,
  },
  mainlineProgress: {
    buffer_role_understood: false,
    true_ending_available: false,
    true_ending_unlocked: false,
    true_ending_seen: false,
  },
  stats: {
    highestRound: 0,
    totalChoices: 0,
    informedChoiceCount: 0,
    completedRuns: 0,
    seenEventIds: [],
    endingsSeen: {},
  },
};

function mergeObjects(base, incoming) {
  return {
    ...base,
    ...(incoming || {}),
  };
}

export function mergeMetaProgress(raw = {}) {
  return {
    achievements: mergeObjects(defaultMetaProgress.achievements, raw.achievements),
    knowledge: mergeObjects(defaultMetaProgress.knowledge, raw.knowledge),
    storyProgress: mergeObjects(defaultMetaProgress.storyProgress, raw.storyProgress),
    mainlineProgress: mergeObjects(defaultMetaProgress.mainlineProgress, raw.mainlineProgress),
    stats: {
      ...defaultMetaProgress.stats,
      ...(raw.stats || {}),
      informedChoiceCount:
        typeof raw.stats?.informedChoiceCount === "number"
          ? raw.stats.informedChoiceCount
          : defaultMetaProgress.stats.informedChoiceCount,
      completedRuns:
        typeof raw.stats?.completedRuns === "number"
          ? raw.stats.completedRuns
          : defaultMetaProgress.stats.completedRuns,
      seenEventIds: Array.isArray(raw.stats?.seenEventIds) ? raw.stats.seenEventIds : defaultMetaProgress.stats.seenEventIds,
      endingsSeen: mergeObjects(defaultMetaProgress.stats.endingsSeen, raw.stats?.endingsSeen),
    },
  };
}

export function loadMetaProgress() {
  if (typeof window === "undefined") return defaultMetaProgress;
  try {
    const raw = window.localStorage.getItem(META_PROGRESS_STORAGE_KEY);
    if (!raw) return defaultMetaProgress;
    return mergeMetaProgress(JSON.parse(raw));
  } catch {
    return defaultMetaProgress;
  }
}

export function saveMetaProgress(progress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(META_PROGRESS_STORAGE_KEY, JSON.stringify(mergeMetaProgress(progress)));
  } catch {
    // Ignore storage failures so local progression never breaks a play session.
  }
}
