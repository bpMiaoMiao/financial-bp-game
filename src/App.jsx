import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { RotateCcw, Share2, Copy, Skull, Volume2, VolumeX } from "lucide-react";
import { scenarios, initialRelations } from "./data/scenarios";
import { baseEvents } from "./data/baseEvents";
import { chainEvents } from "./data/chainEvents";
import { delayedEffects } from "./data/delayedEffects";
import { outcomeOverrides } from "./data/outcomeOverrides";
import { personaDefs } from "./data/personaDefs";

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const sample = (items) => items[Math.floor(Math.random() * items.length)];
const weightedPick = (items) => {
  const total = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.weight ?? 1;
    if (roll <= 0) return item;
  }
  return items[0];
};

const STAT_KEYS = ["growth", "cash", "team", "trust"];
const HIDDEN_KEYS = [
  "marginHealth",
  "executionDebt",
  "orgFatigue",
  "dataMaturity",
  "customerTrust",
  "riskExposure",
  "bossDependency",
  "politicalHeat",
];
const RELATION_KEYS = ["boss", "sales", "hr", "ops", "finance", "legal"];
const SHOW_DEBUG_INSIGHTS = false;
const HIDDEN_RISK_UP_KEYS = new Set(["executionDebt", "orgFatigue", "riskExposure", "bossDependency", "politicalHeat"]);
const HIDDEN_RISK_DOWN_KEYS = new Set(["marginHealth", "dataMaturity", "customerTrust"]);

function ensureAudioContext(audioRef) {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioRef.current) audioRef.current = new AudioCtx();
  return audioRef.current;
}

function playUiSound(audioRef, kind, enabled = true) {
  if (!enabled) return;
  const ctx = ensureAudioContext(audioRef);
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});

  const presets = {
    swipeLeft: [
      { freq: 250, duration: 0.07, gain: 0.03, type: "triangle" },
      { freq: 180, duration: 0.09, gain: 0.02, type: "triangle" },
    ],
    swipeRight: [
      { freq: 320, duration: 0.06, gain: 0.028, type: "sine" },
      { freq: 430, duration: 0.08, gain: 0.022, type: "sine" },
    ],
    result: [
      { freq: 420, duration: 0.08, gain: 0.022, type: "sine" },
      { freq: 640, duration: 0.12, gain: 0.016, type: "triangle" },
    ],
    chain: [
      { freq: 170, duration: 0.1, gain: 0.03, type: "triangle" },
      { freq: 132, duration: 0.14, gain: 0.018, type: "sawtooth" },
    ],
    annual: [
      { freq: 392, duration: 0.08, gain: 0.02, type: "sine" },
      { freq: 587, duration: 0.1, gain: 0.016, type: "sine" },
    ],
    ending: [
      { freq: 210, duration: 0.14, gain: 0.026, type: "triangle" },
      { freq: 126, duration: 0.2, gain: 0.018, type: "sine" },
    ],
  };
  const sequence = presets[kind];
  if (!sequence) return;

  let at = ctx.currentTime + 0.01;
  sequence.forEach((tone) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = tone.type;
    osc.frequency.setValueAtTime(tone.freq, at);
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(tone.gain, at + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + tone.duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(at);
    osc.stop(at + tone.duration + 0.02);
    at += tone.duration * 0.65;
  });
}

function matchesThresholdMap(target, thresholds = {}, mode = "min") {
  return Object.entries(thresholds).every(([key, value]) => {
    const current = target?.[key] ?? 0;
    return mode === "min" ? current >= value : current <= value;
  });
}

function matchesConditions(state, conditions) {
  if (!conditions) return true;
  const checks = [
    conditions.roundMin == null || state.round >= conditions.roundMin,
    conditions.roundMax == null || state.round <= conditions.roundMax,
    (conditions.allFlags || []).every((flag) => state.flags.includes(flag)),
    !(conditions.anyFlags?.length) || conditions.anyFlags.some((flag) => state.flags.includes(flag)),
    !(conditions.noneFlags?.length) || conditions.noneFlags.every((flag) => !state.flags.includes(flag)),
    matchesThresholdMap(state, conditions.statMin, "min"),
    matchesThresholdMap(state, conditions.statMax, "max"),
    matchesThresholdMap(state.hidden, conditions.hiddenMin, "min"),
    matchesThresholdMap(state.hidden, conditions.hiddenMax, "max"),
    matchesThresholdMap(state.relations, conditions.relationMin, "min"),
    matchesThresholdMap(state.relations, conditions.relationMax, "max"),
  ];
  if (checks.some((ok) => !ok)) return false;
  if (!conditions.alternatives?.length) return true;
  return conditions.alternatives.some((alternative) => matchesConditions(state, alternative));
}

function applyDeltaBlock(base, delta, keys) {
  const next = { ...base };
  for (const key of keys) next[key] = clamp((next[key] ?? 0) + (delta?.[key] ?? 0));
  return next;
}

function phaseImpactProfile(round) {
  const phase = phaseOfRound(round);
  if (phase === "early") {
    return { beneficial: 1, harmful: 1 };
  }
  if (phase === "mid") {
    return { beneficial: 0.88, harmful: 1.3 };
  }
  return { beneficial: 0.72, harmful: 1.65 };
}

function phaseOfRound(round) {
  if (round <= 4) return "early";
  if (round <= 8) return "mid";
  return "late";
}

function scaledMagnitude(value, multiplier) {
  if (!value) return 0;
  const scaled = Math.round(Math.abs(value) * multiplier);
  return Math.max(1, scaled);
}

function scaleStatDelta(delta = {}, round) {
  const profile = phaseImpactProfile(round);
  return Object.fromEntries(
    Object.entries(delta).map(([key, value]) => {
      if (!value) return [key, 0];
      const multiplier = value > 0 ? profile.beneficial : profile.harmful;
      return [key, Math.sign(value) * scaledMagnitude(value, multiplier)];
    }),
  );
}

function scaleRelationDelta(delta = {}, round) {
  const profile = phaseImpactProfile(round);
  return Object.fromEntries(
    Object.entries(delta).map(([key, value]) => {
      if (!value) return [key, 0];
      const multiplier = value > 0 ? profile.beneficial : profile.harmful;
      return [key, Math.sign(value) * scaledMagnitude(value, multiplier)];
    }),
  );
}

function scaleHiddenDelta(delta = {}, round) {
  const profile = phaseImpactProfile(round);
  return Object.fromEntries(
    Object.entries(delta).map(([key, value]) => {
      if (!value) return [key, 0];
      const isHarmful =
        (HIDDEN_RISK_UP_KEYS.has(key) && value > 0) ||
        (HIDDEN_RISK_DOWN_KEYS.has(key) && value < 0);
      const isHelpful =
        (HIDDEN_RISK_UP_KEYS.has(key) && value < 0) ||
        (HIDDEN_RISK_DOWN_KEYS.has(key) && value > 0);
      const multiplier = isHarmful ? profile.harmful : (isHelpful ? profile.beneficial : 1);
      return [key, Math.sign(value) * scaledMagnitude(value, multiplier)];
    }),
  );
}

function recentRepeats(list = [], value) {
  return list.filter((item) => item === value).length;
}

function thresholdMomentum(target, thresholds = {}, mode = "min", divisor = 18) {
  return Object.entries(thresholds).reduce((sum, [key, value]) => {
    const current = target?.[key] ?? 0;
    if (mode === "min" && current >= value) return sum + (current - value) / divisor;
    if (mode === "max" && current <= value) return sum + (value - current) / divisor;
    return sum;
  }, 0);
}

function scenarioBiasWeight(event, state) {
  const scenarioBiases = {
    rocket: ["现金", "增长", "库存"],
    steady: ["利润质量", "数据", "客户"],
    "fragile-team": ["团队", "执行", "数据"],
    "boss-driven": ["老板", "政治", "数据"],
    "messy-system": ["系统", "数据", "库存"],
  };
  const preferredTags = scenarioBiases[state.scenario?.id] || [];
  if (state.round > 4) return 0;
  return preferredTags.some((tag) => event.tags?.includes(tag)) ? 1.4 : 0;
}

function phaseFlavorWeight(event, state) {
  const phase = phaseOfRound(state.round);
  const phaseBiases = {
    early: { up: ["增长", "现金", "库存", "数据", "系统"], down: ["政治", "老板", "合规"] },
    mid: { up: ["利润质量", "库存", "团队", "客户", "执行", "数据"], down: [] },
    late: { up: ["政治", "老板", "合规", "风险", "客户"], down: ["增长"] },
  };
  const bias = phaseBiases[phase];
  if (!event.tags?.length || !bias) return 0;
  let bonus = 0;
  if (bias.up.some((tag) => event.tags.includes(tag))) bonus += 0.9;
  if (bias.down.some((tag) => event.tags.includes(tag))) bonus -= 0.8;
  return bonus;
}

