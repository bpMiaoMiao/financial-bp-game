export const scenarios = [
  {
    id: "rocket",
    label: "高增长低现金",
    intro: "生意看着很热，但现金已经开始喘。",
    stats: { growth: 62, cash: 34, team: 50, trust: 50 },
    hidden: { marginHealth: 40, executionDebt: 30, orgFatigue: 31, dataMaturity: 30, customerTrust: 54, riskExposure: 34, bossDependency: 28, politicalHeat: 23 },
  },
  {
    id: "steady",
    label: "稳健盈利盘",
    intro: "钱和利润都还行，但窗口期未必等人。",
    stats: { growth: 42, cash: 58, team: 54, trust: 49 },
    hidden: { marginHealth: 58, executionDebt: 18, orgFatigue: 24, dataMaturity: 34, customerTrust: 56, riskExposure: 21, bossDependency: 24, politicalHeat: 19 },
  },
  {
    id: "fragile-team",
    label: "团队脆弱盘",
    intro: "业务能跑，但人已经开始虚了。",
    stats: { growth: 48, cash: 52, team: 36, trust: 48 },
    hidden: { marginHealth: 52, executionDebt: 28, orgFatigue: 48, dataMaturity: 26, customerTrust: 52, riskExposure: 24, bossDependency: 25, politicalHeat: 24 },
  },
  {
    id: "boss-driven",
    label: "老板强控盘",
    intro: "老板很信你，但也开始越来越依赖你。",
    stats: { growth: 51, cash: 50, team: 52, trust: 61 },
    hidden: { marginHealth: 47, executionDebt: 24, orgFatigue: 27, dataMaturity: 28, customerTrust: 53, riskExposure: 22, bossDependency: 50, politicalHeat: 32 },
  },
  {
    id: "messy-system",
    label: "系统混乱盘",
    intro: "规模不小，但数据和流程还很原始。",
    stats: { growth: 52, cash: 48, team: 53, trust: 46 },
    hidden: { marginHealth: 48, executionDebt: 38, orgFatigue: 28, dataMaturity: 14, customerTrust: 51, riskExposure: 29, bossDependency: 24, politicalHeat: 21 },
  },
];

export const initialRelations = { boss: 52, sales: 48, hr: 55, ops: 50, finance: 60, legal: 45 };
