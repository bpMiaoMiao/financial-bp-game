import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { RotateCcw, Skull, Volume2, VolumeX } from "lucide-react";
import { scenarios, initialRelations } from "./data/scenarios";
import { baseEvents } from "./data/baseEvents";
import { chainEvents } from "./data/chainEvents";
import { storyChains } from "./data/storyChains";
import { delayedEffects } from "./data/delayedEffects";
import { chainCauseHints, chainRouteConfigs, chainRoutePressure } from "./data/chainMeta";
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

function alternativeFulfillmentScore(state, alternative = {}) {
  let score = 0;
  const allFlags = alternative.allFlags || [];
  score += allFlags.filter((flag) => state.flags.includes(flag)).length * 0.75;
  if ((alternative.anyFlags || []).some((flag) => state.flags.includes(flag))) score += 0.45;
  score += thresholdMomentum(state, alternative.statMin, "min", 24);
  score += thresholdMomentum(state, alternative.statMax, "max", 24);
  score += thresholdMomentum(state.hidden, alternative.hiddenMin, "min", 20);
  score += thresholdMomentum(state.hidden, alternative.hiddenMax, "max", 20);
  score += thresholdMomentum(state.relations, alternative.relationMin, "min", 24);
  score += thresholdMomentum(state.relations, alternative.relationMax, "max", 24);
  if (alternative.roundMin && state.round >= alternative.roundMin) score += 0.35;
  return score;
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

function rescaleSigned(value, factor) {
  if (!value || factor === 1) return value;
  return Math.sign(value) * Math.max(1, Math.round(Math.abs(value) * factor));
}

function amplifyNegative(delta, key, factor) {
  if ((delta[key] ?? 0) < 0) delta[key] = rescaleSigned(delta[key], factor);
}

function dampenPositive(delta, key, factor) {
  if ((delta[key] ?? 0) > 0) delta[key] = rescaleSigned(delta[key], factor);
}

function amplifyAny(delta, key, factor) {
  if (delta[key]) delta[key] = rescaleSigned(delta[key], factor);
}

function projectChoiceDeltas(event, choice, state) {
  const scaledEffect = scaleStatDelta(choice.effect, state.round);
  const scaledHidden = scaleHiddenDelta(choice.hidden, state.round);
  const scaledRelations = scaleRelationDelta(choice.relations, state.round);
  const tags = new Set(event.tags || []);
  const levels = hiddenRouteLevels(state);

  if (levels.orgFatigue >= 3 && (tags.has("团队") || tags.has("执行") || tags.has("老板"))) {
    amplifyNegative(scaledEffect, "team", 1.6);
    amplifyNegative(scaledEffect, "trust", 1.25);
    dampenPositive(scaledEffect, "team", 0.6);
    amplifyAny(scaledHidden, "orgFatigue", 1.35);
  }

  if (levels.riskExposure >= 3 && (tags.has("风险") || tags.has("合规") || tags.has("政治") || tags.has("老板"))) {
    amplifyNegative(scaledEffect, "trust", 1.55);
    amplifyNegative(scaledEffect, "cash", 1.3);
    dampenPositive(scaledEffect, "trust", 0.65);
    amplifyAny(scaledHidden, "riskExposure", 1.35);
  }

  if (levels.bossDependency >= 3 && (tags.has("老板") || tags.has("政治"))) {
    amplifyAny(scaledEffect, "trust", 1.35);
    amplifyNegative(scaledEffect, "team", 1.2);
    amplifyNegative(scaledEffect, "cash", 1.15);
    amplifyAny(scaledHidden, "bossDependency", 1.3);
  }

  if (levels.politicalHeat >= 3 && (tags.has("政治") || tags.has("团队") || tags.has("老板"))) {
    amplifyNegative(scaledEffect, "trust", 1.35);
    amplifyNegative(scaledEffect, "team", 1.35);
    dampenPositive(scaledEffect, "trust", 0.75);
    dampenPositive(scaledEffect, "team", 0.75);
    amplifyAny(scaledHidden, "politicalHeat", 1.3);
  }

  if (levels.executionDebt >= 3 && (tags.has("执行") || tags.has("数据") || tags.has("系统"))) {
    amplifyNegative(scaledEffect, "trust", 1.3);
    amplifyNegative(scaledEffect, "cash", 1.2);
    dampenPositive(scaledEffect, "cash", 0.7);
    dampenPositive(scaledEffect, "trust", 0.7);
    amplifyAny(scaledHidden, "executionDebt", 1.35);
  }

  if (levels.dataMaturity >= 3 && (tags.has("数据") || tags.has("系统") || tags.has("执行"))) {
    amplifyNegative(scaledEffect, "trust", 1.3);
    amplifyNegative(scaledEffect, "cash", 1.15);
    dampenPositive(scaledEffect, "trust", 0.75);
    dampenPositive(scaledEffect, "cash", 0.75);
    amplifyNegative(scaledHidden, "dataMaturity", 1.35);
    dampenPositive(scaledHidden, "dataMaturity", 0.75);
  }

  if (levels.customerTrust >= 3 && (tags.has("客户") || tags.has("增长") || tags.has("利润质量"))) {
    dampenPositive(scaledEffect, "growth", 0.75);
    amplifyNegative(scaledEffect, "trust", 1.3);
    amplifyNegative(scaledEffect, "cash", 1.15);
    amplifyNegative(scaledHidden, "customerTrust", 1.35);
    dampenPositive(scaledHidden, "customerTrust", 0.75);
  }

  if (levels.marginHealth >= 3 && (tags.has("增长") || tags.has("利润质量") || tags.has("客户"))) {
    dampenPositive(scaledEffect, "growth", 0.75);
    amplifyNegative(scaledEffect, "cash", 1.15);
    amplifyNegative(scaledHidden, "marginHealth", 1.35);
    dampenPositive(scaledHidden, "marginHealth", 0.75);
  }

  return { effect: scaledEffect, hidden: scaledHidden, relations: scaledRelations };
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

function bpBufferProfile(state) {
  const directFlags = [
    "go_explain",
    "version_first",
    "catch_between",
    "explain_not_decide",
    "default_receiver",
    "seat_routine",
    "normal_turnover",
    "seat_cost",
    "temporary_plug",
    "be_buffer",
  ];
  const indirectFlags = [
    "boss_temp_number",
    "overnight_forecast",
    "board_deck_polish",
    "need_boss_backing",
    "cross_line_approval",
    "meeting_rewrite",
    "assistant_overreach",
    "private_chat_leak",
    "budget_meeting_targeted",
    "project_blame",
    "speak_for_boss",
    "business_pushes_blame",
    "shadow_committee",
    "middle_manager_blame",
    "cross_team_conflict",
    "weekend_overtime",
  ];

  const allFlags = state.flags || [];
  const recentFlags = state.memory.recentFlags || [];
  const directCount = directFlags.filter((flag) => allFlags.includes(flag)).length;
  const indirectCount = indirectFlags.filter((flag) => allFlags.includes(flag)).length;
  const recentDirect = directFlags.filter((flag) => recentFlags.includes(flag)).length;
  const recentIndirect = indirectFlags.filter((flag) => recentFlags.includes(flag)).length;

  let level = 0;
  level += directCount * 1.35;
  level += indirectCount * 0.35;
  level += recentDirect * 0.9;
  level += recentIndirect * 0.28;

  if (state.hidden.bossDependency >= 36) level += 0.8;
  if (state.hidden.bossDependency >= 48) level += 1;
  if (state.hidden.politicalHeat >= 34) level += 0.7;
  if (state.hidden.politicalHeat >= 46) level += 0.9;
  if (state.hidden.orgFatigue >= 38) level += 0.55;
  if (state.hidden.dataMaturity <= 34) level += 0.3;
  if (state.round >= 5) level += 0.45;
  if (state.round >= 8) level += 0.75;
  if (state.round >= 11) level += 0.9;

  return {
    level,
    directCount,
    indirectCount,
    recentDirect,
    recentIndirect,
  };
}

function choiceSchedulesCount(event) {
  const left = event.left?.schedule?.length || 0;
  const right = event.right?.schedule?.length || 0;
  return left + right;
}

const MANUAL_BASE_DEBT = new Set([
  "marketing_budget",
  "flagship_launch",
  "live_stream_push",
  "festival_promo",
  "affiliate_bounty",
  "marketplace_coupon",
  "gmv_target",
  "bundle_offer",
  "long_terms",
  "advance_payment",
  "supplier_pressure",
  "collection_team",
  "deposit_negotiation",
  "prepay_inventory",
  "capex_installment",
  "discount",
  "inventory_push",
  "build_system",
  "manual_reconcile",
  "freeze_hiring",
  "headcount_fight",
  "salary_adjustment",
  "shared_service_request",
  "meeting_rewrite",
  "boss_temp_number",
]);

const MANUAL_BASE_RECKONING = new Set([
  "payroll_warning",
  "bad_debt_signal",
  "bridge_loan",
  "tax_payment",
  "fund_pool_shift",
  "settlement_delay",
  "bonus_payout",
  "overnight_forecast",
  "boss_station",
  "owner_friend_project",
  "board_deck_polish",
  "investor_story",
  "data_fight",
  "close_rush",
  "report_error",
  "hot_sku_stockout",
  "emergency_restock",
  "slow_moving_overhang",
  "low_margin_big_order",
  "platform_fee_up",
  "predecessor_where",
  "temporary_patch_person",
]);

const COMBO_CHAIN_IDS = new Set([
  "office_romance_flashpoint",
  "promotion_revolt",
  "nepotism_probe",
  "clique_split",
  "paper_runway",
  "numbers_hostage",
  "hallway_silence",
  "trained_to_wait",
  "proxy_signature",
  "quality_claim_room",
  "inventory_mirage",
  "middle_seat_protocol",
]);

const STORY_ARC_FLAG_PREFIXES = {
  predecessor_trace: "predecessor_trace_",
  friend_project: "friend_project_",
  showcase_narrative: "showcase_",
  hr_watchlist: "hr_watchlist_",
  vendor_shadow: "vendor_shadow_",
  bi_anomaly: "bi_anomaly_",
  warehouse_backdoor: "warehouse_backdoor_",
};

const STORY_ARC_IDS = storyChains.reduce((acc, event) => {
  if (!acc[event.storyArc]) acc[event.storyArc] = [];
  acc[event.storyArc].push(event.id);
  return acc;
}, {});

function conditionComplexity(conditions = {}) {
  let score = 0;
  score += (conditions.allFlags?.length || 0) * 1.15;
  score += (conditions.anyFlags?.length || 0) * 0.85;
  score += (conditions.alternatives?.length || 0) * 2.2;
  score += Object.keys(conditions.statMin || {}).length * 1.1;
  score += Object.keys(conditions.statMax || {}).length * 1.1;
  score += Object.keys(conditions.hiddenMin || {}).length * 1.25;
  score += Object.keys(conditions.hiddenMax || {}).length * 1.25;
  score += Object.keys(conditions.relationMin || {}).length * 0.9;
  score += Object.keys(conditions.relationMax || {}).length * 0.9;
  score += conditions.roundMin ? 0.9 : 0;
  return score;
}

function progressionClass(event) {
  if (event.priority) {
    const complexity = conditionComplexity(event.conditions || {});
    if (
      event.priority >= 10 ||
      complexity >= 5.2 ||
      (event.conditions?.alternatives?.length || 0) >= 1 ||
      (event.conditions?.allFlags?.length || 0) >= 2
    ) {
      return "reckoning";
    }
    return "debt";
  }

  if (MANUAL_BASE_RECKONING.has(event.id)) return "reckoning";
  if (MANUAL_BASE_DEBT.has(event.id)) return "debt";

  if (event.pack === "暗线") {
    if (["predecessor_where", "temporary_patch_person"].includes(event.id)) return "reckoning";
    if (["you_explain_again", "old_hand_reaction", "everybody_sends_to_you"].includes(event.id)) return "debt";
    return "normal";
  }

  const scheduleCount = choiceSchedulesCount(event);
  const complexity = conditionComplexity(event.conditions || {});
  const phases = event.phase || [];
  const lateOnly = phases.includes("late") && !phases.includes("early");
  const touchesLate = phases.includes("late");
  const debtPacks = new Set(["现金", "库存", "系统", "数据", "组织", "老板", "政治", "利润质量"]);
  const reckoningPacks = new Set(["老板", "政治", "系统", "数据"]);

  if (
    scheduleCount >= 2 ||
    complexity >= 5.2 ||
    (lateOnly && reckoningPacks.has(event.pack) && complexity >= 1.6) ||
    (touchesLate && reckoningPacks.has(event.pack) && complexity >= 2.2) ||
    ((event.tags || []).some((tag) => ["风险", "合规", "政治", "老板"].includes(tag)) && complexity >= 3.2)
  ) {
    return "reckoning";
  }
  if (
    touchesLate ||
    (debtPacks.has(event.pack) && (touchesLate || complexity >= 0.8 || scheduleCount >= 1)) ||
    scheduleCount >= 1 ||
    complexity >= 1.2 ||
    ((event.tags || []).some((tag) => ["数据", "系统", "执行", "客户", "利润质量"].includes(tag)) && complexity >= 0.8)
  ) {
    return "debt";
  }
  return "normal";
}

function progressionPhaseWeight(event, state) {
  const phase = phaseOfRound(state.round);
  const kind = progressionClass(event);

  if (event.priority) {
    if (phase === "early") {
      if (kind === "reckoning") return -2.8;
      return -0.8;
    }
    if (phase === "mid") {
      if (kind === "reckoning") return 0.6;
      return 1.2;
    }
    if (kind === "reckoning") return 2.1;
    return 0.4;
  }

  if (phase === "early") {
    if (kind === "normal") return 1.35;
    if (kind === "debt") return -0.55;
    return -2.1;
  }
  if (phase === "mid") {
    if (kind === "normal") return -0.2;
    if (kind === "debt") return 1.05;
    return 0.5;
  }
  if (kind === "normal") return -0.95;
  if (kind === "debt") return 0.35;
  return 1.8;
}

function hiddenRouteLevels(state) {
  const lowBad = (value, [light, medium, heavy]) => {
    if (value <= heavy) return 3;
    if (value <= medium) return 2;
    if (value <= light) return 1;
    return 0;
  };
  const highBad = (value, [light, medium, heavy]) => {
    if (value >= heavy) return 3;
    if (value >= medium) return 2;
    if (value >= light) return 1;
    return 0;
  };

  return {
    marginHealth: lowBad(state.hidden.marginHealth, [44, 36, 28]),
    customerTrust: lowBad(state.hidden.customerTrust, [44, 36, 28]),
    dataMaturity: lowBad(state.hidden.dataMaturity, [34, 28, 22]),
    executionDebt: highBad(state.hidden.executionDebt, [30, 38, 48]),
    orgFatigue: highBad(state.hidden.orgFatigue, [34, 42, 52]),
    riskExposure: highBad(state.hidden.riskExposure, [34, 45, 58]),
    bossDependency: highBad(state.hidden.bossDependency, [32, 42, 54]),
    politicalHeat: highBad(state.hidden.politicalHeat, [32, 42, 54]),
  };
}

function hiddenRouteWeight(event, state) {
  if (!event.tags?.length) return 0;
  const levels = hiddenRouteLevels(state);
  let bonus = 0;

  if (levels.marginHealth) {
    if (event.tags.includes("利润质量")) bonus += 1.1 * levels.marginHealth;
    if (event.tags.includes("客户")) bonus += 0.6 * levels.marginHealth;
    if (levels.marginHealth >= 2 && event.tags.includes("增长")) bonus -= 0.7;
  }

  if (levels.customerTrust) {
    if (event.tags.includes("客户")) bonus += 1.2 * levels.customerTrust;
    if (event.tags.includes("风险")) bonus += 0.45 * levels.customerTrust;
    if (levels.customerTrust >= 2 && event.tags.includes("增长")) bonus -= 0.45;
  }

  if (levels.dataMaturity) {
    if (event.tags.includes("数据") || event.tags.includes("系统")) bonus += 1.15 * levels.dataMaturity;
    if (event.tags.includes("执行")) bonus += 0.5 * levels.dataMaturity;
  }

  if (levels.executionDebt) {
    if (event.tags.includes("执行")) bonus += 1.0 * levels.executionDebt;
    if (event.tags.includes("数据") || event.tags.includes("系统")) bonus += 0.65 * levels.executionDebt;
    if (levels.executionDebt >= 2 && event.tags.includes("政治")) bonus += 0.25 * levels.executionDebt;
  }

  if (levels.orgFatigue) {
    if (event.tags.includes("团队")) bonus += 1.15 * levels.orgFatigue;
    if (levels.orgFatigue >= 2 && event.tags.includes("老板")) bonus += 0.3 * levels.orgFatigue;
  }

  if (levels.riskExposure) {
    if (event.tags.includes("风险") || event.tags.includes("合规")) bonus += 1.1 * levels.riskExposure;
    if (event.tags.includes("政治")) bonus += 0.35 * levels.riskExposure;
  }

  if (levels.bossDependency) {
    if (event.tags.includes("老板")) bonus += 1.15 * levels.bossDependency;
    if (levels.bossDependency >= 2 && event.tags.includes("政治")) bonus += 0.35 * levels.bossDependency;
  }

  if (levels.politicalHeat) {
    if (event.tags.includes("政治")) bonus += 1.2 * levels.politicalHeat;
    if (event.tags.includes("团队")) bonus += 0.45 * levels.politicalHeat;
  }

  return bonus;
}

function bpBufferWeight(event, state) {
  const profile = bpBufferProfile(state);
  if (profile.level <= 0) return 0;

  const isBufferBase = event.pack === "暗线";
  const carriesBufferSubtext =
    event.tags?.includes("老板") ||
    event.tags?.includes("政治") ||
    event.tags?.includes("团队") ||
    event.tags?.includes("数据");

  if (!isBufferBase && !carriesBufferSubtext) return 0;

  let bonus = 0;
  if (isBufferBase) {
    if (state.round <= 2) bonus -= 2.4;
    else if (state.round <= 4) bonus += Math.max(0.2, profile.level * 0.22);
    else if (state.round <= 8) bonus += profile.level * 0.5;
    else bonus += profile.level * 0.72;

    if (event.id === "predecessor_where" || event.id === "temporary_patch_person") {
      if (state.round < 8) bonus -= 1.6;
      else bonus += 0.8;
    }
    if (event.id === "you_explain_again" || event.id === "everybody_sends_to_you") {
      if (state.round >= 6) bonus += 0.8;
    }
    return bonus;
  }

  if (state.round < 5) return 0;
  if (profile.level < 3) return 0;

  if (event.tags?.includes("老板")) bonus += 0.16 * profile.level;
  if (event.tags?.includes("政治")) bonus += 0.2 * profile.level;
  if (event.tags?.includes("团队")) bonus += 0.12 * profile.level;
  if (event.tags?.includes("数据")) bonus += 0.08 * profile.level;
  return bonus;
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
  if ((state.team <= 45 || state.hidden.orgFatigue >= 40) && event.tags?.includes("团队")) bonus += 2;
  if ((state.hidden.executionDebt >= 34) && (event.tags?.includes("执行") || event.tags?.includes("数据") || event.tags?.includes("系统"))) bonus += 1.8;
  if ((state.hidden.marginHealth <= 42) && event.tags?.includes("利润质量")) bonus += 2;
  if ((state.hidden.customerTrust <= 42) && event.tags?.includes("客户")) bonus += 2;
  if ((state.hidden.dataMaturity <= 28) && (event.tags?.includes("数据") || event.tags?.includes("系统"))) bonus += 1.5;
  if ((state.hidden.riskExposure >= 42) && (event.tags?.includes("风险") || event.tags?.includes("合规") || event.tags?.includes("政治"))) bonus += 1.5;
  if ((state.hidden.bossDependency >= 38 || state.trust <= 45) && event.tags?.includes("老板")) bonus += 1.5;
  if (state.hidden.politicalHeat >= 38 && event.tags?.includes("政治")) bonus += 1.7;
  if (state.round >= 9 && (event.tags?.includes("政治") || event.tags?.includes("老板"))) bonus += 0.8;
  if (state.memory.scheduledEffects.length < 2 && state.round <= 6 && (event.left?.schedule?.length || event.right?.schedule?.length)) bonus += 0.9;
  bonus += scenarioBiasWeight(event, state);
  bonus += phaseFlavorWeight(event, state);
  bonus += consequenceBiasWeight(event, state);
  bonus += hiddenRouteWeight(event, state);
  bonus += bpBufferWeight(event, state);
  bonus += stabilityPressureWeight(event, state);
  bonus += progressionPhaseWeight(event, state);
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

function chainRouteUrgency(event, state) {
  const levels = hiddenRouteLevels(state);
  let score = 0;
  for (const [key, ids] of Object.entries(chainRoutePressure)) {
    if (!ids.includes(event.id)) continue;
    const level = levels[key] || 0;
    if (!level) continue;
    score += level >= 3 ? 2.3 : level >= 2 ? 1.4 : 0.7;
  }
  if (chainRouteConfigs.bp_buffer?.chains.includes(event.id)) {
    const profile = bpBufferProfile(state);
    if (state.round >= 5 && profile.level >= 2.6) score += state.round >= 9 ? profile.level * 0.32 : profile.level * 0.22;
    if (event.id === "replacement_ready" && state.round < 9) score -= 1.6;
  }
  return score;
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
  if (conditions.alternatives?.length) {
    score += Math.max(...conditions.alternatives.map((alternative) => alternativeFulfillmentScore(state, alternative)));
  }
  score += chainRouteUrgency(event, state);
  if (state.memory.scheduledEffects.length >= 3) score += 0.35;
  if ((state.memory.recentRoles || []).at(-1) === event.role) score -= 0.6;
  if ((state.memory.recentTitles || []).includes(event.title)) score -= 1.4;
  score += progressionPhaseWeight(event, state);
  if (COMBO_CHAIN_IDS.has(event.id)) {
    if (state.round >= 6) score += 0.7;
    if (state.round >= 9) score += 0.8;
  }

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

function storyArcDepth(state, storyArc) {
  const prefix = STORY_ARC_FLAG_PREFIXES[storyArc];
  const arcFlags = prefix ? (state.flags || []).filter((flag) => flag.startsWith(prefix)).length : 0;
  const recentArcs = state.memory.recentStoryArcs || [];
  const continuity = recentRepeats(recentArcs, storyArc);
  let score = arcFlags * 0.95 + continuity * 0.9;

  if (storyArc === "predecessor_trace") {
    const profile = bpBufferProfile(state);
    if (state.round >= 7) score += profile.level * 0.18;
  }
  if (storyArc === "friend_project") {
    if (state.hidden.bossDependency >= 38) score += 0.9;
    if (state.hidden.politicalHeat >= 36) score += 0.7;
    if (state.hidden.riskExposure >= 36) score += 0.6;
  }
  if (storyArc === "showcase_narrative") {
    if (state.hidden.bossDependency >= 34) score += 0.7;
    if (state.hidden.dataMaturity <= 34) score += 0.7;
    if (state.trust <= 42) score += 0.5;
  }

  return score;
}

function storyArcProgress(state, storyArc) {
  const prefix = STORY_ARC_FLAG_PREFIXES[storyArc];
  const flags = prefix ? (state.flags || []).filter((flag) => flag.startsWith(prefix)).length : 0;
  const seen = (STORY_ARC_IDS[storyArc] || []).filter((id) => state.usedIds.includes(id)).length;
  const total = (STORY_ARC_IDS[storyArc] || []).length;
  return {
    flags,
    seen,
    total,
    complete: total > 0 && seen >= total,
    started: flags > 0 || seen > 0,
    active: (flags > 0 || seen > 0) && !(total > 0 && seen >= total),
  };
}

function activeStoryArcCount(state) {
  return Object.keys(STORY_ARC_IDS).filter((storyArc) => storyArcProgress(state, storyArc).active).length;
}

function roundsSinceStory(state) {
  const recentKinds = state.memory.recentKinds || [];
  for (let i = recentKinds.length - 1; i >= 0; i -= 1) {
    if (recentKinds[i] === "story") return recentKinds.length - 1 - i;
  }
  return recentKinds.length;
}

function storyUrgency(event, state) {
  const conditions = event.conditions || {};
  const arc = storyArcProgress(state, event.storyArc);
  const activeArcs = activeStoryArcCount(state);
  let score = event.priority ?? 1;
  score += (conditions.allFlags || []).filter((flag) => state.flags.includes(flag)).length * 0.8;
  if ((conditions.anyFlags || []).some((flag) => state.flags.includes(flag))) score += 0.5;
  score += thresholdMomentum(state, conditions.statMin, "min");
  score += thresholdMomentum(state, conditions.statMax, "max");
  score += thresholdMomentum(state.hidden, conditions.hiddenMin, "min");
  score += thresholdMomentum(state.hidden, conditions.hiddenMax, "max");
  score += thresholdMomentum(state.relations, conditions.relationMin, "min");
  score += thresholdMomentum(state.relations, conditions.relationMax, "max");
  if (conditions.alternatives?.length) {
    score += Math.max(...conditions.alternatives.map((alternative) => alternativeFulfillmentScore(state, alternative)));
  }
  score += storyArcDepth(state, event.storyArc);
  score += progressionPhaseWeight(event, state);

  const recentStoryArcs = state.memory.recentStoryArcs || [];
  if (arc.started) {
    score += 0.8;
    score += arc.flags * 0.55;
    if (arc.seen >= 1) score += 0.55;
    if (arc.seen >= 2) score += 1.15;
    if (recentStoryArcs.at(-1) === event.storyArc) score += 2.1;
    else if (recentStoryArcs.includes(event.storyArc)) score += 1.05;
  } else {
    if (activeArcs >= 2) score -= 2.2;
    else if (activeArcs >= 1) score -= 0.9;
    if (roundsSinceStory(state) >= 3 && state.round >= 8) score += 0.75;
    if (activeArcs === 0 && state.round >= 9) score += 0.5;
  }

  const recentKinds = state.memory.recentKinds || [];
  const storyStreak = recentRepeats(recentKinds, "story");
  if (storyStreak >= 2 && !arc.started) score -= 1.1;
  if (storyStreak >= 3) score -= 0.6;
  if ((state.memory.recentTitles || []).includes(event.title)) score -= 1.5;

  if (state.round <= 4) score -= 2.8;
  else if (state.round <= 7) score -= 0.8;
  else if (state.round >= 11) score += arc.started ? 1.1 : 0.7;
  if (state.round >= 13 && arc.started) score += 0.55;

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

function pickStoryChainEvent(state) {
  const eligible = storyChains.filter((event) => !state.usedIds.includes(event.id) && matchesConditions(state, event.conditions));
  if (!eligible.length) return null;

  const scored = eligible
    .map((event) => ({ ...event, urgency: storyUrgency(event, state) }))
    .sort((a, b) => b.urgency - a.urgency);

  const top = scored[0];
  const recentKinds = state.memory.recentKinds || [];
  const storyStreak = recentRepeats(recentKinds, "story");
  if (state.round <= 5 && top.urgency < 10.4) return null;
  if (recentKinds.at(-1) === "story" && storyStreak >= 2 && top.urgency < 11.2) return null;

  const pool = scored
    .filter((event) => event.urgency >= top.urgency - 1)
    .slice(0, 3)
    .map((event) => ({ ...event, weight: event.urgency }));

  return weightedPick(pool);
}

function chooseEvent(state) {
  const storyEvent = pickStoryChainEvent(state);
  const chainEvent = pickChainEvent(state);
  if (storyEvent && chainEvent) {
    const arc = storyArcProgress(state, storyEvent.storyArc);
    return weightedPick([
      { ...storyEvent, weight: Math.max(0.1, storyEvent.urgency + (arc.started ? 1.35 : 0.25)) },
      { ...chainEvent, weight: Math.max(0.1, chainEvent.urgency) },
    ]);
  }
  if (storyEvent) return storyEvent;
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
      type: item.type,
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
    memory: { scheduledEffects: [], delayedNotes: [], quarterlyNotes: [], recentPacks: [], recentTags: [], recentTitles: [], recentRoles: [], recentFlags: [], recentKinds: [], recentStoryArcs: [], latestOutcome: null, resultQueue: [], resultIndex: 0, pendingTransition: null, causalLedger: [] },
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

function hasAnyFlag(state, flags = []) {
  const set = new Set(state.flags || []);
  return flags.some((flag) => set.has(flag));
}

const ENDING_RULES = [
  {
    id: "numbers_discredited",
    isFatal: (state) =>
      state.trust <= 0 &&
      state.hidden.dataMaturity <= 26 &&
      state.hidden.executionDebt >= 42 &&
      hasAnyFlag(state, ["manual_forecast", "data_patch", "close_cram", "skip_system", "misaligned_kpi"]),
    crossed: (prev, next) =>
      !(prev.trust <= 0 && prev.hidden.dataMaturity <= 26 && prev.hidden.executionDebt >= 42) &&
      next.trust <= 0 &&
      next.hidden.dataMaturity <= 26 &&
      next.hidden.executionDebt >= 42,
    severity: (state) => 100 + Math.abs(state.trust) + (42 - state.hidden.dataMaturity) + (state.hidden.executionDebt - 42),
    ending: {
      special: true,
      title: "特殊死亡：数字失去公信力",
      text: "到了最后，已经不是哪一版更好看的问题了，而是没人再相信你拿出来的数字还能代表真实情况。",
      memo: "你一次次把问题补成了还能往下开的版本，也把这个岗位最后一点解释权一起补没了。",
      handoff: "新人到岗那天，第一句交代不是目标，而是：这次先把数对齐，别再让人觉得版本比真相更完整。",
    },
  },
  {
    id: "silent_walkout",
    isFatal: (state) =>
      state.team <= 0 &&
      state.hidden.orgFatigue >= 48 &&
      hasAnyFlag(state, ["freeze_hiring", "burn_team", "keep_freeze", "weekend_overtime", "performance_push"]),
    crossed: (prev, next) =>
      !(prev.team <= 0 && prev.hidden.orgFatigue >= 48) &&
      next.team <= 0 &&
      next.hidden.orgFatigue >= 48,
    severity: (state) => 100 + Math.abs(state.team) + (state.hidden.orgFatigue - 48),
    ending: {
      special: true,
      title: "特殊死亡：组织静默离场",
      text: "没有哪一场会真的吵翻，大家只是一个个不再解释、不再提问，也不再相信这套日子还能被继续扛下去。",
      memo: "你一直在替组织把冲突压成还能合作的样子，直到合作这件事本身先从桌上消失了。",
      handoff: "下一任入座时，团队还在。只是很多人已经学会少说一句、少接一口气，把真正的离开留到会后再做。",
    },
  },
  {
    id: "public_meltdown",
    isFatal: (state) =>
      state.trust <= 0 &&
      state.hidden.bossDependency >= 44 &&
      state.hidden.politicalHeat >= 44 &&
      hasAnyFlag(state, ["public_promise", "boss_confidant", "stand_side", "meeting_rewrite", "speak_for_boss", "owner_override"]),
    crossed: (prev, next) =>
      !(prev.trust <= 0 && prev.hidden.bossDependency >= 44 && prev.hidden.politicalHeat >= 44) &&
      next.trust <= 0 &&
      next.hidden.bossDependency >= 44 &&
      next.hidden.politicalHeat >= 44,
    severity: (state) => 100 + Math.abs(state.trust) + (state.hidden.bossDependency - 44) + (state.hidden.politicalHeat - 44),
    ending: {
      special: true,
      title: "特殊死亡：公开失守",
      text: "你替太多人把判断、场面和版本接成了一句能说的话，直到终于有一次，所有人都在等你把那句话说圆，而你已经圆不回来了。",
      memo: "这个岗位最危险的时候，不是没人找你，而是所有人都默认该由你站出来，把他们不想亲口承担的东西讲完。",
      handoff: "新一任到岗时，会议室还是满的。大家照旧把目光留给坐在中间的那个人，像这位置本来就该先把场面接住。",
    },
  },
  {
    id: "cash_crash",
    isFatal: (state) => state.cash <= 0,
    crossed: (prev, next) => prev.cash > 0 && next.cash <= 0,
    severity: (state) => Math.abs(state.cash),
    ending: {
      special: false,
      title: "死于：现金流断裂",
      text: "最后不是市场把你打死的，而是你替增长、关系和场面争来的每一口时间，最后都从现金里先垫了出去。",
      memo: "这个岗位常常先替别人把代价垫成一个还能继续开的会，直到连账上的最后一口气也垫没。",
      handoff: "几天后，新一任财务BP到岗了。第一场会里，还是有人说：先把这轮顶过去。",
    },
  },
  {
    id: "org_collapse",
    isFatal: (state) => state.team <= 0,
    crossed: (prev, next) => prev.team > 0 && next.team <= 0,
    severity: (state) => Math.abs(state.team),
    ending: {
      special: false,
      title: "死于：组织崩盘",
      text: "报表还在出，流程还在转，但那些本该被正面解决的拉扯，最后先压垮的是你和还在硬撑的人。",
      memo: "你一直在把冲突翻译成还能合作的样子，直到再也没有人愿意替这套样子继续买单。",
      handoff: "新一任财务BP到岗时，团队已经学会先看他的表情，再决定这次该把哪口气压住。",
    },
  },
  {
    id: "trust_break",
    isFatal: (state) => state.trust <= 0,
    crossed: (prev, next) => prev.trust > 0 && next.trust <= 0,
    severity: (state) => Math.abs(state.trust),
    ending: {
      special: false,
      title: "死于：老板不再信你",
      text: "你不一定每次都错，只是慢慢失去了那个还能把真话送上桌、再把场面接回来的位置。",
      memo: "这个岗位被需要时像心腹，不被需要时也最容易先失去说真话的资格。",
      handoff: "下一任很快到了。大家照旧说这个位置很重要，只是没人再提上一任是怎么离开的。",
    },
  },
  {
    id: "growth_stall",
    isFatal: (state) => state.growth <= 0,
    crossed: (prev, next) => prev.growth > 0 && next.growth <= 0,
    severity: (state) => Math.abs(state.growth),
    ending: {
      special: false,
      title: "死于：增长停摆",
      text: "你把每一次会失控的风险都先接住了，也把整个盘子继续往前冲的劲一并接没了。",
      memo: "当一个岗位被长期用来缓冲矛盾，它迟早会把向前的速度也一起缓冲掉。",
      handoff: "几周后，新人入座。桌上摆着新的目标拆解，话还是那句：先别让场面掉下来。",
    },
  },
  {
    id: "too_close_to_power",
    isFatal: () => false,
    crossed: () => false,
    severity: () => 0,
    ending: null,
  },
  {
    id: "too_safe",
    isFatal: () => false,
    crossed: () => false,
    severity: () => 0,
    ending: null,
  },
];

function pickEnding(prevState, nextState) {
  const active = ENDING_RULES.filter((rule) => rule.ending && rule.isFatal(nextState));
  if (!active.length) return null;

  const newlyCrossed = active.filter((rule) => rule.crossed(prevState, nextState));
  const pool = newlyCrossed.length ? newlyCrossed : active;
  const chosen = [...pool].sort((a, b) => b.severity(nextState) - a.severity(nextState))[0];
  return chosen.ending;
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
    { key: "bossDependency", value: state.hidden.bossDependency },
    { key: "politicalHeat", value: state.hidden.politicalHeat },
  ].sort((a, b) => b.value - a.value);
  const notes = [];
  if (state.hidden.marginHealth < 42) notes.push("你把规模往前推了一步，也把利润质量往后拖了一步。下次追问不会太远。");
  if (state.hidden.executionDebt > 36) notes.push("这一季你解决了不少表面问题，但很多坑只是被往后压。流程和补丁债已经开始自己长大。");
  if (state.hidden.orgFatigue > 40) notes.push("组织已经不是单纯地忙，而是在靠意志力硬撑。再多来几轮，先扛不住的会是人。");
  if (state.hidden.dataMaturity > 52) notes.push("你开始不只是救火，而是在让系统和数据慢慢接手一部分判断。");
  if (state.hidden.customerTrust < 42) notes.push("客户端的损伤已经从感觉变成事实，后面每一步都会更贵。");
  if (state.hidden.riskExposure > 42) notes.push("之前留着以后再说的灰区，已经开始慢慢长成法务和审计会真的来问的东西。");
  if (state.hidden.bossDependency > 40) notes.push("你离权力更近了，但边界也在一起变薄。后面找上门来的，不会再只是需要你支持。");
  if (state.hidden.politicalHeat > 40) notes.push("很多问题开始不只是对错，而是谁来定义、谁来讲、最后又该谁背。");
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

function routeLabel(routeId) {
  return chainRouteConfigs[routeId]?.label || "";
}

function findRouteId({ eventId, flags = [], delayedType, chainId }) {
  const candidates = Object.entries(chainRouteConfigs)
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

function routeTrailText(routeId, history = [], currentLabel = "") {
  if (!routeId) return "";
  const steps = history
    .filter((entry) => entry.routeId === routeId)
    .slice(-2)
    .map((entry) => ledgerEntryLabel(entry))
    .filter(Boolean);
  if (currentLabel) steps.push(currentLabel);
  const deduped = steps.filter((step, index) => steps.indexOf(step) === index);
  const summary = chainRouteConfigs[routeId]?.narrative;
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
  return base;
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
    executionDebt: "那些被你往后压的坑，暂时少了一层",
    orgFatigue: "团队总算没刚才那么硬撑了",
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
    executionDebt: "问题又被你往后压了一层",
    orgFatigue: "团队已经开始靠硬撑顶着了",
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

const delayedStoryOpeners = {
  cash_credit: "前面放出去的账期，现在开始回来收账了",
  supply_inventory: "之前压进去的货，现在开始把仓和现金一起拖住了",
  boss_boundary: "你替老板兜住的那口气，现在开始反过来压你了",
  org_strain: "之前让团队硬扛下去的代价，现在开始一层层冒出来了",
  margin_price: "前面靠低价换来的热闹，现在开始拿利润来还了",
  data_control: "前面靠手工兜住的地方，现在开始自己漏出来了",
  customer_quality: "之前先压下去的质量问题，现在开始从客户端回来了",
};

const delayedStoryOverrides = {
  ad_payback_review: "当时先把量冲起来了，现在回收开始慢慢露底了",
  launch_returns: "首发那天抢到的热闹，现在正一单单从售后里退回来",
  streamer_roi_miss: "镜头前冲上去的数据，现在开始在账上露出原形了",
  promo_margin_gap: "大促那天冲出来的量，现在开始逼你拿利润来补",
  collab_backlash: "那次联名带来的声量过去了，留下来的全是兑现成本",
  affiliate_fraud: "当时看着像新增订单，现在开始有脏流量自己浮上来了",
  receivable_pressure: "你当时放出去的空间，现在全变成挂在账上的钱了",
  supplier_lock: "省下来的那口现金，现在开始从交付上反咬你了",
  payroll_risk: "钱还没真断，消息已经先在组织里传开了",
  bad_debt_writeoff: "那笔当时还想再等等的应收，现在已经等成洞了",
  bridge_loan_interest: "借来的那口气已经缓过去了，利息现在开始按月来收",
  tax_audit_ping: "当时换来的喘息过去了，解释这笔账的人现在还是你",
  settlement_mismatch: "那点你以为还能追回来的差额，现在已经实打实落到账上了",
  expectation_lockin: "那次你想先过关，现在别人已经把它当成默认了",
  backfill_weekend: "借出去的周末开始收不回来了，团队也慢慢记住这件事了",
  public_promise_gap: "当时台上讲得越满，现在台下就越难收",
  boundary_erosion: "你退过一次边界，后面就会有人默认你还会再退",
  investor_question: "当时先把故事撑起来了，现在细节开始一条条追上来了",
  rework_whiplash: "那次为了先过的加工，现在全变成返工重新拍回来了",
  shadow_authority: "当时多接过去的那点权，现在开始连着更模糊的责任一起长出来了",
  capacity_gap: "那个暂时不补的人头，现在已经变成了满地掉的事",
  resignation_wave: "前面几次说再扛一下，现在开始真的有人走了",
  morale_dip: "前面那几次硬顶过去的活，现在开始从情绪上找你还了",
  recruiting_miss: "那个当时没补上的缺口，现在已经从招聘市场上反过来挑你了",
  manager_trust_drop: "那次没讲透的绩效解释过去了，中层现在开始真不信了",
  overtime_backlash: "那几个默认加班的周末过去了，人心现在开始一起往下掉",
  onboarding_slip: "那个没人真接住的新经理，现在开始把磨合成本都摊回来了",
  margin_reckoning: "当时靠低价换来的热闹，现在开始一笔笔从利润里扣回来了",
  fee_spike_followup: "那次你以为能自己扛住的费用变化，现在已经开始改利润结构了",
  repair_cost_creep: "前台先卖出去的轻松，现在开始从返修和售后里慢慢补回来",
  clearance_habit: "那次清仓清掉的不只是库存，还把用户的价格预期一起教坏了",
  rebate_reconciliation: "当时放出去的返点现在开始结算了，黑洞也终于有了名字",
  project_margin_slip: "为了把项目先接住的那一下，现在开始从利润里一点点漏回来",
  price_protection_hit: "你开过一次的口子，现在已经有人默认后面还会继续开",
  inventory_backfire: "那批当时怕来不及的货，现在开始把现金一格格压住了",
  stockout_penalty: "没抢到的货早就过去了，平台和客户的账现在才开始算",
  expedite_cost: "那次花钱买到的速度已经过去了，成本还留在这儿慢慢发作",
  obsolete_writeoff: "以前还能说是卖得慢，现在这笔货已经慢到只能认亏了",
  warehouse_congestion: "那次为了先转开的货，现在开始在仓里自己打结了",
  moq_cash_drag: "单价上省下来的那点，已经全被沉下去的现金吞回去了",
  seasonal_markdown: "那次押窗口的货没等来窗口，只等来了打折出清",
  data_credibility_hit: "前面那些先凑起来的版本，现在开始一起拖垮数字的信用了",
  coupon_addiction: "那张券救了当时的转化，也教会了用户继续等券",
  close_delay: "你当时省下来的那点时间，现在全变成了月结的坑",
  reconciliation_fatigue: "那几次都能补上的手工活，现在开始把节奏一点点拖散了",
  permission_breach: "当时觉得只是放松一点的权限，现在已经长成真的口子了",
  excel_version_sprawl: "先凑着用的几版表，现在已经各自活成了一套真相",
  erp_cutover_noise: "系统是切上去了，但当时没补齐的习惯现在开始全冒头了",
  dashboard_blindspot: "先容忍的半天延迟，现在已经让人开始靠猜做决定了",
  audit_followup: "那次你以为先过门的材料，现在只是换了个房间继续追你",
  blame_sticks: "你当时接过去稳场的那口锅，现在已经开始被写成你的职责了",
  compliance_heat: "那次例外虽然批下来了，但盯着这件事的人现在越来越多了",
  vendor_question: "之前装作看不见的关系，现在终于有人开始认真记了",
  credibility_loss: "那次没说全的话，现在开始一起拖你的信用了",
  white_lie_interest: "那句当时省事的话没有消失，只是现在开始连本带息回来",
  political_heatwave: "那股你以为还能压住的气氛，现在已经热到躲不开了",
  office_romance_escalates: "那段你没处理的关系，已经开始把排班和汇报都卷进来了",
  vendor_dinner_photo: "那顿饭早就吃完了，照片现在才开始替你说话",
  promotion_grievance: "名单虽然已经发了，真正的后账现在才从没上去的人那里开始",
  referral_backfire: "那次看着顺手的人情安排，现在开始被组织按另一本账来算了",
  clique_backlash: "那几个先内部转起来的消息，现在开始让所有协作一起变慢了",
  assistant_overreach_cost: "前面省下来的那点沟通，现在开始用返工和补解释一点点还回来",
  gossip_spread: "那句当时只想私下说的话，现在已经活成了公开版本",
  favor_receipt: "你以为只是通融一次，别人现在已经拿着这张旧条子来排队了",
};

function delayedStoryLine(note) {
  if (!note) return "";
  if (note.type && delayedStoryOverrides[note.type]) return delayedStoryOverrides[note.type];
  const body = singleLine(note.desc || note.title);
  const opener = delayedStoryOpeners[note.routeId] || "前面埋下的那笔后账，现在回来收账了";
  return body ? `${opener}：${body}` : opener;
}

function buildDelayedOutcome(note) {
  if (!note) return null;
  return {
    kind: "delayed",
    role: note.sourceTitle ? `后账 · ${note.sourceTitle}` : "后账",
    avatar: "⏳",
    choiceLabel: "后账追上来了",
    speaker: note.title || "后账",
    quote: eventQuote(note.title || "前面的账，现在回来收了"),
    followup: delayedStoryLine(note),
  };
}

function conciseOutcomeFollowup({ override, highlights, dueNote, routeId }) {
  if (override?.followup) return singleLine(override.followup);
  if (dueNote) return delayedStoryLine(dueNote);
  if (highlights?.length) return singleLine(highlights[0]);
  if (routeId && routeLabel(routeId)) return `这一步把你往${routeLabel(routeId)}又推了一点`;
  return "";
}

function buildChoiceOutcome(event, choice, side, notes = [], projected = null) {
  const override = outcomeOverrides[event.id]?.[side];
  const effect = projected?.effect || choice.effect || {};
  const hidden = projected?.hidden || choice.hidden || {};
  const relations = projected?.relations || choice.relations || {};
  const statHighlights = topDeltaEntries(effect, 2).map(([key, value]) => outcomeFragment("stat", key, value));
  const hiddenHighlights = topDeltaEntries(hidden, 1).map(([key, value]) => outcomeFragment("hidden", key, value));
  const relationHighlights = topDeltaEntries(relations, 1).map(([key, value]) => outcomeFragment("relation", key, value));
  const highlights = [...statHighlights, ...hiddenHighlights, ...relationHighlights].slice(0, 2);

  const directScore = [
    ...Object.values(effect),
    ...Object.values(relations),
  ].reduce((sum, value) => sum + Math.sign(value), 0);
  const hiddenRiskScore = Object.entries(hidden).reduce((sum, [key, value]) => {
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

function sceneTheme(screen, event, ending) {
  if (screen === "ending") {
    if (ending?.special) {
      return {
        appBg: "linear-gradient(180deg, #34242a 0%, #725149 48%, #dcc9b7 100%)",
        frameBg: "linear-gradient(180deg, #f9ede2 0%, #ead8c8 100%)",
        frameBorder: "1px solid rgba(91,45,51,0.10)",
        frameShadow: "0 24px 80px rgba(47,22,28,0.30)",
        overlay: "radial-gradient(circle at top, rgba(255,243,236,0.56), transparent 35%), radial-gradient(circle at bottom, rgba(122,54,62,0.14), transparent 45%)",
        panelBg: "#fff8f2",
        panelBorder: "1px solid rgba(128,67,67,0.10)",
        panelShadow: "0 20px 58px rgba(70,31,34,0.15)",
        boxBg: "#f6e8dd",
        miniBg: "#fcf4eb",
        headerGlow: "linear-gradient(180deg, rgba(145,74,74,0.08), transparent)",
      };
    }
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

function ProgressBar({ label, value, previewValue = value, previewDirection = 0, previewActive = false }) {
  const baseWidth = `${clamp(value)}%`;
  const target = clamp(previewValue);
  const changed = target !== value;
  const deltaWidth = `${Math.abs(target - value)}%`;
  const previewColor = previewDirection >= 0 ? "#22c55e" : "#ff3b30";
  const previewGlow = previewDirection >= 0 ? "rgba(34, 197, 94, 0.55)" : "rgba(255, 59, 48, 0.68)";
  const overlayStyle = changed
    ? previewDirection >= 0
      ? { left: baseWidth, width: deltaWidth }
      : { left: `${target}%`, width: deltaWidth }
    : { left: baseWidth, width: 0 };

  return (
    <div style={{ display: "grid", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#6b7280" }}>
        <span>{label}</span>
      </div>
      <div
        style={{
          height: 8,
          background: "#e5e7eb",
          borderRadius: 999,
          position: "relative",
          overflow: "hidden",
          boxShadow: changed ? `0 0 0 1px rgba(17, 24, 39, 0.03), 0 0 14px ${previewGlow}` : "none",
        }}
      >
        <motion.div
          style={{ height: "100%", borderRadius: 999, background: "#111827", position: "absolute", left: 0, top: 0 }}
          animate={{ width: baseWidth }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
        />
        {changed && (
          <motion.div
            style={{
              height: "100%",
              borderRadius: 999,
              background: previewColor,
              position: "absolute",
              top: 0,
              boxShadow: `0 0 16px ${previewGlow}`,
              ...overlayStyle,
            }}
            animate={
              previewActive
                ? { opacity: [0.62, 1, 0.62], scaleY: [1, 1.18, 1] }
                : { opacity: 0.92, scaleY: 1.08 }
            }
            transition={
              previewActive
                ? { duration: 0.72, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.12 }
            }
          />
        )}
      </div>
    </div>
  );
}

function SwipeCard({ event, onChoose, onPreviewChange }) {
  const x = useMotionValue(0);
  const previewThreshold = 18;
  const rotate = useTransform(x, [-180, 180], [-11, 11]);
  const leftOpacity = useTransform(x, [-180, -70, -18, 0], [1, 0.88, 0.28, 0]);
  const rightOpacity = useTransform(x, [0, 18, 70, 180], [0, 0.28, 0.88, 1]);
  const leftLift = useTransform(x, [-180, -70, -18, 0], [-5, -2, 0, 4]);
  const rightLift = useTransform(x, [0, 18, 70, 180], [4, 0, -2, -5]);
  const leftScale = useTransform(x, [-180, -70, -18, 0], [1.08, 1.03, 0.98, 0.94]);
  const rightScale = useTransform(x, [0, 18, 70, 180], [0.94, 0.98, 1.03, 1.08]);

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      const distance = Math.abs(latest);
      if (distance < previewThreshold) {
        onPreviewChange?.(null);
        return;
      }
      onPreviewChange?.({
        side: latest < 0 ? "left" : "right",
      });
    });
    return () => {
      unsubscribe?.();
      onPreviewChange?.(null);
    };
  }, [x, onPreviewChange]);

  const handleEnd = async (_, info) => {
    if (info.offset.x < -92) {
      await animate(x, -420, { duration: 0.18 });
      onPreviewChange?.(null);
      onChoose("left");
    } else if (info.offset.x > 92) {
      await animate(x, 420, { duration: 0.18 });
      onPreviewChange?.(null);
      onChoose("right");
    } else {
      onPreviewChange?.(null);
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
        dragElastic={0.56}
        dragMomentum={false}
        onDragEnd={handleEnd}
        style={{ x, rotate, zIndex: 2, width: "min(100%, 268px)", minHeight: "clamp(268px, 38vh, 320px)", borderRadius: 32, background: chainTone.background, border: chainTone.border, boxShadow: chainTone.boxShadow, padding: "clamp(22px, 3.8vw, 28px)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden", cursor: "grab", touchAction: "pan-y" }}
      >
        <div style={{ position: "absolute", inset: 0, background: chainTone.halo }} />
        <div style={{ position: "relative", width: "100%", display: "grid", gap: 16, justifyItems: "center", flex: 1 }}>
          <div style={{ position: "relative", width: "100%", minHeight: 64, display: "grid", placeItems: "center", marginTop: 6 }}>
            <motion.div style={{ opacity: leftOpacity, y: leftLift, scale: leftScale, position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", color: "#0f766e", fontSize: "clamp(20px, 5vw, 26px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "0.01em", fontFamily: '"Iowan Old Style", "Georgia", serif' }}>
              {event.left.label}
            </motion.div>
            <motion.div style={{ opacity: rightOpacity, y: rightLift, scale: rightScale, position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", color: "#be123c", fontSize: "clamp(20px, 5vw, 26px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "0.01em", fontFamily: '"Iowan Old Style", "Georgia", serif' }}>
              {event.right.label}
            </motion.div>
          </div>
          <div style={{ position: "relative", display: "grid", justifyItems: "center", alignSelf: "end", marginTop: "auto", paddingBottom: 8 }}>
            <div style={{ fontSize: "clamp(84px, 12.5vh, 108px)", lineHeight: 1 }}>{event.avatar}</div>
          </div>
        </div>
        <div style={{ position: "relative", width: "100%", display: "grid", gap: 10, justifyItems: "center" }}>
          <div style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.18em", textTransform: "uppercase" }}>左右滑动选择</div>
        </div>
      </motion.div>
    </div>
  );
}

function OutcomeCard({ outcome }) {
  const isDelayed = outcome.kind === "delayed";
  return (
    <div style={{ width: "100%", maxWidth: 340, display: "grid", justifyItems: "center", gap: 14 }}>
      <div style={{ width: "min(100%, 268px)", minHeight: "clamp(220px, 30vh, 250px)", borderRadius: 32, background: isDelayed ? "#fff8f5" : "#fffdf8", border: isDelayed ? "1px solid rgba(172,86,89,0.10)" : "1px solid rgba(0,0,0,0.05)", boxShadow: isDelayed ? "0 18px 52px rgba(120,55,63,0.14)" : "0 18px 50px rgba(0,0,0,0.12)", padding: "clamp(22px, 3.8vw, 28px)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: isDelayed ? "radial-gradient(circle at top, rgba(255,231,226,0.84), transparent 44%)" : "radial-gradient(circle at top, rgba(245,231,215,0.8), transparent 44%)" }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={isDelayed ? delayedMetaStyle : alertMetaStyle}>{isDelayed ? "后账" : "结果"}</span>
          <span style={eventMetaStyle}>{outcome.choiceLabel}</span>
        </div>
        <div style={{ position: "relative", display: "grid", justifyItems: "center", gap: 12 }}>
          <div style={{ fontSize: "clamp(84px, 12.5vh, 108px)", lineHeight: 1 }}>{outcome.avatar}</div>
        </div>
        <div style={{ height: 12 }} />
      </div>
      <div style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.08em" }}>点击任意位置继续</div>
    </div>
  );
}

function BriefingCard({ onStart }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 0, 160], [-10, 0, 10]);
  const glow = useTransform(x, [-140, 0, 140], ["rgba(15,118,110,0.08)", "rgba(255,255,255,0.72)", "rgba(190,24,93,0.08)"]);
  const startedRef = useRef(false);
  const startThreshold = 76;

  const handleEnd = (_, info) => {
    const distance = info.offset.x;
    if (Math.abs(distance) > startThreshold) {
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
        dragElastic={0.56}
        dragMomentum={false}
        onDragEnd={handleEnd}
        style={{ x, rotate, width: "min(100%, 360px)", display: "grid", gap: 18, padding: "28px 26px", borderRadius: 32, background: glow, border: "1px solid rgba(159,107,79,0.12)", boxShadow: "0 24px 70px rgba(61,41,26,0.08)", backdropFilter: "blur(10px)", cursor: "grab", touchAction: "pan-y" }}
      >
        <div style={briefingEyebrowStyle}>游戏提示</div>
        <div style={briefingTitleStyle}>这是一款财务BP职场生存模拟游戏</div>
        <div style={briefingBodyStyle}>
          <p style={briefingParagraphStyle}>你要处理的，不只是增长、现金和团队，还有那些没人想当场接住的冲突、场面和代价。</p>
          <p style={briefingParagraphStyle}>很多选择没有正确答案，只有取舍。你做的每个决定，不只影响当下，也会在未来带来意想不到的变化。</p>
          <p style={{ ...briefingParagraphStyle, color: "#2f241e", fontWeight: 700 }}>而你能做的，只有拼命维持那一点脆弱的平衡。</p>
        </div>
      </motion.div>
      <div style={briefingHintStyle}>左右滑动以开始游戏</div>
    </div>
  );
}

function App() {
  const [state, setState] = useState(() => scenarioToState());
  const [soundOn, setSoundOn] = useState(true);
  const [openingScreen, setOpeningScreen] = useState("producer");
  const [previewChoice, setPreviewChoice] = useState(null);
  const audioRef = useRef(null);
  const prevSceneRef = useRef({ screen: state.screen, eventId: null });

  const currentEvent = useMemo(() => chooseEvent(state), [state]);
  const annualSummary = useMemo(() => buildQuarterSummary(state), [state]);
  const persona = useMemo(() => choosePersona(state), [state]);
  const currentSpeech = useMemo(() => currentEvent.priority ? chainSpeech(currentEvent, state) : eventSpeech(currentEvent), [currentEvent, state]);
  const resultQueue = state.memory.resultQueue || [];
  const resultIndex = state.memory.resultIndex || 0;
  const latestOutcome = resultQueue[resultIndex] || state.memory.latestOutcome;
  const theme = useMemo(() => sceneTheme(state.screen, currentEvent, state.ending), [state.screen, currentEvent, state.ending]);
  const surfacePanelStyle = useMemo(() => ({ ...panelStyle, background: theme.panelBg, border: theme.panelBorder, boxShadow: theme.panelShadow }), [theme]);
  const surfaceBoxStyle = useMemo(() => ({ ...boxedStyle, background: theme.boxBg }), [theme]);
  const surfaceMiniCardStyle = useMemo(() => ({ ...miniCardStyle, background: theme.miniBg }), [theme]);
  const surfaceStatusPillStyle = useMemo(() => ({ ...statusPillStyle, background: theme.miniBg }), [theme]);
  const statPreview = useMemo(() => {
    if (state.screen !== "event" || !previewChoice?.side) {
      return Object.fromEntries(STAT_KEYS.map((key) => [key, { value: state[key], previewValue: state[key], direction: 0, active: false }]));
    }
    const choice = currentEvent?.[previewChoice.side];
    if (!choice) {
      return Object.fromEntries(STAT_KEYS.map((key) => [key, { value: state[key], previewValue: state[key], direction: 0, active: false }]));
    }
    const projected = projectChoiceDeltas(currentEvent, choice, state);
    return Object.fromEntries(
      STAT_KEYS.map((key) => {
        const delta = projected.effect[key] || 0;
        const previewValue = clamp(state[key] + delta);
        return [key, { value: state[key], previewValue, direction: Math.sign(delta), active: delta !== 0 }];
      }),
    );
  }, [state, currentEvent, previewChoice]);

  useEffect(() => {
    if (openingScreen !== "producer") return undefined;
    const timer = window.setTimeout(() => {
      setOpeningScreen("brief");
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [openingScreen]);

  useEffect(() => {
    if (state.screen !== "event") setPreviewChoice(null);
  }, [state.screen, currentEvent?.id]);

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

  const restart = () => setState(scenarioToState());
  const startFromBriefing = (direction) => {
    playUiSound(audioRef, direction === "left" ? "swipeLeft" : "swipeRight", soundOn);
    setOpeningScreen(null);
  };

  const advance = (nextState) => {
    const ending = pickEnding(state, nextState);
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
    const queue = state.memory.resultQueue || [];
    const index = state.memory.resultIndex || 0;
    if (index < queue.length - 1) {
      setState((s) => ({
        ...s,
        memory: {
          ...s.memory,
          resultIndex: (s.memory.resultIndex || 0) + 1,
        },
      }));
      return;
    }
    const pending = state.memory.pendingTransition;
    if (!pending) {
      setState((s) => ({
        ...s,
        screen: "event",
        memory: {
          ...s.memory,
          resultQueue: [],
          resultIndex: 0,
        },
      }));
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
        resultQueue: [],
        resultIndex: 0,
        pendingTransition: null,
      },
    }));
  };

  const applyChoice = (side) => {
    setPreviewChoice(null);
    const choice = currentEvent[side];
    playUiSound(audioRef, side === "left" ? "swipeLeft" : "swipeRight", soundOn);
    const routeId = findRouteId({ eventId: currentEvent.id, flags: choice.flags || [] });
    const projected = projectChoiceDeltas(currentEvent, choice, state);
    const scaledEffect = projected.effect;
    const scaledHidden = projected.hidden;
    const scaledRelations = projected.relations;
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
        recentKinds: pushRecentHistory(state.memory.recentKinds, [currentEvent.storyArc ? "story" : currentEvent.priority ? "chain" : "base"], 3),
        recentStoryArcs: currentEvent.storyArc
          ? pushRecentHistory(state.memory.recentStoryArcs, [currentEvent.storyArc], 4)
          : state.memory.recentStoryArcs,
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
        latestOutcome: buildChoiceOutcome(currentEvent, choice, side, [], projected),
        resultQueue: [
          buildChoiceOutcome(currentEvent, choice, side, [], projected),
          ...(notes.length ? [buildDelayedOutcome(notes[0])].filter(Boolean) : []),
        ],
        resultIndex: 0,
      },
    };
    advance(next);
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
              <motion.button
                whileTap={{ scale: 0.92, y: 1 }}
                transition={{ duration: 0.08 }}
                onClick={() => setSoundOn((value) => !value)}
                style={iconBtnStyle}
                title={soundOn ? "关闭音效" : "开启音效"}
              >
                {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92, y: 1 }}
                transition={{ duration: 0.08 }}
                onClick={restart}
                style={iconBtnStyle}
                title="随机重开"
              >
                <RotateCcw size={16} />
              </motion.button>
            </div>
          </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {STAT_KEYS.map((key) => (
              <ProgressBar
                key={key}
                label={statLabel(key)}
                value={statPreview[key].value}
                previewValue={statPreview[key].previewValue}
                previewDirection={statPreview[key].direction}
                previewActive={statPreview[key].active && state.screen === "event"}
              />
            ))}
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
                  <SwipeCard event={currentEvent} onChoose={applyChoice} onPreviewChange={setPreviewChoice} />
                </motion.div>
              )}

              {state.screen === "result" && latestOutcome && (
                <motion.div
                  key={`result_${state.round}_${latestOutcome.choiceLabel}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onClick={continueFromResult}
                  style={{
                    width: "100%",
                    display: "grid",
                    justifyItems: "center",
                    gap: 14,
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                    userSelect: "none",
                  }}
                >
                  <div style={{ width: "100%", maxWidth: 360, textAlign: "center", display: "grid", gap: 10 }}>
                    <div style={speechRoleStyle}>{latestOutcome.speaker}</div>
                    <div style={speechQuoteStyle}>{latestOutcome.quote}</div>
                    <p style={speechDescStyle}>{latestOutcome.followup}</p>
                  </div>
                  <OutcomeCard outcome={latestOutcome} />
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
                <motion.div key={`ending_${state.round}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ ...surfacePanelStyle, maxWidth: 352, paddingTop: 22, paddingBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                    <Skull size={52} color={state.ending.special ? "#8e4b4a" : undefined} />
                  </div>
                  <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: state.ending.special ? "#8e4b4a" : "#9f6b4f" }}>
                    结局
                  </div>
                  <h2 style={titleStyle}>{state.ending.title}</h2>
                  <p style={descStyle}>{state.ending.text}</p>
                  <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7, color: state.ending.special ? "#75514c" : "#6b7280", textAlign: "center" }}>{state.ending.memo}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8, textAlign: "center" }}>你活到了第 {state.round} 轮</div>
                  <div style={{ ...surfaceBoxStyle, marginTop: 12, textAlign: "center", padding: "14px 16px", background: state.ending.special ? "linear-gradient(180deg, #f6e8dd 0%, #f1dfd3 100%)" : surfaceBoxStyle.background, border: state.ending.special ? "1px solid rgba(128,67,67,0.10)" : surfaceBoxStyle.border }}>
                    <div style={{ fontSize: 14, lineHeight: 1.8, color: "#4b5563" }}>{state.ending.handoff}</div>
                  </div>
                  <button onClick={restart} style={{ ...primaryBtnStyle, marginTop: 12 }}>工作交接</button>
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
const delayedMetaStyle = { ...eventMetaStyle, background: "#fbe9e4", color: "#9f4f4b" };
const speechCauseStyle = { justifySelf: "center", maxWidth: 336, padding: "8px 12px", borderRadius: 16, background: "#fbf7ef", border: "1px solid rgba(159,107,79,0.14)", fontSize: 12, lineHeight: 1.55, color: "#8a5d45", fontFamily: '"Iowan Old Style", "Georgia", serif' };
const speechTrailStyle = { justifySelf: "center", maxWidth: 336, fontSize: 11, lineHeight: 1.55, color: "#9f6b4f", letterSpacing: "0.02em", fontFamily: '"Iowan Old Style", "Georgia", serif' };
const speechRoleStyle = { fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9f6b4f" };
const speechQuoteStyle = { fontSize: "clamp(24px, 6vw, 30px)", lineHeight: 1.24, fontWeight: 900, color: "#111827", textWrap: "balance", fontFamily: '"Iowan Old Style", "Georgia", serif' };
const speechDescStyle = { margin: 0, fontSize: "clamp(14px, 4vw, 16px)", lineHeight: 1.75, color: "#4b5563", maxWidth: 330, fontFamily: '"Iowan Old Style", "Georgia", serif' };
const primaryBtnStyle = { marginTop: 16, height: 52, border: 0, borderRadius: 22, background: "#111827", color: "white", fontWeight: 800, cursor: "pointer" };
const secondaryBtnStyle = { height: 46, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, background: "white", color: "#111827", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 };
const iconBtnStyle = {
  width: 36,
  height: 36,
  borderRadius: 999,
  border: "1px solid rgba(0,0,0,0.06)",
  background: "white",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(17,24,39,0.06)",
  WebkitTapHighlightColor: "transparent",
  userSelect: "none",
};
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