function consequenceBiasWeight(event, state) {
  if (!event.tags?.length) return 0;
  const recentFlags = state.memory.recentFlags || [];
  const flagGroups = [
    { flags: ["push_growth", "festival_promo", "marketplace_coupon", "live_stream_push", "new_sku_rush", "flagship_launch"], tags: ["利润质量", "库存", "客户"], weight: 0.7 },
    { flags: ["long_terms", "advance_payment", "delay_supplier_payment", "payroll_watch", "bridge_loan", "borrow_group_cash"], tags: ["现金", "风险", "老板"], weight: 0.8 },
    { flags: ["freeze_hiring", "burn_team", "lose_core", "performance_push", "middle_manager_blame"], tags: ["团队", "执行", "政治"], weight: 0.8 },
    { flags: ["gmv_target", "boss_confidant", "stand_side", "public_promise", "owner_override", "need_white_lie"], tags: ["老板", "政治", "数据"], weight: 0.75 },
    { flags: ["manual_forecast", "skip_system", "data_patch", "close_cram", "misaligned_kpi"], tags: ["数据", "系统", "政治"], weight: 0.7 },
  ];
  let bonus = 0;
  for (const group of flagGroups) {
    if (group.flags.some((flag) => recentFlags.includes(flag)) && group.tags.some((tag) => event.tags.includes(tag))) {
      bonus += group.weight;
    }
  }
  return Math.min(bonus, 2.4);
}

function stablePlayProfile(state) {
  if (state.round < 5) return { level: 0 };

  const stableCash = state.cash >= 56;
  const stableTeam = state.team >= 56;
  const stableTrust = state.trust >= 53;
  const lowRisk =
    state.hidden.executionDebt <= 30 &&
    state.hidden.orgFatigue <= 32 &&
    state.hidden.riskExposure <= 30;
  const lowConflict = state.hidden.politicalHeat <= 24 && state.hidden.bossDependency <= 38;
  const growthLagging =
    state.growth <= 50 ||
    state.growth + 10 <= Math.max(state.cash, state.team, state.trust);
  const marginComfort = state.hidden.marginHealth >= 50;
  const customerComfort = state.hidden.customerTrust >= 50;

  let level = 0;
  if (stableCash) level += 1.1;
  if (stableTeam) level += 1.1;
  if (stableTrust) level += 0.9;
  if (lowRisk) level += 0.9;
  if (lowConflict) level += 0.8;
  if (growthLagging) level += 1.6;
  if (marginComfort) level += 0.5;
  if (customerComfort) level += 0.35;
  if (state.round >= 8) level += 0.6;
  if (state.round >= 11) level += 0.6;

  return {
    level,
    stableCash,
    stableTeam,
    stableTrust,
    lowRisk,
    lowConflict,
    growthLagging,
    marginComfort,
    customerComfort,
  };
}

function stabilityPressureWeight(event, state) {
  if (!event.tags?.length) return 0;
  const profile = stablePlayProfile(state);
  if (profile.level < 3.2) return 0;

  let bonus = 0;
  if (profile.growthLagging && event.tags.includes("增长")) bonus += 2.8;
  if (profile.growthLagging && event.tags.includes("利润质量")) bonus += 1.3;
  if ((profile.stableTrust || profile.lowConflict) && (event.tags.includes("老板") || event.tags.includes("政治"))) bonus += 2.2;
  if (profile.lowRisk && (event.tags.includes("风险") || event.tags.includes("合规"))) bonus += 1.2;
  if (state.round >= 8 && profile.customerComfort && event.tags.includes("客户")) bonus += 0.8;

  if (profile.stableCash && !profile.growthLagging && event.tags.includes("现金")) bonus -= 1.2;
  if (profile.stableCash && profile.growthLagging && event.tags.includes("现金")) bonus -= 2.4;
  if (profile.stableTeam && event.tags.includes("团队")) bonus -= 1.4;
  if (profile.lowRisk && (event.tags.includes("库存") || event.tags.includes("数据") || event.tags.includes("系统"))) bonus -= 0.8;

  if (profile.level >= 5.2) {
    if (event.tags.includes("增长")) bonus += 1.4;
    if (event.tags.includes("老板") || event.tags.includes("政治")) bonus += 1.1;
    if (event.tags.includes("现金")) bonus -= 0.8;
    if (event.tags.includes("团队")) bonus -= 0.7;
  }

  return bonus;
}

function balanceWeight(event, state) {
  let bonus = 0;
  if ((state.cash <= 40) && (event.tags?.includes("现金") || event.tags?.includes("库存"))) bonus += 2;
  if ((state.team <= 45 || state.hidden.orgFatigue >= 40) && (event.tags?.includes("团队") || event.tags?.includes("执行"))) bonus += 2;
  if ((state.hidden.marginHealth <= 42) && event.tags?.includes("利润质量")) bonus += 2;
  if ((state.hidden.customerTrust <= 42) && event.tags?.includes("客户")) bonus += 2;
  if ((state.hidden.dataMaturity <= 28) && (event.tags?.includes("数据") || event.tags?.includes("系统"))) bonus += 1.5;
  if ((state.hidden.riskExposure >= 42) && (event.tags?.includes("风险") || event.tags?.includes("合规") || event.tags?.includes("政治"))) bonus += 1.5;
  if ((state.hidden.bossDependency >= 38 || state.trust <= 45) && (event.tags?.includes("老板") || event.tags?.includes("政治"))) bonus += 1.5;
  if (state.round >= 9 && (event.tags?.includes("政治") || event.tags?.includes("老板"))) bonus += 0.8;
  if (state.memory.scheduledEffects.length < 2 && state.round <= 6 && (event.left?.schedule?.length || event.right?.schedule?.length)) bonus += 0.9;
  bonus += scenarioBiasWeight(event, state);
  bonus += phaseFlavorWeight(event, state);
  bonus += consequenceBiasWeight(event, state);
  bonus += stabilityPressureWeight(event, state);
  const recentPacks = state.memory.recentPacks || [];
  const recentTags = state.memory.recentTags || [];
  const recentRoles = state.memory.recentRoles || [];
  const recentTitles = state.memory.recentTitles || [];
  if (event.pack && recentPacks.at(-1) === event.pack) bonus -= 2.4;
  else if (event.pack && recentPacks.includes(event.pack)) bonus -= 1.1;
  const tagPenalty = (event.tags || []).reduce((sum, tag) => sum + recentRepeats(recentTags, tag) * 0.2, 0);
  bonus -= tagPenalty;
  if (recentRoles.at(-1) === event.role) bonus -= 1.2;
  else if (recentRoles.includes(event.role)) bonus -= 0.45;
  if (recentTitles.includes(event.title)) bonus -= 2;
  return (event.weight ?? 1) + bonus;
}

function chainUrgency(event, state) {
  const conditions = event.conditions || {};
  let score = event.priority ?? 1;
  score += (conditions.allFlags || []).filter((flag) => state.flags.includes(flag)).length * 0.8;
  if ((conditions.anyFlags || []).some((flag) => state.flags.includes(flag))) score += 0.5;
  score += thresholdMomentum(state, conditions.statMin, "min");
  score += thresholdMomentum(state, conditions.statMax, "max");
  score += thresholdMomentum(state.hidden, conditions.hiddenMin, "min");
  score += thresholdMomentum(state.hidden, conditions.hiddenMax, "max");
  score += thresholdMomentum(state.relations, conditions.relationMin, "min");
  score += thresholdMomentum(state.relations, conditions.relationMax, "max");
  score += (conditions.alternatives?.length || 0) * 0.25;
  if (state.memory.scheduledEffects.length >= 3) score += 0.35;
  if ((state.memory.recentRoles || []).at(-1) === event.role) score -= 0.6;
  if ((state.memory.recentTitles || []).includes(event.title)) score -= 1.4;

  const profile = stablePlayProfile(state);
  if (profile.level >= 3.2) {
    const growthPressureIds = ["margin_truth_day", "price_war_spiral", "boardroom_illusion"];
    const bossPressureIds = ["boss_dependency", "stand_side", "owner_override", "trust_crack", "forecast_trust_break"];
    const safeReliefIds = ["cash_alert", "collection_crunch", "supplier_stop_ship", "payroll_crunch", "finance_meltdown", "manager_walkout"];

    if (profile.growthLagging && growthPressureIds.includes(event.id)) score += profile.level >= 5.2 ? 2.8 : 1.8;
    if ((profile.stableTrust || profile.lowConflict) && bossPressureIds.includes(event.id)) score += profile.level >= 5.2 ? 2.5 : 1.6;
    if (profile.lowRisk && event.id === "boardroom_illusion") score += 1;
    if ((profile.stableCash || profile.stableTeam) && safeReliefIds.includes(event.id)) score -= 1.1;
  }

  return score;
}

function pickChainEvent(state) {
  const eligible = chainEvents.filter((event) => !state.usedIds.includes(event.id) && matchesConditions(state, event.conditions));
  if (!eligible.length) return null;

  const scored = eligible
    .map((event) => ({ ...event, urgency: chainUrgency(event, state) }))
    .sort((a, b) => b.urgency - a.urgency);

  const top = scored[0];
  const recentKinds = state.memory.recentKinds || [];
  const chainStreak = recentRepeats(recentKinds, "chain");
  const hardPressure = state.cash <= 36 || state.team <= 38 || state.trust <= 38 || state.hidden.riskExposure >= 52 || state.hidden.politicalHeat >= 52 || state.hidden.customerTrust <= 38;

  if (state.round <= 2 && top.urgency < 10.2) return null;
  if (recentKinds.at(-1) === "chain" && chainStreak >= 2 && top.urgency < 9.6 && !hardPressure) return null;

  const pool = scored
    .filter((event) => event.urgency >= top.urgency - 1.2)
    .slice(0, 4)
    .map((event) => ({ ...event, weight: event.urgency }));

  return weightedPick(pool);
}

