export const scenarios = [
  {
    id: "rocket",
    label: "高增长低现金",
    intro: "生意看着很热，但现金已经开始喘。",
    stats: { growth: 64, cash: 40, team: 54, trust: 53 },
    hidden: { marginHealth: 43, executionDebt: 26, orgFatigue: 28, dataMaturity: 32, customerTrust: 56, riskExposure: 28, bossDependency: 25, politicalHeat: 20 },
  },
  {
    id: "steady",
    label: "稳健盈利盘",
    intro: "钱和利润都还行，但窗口期未必等人。",
    stats: { growth: 46, cash: 64, team: 58, trust: 52 },
    hidden: { marginHealth: 63, executionDebt: 14, orgFatigue: 20, dataMaturity: 36, customerTrust: 58, riskExposure: 16, bossDependency: 20, politicalHeat: 16 },
  },
  {
    id: "fragile-team",
    label: "团队脆弱盘",
    intro: "业务能跑，但人已经开始虚了。",
    stats: { growth: 50, cash: 56, team: 42, trust: 51 },
    hidden: { marginHealth: 55, executionDebt: 24, orgFatigue: 42, dataMaturity: 28, customerTrust: 54, riskExposure: 19, bossDependency: 22, politicalHeat: 21 },
  },
  {
    id: "boss-driven",
    label: "老板强控盘",
    intro: "老板很信你，但也开始越来越依赖你。",
    stats: { growth: 53, cash: 54, team: 55, trust: 65 },
    hidden: { marginHealth: 50, executionDebt: 20, orgFatigue: 23, dataMaturity: 30, customerTrust: 55, riskExposure: 18, bossDependency: 44, politicalHeat: 28 },
  },
  {
    id: "messy-system",
    label: "系统混乱盘",
    intro: "规模不小，但数据和流程还很原始。",
    stats: { growth: 55, cash: 52, team: 57, trust: 49 },
    hidden: { marginHealth: 51, executionDebt: 33, orgFatigue: 24, dataMaturity: 18, customerTrust: 53, riskExposure: 24, bossDependency: 21, politicalHeat: 18 },
  },
];

export const initialRelations = { boss: 52, sales: 48, hr: 55, ops: 50, finance: 60, legal: 45 };
