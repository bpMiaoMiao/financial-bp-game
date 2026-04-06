import { storyChains as rawStoryChains } from "./storyChains";

export const MAINLINE_STORY_ARCS = [
  "predecessor_trace",
  "friend_project",
  "showcase_narrative",
  "hr_watchlist",
  "bi_anomaly",
  "warehouse_backdoor",
  "mainline_reveal",
];

const MAINLINE_ARC_SET = new Set(MAINLINE_STORY_ARCS);

export const storyMainlineChains = rawStoryChains.filter((event) => MAINLINE_ARC_SET.has(event.storyArc));