function chooseEvent(state) {
  const chainEvent = pickChainEvent(state);
  if (chainEvent) return chainEvent;

  const phase = phaseOfRound(state.round);
  const activeCandidates = baseEvents.filter((event) => !state.usedIds.includes(event.id) && event.phase.includes(phase) && matchesConditions(state, event.conditions));
  const fallbackCandidates = baseEvents.filter((event) => event.phase.includes(phase) && matchesConditions(state, event.conditions));
  const phasePool = activeCandidates.length ? activeCandidates : (fallbackCandidates.length ? fallbackCandidates : baseEvents.filter((event) => event.phase.includes(phase)));
  const weighted = phasePool.map((event) => ({ ...event, weight: balanceWeight(event, state) }));
  return weightedPick(weighted);
}

function applyScheduledEffects(state) {
  const due = [];
  const future = [];
  for (const item of state.memory.scheduledEffects) {
    if (item.triggerRound <= state.round) due.push(item);
    else future.push(item);
  }
  let next = { ...state, memory: { ...state.memory, scheduledEffects: future } };
  const notes = [];
  for (const item of due) {
    const payload = delayedEffects[item.type];
    if (!payload) continue;
    const routeId = item.routeId || findRouteId({ eventId: item.sourceEventId, delayedType: item.type });
    const scaledEffect = scaleStatDelta(payload.effect, state.round);
    const scaledHidden = scaleHiddenDelta(payload.hidden, state.round);
    const scaledRelations = scaleRelationDelta(payload.relations, state.round);
    next = {
      ...next,
      ...applyDeltaBlock(next, scaledEffect, STAT_KEYS),
      hidden: applyDeltaBlock(next.hidden, scaledHidden, HIDDEN_KEYS),
      relations: applyDeltaBlock(next.relations, scaledRelations, RELATION_KEYS),
      memory: {
        ...next.memory,
        causalLedger: pushLedger(next.memory.causalLedger, {
          routeId,
          kind: "delayed",
          title: payload.title,
          choiceLabel: item.sourceChoiceLabel || "",
          round: state.round,
        }),
      },
    };
    notes.push({
      ...payload,
      routeId,
      sourceEventId: item.sourceEventId,
      sourceTitle: item.sourceTitle,
      sourceChoiceLabel: item.sourceChoiceLabel,
      sourceRound: item.sourceRound,
    });
  }
  return { next, notes };
}

function pushRecentHistory(list = [], incoming = [], max = 4) {
  return [...list, ...incoming].slice(-max);
}

function phaseLabel(round) {
  return { early: "开局期", mid: "拉扯期", late: "清算期" }[phaseOfRound(round)];
}

function pressureSnapshot(state) {
  return [
    { key: "executionDebt", label: "执行债", value: state.hidden.executionDebt },
    { key: "orgFatigue", label: "组织疲劳", value: state.hidden.orgFatigue },
    { key: "riskExposure", label: "经营风险", value: state.hidden.riskExposure },
    { key: "politicalHeat", label: "政治热度", value: state.hidden.politicalHeat },
  ].sort((a, b) => b.value - a.value)[0];
}

function scenarioToState(scenario = sample(scenarios)) {
  return {
    scenario,
    ...scenario.stats,
    hidden: { ...scenario.hidden },
    relations: { ...initialRelations },
    round: 1,
    year: 1,
    screen: "event",
    ended: false,
    flags: [],
    usedIds: [],
    memory: { scheduledEffects: [], delayedNotes: [], quarterlyNotes: [], recentPacks: [], recentTags: [], recentTitles: [], recentRoles: [], recentFlags: [], recentKinds: [], latestOutcome: null, pendingTransition: null, causalLedger: [] },
    ending: null,
  };
}

function statLabel(key) {
  return { growth: "增长", cash: "现金", team: "团队", trust: "老板信任" }[key];
}

function hiddenLabel(key) {
  return {
    marginHealth: "利润质量",
    executionDebt: "执行债",
    orgFatigue: "组织疲劳",
    dataMaturity: "数据成熟度",
    customerTrust: "客户信任",
    riskExposure: "经营风险",
    bossDependency: "老板依赖度",
    politicalHeat: "政治热度",
  }[key];
}

function choosePersona(state) {
  const pairs = STAT_KEYS.map((k) => ({ key: k, value: state[k] })).sort((a, b) => b.value - a.value);
  const top = pairs[0]?.key ?? "growth";
  return personaDefs.find((p) => p.key === top) ?? personaDefs[0];
}

function pickEnding(state) {
  if (state.cash <= 12) return { title: "死于：现金流断裂", text: "最后不是市场把你打死的，是每一次“先冲一下”把账上的最后一口气磨没了。", memo: "规模能替你赢掌声，现金只会安静地决定你还能活多久。" };
  if (state.team <= 12 || state.hidden.orgFatigue >= 82) return { title: "死于：组织崩盘", text: "报表还在出，流程还在转，但真正能把事情扛起来的人已经先散了。", memo: "组织不是成本项，它通常会在你最需要它的时候，按最贵的价格离开。" };
  if (state.trust <= 12) return { title: "死于：老板不再信你", text: "你不一定每次都错，只是慢慢失去了那个还能把真话送到桌上的位置。", memo: "在经营里，判断正确只是开始，被关键的人听进去才算完整。" };
  if (state.growth <= 12) return { title: "死于：增长停摆", text: "你把风险一层层压住了，也把向前的劲一并压没了。", memo: "守住盘子很重要，但公司活着不是为了证明自己没死。" };
  if (state.hidden.customerTrust <= 12) return { title: "死于：客户反噬", text: "内部每一页表都还过得去，外部却已经开始用退款、流失和沉默给你答案。", memo: "客户通常不会在第一天翻脸，只会在你以为还来得及的时候悄悄离开。" };
  if (state.hidden.riskExposure >= 88) return { title: "死于：风险集中爆雷", text: "你把太多灰区留给以后处理，最后它们挑了同一天回来收账。", memo: "很多雷不是突然炸的，只是你一直把爆炸那天往后推。" };
  if (state.hidden.bossDependency >= 88 || state.trust >= 88) return { title: "死于：过度靠近权力", text: "你成了最被需要的那个人，也一步步把不该你背的东西都背到了自己身上。", memo: "离权力太远会失去位置，离得太近会失去边界。" };
  if (state.cash >= 88 && state.growth < 44) return { title: "死于：过度保守", text: "钱是留下来了，但整个盘子也一起慢慢失去了想赢的速度。", memo: "安全从来不是终点，它最多只是继续向前的门票。" };
  if (state.growth >= 88 && state.hidden.marginHealth < 42) return { title: "死于：虚假繁荣", text: "数字一度很热闹，可真正留下来的只有被掏空的利润、现金和团队。", memo: "热闹会让人短暂忘记真相，但经营最终只认真相。" };
  return null;
}

function buildQuarterSummary(state) {
  const strengths = [
    { key: "dataMaturity", value: state.hidden.dataMaturity },
    { key: "marginHealth", value: state.hidden.marginHealth },
    { key: "customerTrust", value: state.hidden.customerTrust },
  ].sort((a, b) => b.value - a.value);
  const pressures = [
    { key: "executionDebt", value: state.hidden.executionDebt },
    { key: "orgFatigue", value: state.hidden.orgFatigue },
    { key: "riskExposure", value: state.hidden.riskExposure },
    { key: "politicalHeat", value: state.hidden.politicalHeat },
  ].sort((a, b) => b.value - a.value);
  const notes = [];
  if (state.hidden.marginHealth < 42) notes.push("你把规模往前推了一步，也把利润质量往后拖了一步。下次追问不会太远。");
  if (state.hidden.executionDebt > 36) notes.push("这一季很多事只是被硬压过去，不是已经解决。执行债还在悄悄长。");
  if (state.hidden.orgFatigue > 40) notes.push("组织已经不是简单地累了，而是在靠意志力替系统和节奏兜底。");
  if (state.hidden.dataMaturity > 52) notes.push("你开始不只是救火，而是在让系统和数据慢慢接手一部分判断。");
  if (state.hidden.customerTrust < 42) notes.push("客户端的损伤已经从感觉变成事实，后面每一步都会更贵。");
  if (notes.length === 0) notes.push("这一季没有明显爆点，但真正危险的局面往往也都是这样悄悄长出来的。");
  return { notes, strength: strengths[0], pressure: pressures[0] };
}

function eventQuote(text = "") {
  const trimmed = text.replace(/^[“"]|[”"]$/g, "").trim();
  return `“${trimmed}”`;
}

function stablePick(seed = "", items = []) {
  if (!items.length) return "";
  const value = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return items[value % items.length];
}

function eventSpeech(event) {
  const intro = stablePick(event.id || event.title, [
    "看着你说：",
    "把报表推到你面前：",
    "压低声音开口：",
    "停顿了一下，补了一句：",
    "抬头问你：",
  ]);
  return {
    speaker: `${event.role}${intro}`,
    quote: eventQuote(event.title),
    followup: event.desc ? eventQuote(event.desc) : "",
  };
}

