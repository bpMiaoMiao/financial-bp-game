import { storyChains as rawStoryChains } from "./storyChains";

export const SIDE_STORY_ARCS = [
  "vendor_shadow",
];

const SIDE_ARC_SET = new Set(SIDE_STORY_ARCS);

export const storySidechains = rawStoryChains.filter((event) => SIDE_ARC_SET.has(event.storyArc));