const chainCauseHints = {
  cash_alert: "这是前面放长账期、继续冲规模之后，最先回来追你的现金账。",
  collection_crunch: "你之前给出去的账期和空间，现在被客户一起当成了默认。",
  supplier_stop_ship: "前面压着没结的款，已经从财务问题变成了供货问题。",
  payroll_crunch: "之前那句“先顶一下”，现在开始直接落到发薪这件事上了。",
  runway_bridge: "增长还在冲，现金已经开始用更真实的方式提醒你跑道见底。",
  board_cash_probe: "前面还能用增长挡一挡，这次董事开始直接问钱去哪了。",
  resignation: "前面那些被压下去的疲惫和委屈，现在开始以离职的方式回来。",
  finance_meltdown: "之前每次先交再补、先顶再说的后果，开始一起压到财务团队身上。",
  manager_walkout: "你前面按住的矛盾，现在已经不再愿意只停在会后。",
  culture_split: "结果和边界这两股拉扯，终于把团队撕成了看得见的两边。",
  boss_dependency: "你之前一次次替老板兜住灰区，这次那份信任开始反过来要你接更多锅。",
  stand_side: "前面累积起来的位置和亲近感，现在开始逼你公开选边。",
  promise_settlement: "之前替场面放出去的话，现在到了必须兑现的时间。",
  owner_override: "你前面让出去的边界，这次被老板直接一步跨了过去。",
  trust_crack: "之前几次没讲清、没兜稳的事，开始一起磨掉老板对你的耐心。",
  customer_backlash: "前面那些被你往后放的质量和交付问题，现在开始从客户端一起爆出来。",
  margin_truth_day: "之前用 GMV 和增长盖过去的地方，这次终于被问到利润本身。",
  price_war_spiral: "你之前给出去的低价和补贴，正在反过来把整个市场一起拖下去。",
  channel_dumping: "前面压进渠道的货，现在开始用更难看的价格自己往外跑。",
  vip_client_threat: "前面被忍下来的不稳和瑕疵，这次开始让核心客户动摇。",
  inventory_lock: "你之前压进去的库存，现在开始和现金一起互相锁死。",
  warehouse_overflow: "前面多压、多调、多堆的货，已经把仓里逼到了极限。",
  seasonal_hangover: "你当时押下去的季节货，现在正按最慢也最贵的方式回来找你。",
  forecast_trust_break: "前面靠人工和解释兜住的预测，这次开始连基本信任都撑不住了。",
  data_escalation: "之前那些口径冲突没被解决，现在已经升级成谁说了算的问题。",
  close_failure: "每次“先交版本”的代价，终于在这次月结里一起炸开了。",
  audit_shock: "前面留过的口子和例外，这次被审计正式翻到了台面上。",
  boardroom_illusion: "你前面没打断的乐观叙事，这次开始在会上整体失真。",
  project_blackhole: "之前接下来的关系项目，现在开始用预算和进度一点点吞你。",
  blame_meeting: "前面压着没说清的责任，这次开始在会上公开找人背。",
  legal_red_flag: "之前被你们往后拖的灰区，现在正式被法务拉到了红线。",
  white_lie_exposed: "你当时没讲全的那句话，这次被别人原样追了回来。",
  vendor_interest_probe: "前面那段说不清的供应商关系，现在开始被外部盯上了。",
  customer_refund_wave: "之前没止住的退款和客诉，这次开始形成真正的趋势线。",
  ops_shadow_process: "你前面默认存在的临时土办法，已经长成业务真正的影子流程。",
  headcount_frozen_market: "冻结招聘这件事，已经开始反过来伤你在市场上的招人能力。",
};

const routeFamilies = {
  cash_credit: {
    label: "账期放量",
    choices: ["long_terms", "bad_debt_signal", "soft_collection", "credit_control", "deposit_negotiation", "order_first", "factoring", "hold_receivable"],
    delayed: ["receivable_pressure", "bad_debt_writeoff"],
    chains: ["cash_alert", "collection_crunch", "board_cash_probe"],
  },
  supply_inventory: {
    label: "压货保供",
    choices: ["advance_payment", "inventory_push", "supplier_moq", "seasonal_bet", "warehouse_transfer", "prepay_inventory"],
    delayed: ["supplier_lock", "inventory_backfire", "warehouse_congestion", "seasonal_markdown", "moq_cash_drag"],
    chains: ["supplier_stop_ship", "inventory_lock", "warehouse_overflow", "seasonal_hangover"],
  },
  boss_boundary: {
    label: "替老板兜底",
    choices: ["boss_temp_number", "overnight_forecast", "boss_station", "sign_fast", "public_promise", "need_boss_backing", "cross_line_approval", "meeting_rewrite", "shadow_decision", "need_white_lie"],
    delayed: ["backfill_weekend", "expectation_lockin", "public_promise_gap", "rework_whiplash", "shadow_authority", "boundary_erosion"],
    chains: ["boss_dependency", "stand_side", "promise_settlement", "owner_override", "trust_crack", "boardroom_illusion", "white_lie_exposed"],
  },
  org_strain: {
    label: "组织透支",
    choices: ["freeze_hiring", "burn_team", "performance_push", "middle_manager_blame", "hold_salary", "weekend_overtime", "salary_guard"],
    delayed: ["capacity_gap", "resignation_wave", "manager_trust_drop", "overtime_backlash", "recruiting_miss", "morale_dip"],
    chains: ["resignation", "finance_meltdown", "manager_walkout", "culture_split", "headcount_frozen_market"],
  },
  margin_price: {
    label: "低价冲量",
    choices: ["festival_promo", "marketplace_coupon", "heavy_discount", "channel_rebate", "low_margin_big_order", "stack_more_coupons", "absorb_fee"],
    delayed: ["promo_margin_gap", "coupon_addiction", "margin_reckoning", "rebate_reconciliation", "fee_spike_followup"],
    chains: ["margin_truth_day", "price_war_spiral", "channel_dumping"],
  },
  data_control: {
    label: "手工兜数",
    choices: ["build_system", "delay_system", "data_alignment", "dashboard_delay", "dashboard_patch", "close_rush", "close_rush_patch", "report_error", "silent_fix", "manual_reconcile", "forecast_gap", "manual_forecast"],
    delayed: ["dashboard_blindspot", "close_delay", "credibility_loss", "reconciliation_fatigue"],
    chains: ["data_escalation", "close_failure", "forecast_trust_break"],
  },
  customer_quality: {
    label: "质量后账",
    choices: ["flagship_launch", "repair_cost_fix", "return_repair_cost", "returns_restock", "procurement_substitute", "hot_sku_stockout", "replacement_parts"],
    delayed: ["launch_returns", "repair_cost_creep", "stockout_penalty"],
    chains: ["customer_backlash", "customer_refund_wave", "vip_client_threat"],
  },
};

function routeLabel(routeId) {
  return routeFamilies[routeId]?.label || "";
}

function findRouteId({ eventId, flags = [], delayedType, chainId }) {
  const candidates = Object.entries(routeFamilies)
    .map(([routeId, config]) => {
      let score = 0;
      if (eventId && config.choices.includes(eventId)) score += 3;
      if (delayedType && config.delayed.includes(delayedType)) score += 3;
      if (chainId && config.chains.includes(chainId)) score += 3;
      score += flags.filter((flag) => config.choices.includes(flag)).length;
      return { routeId, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
  return candidates[0]?.routeId || null;
}

function pushLedger(list = [], entry, max = 16) {
  if (!entry) return list;
  return [...list, entry].slice(-max);
}

function ledgerEntryLabel(entry) {
  if (!entry) return "";
  return entry.choiceLabel ? `${entry.title} · ${entry.choiceLabel}` : entry.title;
}

const routeNarratives = {
  cash_credit: "账期先放出去，回款就会一点点拖，最后现金压力会回来按你桌子。",
  supply_inventory: "货先压进去，仓和现金就会一起发紧，最后库存会反过来锁住你。",
  boss_boundary: "先替老板把场面兜住，边界就会一寸寸往后退，最后更大的锅也会顺手塞给你。",
  org_strain: "先省人、再硬顶，组织不会立刻翻脸，只会慢慢用离职和冷掉来收账。",
  margin_price: "先拿低价换量，毛利就会一层层变薄，最后整盘生意都会回来追这口利润。",
  data_control: "先靠人工和解释把数兜住，口径就会慢慢失真，最后谁都不再真信那套数。",
  customer_quality: "先把质量和售后往后放，客诉和退款就会慢慢抬头，最后客户会直接拿脚投票。",
};

function routeTrailText(routeId, history = [], currentLabel = "") {
  if (!routeId) return "";
  const steps = history
    .filter((entry) => entry.routeId === routeId)
    .slice(-2)
    .map((entry) => ledgerEntryLabel(entry))
    .filter(Boolean);
  if (currentLabel) steps.push(currentLabel);
  const deduped = steps.filter((step, index) => steps.indexOf(step) === index);
  const summary = routeNarratives[routeId];
  if (deduped.length < 2) return routeLabel(routeId) ? `因果链：${routeLabel(routeId)}` : "";
  if (!summary) return `因果链：${deduped.join(" -> ")}`;
  return `因果链：${summary} 当前走到：${deduped.join(" -> ")}`;
}

function shortRouteTrailText(routeId, history = [], currentLabel = "") {
  if (!routeId) return "";
  const steps = history
    .filter((entry) => entry.routeId === routeId)
    .slice(-1)
    .map((entry) => ledgerEntryLabel(entry))
    .filter(Boolean);
  if (currentLabel) steps.push(currentLabel);
  const deduped = steps.filter((step, index) => steps.indexOf(step) === index);
  if (!deduped.length) return routeLabel(routeId) ? `因果链：${routeLabel(routeId)}` : "";
  if (deduped.length === 1) return routeLabel(routeId) ? `因果链：${routeLabel(routeId)} · ${deduped[0]}` : `因果链：${deduped[0]}`;
  return `因果链：${deduped.join(" -> ")}`;
}

function sourceTraceLine(note) {
  if (!note?.sourceTitle) return "";
  const choice = note.sourceChoiceLabel ? `，你当时选了「${note.sourceChoiceLabel}」` : "";
  return `这是第 ${note.sourceRound} 轮「${note.sourceTitle}」埋下的后账${choice}。`;
}

function shortSourceTraceLine(note) {
  if (!note?.sourceTitle) return "";
  const choice = note.sourceChoiceLabel ? ` · ${note.sourceChoiceLabel}` : "";
  return `后账来自第 ${note.sourceRound} 轮「${note.sourceTitle}」${choice}`;
}

function chainSpeech(event, state) {
  const base = eventSpeech(event);
  const hint = chainCauseHints[event.id];
  const routeId = findRouteId({ chainId: event.id, flags: state.flags });
  if (!hint) return base;
  return {
    ...base,
    cause: eventQuote(hint),
    trail: routeTrailText(routeId, state.memory.causalLedger || [], event.title),
  };
}

function topDeltaEntries(delta = {}, count = 2) {
  return Object.entries(delta)
    .filter(([, value]) => value)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, count);
}

function outcomeFragment(kind, key, value) {
  const positive = {
    growth: "盘子先被往前推了一步",
    cash: "账上先缓了一口气",
    team: "团队情绪暂时稳了一点",
    trust: "老板这边暂时更偏向你",
    marginHealth: "利润质量被往回拉了一点",
    executionDebt: "执行债暂时没有继续堆高",
    orgFatigue: "团队没刚才那么绷了",
    dataMaturity: "系统和数据总算更像个体系",
    customerTrust: "客户那边暂时还能稳住",
    riskExposure: "风险被你先按住了一截",
    bossDependency: "你和老板之间的边界清楚了一点",
    politicalHeat: "场面暂时没再继续发烫",
    boss: "老板这边先顺了",
    sales: "销售这边先买账了",
    hr: "HR 这边更站你",
    ops: "供应链这边先配合了",
    finance: "财务口径这边先稳住了",
    legal: "法务这边暂时认可这个处理",
  };
  const negative = {
    growth: "增长这边被你按住了一截",
    cash: "现金又被抽走了一口",
    team: "团队那口气又往下掉了一点",
    trust: "老板明显没刚才那么信你了",
    marginHealth: "利润质量又松了一层",
    executionDebt: "执行债被你继续往后压了",
    orgFatigue: "团队明显更累了",
    dataMaturity: "数据和系统还是没跟上",
    customerTrust: "客户那边又记了一笔",
    riskExposure: "风险被你继续留到了后面",
    bossDependency: "老板更习惯把灰区塞给你了",
    politicalHeat: "场子里又热了一度",
    boss: "老板这边有点不高兴",
    sales: "销售这边明显不服",
    hr: "HR 这边先记下了",
    ops: "供应链这边开始皱眉了",
    finance: "财务这边不太舒服",
    legal: "法务这边已经开始警觉",
  };
  const table = value > 0 ? positive : negative;
  return table[key] || `${kind === "relation" ? "这层关系" : "这块局面"}${value > 0 ? "先稳了一点" : "又更紧了一点"}`;
}

function singleLine(text = "") {
  return text
    .replace(/^[“"]|[”"]$/g, "")
    .replace(/\s+/g, " ")
    .replace(/[。！？]+$/g, "")
    .trim();
}

function conciseOutcomeFollowup({ override, highlights, dueNote, routeId }) {
  if (override?.followup) return singleLine(override.followup);
  if (dueNote?.desc) return singleLine(dueNote.desc);
  if (dueNote?.title) return singleLine(dueNote.title);
  if (highlights?.length) return singleLine(highlights[0]);
  if (routeId && routeLabel(routeId)) return `这一步把你往${routeLabel(routeId)}又推了一点`;
  return "";
}

function buildChoiceOutcome(event, choice, side, notes = []) {
  const override = outcomeOverrides[event.id]?.[side];
  const statHighlights = topDeltaEntries(choice.effect, 2).map(([key, value]) => outcomeFragment("stat", key, value));
  const hiddenHighlights = topDeltaEntries(choice.hidden, 1).map(([key, value]) => outcomeFragment("hidden", key, value));
  const relationHighlights = topDeltaEntries(choice.relations, 1).map(([key, value]) => outcomeFragment("relation", key, value));
  const highlights = [...statHighlights, ...hiddenHighlights, ...relationHighlights].slice(0, 2);

  const directScore = [
    ...Object.values(choice.effect || {}),
    ...Object.values(choice.relations || {}),
  ].reduce((sum, value) => sum + Math.sign(value), 0);
  const hiddenRiskScore = Object.entries(choice.hidden || {}).reduce((sum, [key, value]) => {
    const riskyUp = ["executionDebt", "orgFatigue", "riskExposure", "bossDependency", "politicalHeat"];
    const riskyDown = ["marginHealth", "dataMaturity", "customerTrust"];
    if (riskyUp.includes(key)) return sum - Math.sign(value);
    if (riskyDown.includes(key)) return sum + Math.sign(value);
    return sum;
  }, 0);
  const tone = directScore + hiddenRiskScore;

  const quotePool = tone >= 2
    ? [
        "对方点了点头，事情先按你的意思动了起来。",
        "他没再追问，转身就去推进了。",
        "这一下你算是把场面先稳住了。",
      ]
    : tone <= -2
      ? [
          "对方没再往下说，但脸色已经说明了一切。",
          "他嘴上答应了，情绪却没有跟着过去。",
          "这事先停在这儿了，但不服气的人显然不止一个。",
        ]
      : [
          "事情是往前走了，但代价也一起留在了桌上。",
          "场面先被你按住了，只是没人真觉得它已经结束。",
          "眼前这关算过去了，后面的账还没算完。",
        ];

  const dueNote = notes[0];
  const routeId = findRouteId({ eventId: event.id, flags: choice.flags || [] });
  const followup = conciseOutcomeFollowup({
    override,
    highlights,
    dueNote,
    routeId: dueNote?.routeId || routeId,
  });

  return {
    role: event.role,
    avatar: event.avatar,
    choiceLabel: side === "left" ? `你选了「${event.left.label}」` : `你选了「${event.right.label}」`,
    speaker: override?.speaker || `${event.role}的反应`,
    quote: eventQuote(override?.quote || stablePick(`${event.id}_${side}_${tone}`, quotePool)),
    followup,
  };
}

function sceneTheme(screen, event) {
  if (screen === "ending") {
    return {
      appBg: "linear-gradient(180deg, #2f1f24 0%, #6a4a42 48%, #d9c5b5 100%)",
      frameBg: "linear-gradient(180deg, #f8ecde 0%, #ead8c8 100%)",
      frameBorder: "1px solid rgba(64,29,29,0.12)",
      frameShadow: "0 24px 80px rgba(38,18,24,0.32)",
      overlay: "radial-gradient(circle at top, rgba(255,240,233,0.6), transparent 35%), radial-gradient(circle at bottom, rgba(120,54,54,0.18), transparent 45%)",
      panelBg: "#fff8f1",
      panelBorder: "1px solid rgba(120,70,54,0.10)",
      panelShadow: "0 20px 60px rgba(71,28,30,0.16)",
      boxBg: "#f4e7da",
      miniBg: "#fbf4ec",
      headerGlow: "linear-gradient(180deg, rgba(132,67,61,0.08), transparent)",
    };
  }
  if (screen === "result") {
    return {
      appBg: "linear-gradient(180deg, #efe1ca 0%, #e4cfac 46%, #ddd8ce 100%)",
      frameBg: "linear-gradient(180deg, #fbf4e9 0%, #f1e5d2 100%)",
      frameBorder: "1px solid rgba(113,78,41,0.10)",
      frameShadow: "0 22px 70px rgba(82,56,24,0.20)",
      overlay: "radial-gradient(circle at top, rgba(255,255,255,0.82), transparent 34%), radial-gradient(circle at bottom, rgba(201,154,90,0.18), transparent 42%)",
      panelBg: "#fff9f2",
      panelBorder: "1px solid rgba(174,127,61,0.12)",
      panelShadow: "0 18px 54px rgba(118,84,37,0.14)",
      boxBg: "#f7eddc",
      miniBg: "#fff6ea",
      headerGlow: "linear-gradient(180deg, rgba(210,165,91,0.10), transparent)",
    };
  }
  if (screen === "quarter") {
    return {
      appBg: "linear-gradient(180deg, #e3ddd5 0%, #d6d5cf 48%, #ede8df 100%)",
      frameBg: "linear-gradient(180deg, #f4f1ec 0%, #ebe6dc 100%)",
      frameBorder: "1px solid rgba(68,74,83,0.08)",
      frameShadow: "0 20px 64px rgba(48,54,60,0.16)",
      overlay: "radial-gradient(circle at top, rgba(255,255,255,0.72), transparent 32%), radial-gradient(circle at bottom, rgba(125,135,149,0.12), transparent 42%)",
      panelBg: "#fffdf8",
      panelBorder: "1px solid rgba(91,101,114,0.08)",
      panelShadow: "0 18px 52px rgba(60,69,77,0.12)",
      boxBg: "#efebe4",
      miniBg: "#faf7f2",
      headerGlow: "linear-gradient(180deg, rgba(120,126,136,0.08), transparent)",
    };
  }
  if (event?.priority) {
    return {
      appBg: "linear-gradient(180deg, #f2ddd8 0%, #ead1cb 40%, #e4ddcf 100%)",
      frameBg: "linear-gradient(180deg, #fbf0ea 0%, #f3e2da 100%)",
      frameBorder: "1px solid rgba(153,71,76,0.10)",
      frameShadow: "0 22px 72px rgba(116,48,57,0.22)",
      overlay: "radial-gradient(circle at top, rgba(255,246,242,0.8), transparent 34%), radial-gradient(circle at bottom, rgba(176,73,83,0.12), transparent 42%)",
      panelBg: "#fff8f4",
      panelBorder: "1px solid rgba(172,86,89,0.12)",
      panelShadow: "0 18px 56px rgba(120,55,63,0.16)",
      boxBg: "#f7e9e4",
      miniBg: "#fff4f0",
      headerGlow: "linear-gradient(180deg, rgba(175,74,86,0.10), transparent)",
    };
  }
  return {
    appBg: "linear-gradient(180deg, #e9e3d7 0%, #e3dacb 48%, #ddd8ce 100%)",
    frameBg: "linear-gradient(180deg, #f6f1e8 0%, #efe7da 100%)",
    frameBorder: "1px solid rgba(0,0,0,0.06)",
    frameShadow: "0 20px 60px rgba(0,0,0,0.18)",
    overlay: "radial-gradient(circle at top, rgba(255,255,255,0.75), transparent 35%)",
    panelBg: "#fffdf8",
    panelBorder: "1px solid rgba(0,0,0,0.05)",
    panelShadow: "0 18px 50px rgba(0,0,0,0.12)",
    boxBg: "#f6f1e8",
    miniBg: "#fbf7ef",
    headerGlow: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent)",
  };
}

function ProgressBar({ label, value }) {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#6b7280" }}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div style={{ height: 6, background: "#e5e7eb", borderRadius: 999 }}>
        <div style={{ width: `${value}%`, height: "100%", borderRadius: 999, background: "#111827" }} />
      </div>
    </div>
  );
}

function SwipeCard({ event, onChoose }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 180], [-11, 11]);
  const leftOpacity = useTransform(x, [-180, -70, -18, 0], [1, 0.88, 0.28, 0]);
  const rightOpacity = useTransform(x, [0, 18, 70, 180], [0, 0.28, 0.88, 1]);
  const leftLift = useTransform(x, [-180, -70, -18, 0], [-5, -2, 0, 4]);
  const rightLift = useTransform(x, [0, 18, 70, 180], [4, 0, -2, -5]);
  const leftScale = useTransform(x, [-180, -70, -18, 0], [1.08, 1.03, 0.98, 0.94]);
  const rightScale = useTransform(x, [0, 18, 70, 180], [0.94, 0.98, 1.03, 1.08]);

  const handleEnd = async (_, info) => {
    if (info.offset.x < -110) {
      await animate(x, -420, { duration: 0.18 });
      onChoose("left");
    } else if (info.offset.x > 110) {
      await animate(x, 420, { duration: 0.18 });
      onChoose("right");
    } else {
      animate(x, 0, { type: "spring", stiffness: 380, damping: 26 });
    }
  };

  const chainTone = event.priority
    ? {
        background: "#fff6f3",
        border: "1px solid rgba(183,90,96,0.12)",
        boxShadow: "0 22px 58px rgba(132,56,62,0.18)",
        halo: "radial-gradient(circle at top, rgba(255,228,221,0.92), transparent 46%)",
      }
    : {
        background: "#fffdf8",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
        halo: "radial-gradient(circle at top, rgba(245,231,215,0.8), transparent 44%)",
      };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 340, height: "clamp(280px, 42vh, 360px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={handleEnd}
        style={{ x, rotate, zIndex: 2, width: "min(100%, 268px)", minHeight: "clamp(268px, 38vh, 320px)", borderRadius: 32, background: chainTone.background, border: chainTone.border, boxShadow: chainTone.boxShadow, padding: "clamp(22px, 3.8vw, 28px)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden", cursor: "grab" }}
      >
        <div style={{ position: "absolute", inset: 0, background: chainTone.halo }} />
        <div style={{ position: "relative", display: "grid", justifyItems: "center", gap: 12 }}>
          <div style={{ fontSize: "clamp(84px, 12.5vh, 108px)", lineHeight: 1 }}>{event.avatar}</div>
        </div>
        <div style={{ position: "relative", width: "100%", display: "grid", gap: 10, justifyItems: "center" }}>
          <div style={{ position: "relative", width: "100%", minHeight: 54, display: "grid", placeItems: "center" }}>
            <motion.div style={{ opacity: leftOpacity, y: leftLift, scale: leftScale, position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", color: "#0f766e", fontSize: "clamp(20px, 5vw, 26px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "0.01em", fontFamily: '"Iowan Old Style", "Georgia", serif' }}>
              {event.left.label}
            </motion.div>
            <motion.div style={{ opacity: rightOpacity, y: rightLift, scale: rightScale, position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", color: "#be123c", fontSize: "clamp(20px, 5vw, 26px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "0.01em", fontFamily: '"Iowan Old Style", "Georgia", serif' }}>
              {event.right.label}
            </motion.div>
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.18em", textTransform: "uppercase" }}>左右滑动选择</div>
        </div>
      </motion.div>
    </div>
  );
}

function OutcomeCard({ outcome, onContinue }) {
  return (
    <div style={{ width: "100%", maxWidth: 340, display: "grid", justifyItems: "center", gap: 14 }}>
      <div style={{ width: "min(100%, 268px)", minHeight: "clamp(220px, 30vh, 250px)", borderRadius: 32, background: "#fffdf8", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 18px 50px rgba(0,0,0,0.12)", padding: "clamp(22px, 3.8vw, 28px)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top, rgba(245,231,215,0.8), transparent 44%)" }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={alertMetaStyle}>结果</span>
          <span style={eventMetaStyle}>{outcome.choiceLabel}</span>
        </div>
        <div style={{ position: "relative", display: "grid", justifyItems: "center", gap: 12 }}>
          <div style={{ fontSize: "clamp(84px, 12.5vh, 108px)", lineHeight: 1 }}>{outcome.avatar}</div>
        </div>
        <div style={{ height: 12 }} />
      </div>
    </div>
  );
}

function BriefingCard({ onStart }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 0, 160], [-10, 0, 10]);
  const glow = useTransform(x, [-140, 0, 140], ["rgba(15,118,110,0.08)", "rgba(255,255,255,0.72)", "rgba(190,24,93,0.08)"]);
  const startedRef = useRef(false);

  const handleEnd = (_, info) => {
    const distance = info.offset.x;
    if (Math.abs(distance) > 88) {
      if (!startedRef.current) {
        startedRef.current = true;
        onStart(distance < 0 ? "left" : "right");
      }
      return;
    }
    animate(x, 0, { type: "spring", stiffness: 360, damping: 28 });
  };

  return (
    <div style={{ position: "relative", width: "100%", display: "grid", justifyItems: "center", gap: 18 }}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.14}
        onDragEnd={handleEnd}
        style={{ x, rotate, width: "min(100%, 360px)", display: "grid", gap: 18, padding: "28px 26px", borderRadius: 32, background: glow, border: "1px solid rgba(159,107,79,0.12)", boxShadow: "0 24px 70px rgba(61,41,26,0.08)", backdropFilter: "blur(10px)", cursor: "grab", touchAction: "pan-y" }}
      >
        <div style={briefingEyebrowStyle}>游戏提示</div>
        <div style={briefingTitleStyle}>这是一款财务BP职场生存模拟游戏</div>
        <div style={briefingBodyStyle}>
          <p style={briefingParagraphStyle}>很多选择没有正确答案，只有取舍。</p>
          <p style={briefingParagraphStyle}>你做的每个决定，不只影响当下，也会在未来带来意想不到的变化。</p>
          <p style={{ ...briefingParagraphStyle, color: "#2f241e", fontWeight: 700 }}>而你能做的，只有拼命维持那一点脆弱的平衡。</p>
        </div>
      </motion.div>
      <div style={briefingHintStyle}>左右滑动以开始游戏</div>
    </div>
  );
}

function shareTextFromState(state) {
  const persona = choosePersona(state);
  return `我在《财权》里活到了第 ${state.round} 轮\n${state.ending.title}\n${state.ending.text}\n职业画像：${persona.title}\n${persona.desc}`;
}

function App() {
  const [state, setState] = useState(() => scenarioToState());
  const [copied, setCopied] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [openingScreen, setOpeningScreen] = useState("producer");
  const audioRef = useRef(null);
  const prevSceneRef = useRef({ screen: state.screen, eventId: null });

  const currentEvent = useMemo(() => chooseEvent(state), [state]);
  const annualSummary = useMemo(() => buildQuarterSummary(state), [state]);
  const persona = useMemo(() => choosePersona(state), [state]);
  const currentSpeech = useMemo(() => currentEvent.priority ? chainSpeech(currentEvent, state) : eventSpeech(currentEvent), [currentEvent, state]);
  const latestOutcome = state.memory.latestOutcome;
  const theme = useMemo(() => sceneTheme(state.screen, currentEvent), [state.screen, currentEvent]);
  const surfacePanelStyle = useMemo(() => ({ ...panelStyle, background: theme.panelBg, border: theme.panelBorder, boxShadow: theme.panelShadow }), [theme]);
  const surfaceBoxStyle = useMemo(() => ({ ...boxedStyle, background: theme.boxBg }), [theme]);
  const surfaceMiniCardStyle = useMemo(() => ({ ...miniCardStyle, background: theme.miniBg }), [theme]);
  const surfaceStatusPillStyle = useMemo(() => ({ ...statusPillStyle, background: theme.miniBg }), [theme]);

  useEffect(() => {
    if (openingScreen !== "producer") return undefined;
    const timer = window.setTimeout(() => {
      setOpeningScreen("brief");
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [openingScreen]);

  useEffect(() => {
    const previous = prevSceneRef.current;
    if (state.screen === "event" && currentEvent?.priority && (previous.screen !== "event" || previous.eventId !== currentEvent.id)) {
      playUiSound(audioRef, "chain", soundOn);
    }
    if (state.screen === "result" && previous.screen !== "result") playUiSound(audioRef, "result", soundOn);
    if (state.screen === "quarter" && previous.screen !== "quarter") playUiSound(audioRef, "annual", soundOn);
    if (state.screen === "ending" && previous.screen !== "ending") playUiSound(audioRef, "ending", soundOn);
    prevSceneRef.current = { screen: state.screen, eventId: currentEvent?.id ?? null };
  }, [state.screen, currentEvent, soundOn]);

  useEffect(() => {
    if (state.screen !== "result" || !latestOutcome) return undefined;
    const timer = window.setTimeout(() => {
      setState((s) => {
        const pending = s.memory.pendingTransition;
        if (!pending) return { ...s, screen: "event" };
        return {
          ...s,
          ...("year" in pending ? { year: pending.year } : {}),
          ...("ending" in pending ? { ending: pending.ending } : {}),
          ...("ended" in pending ? { ended: pending.ended } : {}),
          screen: pending.screen,
          memory: {
            ...s.memory,
            pendingTransition: null,
          },
        };
      });
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [state.screen, latestOutcome]);

  const restart = () => setState(scenarioToState());
  const startFromBriefing = (direction) => {
    playUiSound(audioRef, direction === "left" ? "swipeLeft" : "swipeRight", soundOn);
    setOpeningScreen(null);
  };

  const advance = (nextState) => {
    const ending = pickEnding(nextState);
    if (ending) {
      setState({
        ...nextState,
        screen: "result",
        memory: {
          ...nextState.memory,
          pendingTransition: { screen: "ending", ended: true, ending },
        },
      });
      return;
    }
    if ((nextState.round - 1) % 12 === 0 && nextState.round > 1) {
      setState({
        ...nextState,
        screen: "result",
        memory: {
          ...nextState.memory,
          pendingTransition: { screen: "quarter", year: Math.ceil((nextState.round - 1) / 12) },
        },
      });
      return;
    }
    setState({
      ...nextState,
      screen: "result",
      memory: {
        ...nextState.memory,
        pendingTransition: { screen: "event" },
      },
    });
  };

  const continueFromResult = () => {
    const pending = state.memory.pendingTransition;
    if (!pending) {
      setState((s) => ({ ...s, screen: "event" }));
      return;
    }
    setState((s) => ({
      ...s,
      ...("year" in pending ? { year: pending.year } : {}),
      ...("ending" in pending ? { ending: pending.ending } : {}),
      ...("ended" in pending ? { ended: pending.ended } : {}),
      screen: pending.screen,
      memory: {
        ...s.memory,
        pendingTransition: null,
      },
    }));
  };

  const applyChoice = (side) => {
    const choice = currentEvent[side];
    playUiSound(audioRef, side === "left" ? "swipeLeft" : "swipeRight", soundOn);
    const routeId = findRouteId({ eventId: currentEvent.id, flags: choice.flags || [] });
    const scaledEffect = scaleStatDelta(choice.effect, state.round);
    const scaledHidden = scaleHiddenDelta(choice.hidden, state.round);
    const scaledRelations = scaleRelationDelta(choice.relations, state.round);
    let next = {
      ...state,
      ...applyDeltaBlock(state, scaledEffect, STAT_KEYS),
      hidden: applyDeltaBlock(state.hidden, scaledHidden, HIDDEN_KEYS),
      relations: applyDeltaBlock(state.relations, scaledRelations, RELATION_KEYS),
      flags: Array.from(new Set([...state.flags, ...(choice.flags || [])])),
      usedIds: Array.from(new Set([...state.usedIds, currentEvent.id])),
      round: state.round + 1,
      memory: {
        ...state.memory,
        recentPacks: pushRecentHistory(state.memory.recentPacks, currentEvent.pack ? [currentEvent.pack] : []),
        recentRoles: pushRecentHistory(state.memory.recentRoles, currentEvent.role ? [currentEvent.role] : []),
        recentTags: pushRecentHistory(state.memory.recentTags, currentEvent.tags || [], 6),
        recentTitles: pushRecentHistory(state.memory.recentTitles, [currentEvent.title], 3),
        recentFlags: pushRecentHistory(state.memory.recentFlags, choice.flags || [], 6),
        recentKinds: pushRecentHistory(state.memory.recentKinds, [currentEvent.priority ? "chain" : "base"], 3),
        causalLedger: pushLedger(state.memory.causalLedger, routeId ? {
          routeId,
          kind: currentEvent.priority ? "chain-choice" : "choice",
          title: currentEvent.title,
          choiceLabel: choice.label,
          round: state.round,
        } : null),
        scheduledEffects: [
          ...state.memory.scheduledEffects,
          ...((choice.schedule || []).map((s, idx) => ({
            id: `${currentEvent.id}_${side}_${idx}_${state.round}`,
            triggerRound: state.round + s.after,
            type: s.type,
            routeId: routeId || findRouteId({ eventId: currentEvent.id, delayedType: s.type, flags: choice.flags || [] }),
            sourceEventId: currentEvent.id,
            sourceTitle: currentEvent.title,
            sourceChoiceLabel: choice.label,
            sourceRound: state.round,
          }))),
        ],
      },
    };
    const { next: afterDelayed, notes } = applyScheduledEffects(next);
    next = {
      ...afterDelayed,
      memory: {
        ...afterDelayed.memory,
        delayedNotes: notes.slice(-3),
        latestOutcome: buildChoiceOutcome(currentEvent, choice, side, notes),
      },
    };
    advance(next);
  };

  const shareEnding = async () => {
    const text = shareTextFromState(state);
    try {
      if (navigator.share) {
        await navigator.share({ title: "财权 · 结局", text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // ignore
    }
  };

  const copyEnding = async () => {
    try {
      await navigator.clipboard.writeText(shareTextFromState(state));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(8px, 2.8vw, 16px)", boxSizing: "border-box", background: theme.appBg, transition: "background 240ms ease" }}>
      <div style={{ width: "min(100%, 430px)", height: "min(calc(100dvh - 16px), 860px)", maxHeight: "calc(100dvh - 16px)", minHeight: 0, boxSizing: "border-box", background: theme.frameBg, borderRadius: 34, overflow: "hidden", border: theme.frameBorder, boxShadow: theme.frameShadow, display: "flex", flexDirection: "column", position: "relative", transition: "background 240ms ease, box-shadow 240ms ease" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: theme.overlay }} />

        {openingScreen ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={openingScreen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={openingScreen === "producer" ? producerSplashStyle : briefingSplashStyle}
            >
              <div style={openingScreen === "producer" ? producerBackdropStyle : briefingBackdropStyle} />
              {openingScreen === "producer" ? (
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} style={producerLockupStyle}>
                  <div style={producerBylineStyle}>A Game by</div>
                  <div style={producerTitleStyle}>鑫姐的财务圈</div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} style={{ position: "relative", width: "100%", display: "grid", justifyItems: "center", padding: "0 18px" }}>
                  <BriefingCard onStart={startFromBriefing} />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <>

        <div style={{ position: "relative", padding: "12px clamp(12px, 3vw, 16px)", borderBottom: "1px solid rgba(0,0,0,0.05)", background: theme.headerGlow, flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setSoundOn((value) => !value)} style={iconBtnStyle} title={soundOn ? "关闭音效" : "开启音效"}>{soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
              <button onClick={restart} style={iconBtnStyle} title="随机重开"><RotateCcw size={16} /></button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {STAT_KEYS.map((key) => <ProgressBar key={key} label={statLabel(key)} value={state[key]} />)}
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          {(state.screen === "event" || state.screen === "result") && (
            <div style={{ flexShrink: 0, display: "flex", justifyContent: "center", padding: "6px 16px 2px" }}>
              <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9f6b4f" }}>
                入职第 {state.screen === "event" ? state.round : Math.max(1, state.round - 1)} 个月
              </div>
            </div>
          )}
          <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px clamp(12px, 3vw, 16px)", position: "relative", overflowY: "auto", overflowX: "hidden" }}>
            <AnimatePresence mode="wait">
              {state.screen === "event" && (
                <motion.div key={`event_${state.round}_${currentEvent.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ width: "100%", display: "grid", justifyItems: "center", gap: 14 }}>
                  <div style={{ width: "100%", maxWidth: 360, textAlign: "center", display: "grid", gap: 10 }}>
                    <div style={speechRoleStyle}>{currentSpeech.speaker}</div>
                    <div style={speechQuoteStyle}>{currentSpeech.quote}</div>
                    <p style={speechDescStyle}>{currentSpeech.followup}</p>
                  </div>
                  <SwipeCard event={currentEvent} onChoose={applyChoice} />
                </motion.div>
              )}

              {state.screen === "result" && latestOutcome && (
                <motion.div key={`result_${state.round}_${latestOutcome.choiceLabel}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ width: "100%", display: "grid", justifyItems: "center", gap: 14 }}>
                  <div style={{ width: "100%", maxWidth: 360, textAlign: "center", display: "grid", gap: 10 }}>
                    <div style={speechRoleStyle}>{latestOutcome.speaker}</div>
                    <div style={speechQuoteStyle}>{latestOutcome.quote}</div>
                    <p style={speechDescStyle}>{latestOutcome.followup}</p>
                  </div>
                  <OutcomeCard outcome={latestOutcome} onContinue={continueFromResult} />
                </motion.div>
              )}

              {state.screen === "quarter" && (
                <motion.div key={`quarter_${state.round}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={surfacePanelStyle}>
                  <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9f6b4f" }}>年度经营复盘</div>
                  <h2 style={titleStyle}>2026 · 第 {state.year} 年复盘</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
                    {STAT_KEYS.map((key) => (
                      <div key={key} style={surfaceMiniCardStyle}><div style={{ fontSize: 10, color: "#6b7280" }}>{statLabel(key)}</div><div style={{ fontSize: 22, fontWeight: 900 }}>{state[key]}</div></div>
                    ))}
                  </div>
                  <div style={{ ...surfaceBoxStyle, marginTop: 12 }}>
                    {annualSummary.notes.map((note, idx) => <div key={idx} style={{ fontSize: 13, lineHeight: 1.6, color: "#4b5563" }}>• {note}</div>)}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
                    <div style={surfaceMiniCardStyle}><div style={{ fontSize: 10, color: "#6b7280" }}>年度优势</div><div style={{ fontWeight: 800 }}>{hiddenLabel(annualSummary.strength.key)}</div></div>
                    <div style={surfaceMiniCardStyle}><div style={{ fontSize: 10, color: "#6b7280" }}>年度压力</div><div style={{ fontWeight: 800 }}>{hiddenLabel(annualSummary.pressure.key)}</div></div>
                  </div>
                  <button onClick={() => setState((s) => ({ ...s, screen: "event" }))} style={primaryBtnStyle}>进入下一年</button>
                </motion.div>
              )}

              {state.screen === "ending" && (
                <motion.div key={`ending_${state.round}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={surfacePanelStyle}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><Skull size={52} /></div>
                  <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9f6b4f" }}>结局</div>
                  <h2 style={titleStyle}>{state.ending.title}</h2>
                  <p style={descStyle}>{state.ending.text}</p>
                  <div style={surfaceBoxStyle}>
                    <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.12em" }}>你的职业画像</div>
                    <div style={{ marginTop: 6, fontSize: 16, fontWeight: 900 }}>{persona.title}</div>
                    <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: "#4b5563" }}>{persona.desc}</div>
                    <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>{state.ending.memo}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>你活到了第 {state.round} 轮</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
                    <button onClick={shareEnding} style={secondaryBtnStyle}><Share2 size={16} /> 分享结局</button>
                    <button onClick={copyEnding} style={secondaryBtnStyle}><Copy size={16} /> {copied ? "已复制" : "复制文案"}</button>
                  </div>
                  <button onClick={restart} style={primaryBtnStyle}>再开一局</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ padding: "0 clamp(12px, 3vw, 16px) clamp(12px, 3vw, 16px)", display: "grid", gap: 10, flexShrink: 0 }}>
            {SHOW_DEBUG_INSIGHTS && (
              <div style={surfaceBoxStyle}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "#6b7280", marginBottom: 8 }}>经营暗线</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {["marginHealth", "executionDebt", "orgFatigue", "customerTrust"].map((key) => (
                    <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#4b5563" }}>{hiddenLabel(key)}</span>
                      <strong>{state.hidden[key]}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}

const panelStyle = {
  width: "min(100%, 316px)",
  minHeight: 0,
  maxHeight: "100%",
  borderRadius: 32,
  background: "#fffdf8",
  border: "1px solid rgba(0,0,0,0.05)",
  boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
  padding: "clamp(22px, 4vw, 28px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  overflowY: "auto",
};
const titleStyle = { fontSize: "clamp(24px, 5.8vw, 28px)", lineHeight: 1.2, margin: "8px 0 0", fontWeight: 900 };
const descStyle = { marginTop: 16, fontSize: "clamp(14px, 3.8vw, 15px)", lineHeight: 1.8, color: "#4b5563" };
const boxedStyle = { background: "#f6f1e8", borderRadius: 20, padding: 14, textAlign: "left" };
const miniCardStyle = { background: "#fbf7ef", borderRadius: 18, padding: 12, textAlign: "left" };
const statusPillStyle = { background: "#fbf7ef", borderRadius: 16, padding: "10px 12px", display: "grid", gap: 3 };
const statusLabelStyle = { fontSize: 10, color: "#6b7280", letterSpacing: "0.14em", textTransform: "uppercase" };
const eventMetaStyle = { padding: "5px 10px", borderRadius: 999, background: "#f6f1e8", fontSize: 10, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase" };
const alertMetaStyle = { ...eventMetaStyle, background: "#fff1f2", color: "#be123c" };
const speechCauseStyle = { justifySelf: "center", maxWidth: 336, padding: "8px 12px", borderRadius: 16, background: "#fbf7ef", border: "1px solid rgba(159,107,79,0.14)", fontSize: 12, lineHeight: 1.55, color: "#8a5d45", fontFamily: '"Iowan Old Style", "Georgia", serif' };
const speechTrailStyle = { justifySelf: "center", maxWidth: 336, fontSize: 11, lineHeight: 1.55, color: "#9f6b4f", letterSpacing: "0.02em", fontFamily: '"Iowan Old Style", "Georgia", serif' };
const speechRoleStyle = { fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9f6b4f" };
const speechQuoteStyle = { fontSize: "clamp(24px, 6vw, 30px)", lineHeight: 1.24, fontWeight: 900, color: "#111827", textWrap: "balance", fontFamily: '"Iowan Old Style", "Georgia", serif' };
const speechDescStyle = { margin: 0, fontSize: "clamp(14px, 4vw, 16px)", lineHeight: 1.75, color: "#4b5563", maxWidth: 330, fontFamily: '"Iowan Old Style", "Georgia", serif' };
const primaryBtnStyle = { marginTop: 16, height: 52, border: 0, borderRadius: 22, background: "#111827", color: "white", fontWeight: 800, cursor: "pointer" };
const secondaryBtnStyle = { height: 46, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, background: "white", color: "#111827", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 };
const iconBtnStyle = { width: 36, height: 36, borderRadius: 999, border: "1px solid rgba(0,0,0,0.06)", background: "white", display: "grid", placeItems: "center", cursor: "pointer" };
const producerSplashStyle = { position: "relative", flex: 1, display: "grid", placeItems: "center", overflow: "hidden", background: "linear-gradient(180deg, #f7efe2 0%, #ecdcc8 54%, #e4d6cb 100%)" };
const producerBackdropStyle = { position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 28%, rgba(255,255,255,0.9), transparent 30%), radial-gradient(circle at 50% 78%, rgba(170,122,84,0.16), transparent 38%)" };
const producerLockupStyle = { position: "relative", display: "grid", justifyItems: "center", gap: 14, padding: "24px 20px", textAlign: "center" };
const producerBylineStyle = { fontSize: 12, color: "#9f6b4f", letterSpacing: "0.34em", textTransform: "uppercase", fontWeight: 700, textShadow: "0 1px 0 rgba(255,255,255,0.38)" };
const producerTitleStyle = { fontSize: "clamp(34px, 10vw, 44px)", lineHeight: 1.12, fontWeight: 900, color: "#2f241e", letterSpacing: "0.1em", textAlign: "center", fontFamily: '"Iowan Old Style", "Georgia", serif', textShadow: "0 1px 0 rgba(255,255,255,0.42)" };
const briefingSplashStyle = { position: "relative", flex: 1, display: "grid", placeItems: "center", overflow: "hidden", background: "linear-gradient(180deg, #f8f1e6 0%, #eee3d3 50%, #e8ddd2 100%)" };
const briefingBackdropStyle = { position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 22%, rgba(255,255,255,0.92), transparent 28%), radial-gradient(circle at 18% 82%, rgba(159,107,79,0.08), transparent 26%), radial-gradient(circle at 82% 76%, rgba(120,82,64,0.08), transparent 26%)" };
const briefingInnerStyle = { position: "relative", width: "min(100%, 360px)", display: "grid", gap: 18, padding: "28px 26px", borderRadius: 32, background: "rgba(255,251,246,0.72)", border: "1px solid rgba(159,107,79,0.12)", boxShadow: "0 24px 70px rgba(61,41,26,0.08)", backdropFilter: "blur(10px)" };
const briefingEyebrowStyle = { justifySelf: "center", padding: "7px 12px", borderRadius: 999, fontSize: 11, color: "#9f6b4f", letterSpacing: "0.22em", textTransform: "uppercase", background: "rgba(255,255,255,0.65)", border: "1px solid rgba(159,107,79,0.12)" };
const briefingTitleStyle = { fontSize: "clamp(24px, 7.2vw, 31px)", lineHeight: 1.28, fontWeight: 900, color: "#2f241e", textAlign: "center", fontFamily: '"Iowan Old Style", "Georgia", serif' };
const briefingBodyStyle = { display: "grid", gap: 14, textAlign: "center" };
const briefingParagraphStyle = { margin: 0, fontSize: "clamp(15px, 4vw, 17px)", lineHeight: 1.8, color: "#5f4a3f" };
const briefingHintStyle = { fontSize: 11, color: "#9f6b4f", letterSpacing: "0.22em", textTransform: "uppercase" };
export default App;
