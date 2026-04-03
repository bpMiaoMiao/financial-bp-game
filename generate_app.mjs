import fs from "node:fs";

const appPath = "/Users/wuke/Desktop/codex/reigns_bp_v3/src/App.jsx";
const source = fs.readFileSync(appPath, "utf8");

const E = ["early"];
const EM = ["early", "mid"];
const M = ["mid"];
const ML = ["mid", "late"];
const L = ["late"];
const ALL = ["early", "mid", "late"];

const sched = (after, type) => [{ after, type }];
const choice = (label, effect = {}, hidden = {}, relations = {}, flags = [], schedule = []) => ({ label, effect, hidden, relations, flags, schedule });
const base = (id, phase, weight, role, avatar, title, desc, tags, left, right, conditions = null) => ({ id, phase, weight, role, avatar, title, desc, tags, pack: tags[0], left, right, ...(conditions ? { conditions } : {}) });
const chain = (id, priority, role, avatar, title, desc, conditions, left, right) => ({ id, priority, role, avatar, title, desc, conditions, left, right });
const delay = (title, desc, effect = {}, hidden = {}, relations = {}) => ({ title, desc, effect, hidden, relations });

const growthPush = (label, flags = [], schedule = []) => choice(label, { growth: 11, cash: -12, trust: 2 }, { executionDebt: 3, marginHealth: -4 }, { sales: 3, boss: 1 }, flags, schedule);
const growthGuard = (label, flags = [], schedule = []) => choice(label, { cash: 6, growth: -6, trust: -1 }, { marginHealth: 2 }, { finance: 2, sales: -2 }, flags, schedule);
const growthBrand = (label, flags = [], schedule = []) => choice(label, { growth: 8, cash: -8, trust: 3 }, { customerTrust: 2, marginHealth: -2 }, { sales: 2, boss: 2 }, flags, schedule);
const growthFocus = (label, flags = [], schedule = []) => choice(label, { cash: 4, growth: -3, trust: 1, team: 1 }, { dataMaturity: 1, marginHealth: 2 }, { finance: 1, ops: 1 }, flags, schedule);

const cashRelease = (label, flags = [], schedule = []) => choice(label, { growth: 8, cash: -14, trust: 1 }, { riskExposure: 6, executionDebt: 2 }, { sales: 3, finance: -2 }, flags, schedule);
const cashProtect = (label, flags = [], schedule = []) => choice(label, { cash: 10, growth: -7, trust: -1 }, { marginHealth: 2, riskExposure: -1 }, { finance: 3, sales: -3 }, flags, schedule);
const cashBorrow = (label, flags = [], schedule = []) => choice(label, { cash: 14, trust: 1 }, { riskExposure: 5, bossDependency: 2 }, { boss: 2, finance: -1 }, flags, schedule);
const cashDiscipline = (label, flags = [], schedule = []) => choice(label, { cash: 8, team: -3, trust: -1 }, { orgFatigue: 2, executionDebt: 1 }, { finance: 2, hr: -1 }, flags, schedule);

const bossComply = (label, flags = [], schedule = []) => choice(label, { trust: 7, team: -3 }, { executionDebt: 3, bossDependency: 5 }, { boss: 6, finance: -2 }, flags, schedule);
const bossPushback = (label, flags = [], schedule = []) => choice(label, { trust: -4, team: 2 }, { dataMaturity: 3, bossDependency: -1 }, { boss: -4, finance: 3 }, flags, schedule);
const bossBack = (label, flags = [], schedule = []) => choice(label, { trust: 4, growth: 2, team: -1 }, { politicalHeat: 2, bossDependency: 3 }, { boss: 3, sales: 1 }, flags, schedule);
const bossBoundary = (label, flags = [], schedule = []) => choice(label, { trust: -3, team: 4 }, { politicalHeat: -2, bossDependency: -4 }, { boss: -3, hr: 1 }, flags, schedule);

const orgProtect = (label, flags = [], schedule = []) => choice(label, { team: 10, cash: -8, trust: 1 }, { orgFatigue: -6, executionDebt: -2 }, { hr: 3, finance: 2 }, flags, schedule);
const orgSqueeze = (label, flags = [], schedule = []) => choice(label, { cash: 7, team: -9 }, { orgFatigue: 8, executionDebt: 4 }, { hr: -4, finance: -2 }, flags, schedule);
const orgInvest = (label, flags = [], schedule = []) => choice(label, { team: 6, cash: -5, growth: 3 }, { dataMaturity: 2, orgFatigue: -2 }, { hr: 2, ops: 2 }, flags, schedule);
const orgDelay = (label, flags = [], schedule = []) => choice(label, { cash: 4, team: -4, growth: -2 }, { orgFatigue: 3 }, { hr: -2, ops: -1 }, flags, schedule);

const marginTrade = (label, flags = [], schedule = []) => choice(label, { growth: 9, cash: -5 }, { marginHealth: -8, customerTrust: -2 }, { sales: 2, finance: -1 }, flags, schedule);
const marginHold = (label, flags = [], schedule = []) => choice(label, { cash: 6, growth: -5, trust: 1 }, { marginHealth: 6 }, { finance: 3, sales: -2 }, flags, schedule);
const marginPremium = (label, flags = [], schedule = []) => choice(label, { growth: 4, cash: 4, trust: 2 }, { customerTrust: 3, marginHealth: 4 }, { sales: 1, finance: 2 }, flags, schedule);
const marginClear = (label, flags = [], schedule = []) => choice(label, { cash: 8, growth: -3 }, { marginHealth: -4, customerTrust: -1 }, { ops: 1, finance: 1 }, flags, schedule);

const inventoryLoad = (label, flags = [], schedule = []) => choice(label, { growth: 7, cash: -10 }, { riskExposure: 4, executionDebt: 3 }, { ops: 3, sales: 1 }, flags, schedule);
const inventoryLean = (label, flags = [], schedule = []) => choice(label, { cash: 6, growth: -4 }, { marginHealth: 2 }, { ops: -2, finance: 1 }, flags, schedule);
const inventoryRush = (label, flags = [], schedule = []) => choice(label, { growth: 6, cash: -7, team: -1 }, { orgFatigue: 3, riskExposure: 2 }, { ops: 2 }, flags, schedule);
const inventoryReset = (label, flags = [], schedule = []) => choice(label, { cash: -2, team: 2, trust: 1 }, { dataMaturity: 3, riskExposure: -2 }, { ops: 2, finance: 1 }, flags, schedule);

const dataBuild = (label, flags = [], schedule = []) => choice(label, { team: 4, trust: 3, cash: -7 }, { dataMaturity: 10, executionDebt: -4, orgFatigue: -1 }, { ops: 2, finance: 3, boss: 1 }, flags, schedule);
const dataPatch = (label, flags = [], schedule = []) => choice(label, { cash: 4, team: -3 }, { executionDebt: 6, dataMaturity: -2 }, { ops: -2, finance: -1 }, flags, schedule);
const dataAlign = (label, flags = [], schedule = []) => choice(label, { trust: 4, team: -2 }, { dataMaturity: 6, politicalHeat: 2 }, { finance: 3, sales: -1 }, flags, schedule);
const dataSkip = (label, flags = [], schedule = []) => choice(label, { trust: -4, growth: 1 }, { executionDebt: 4, politicalHeat: 4, dataMaturity: -3 }, { finance: -3, sales: 1 }, flags, schedule);

const politicsShield = (label, flags = [], schedule = []) => choice(label, { trust: 3, team: -2, cash: -3 }, { politicalHeat: 6, riskExposure: -1 }, { boss: 2, legal: 2, sales: -2 }, flags, schedule);
const politicsBlend = (label, flags = [], schedule = []) => choice(label, { cash: 2, growth: 2, trust: -3 }, { politicalHeat: 4, riskExposure: 3 }, { boss: 1, sales: 1, legal: -2 }, flags, schedule);
const politicsSpeak = (label, flags = [], schedule = []) => choice(label, { trust: -1, team: 1 }, { dataMaturity: 3, politicalHeat: 5 }, { finance: 2, legal: 2, boss: -1 }, flags, schedule);
const politicsDuck = (label, flags = [], schedule = []) => choice(label, { cash: 3, trust: -4 }, { politicalHeat: 2, bossDependency: 2 }, { boss: 1, finance: -2, legal: -1 }, flags, schedule);

const baseEvents = [
  base("marketing_budget", EM, 8, "电商负责人", "📣", "要加投吗？", "再投 80 万，榜单和转化都有机会冲一把。", ["增长", "现金"], growthPush("批", ["push_growth"], sched(3, "ad_payback_review")), growthGuard("不批", ["guard_roi"])),
  base("flagship_launch", EM, 7, "商品负责人", "🚀", "新爆品要提前发吗？", "供应链还没完全稳，但市场窗口只剩两周。", ["增长", "库存"], growthBrand("提前发", ["flagship_launch"], sched(3, "launch_returns")), growthFocus("再磨一轮", ["launch_delay"])),
  base("live_stream_push", ALL, 7, "直播负责人", "🎥", "主播场次加到双倍？", "坑位费和投流要一起加，老板盯着下周 GMV。", ["增长", "现金"], growthPush("加场", ["live_stream_push"], sched(2, "streamer_roi_miss")), growthGuard("控制节奏", ["stream_control"])),
  base("festival_promo", EM, 8, "渠道经理", "🎉", "大促要不要再压一轮价？", "平台说冲榜就给流量位，但价盘会更难看。", ["增长", "利润质量"], marginTrade("压价冲", ["festival_promo"], sched(3, "promo_margin_gap")), marginHold("稳价格", ["protect_price"])),
  base("celebrity_collab", ML, 6, "品牌经理", "🌟", "要签明星联名吗？", "声量会很大，但成本和履约要求都不低。", ["增长", "客户"], growthBrand("签", ["celebrity_collab"], sched(4, "collab_backlash")), growthFocus("不签", ["brand_focus"])),
  base("affiliate_bounty", EM, 6, "渠道运营", "🧲", "分销激励翻倍？", "短期很可能把单量拽起来，但羊毛党也会跟着进来。", ["增长", "风险"], growthPush("翻倍", ["affiliate_bounty"], sched(3, "affiliate_fraud")), growthGuard("维持", ["keep_commission"])),
  base("marketplace_coupon", ALL, 7, "平台运营", "🧾", "平台券要不要跟？", "同行都在补贴，流量入口看起来越来越贵。", ["增长", "利润质量"], marginTrade("跟券", ["marketplace_coupon"], sched(3, "coupon_addiction")), marginHold("不跟", ["protect_margin"])),
  base("new_sku_rush", EM, 7, "商品企划", "🆕", "一口气上 12 个新 SKU？", "销售说多点试错才能找到下一个爆品。", ["增长", "库存"], growthPush("上", ["new_sku_rush"]), growthFocus("压缩到 4 个", ["focus_sku"])),
  base("gmv_target", ALL, 7, "老板", "📈", "这个月 GMV 要翻红", "老板把目标写进了全员群，没人想第一个泼冷水。", ["增长", "老板"], bossBack("我来拆解", ["gmv_target"]), bossBoundary("目标先校准", ["target_pushback"])),
  base("conversion_sprint", E, 6, "增长经理", "⚡", "要不要搞一周转化冲刺？", "页面、优惠、客服都得一起顶，团队会很累。", ["增长", "团队"], growthPush("冲", ["conversion_sprint"]), orgProtect("先补资源", ["stabilize_before_sprint"])),
  base("cross_border_test", ML, 5, "国际业务", "🌍", "试水跨境渠道？", "机会不错，但税务、履约和退货都还没跑通。", ["增长", "风险"], growthBrand("试", ["cross_border_test"]), growthFocus("先做沙盘", ["cross_border_model"])),
  base("regional_expansion", ML, 6, "区域负责人", "🗺️", "要不要开新区域？", "新大区能拉增长，但地推和服务体系都得跟上。", ["增长", "团队"], growthPush("开", ["regional_expansion"]), growthFocus("先守老区", ["defend_core_region"])),
  base("bundle_offer", ALL, 6, "电商运营", "🎁", "做组合装冲转化？", "客单价会上去，但毛利结构会更复杂。", ["增长", "利润质量"], marginTrade("上组合", ["bundle_offer"]), marginPremium("做高配版", ["premium_bundle"])),
  base("sample_giveaway", E, 5, "市场经理", "🧪", "免费试用要不要扩？", "获取线索很快，但无效线索比例也不低。", ["增长", "客户"], growthBrand("扩", ["sample_giveaway"]), growthGuard("控量", ["sample_filter"])),
  base("flash_sale_slot", ML, 6, "平台小二", "⏰", "临时秒杀坑位来了", "今天拍板，明天就得备货和改价。", ["增长", "库存"], inventoryRush("接", ["flash_sale_slot"]), inventoryLean("不接", ["skip_flash_sale"])),

  base("long_terms", EM, 7, "销售总监", "🤝", "给 120 天账期？", "大客户想要更长账期，不给，订单可能掉。", ["现金", "销售"], cashRelease("给", ["long_terms"], sched(4, "receivable_pressure")), cashProtect("不给", ["protect_cash"])),
  base("advance_payment", E, 6, "采购经理", "💰", "供应商要 30% 预付款", "不给就不排产，给了现金马上紧一口。", ["现金", "库存"], inventoryLoad("给", ["advance_payment"]), cashProtect("不给", ["supplier_hold"])),
  base("supplier_pressure", EM, 7, "供应链总监", "🏭", "先把货款结掉？", "几家核心供应商已经开始催，态度越来越硬。", ["现金", "风险"], cashProtect("先结一部分", ["supplier_pressure"], sched(3, "supplier_lock")), cashDiscipline("再压一压", ["delay_supplier_payment"])),
  base("payroll_warning", ML, 7, "财务经理", "💸", "下月发薪有点危险", "账上钱够付，但一付完几乎没有安全垫。", ["现金", "团队"], cashBorrow("先备钱", ["payroll_watch"], sched(2, "payroll_risk")), cashDiscipline("先控支出", ["tight_budget"])),
  base("bad_debt_signal", ML, 6, "应收主管", "🧾", "有客户开始拖着不回款", "业务还说对方关系不错，但账龄已经过线。", ["现金", "风险"], cashProtect("立刻催收", ["bad_debt_signal"], sched(3, "bad_debt_writeoff")), cashRelease("再给点时间", ["soft_collection"])),
  base("collection_team", M, 5, "法务顾问", "⚖️", "要不要让法务介入催收？", "一旦发函，销售关系会明显受伤。", ["现金", "合规"], cashProtect("介入", ["legal_collection"]), cashRelease("销售自己谈", ["sales_collection"])),
  base("bridge_loan", ML, 6, "老板", "🏦", "先上过桥贷款？", "成本不好看，但能把下个季度先挺过去。", ["现金", "老板"], cashBorrow("先借", ["bridge_loan"], sched(4, "bridge_loan_interest")), cashDiscipline("不借", ["avoid_loan"])),
  base("deposit_negotiation", E, 5, "大客户经理", "📜", "预收定金能不能谈？", "对方如果接受，现金会很漂亮，但订单弹性会下降。", ["现金", "销售"], cashProtect("去谈", ["deposit_negotiation"]), cashRelease("先让利拿单", ["order_first"])),
  base("prepay_inventory", EM, 6, "计划经理", "📦", "预付锁一批原料？", "价格看着要涨，现在锁能省后面很多麻烦。", ["现金", "库存"], inventoryLoad("锁", ["prepay_inventory"]), cashProtect("先观望", ["wait_material_price"])),
  base("tax_payment", ML, 6, "税务经理", "🧮", "税款能不能缓一缓？", "缓缴能喘口气，但后面监管压力会跟上。", ["现金", "合规"], cashBorrow("申请缓缴", ["tax_payment"], sched(4, "tax_audit_ping")), cashProtect("按时缴", ["tax_clean"])),
  base("capex_installment", M, 5, "IT负责人", "🖥️", "系统费改分期？", "一次性支出难受，但分期会多付不少钱。", ["现金", "系统"], cashBorrow("分期", ["capex_installment"]), cashProtect("一次付清", ["pay_now"])),
  base("fund_pool_shift", ML, 5, "老板助理", "🏷️", "集团想先借走一点钱", "说是下月就还，但你知道这种事很少准时。", ["现金", "老板"], bossBack("先借", ["fund_pool_shift"]), bossPushback("留在业务里", ["protect_fund_pool"])),
  base("finance_fee", ALL, 5, "财务分析师", "💳", "要不要上保理？", "费用不低，但应收会好看很多。", ["现金", "风险"], cashBorrow("上", ["factoring"]), cashProtect("不上", ["hold_receivable"])),
  base("settlement_delay", ML, 6, "平台运营", "🧱", "平台回款又延了", "活动做完了，钱却卡在结算节点上。", ["现金", "增长"], cashBorrow("先垫着", ["settlement_delay"], sched(2, "settlement_mismatch")), cashProtect("暂停投放", ["pause_platform_spend"])),
  base("bonus_payout", L, 5, "HRBP", "🎯", "奖金要按原方案发吗？", "发了现金更紧，不发士气会立刻掉。", ["现金", "团队"], orgProtect("按原方案发", ["bonus_payout"]), cashDiscipline("延期发", ["bonus_delay"])),

  base("boss_temp_number", ALL, 6, "老板", "📞", "老板半夜要数", "明早要见人，现在就要一版“差不多能讲”的数据。", ["老板", "数据"], bossComply("先拼一版", ["boss_temp_number"]), bossPushback("坚持校验", ["professional_pushback"])),
  base("overnight_forecast", ML, 6, "老板", "🌙", "今晚重做全年预测", "老板看了个新故事，想明早就换一套叙事。", ["老板", "数据"], bossComply("今晚改", ["overnight_forecast"], sched(2, "backfill_weekend")), bossPushback("明天给正式版", ["forecast_boundary"])),
  base("boss_station", ML, 7, "老板", "🧍", "老板要你会上站他这边", "事情并不完全站得住，但他已经默认你会帮他补逻辑。", ["老板", "政治"], bossBack("站", ["boss_station"]), bossBoundary("不站队", ["neutral_stance"])),
  base("sign_this_now", EM, 6, "老板", "✍️", "这份批复现在就签", "你只看了摘要，细节几乎没时间核。", ["老板", "风险"], bossComply("先签", ["sign_fast"], sched(3, "expectation_lockin")), bossPushback("看完再签", ["sign_review"])),
  base("skip_review", E, 5, "老板", "🏃", "这个流程先别走了", "老板说先抢窗口，流程下周再补。", ["老板", "合规"], bossComply("先冲", ["skip_review"]), bossPushback("流程不能省", ["protect_process"])),
  base("owner_friend_project", ML, 6, "老板朋友", "🫱", "老板朋友想插个项目", "回报说不清，但老板已经先答应了个大概。", ["老板", "政治"], bossBack("接", ["owner_friend_project"]), bossBoundary("不接", ["friend_project_hold"])),
  base("board_deck_polish", ML, 5, "老板助理", "🖼️", "董事会材料要更好看一点", "你知道“更好看”不是排版问题。", ["老板", "政治"], bossComply("润色一下", ["board_deck_polish"], sched(3, "public_promise_gap")), bossPushback("按真实口径写", ["deck_truth"])),
  base("public_promise", L, 6, "老板", "📣", "老板要在大会上放大话", "目标一旦公开，后面就很难再收回来。", ["老板", "增长"], bossBack("支持他讲", ["public_promise"], sched(4, "public_promise_gap")), bossBoundary("劝他收一点", ["promise_control"])),
  base("boss_favorite_hire", M, 5, "HRD", "🧑", "老板想空降一个人", "岗位边界和汇报线都没想清楚。", ["老板", "团队"], bossBack("接收", ["favorite_hire"]), bossBoundary("先定职责", ["hire_alignment"])),
  base("investor_story", L, 5, "老板", "💼", "投资人要来听故事", "故事可以讲得很大，但你知道落地没那么快。", ["老板", "增长"], bossComply("先把故事撑起来", ["investor_story"], sched(3, "investor_question")), bossPushback("讲保守一点", ["investor_prudence"])),
  base("need_boss_backing", ML, 6, "销售总监", "🪪", "这个决策你帮老板背个书", "业务想借你的专业形象把争议压过去。", ["老板", "政治"], bossBack("背", ["need_boss_backing"]), bossBoundary("不背", ["decline_endorse"])),
  base("cross_line_approval", ML, 6, "老板", "🚪", "老板越过流程直接拍板", "你是唯一知道后果的人，其他人都在等你表态。", ["老板", "政治"], bossComply("跟上", ["cross_line_approval"], sched(2, "shadow_authority")), bossPushback("把边界说清", ["boundary_reset"])),
  base("meeting_rewrite", ALL, 5, "老板助理", "📝", "会议纪要要改写一下", "原话太直，发出去会伤人。", ["老板", "政治"], bossComply("改", ["meeting_rewrite"], sched(2, "rework_whiplash")), bossPushback("保留原意", ["raw_minutes"])),
  base("ceo_weekend_call", ML, 5, "老板", "📲", "周末再碰一版", "老板习惯周末压一轮事，团队已经有点扛不住。", ["老板", "团队"], bossComply("接电话", ["ceo_weekend_call"], sched(2, "morale_dip")), bossBoundary("让周一再看", ["weekend_boundary"])),
  base("shadow_decision", L, 5, "老板", "🪄", "你先替我拍了", "老板开始把灰区判断默认为你的职责。", ["老板", "政治"], bossBack("我来拍", ["shadow_decision"]), bossBoundary("请老板自己定", ["decision_return"])),

  base("freeze_hiring", EM, 7, "HRBP", "🧑‍💼", "先停招吗？", "钱有点紧，但几个关键岗位还没补上。", ["团队", "现金"], orgSqueeze("停", ["freeze_hiring"], sched(3, "capacity_gap")), orgInvest("继续招", ["protect_team"])),
  base("team_burn", ML, 6, "财务BP", "😮‍💨", "团队快顶不住了", "经营会、复盘、测算堆在一起，已经连熬两周。", ["团队", "执行"], orgProtect("补人", ["protect_team"]), orgSqueeze("再扛", ["burn_team"], sched(2, "resignation_wave"))),
  base("core_exit_risk", ML, 7, "HRBP", "📨", "核心员工在看机会", "嘴上还没提，但市场上已经有人在接触他。", ["团队", "风险"], orgProtect("立刻留人", ["retain_core"]), orgDelay("先观察", ["core_exit_risk"])),
  base("performance_push", L, 5, "HRD", "📊", "绩效要拉开吗？", "如果真拉开，几个中层可能会一起炸。", ["团队", "政治"], orgInvest("拉开", ["performance_push"]), orgDelay("先缓一季", ["performance_delay"], sched(2, "manager_trust_drop"))),
  base("headcount_fight", M, 6, "业务负责人", "🪢", "这个 HC 必须给业务", "大家都说自己最急，预算却只剩一个坑。", ["团队", "政治"], orgInvest("给", ["headcount_fight"]), cashProtect("不给", ["hc_hold"])),
  base("middle_manager_blame", ML, 5, "中层经理", "🧱", "中层开始互相甩锅", "会上一切都像别人的问题。", ["团队", "政治"], politicsSpeak("把问题讲透", ["middle_manager_blame"]), politicsDuck("先压住", ["blame_contain"])),
  base("reorg_rumor", M, 5, "老板助理", "🔀", "组织调整消息传开了", "很多人开始揣测自己的位置。", ["团队", "老板"], orgProtect("先解释", ["reorg_rumor"]), orgDelay("先不回应", ["silent_reorg"])),
  base("hiring_fail", EM, 5, "招聘经理", "🎣", "招了三周还没人", "候选人都嫌节奏太硬、薪资太保守。", ["团队", "现金"], orgInvest("提包和薪", ["hiring_fail"], sched(3, "recruiting_miss")), cashProtect("继续守价", ["salary_guard"])),
  base("promotion_request", M, 5, "骨干员工", "🏅", "骨干想要升职", "不给怕流失，给了其他人会跟着要。", ["团队", "老板"], orgProtect("给", ["promotion_request"]), orgDelay("先谈发展", ["delay_promotion"])),
  base("salary_adjustment", ML, 6, "HRBP", "💼", "老员工薪资倒挂了", "新招的人开得更高，内部已经有人知道了。", ["团队", "现金"], orgProtect("调整", ["salary_adjustment"]), cashDiscipline("先不动", ["hold_salary"])),
  base("training_budget", E, 4, "HRD", "📚", "培训预算砍不砍？", "短期看最容易砍，但长远代价很隐蔽。", ["团队", "现金"], orgInvest("保留", ["training_budget"]), cashDiscipline("砍掉", ["cut_training"])),
  base("shared_service_request", M, 5, "财务共享负责人", "🧾", "要不要把一些活转共享中心？", "标准化会更好，但前面磨合会很痛。", ["团队", "系统"], orgInvest("转", ["shared_service"]), orgDelay("先维持", ["keep_local"])),
  base("cross_team_conflict", ML, 5, "运营总监", "⚔️", "业务和财务又顶起来了", "谁都觉得自己是为了公司好。", ["团队", "政治"], politicsSpeak("当面拆开讲", ["cross_team_conflict"]), politicsDuck("先各退一步", ["freeze_conflict"])),
  base("new_manager_onboard", E, 4, "HRBP", "🧭", "新经理上岗要不要配人？", "不给支持，他大概率自己先乱掉。", ["团队", "执行"], orgInvest("配", ["new_manager_onboard"], sched(3, "onboarding_slip")), cashProtect("先观察", ["solo_onboard"])),
  base("weekend_overtime_policy", ML, 5, "老板", "🗓️", "周末加班要不要默认化？", "短期效率会高，组织感受会很差。", ["团队", "老板"], orgSqueeze("默认加班", ["weekend_overtime"], sched(3, "overtime_backlash")), orgProtect("设边界", ["protect_weekend"])),

  base("discount", EM, 8, "运营经理", "🏷️", "再降 5 个点？", "量会上来，但毛利会更难看。", ["增长", "利润质量"], marginTrade("降", ["heavy_discount"], sched(3, "margin_reckoning")), marginHold("不降", ["guard_margin"])),
  base("channel_rebate", ALL, 6, "区域销售", "🚗", "给经销商返点？", "不给，货可能推不动；给了，又怕渠道价格更乱。", ["利润质量", "增长"], marginTrade("给", ["channel_rebate"], sched(4, "rebate_reconciliation")), marginHold("不给", ["protect_cash"])),
  base("low_margin_big_order", ML, 7, "KA负责人", "📦", "低毛利大单要不要接？", "单子够大，利润却几乎贴着地板。", ["利润质量", "增长"], marginTrade("接", ["low_margin_big_order"]), marginHold("不接", ["skip_bad_order"])),
  base("platform_fee_up", ML, 6, "平台运营", "🧾", "平台抽佣涨了", "不跟着涨价，利润会更薄；涨价又怕掉单。", ["利润质量", "增长"], marginHold("提价", ["raise_price"]), marginTrade("自己吃掉", ["absorb_fee"], sched(3, "fee_spike_followup"))),
  base("freight_cost_surge", M, 5, "物流经理", "🚚", "运费突然抬头", "客户期望不变，实际履约成本却在跳。", ["利润质量", "库存"], marginHold("调价补回", ["freight_cost_surge"]), marginTrade("先扛着", ["freight_absorb"])),
  base("return_repair_cost", ML, 6, "售后负责人", "🛠️", "返修成本开始异常", "客诉还没爆，但修回来越来越贵。", ["利润质量", "客户"], marginPremium("专项治理", ["repair_cost_fix"]), marginTrade("先按旧政策", ["return_repair_cost"], sched(3, "repair_cost_creep"))),
  base("bundle_margin_blur", M, 5, "财务分析师", "🧺", "组合装毛利看不清了", "销量很好，但单品层面已经算不明白。", ["利润质量", "数据"], dataAlign("拆清楚", ["bundle_margin_blur"]), dataSkip("先按总盘看", ["blur_margin"])),
  base("premium_upgrade", ML, 5, "品牌负责人", "💎", "推高端线？", "销量不会爆，但利润质量会更舒服。", ["利润质量", "客户"], marginPremium("推", ["premium_upgrade"]), marginTrade("先不推", ["mass_market_first"])),
  base("procurement_substitute", M, 5, "采购经理", "🔁", "换低价替代料？", "成本能降，但客诉风险也会一起上来。", ["利润质量", "风险"], marginHold("不换", ["quality_guard"]), marginTrade("换", ["procurement_substitute"])),
  base("coupon_stack", ALL, 6, "平台运营", "🧮", "优惠券叠加失控了", "每一层都看着合理，合起来利润几乎没了。", ["利润质量", "增长"], marginHold("马上收口", ["coupon_stack"]), marginTrade("先保销量", ["stack_more_coupons"])),
  base("clearance_trade", L, 5, "商品经理", "🧹", "尾货清仓要不要做大？", "短期现金好看，但用户会被教育成等打折。", ["利润质量", "库存"], marginClear("做大", ["clearance_trade"], sched(4, "clearance_habit")), marginPremium("小范围做", ["controlled_clearance"])),
  base("commission_spike", ML, 5, "销售总监", "💼", "销售提成要补一档", "没有提成很难推，没有利润也很难活。", ["利润质量", "团队"], marginTrade("补", ["commission_spike"]), marginHold("不补", ["protect_commission_rate"])),
  base("mixed_margin_confusion", M, 5, "财务BP", "🧩", "高低毛利产品混在一起卖", "总盘看起来不错，细拆其实风险很大。", ["利润质量", "数据"], dataAlign("拆结构", ["mixed_margin_confusion"]), dataSkip("先看总盘", ["margin_mix_blur"])),
  base("price_protection", ML, 5, "渠道负责人", "🛡️", "老客户要价格保护", "不给会吵，给了新单毛利也会被带下去。", ["利润质量", "客户"], marginHold("给有限保护", ["price_protection"], sched(3, "price_protection_hit")), marginTrade("不给", ["deny_price_protection"])),
  base("custom_project_margin", ML, 5, "项目经理", "🧰", "定制项目利润太薄", "项目组说先拿案例，财务看起来像白干。", ["利润质量", "增长"], marginTrade("接", ["custom_project_margin"], sched(4, "project_margin_slip")), marginHold("不接", ["custom_margin_guard"])),

  base("inventory_push", EM, 7, "仓储经理", "📦", "先压货吗？", "不压，下月可能断货；压多了，现金会更难看。", ["库存", "现金"], inventoryLoad("压", ["inventory_push"], sched(4, "inventory_backfire")), inventoryLean("不压", ["protect_cash"])),
  base("hot_sku_stockout", ALL, 7, "仓库主管", "🔥", "爆款快断货了", "现在补，还来得及；再晚就只能看着单子流走。", ["库存", "增长"], inventoryRush("紧急补", ["hot_sku_stockout"], sched(2, "stockout_penalty")), inventoryLean("先控节奏", ["stock_guard"])),
  base("emergency_restock", ML, 6, "采购经理", "🚚", "空运补货？", "快是快，但成本贵得很肉疼。", ["库存", "现金"], inventoryRush("空运", ["emergency_restock"], sched(2, "expedite_cost")), inventoryLean("等海运", ["slow_restock"])),
  base("slow_moving_overhang", ML, 6, "商品经理", "🧱", "滞销库存越堆越多", "仓里有货，账上却越来越难看。", ["库存", "利润质量"], inventoryReset("专项清理", ["slow_moving_overhang"], sched(4, "obsolete_writeoff")), inventoryLoad("再等等", ["hold_dead_stock"])),
  base("safety_stock_dispute", M, 5, "计划经理", "📐", "安全库存是不是太高了？", "业务觉得不够，财务觉得太多。", ["库存", "现金"], inventoryLean("下调", ["lower_safety_stock"]), inventoryLoad("维持高水位", ["high_safety_stock"])),
  base("store_demand_noise", M, 5, "门店负责人", "🏬", "门店要货越来越虚", "谁都怕缺货，于是每个人都多报一点。", ["库存", "数据"], dataAlign("按真实需求纠偏", ["store_demand_noise"]), inventoryLoad("先满足再说", ["store_over_order"])),
  base("warehouse_transfer", ML, 5, "物流经理", "🚛", "要不要跨仓调拨？", "调了效率会更高，但现场会乱一阵。", ["库存", "团队"], inventoryReset("调", ["warehouse_transfer"], sched(3, "warehouse_congestion")), inventoryLean("不调", ["keep_current_layout"])),
  base("seasonal_bet", EM, 6, "商品企划", "🍂", "季节货要不要提前押？", "押中了很赚，押错了得清一季。", ["库存", "增长"], inventoryLoad("押", ["seasonal_bet"], sched(5, "seasonal_markdown")), inventoryLean("少押", ["seasonal_caution"])),
  base("supplier_moq", E, 5, "采购经理", "📏", "供应商起订量抬高了", "不吃量就没价格，吃了量现金就更紧。", ["库存", "现金"], inventoryLoad("接 MOQ", ["supplier_moq"], sched(4, "moq_cash_drag")), inventoryLean("换供应商", ["search_new_supplier"])),
  base("obsolescence_risk", L, 5, "产品经理", "⌛", "老型号快过时了", "现在不处理，后面只能用更差的价格出。", ["库存", "利润质量"], inventoryReset("提前清", ["obsolescence_risk"]), inventoryLoad("再等等", ["obsolete_hold"])),
  base("returns_restock", ML, 5, "售后主管", "↩️", "退回来的货还能再卖吗？", "翻新一下能卖，但一旦出问题口碑更伤。", ["库存", "客户"], inventoryReset("严格分级", ["returns_restock"]), inventoryLoad("能卖就卖", ["restock_fast"])),
  base("dc_overload", ML, 5, "仓储经理", "🏗️", "仓配中心快满了", "再挤下去，发货错漏会明显上升。", ["库存", "团队"], orgProtect("加临时人手", ["dc_overload"]), inventoryLean("再顶一顶", ["dc_squeeze"])),
  base("forecast_gap", M, 5, "计划分析师", "📉", "预测和实际越差越大", "每次复盘都说下次修，但还是在错。", ["库存", "数据"], dataBuild("重做模型", ["forecast_gap"]), dataPatch("先人工盯", ["manual_forecast"])),
  base("consignment_stock", ML, 5, "渠道经理", "🛒", "做寄售库存吗？", "出货会更容易，但账和货都会变复杂。", ["库存", "现金"], inventoryLoad("做", ["consignment_stock"]), inventoryLean("不做", ["avoid_consignment"])),
  base("replacement_parts", ML, 4, "售后主管", "🔩", "备件库存不够了", "现在补很贵，不补售后会连着炸。", ["库存", "客户"], inventoryRush("补", ["replacement_parts"]), inventoryLean("先拆借", ["parts_borrow"])),

  base("build_system", EM, 7, "IT负责人", "💻", "要上经营看板吗？", "本月花钱，但以后省命。", ["系统", "数据"], dataBuild("上", ["build_system"]), dataPatch("缓", ["delay_system"])),
  base("data_fight", ML, 6, "运营负责人", "🧮", "两套数据打起来了", "财务口径和业务口径对不上，经营会上要用哪套？", ["数据", "政治"], dataAlign("统一口径", ["data_alignment"]), dataSkip("先各说各的", ["avoid_conflict"], sched(2, "data_credibility_hit"))),
  base("dashboard_delay", M, 5, "BI经理", "📺", "看板总慢半天", "运营已经开始拿截图代替正式报表。", ["数据", "系统"], dataBuild("补资源重做", ["dashboard_delay"], sched(3, "dashboard_blindspot")), dataPatch("先容忍", ["dashboard_patch"])),
  base("close_rush", ML, 6, "财务经理", "📚", "月结要来不及了", "单据和口径都还在飞，时间却只剩两天。", ["数据", "团队"], dataBuild("砍范围保质量", ["close_rush"], sched(2, "close_delay")), dataPatch("大家再冲一下", ["close_rush_patch"])),
  base("report_error", M, 5, "财务分析师", "❗", "上周报表有错", "问题不算致命，但已经有人按那套数做决定了。", ["数据", "老板"], dataAlign("主动纠正", ["report_error"]), dataSkip("低调修掉", ["silent_fix"], sched(3, "credibility_loss"))),
  base("manual_reconcile", E, 5, "财务共享", "🧾", "又要手工对账", "系统没打通，很多表只能靠人一点点抹平。", ["数据", "团队"], dataBuild("补接口", ["manual_reconcile"], sched(3, "reconciliation_fatigue")), dataPatch("继续手工", ["manual_reconcile"])),
  base("crm_finance_mismatch", M, 5, "销售运营", "🔗", "CRM 和财务数据对不上", "销售说没影响，财务说这会害死预测。", ["数据", "销售"], dataAlign("现在对齐", ["crm_finance_mismatch"]), dataSkip("先让业务跑", ["crm_flex"])),
  base("forecast_model", E, 4, "数据分析师", "📐", "要不要补预测模型？", "不是立刻见效，但会让后面很多决策少拍脑袋。", ["数据", "增长"], dataBuild("做", ["forecast_model"]), growthFocus("先靠经验", ["experience_first"])),
  base("month_end_patch", ML, 5, "财务BP", "🩹", "月末再补一层 Excel", "短期能救急，但大家都知道这不是办法。", ["数据", "执行"], dataPatch("补", ["month_end_patch"], sched(3, "excel_version_sprawl")), dataBuild("不补，改流程", ["patch_refuse"])),
  base("bi_hire", E, 4, "HRBP", "🧠", "要不要招个 BI？", "眼前不急，但一直缺这个角色。", ["数据", "团队"], orgInvest("招", ["bi_hire"]), cashProtect("先不招", ["delay_bi_hire"])),
  base("tracking_missing", EM, 5, "增长经理", "📍", "关键埋点漏了", "现在继续投，你其实看不清钱花在哪。", ["数据", "增长"], dataBuild("先补埋点", ["tracking_missing"]), growthPush("先投再说", ["tracking_blind"])),
  base("board_kpi_reset", L, 5, "老板", "🎯", "董事会换 KPI 了", "以前的看板不够用了，解释成本会很高。", ["数据", "老板"], dataAlign("重做口径", ["board_kpi_reset"]), dataSkip("先沿用旧口径", ["keep_old_kpi"])),
  base("data_permission", M, 4, "法务顾问", "🔒", "权限要不要收紧？", "收紧会影响效率，但现在谁都能改表也很危险。", ["数据", "合规"], dataBuild("收紧", ["data_permission"], sched(4, "permission_breach")), dataPatch("先不动", ["loose_permission"])),
  base("shadow_excel", ML, 5, "财务分析师", "📊", "每个部门都有自己的 Excel", "数字能对上已经靠运气了。", ["数据", "政治"], dataAlign("统一模板", ["shadow_excel"]), dataSkip("先默认共存", ["excel_shadow"])),
  base("erp_cutover", L, 5, "IT负责人", "🧱", "ERP 切换窗口到了", "如果这次再拖，后面所有接口都得重排。", ["系统", "数据"], dataBuild("切", ["erp_cutover"], sched(4, "erp_cutover_noise")), dataPatch("再拖一季", ["erp_delay"])),

  base("budget_meeting_targeted", M, 6, "老板", "🎯", "预算会上可能会点你", "大家都知道指标不好看，只是不知道谁先被问。", ["政治", "老板"], politicsSpeak("把真问题讲出来", ["budget_meeting_targeted"]), politicsDuck("先讲过程", ["soft_budget_story"])),
  base("audit_entry", ML, 6, "审计经理", "🔍", "审计提前进场了", "流程有些地方经不起追问，但现在补已经有点晚。", ["政治", "合规"], politicsShield("先拉清单", ["audit_entry"], sched(3, "audit_followup")), politicsBlend("先稳住现场", ["audit_smooth"])),
  base("project_blame", ML, 6, "项目经理", "🧨", "项目失利有人想让财务解释", "明明不是你拍板，最后却轮到你去讲。", ["政治", "老板"], politicsSpeak("把责任链讲清", ["project_blame"]), politicsDuck("先扛一轮", ["take_project_blame"], sched(3, "blame_sticks"))),
  base("speak_for_boss", L, 5, "老板助理", "🎤", "老板不在，你来替他讲", "会上的火力不会因为人不在就减弱。", ["政治", "老板"], politicsShield("我来讲", ["speak_for_boss"]), politicsDuck("换人讲", ["defer_spokesperson"])),
  base("business_pushes_blame", ML, 5, "业务总监", "🫳", "业务想把锅先推给流程", "你知道问题没这么简单。", ["政治", "团队"], politicsSpeak("不接锅", ["business_pushes_blame"]), politicsBlend("先接住", ["contain_business_blame"])),
  base("shadow_committee", L, 5, "老板", "🕴️", "会外还有个小圈子在定事", "正式会上讨论的，很多只是结果发布。", ["政治", "老板"], politicsBlend("进去", ["shadow_committee"], sched(3, "political_heatwave")), politicsSpeak("公开讲规则", ["process_sunlight"])),
  base("pilot_failure_spin", ML, 5, "业务负责人", "🎢", "试点没成但不能讲太真", "如果现在说透，项目大概率直接停。", ["政治", "增长"], politicsDuck("先包装", ["pilot_failure_spin"]), politicsSpeak("说真话", ["pilot_truth"])),
  base("capex_defense", M, 5, "IT负责人", "🖨️", "这笔投入你得去 defend", "很多人只会看到钱，不会看到风险。", ["政治", "系统"], politicsShield("我来 defend", ["capex_defense"]), cashProtect("先缩方案", ["capex_trim"])),
  base("compliance_exception", ML, 6, "法务顾问", "⚠️", "要不要走一次例外审批？", "流程上可做，但留下来的痕迹很重。", ["政治", "合规"], politicsShield("走例外", ["compliance_exception"], sched(4, "compliance_heat")), politicsSpeak("不走这个口子", ["compliance_guard"])),
  base("regional_politics", L, 5, "区域总监", "🧭", "几个区域开始抢资源", "数据只是表层，真正的冲突在话语权。", ["政治", "团队"], politicsSpeak("公开分规则", ["regional_politics"]), politicsDuck("先模糊处理", ["regional_balance"])),
  base("favored_vendor", ML, 5, "采购经理", "🎁", "有个被偏爱的供应商", "价格不是最优，但关系很硬。", ["政治", "合规"], politicsSpeak("按规则比价", ["favored_vendor"], sched(4, "vendor_question")), politicsBlend("先用着", ["vendor_compromise"])),
  base("boardroom_illusion_seed", L, 5, "老板", "🎬", "会上全是好消息", "你知道盘子里有几块已经开始松了。", ["政治", "老板"], politicsSpeak("现在提醒", ["boardroom_illusion_seed"]), politicsDuck("会后再说", ["illusion_after_meeting"])),
  base("need_white_lie", L, 5, "老板助理", "🤐", "有个细节先别讲", "不算造假，但一定算选择性表达。", ["政治", "老板"], politicsBlend("先不讲", ["need_white_lie"], sched(3, "white_lie_interest")), politicsSpeak("必须讲", ["tell_full_story"])),
  base("strategy_slide_spin", L, 5, "战略负责人", "🧭", "这页战略图要更漂亮", "方向没有那么清楚，但大家都想看到确定性。", ["政治", "老板"], politicsBlend("先画大一点", ["strategy_slide_spin"]), politicsSpeak("按真实节奏写", ["strategy_realism"])),
  base("cross_function_war", ML, 5, "财务BP", "🔥", "跨部门开始公开对线", "如果今天没人收口，后面只会更难合作。", ["政治", "团队"], politicsShield("我来收口", ["cross_function_war"]), politicsDuck("先散会", ["postpone_conflict"])),
];

const chainEvents = [
  chain("cash_alert", 10, "资金经理", "🚨", "钱快不够了", "账上只够发 1.5 个月工资。", { allFlags: ["long_terms"], hiddenMin: { executionDebt: 22 } }, cashProtect("全面收缩", ["hard_cut"]), growthPush("继续冲", ["double_down"])),
  chain("collection_crunch", 9, "应收主管", "📬", "客户开始集体拖款", "回款节奏像被谁统一按慢了一拍。", { alternatives: [{ allFlags: ["long_terms", "bad_debt_signal"] }, { statMax: { cash: 34 }, hiddenMin: { riskExposure: 34 } }] }, cashProtect("收紧授信", ["credit_control"]), cashRelease("再给空间", ["keep_shipping"])),
  chain("supplier_stop_ship", 9, "采购经理", "🛑", "供应商暂停发货", "前面的压款终于开始反咬供应端。", { alternatives: [{ allFlags: ["supplier_pressure", "delay_supplier_payment"] }, { allFlags: ["advance_payment", "supplier_moq"], statMax: { cash: 36 } }] }, cashBorrow("先打款保供", ["save_supply"]), cashDiscipline("接受停发", ["supply_break"])),
  chain("payroll_crunch", 9, "HRBP", "⏳", "发薪前夜气氛不对了", "大家虽然还没问，但消息已经在扩散。", { allFlags: ["payroll_watch"], statMax: { cash: 30 } }, cashBorrow("先补现金", ["save_payroll"]), cashDiscipline("先晚几天", ["delay_payroll"])),
  chain("runway_bridge", 8, "老板", "🪜", "跑道只剩一个季度", "问题不是能不能赢，而是还能不能等到赢。", { statMax: { cash: 26 }, statMin: { growth: 54 } }, cashBorrow("先借桥", ["runway_bridge"]), cashProtect("先收战线", ["shrink_front"])),
  chain("board_cash_probe", 8, "董事", "🧾", "董事开始追问现金质量", "报表上的增长已经挡不住现金焦虑了。", { roundMin: 7, statMax: { cash: 38 }, statMin: { trust: 42 } }, dataAlign("讲真结构", ["cash_probe_truth"]), bossComply("先讲故事", ["cash_probe_story"])),

  chain("resignation", 9, "核心BP", "📨", "骨干要走了", "这次不是抱怨，是正式提离职。", { alternatives: [{ hiddenMin: { orgFatigue: 42 } }, { allFlags: ["freeze_hiring", "burn_team"] }] }, orgProtect("留", ["retain_core"]), orgSqueeze("放", ["lose_core"])),
  chain("finance_meltdown", 9, "财务分析师", "🫠", "财务团队快炸了", "报表、复盘、老板临时要数全撞在一起。", { hiddenMin: { orgFatigue: 46, executionDebt: 28 } }, orgProtect("砍需求保人", ["protect_team"]), orgSqueeze("继续硬顶", ["burn_team"])),
  chain("manager_walkout", 8, "中层经理", "🚪", "中层准备一起摊牌", "他们不是不干，是不想再在同一套逻辑里干。", { allFlags: ["middle_manager_blame", "performance_push"] }, politicsShield("马上沟通", ["manager_walkout"]), politicsDuck("先不回应", ["manager_cold"])),
  chain("culture_split", 8, "HRD", "🧩", "团队开始分成两派", "一派要结果，一派要边界，彼此已经听不进去。", { statMax: { team: 38 }, hiddenMin: { politicalHeat: 38 } }, orgProtect("重建规则", ["culture_repair"]), orgSqueeze("先压住", ["culture_split"])),

  chain("boss_dependency", 8, "老板", "🪑", "这事你来拍板", "老板开始越来越依赖你，很多灰区决定都交给你。", { relationMin: { boss: 66 }, hiddenMin: { bossDependency: 40 } }, bossBack("接", ["boss_confidant"], sched(3, "boundary_erosion")), bossBoundary("不接", ["protect_boundary"])),
  chain("stand_side", 8, "老板", "⚖️", "这回你得站一边", "老板希望你明确支持他选的方向。", { hiddenMin: { politicalHeat: 40 }, relationMin: { boss: 58 } }, bossBack("站", ["stand_side"]), politicsSpeak("不站队", ["stay_professional"])),
  chain("promise_settlement", 8, "老板助理", "📣", "之前放出去的话开始追债", "当时谁都想先把场面稳住，现在轮到兑现。", { allFlags: ["public_promise"], roundMin: 8 }, bossComply("先补承诺", ["promise_patch"]), bossPushback("重新校准", ["promise_reset"])),
  chain("owner_override", 8, "老板", "🧨", "老板绕过你直接拍了", "你辛苦搭的边界，被一句话越过去。", { hiddenMin: { bossDependency: 50 }, statMin: { trust: 58 } }, bossComply("跟上执行", ["owner_override"]), bossBoundary("把风险留痕", ["owner_risk_note"])),
  chain("trust_crack", 8, "老板", "🧊", "老板开始不太信你了", "不是公开翻脸，但明显已经不再优先听你。", { statMax: { trust: 38 }, hiddenMin: { bossDependency: 24 } }, bossComply("重新贴近", ["rebuild_trust"]), bossBoundary("保持距离", ["cool_relation"])),

  chain("customer_backlash", 8, "客服主管", "💥", "客户投诉开始连片出现", "质量、交付、售后几个问题一起爆了。", { hiddenMax: { customerTrust: 38 } }, marginPremium("补救", ["control_risk"]), marginTrade("先压着", ["avoid_conflict"])),
  chain("margin_truth_day", 8, "老板", "🧾", "老板终于问：为什么没赚到钱？", "增长、GMV、单量都很好看，但利润越来越薄。", { hiddenMax: { marginHealth: 38 }, statMin: { growth: 58 } }, dataAlign("讲真话", ["deep_analysis"]), bossComply("先讲规模", ["avoid_conflict"])),
  chain("price_war_spiral", 8, "平台运营", "🌀", "价格战开始失控", "你原本只是想抢一波，现在行业都跟进了。", { allFlags: ["heavy_discount", "marketplace_coupon"] }, marginHold("先止血", ["price_war_stop"]), marginTrade("继续跟", ["price_war_follow"])),
  chain("channel_dumping", 8, "渠道经理", "📉", "经销商开始甩货", "前面推得太猛，渠道开始用低价往外清库存。", { allFlags: ["channel_rebate", "inventory_push"] }, marginHold("立刻控价", ["channel_control"]), marginTrade("先放着卖", ["channel_blind"])),
  chain("vip_client_threat", 8, "KA负责人", "📞", "核心客户说要换供应商", "不是因为价格，而是开始怀疑你交付不稳。", { hiddenMax: { customerTrust: 42 }, hiddenMin: { riskExposure: 28 } }, marginPremium("先稳客户", ["vip_client_save"]), growthGuard("让销售再谈", ["vip_client_talk"])),

  chain("inventory_lock", 8, "供应链总监", "🔒", "库存把现金锁死了", "盘点看起来安全，银行账户却越来越空。", { allFlags: ["inventory_push", "supplier_moq"], statMax: { cash: 38 } }, inventoryReset("清库存", ["inventory_unlock"]), inventoryLoad("继续扛", ["inventory_lock"])),
  chain("warehouse_overflow", 8, "仓储经理", "🏚️", "仓里已经挤爆了", "再不调整，错发漏发就是时间问题。", { allFlags: ["warehouse_transfer", "inventory_push"] }, orgProtect("加班加人清仓", ["warehouse_rescue"]), inventoryLean("先暂停收货", ["warehouse_pause"])),
  chain("seasonal_hangover", 7, "商品经理", "🍃", "季节货开始压身上", "当时押得很笃定，现在每一天都在贬值。", { allFlags: ["festival_promo", "seasonal_bet"], roundMin: 7 }, marginClear("立刻出清", ["seasonal_hangover"]), inventoryLoad("再等等", ["hold_seasonal"])),
  chain("forecast_trust_break", 7, "老板", "📉", "没人再信预测了", "每次都解释说情况变了，但大家已经不买账。", { allFlags: ["gmv_target", "manual_forecast"], hiddenMax: { dataMaturity: 32 } }, dataBuild("重做预测体系", ["forecast_rebuild"]), dataPatch("继续人工兜", ["forecast_patch"])),

  chain("data_escalation", 8, "财务总监", "🧠", "数据问题升级成管理问题", "现在争的已经不是口径，是谁说了算。", { hiddenMin: { executionDebt: 34 }, hiddenMax: { dataMaturity: 32 } }, dataAlign("统一机制", ["data_governance"]), dataSkip("先让业务跑", ["data_loose"])),
  chain("close_failure", 8, "财务经理", "📚", "月结正式失败", "不是晚一点的问题，是已经没人相信这轮数了。", { roundMin: 8, hiddenMin: { executionDebt: 38 }, statMax: { team: 45 } }, dataBuild("停下来重做", ["close_failure"]), orgSqueeze("先交版本", ["submit_dirty_close"])),
  chain("audit_shock", 8, "审计经理", "🔦", "审计抓到关键例外", "之前觉得可以解释的点，现在变成需要书面说明。", { alternatives: [{ allFlags: ["audit_entry", "compliance_exception"] }, { hiddenMin: { riskExposure: 45 } }] }, politicsShield("立刻补证据", ["audit_shock"]), politicsDuck("先降影响", ["audit_spin"])),
  chain("boardroom_illusion", 8, "老板", "🎬", "所有人都在讲好消息", "经营会上气氛很好，只有你知道有些东西不对。", { roundMin: 9, hiddenMin: { executionDebt: 30 } }, politicsSpeak("现在打断", ["professional_pushback"]), politicsDuck("会后再说", ["avoid_conflict"])),

  chain("project_blackhole", 7, "项目经理", "🕳️", "项目开始吞预算了", "当初拍板的时候很轻松，现在每周都像补窟窿。", { allFlags: ["owner_friend_project", "favored_vendor"] }, cashProtect("立即止损", ["project_blackhole"]), politicsBlend("再顶一段", ["project_keepalive"])),
  chain("blame_meeting", 7, "老板", "🪓", "专项会开成了问责会", "你需要决定是保人、保流程还是保结果。", { hiddenMin: { politicalHeat: 45 }, statMin: { trust: 40 } }, politicsShield("保规则", ["blame_meeting"]), politicsDuck("保场面", ["save_face"])),
  chain("legal_red_flag", 7, "法务顾问", "🚩", "法务发红牌了", "这个口子再开下去，后面就不是经营问题了。", { hiddenMin: { riskExposure: 52 }, relationMax: { legal: 46 } }, politicsShield("马上收口", ["legal_red_flag"]), growthPush("先做完这单", ["ignore_legal"])),
  chain("white_lie_exposed", 7, "老板助理", "🫥", "之前没讲的那部分被问到了", "你当时省掉的一句，现在变成全场盯着的一页。", { allFlags: ["need_white_lie", "strategy_slide_spin"] }, politicsSpeak("补全真相", ["white_lie_exposed"]), politicsBlend("继续圆", ["double_white_lie"])),
  chain("vendor_interest_probe", 7, "采购经理", "🧾", "外部开始问供应商关系", "事情未必有问题，但解释成本已经很高。", { allFlags: ["favored_vendor"], hiddenMin: { politicalHeat: 32 } }, politicsSpeak("公开比价", ["vendor_probe"]), politicsBlend("先压一下", ["vendor_cover"])),
  chain("customer_refund_wave", 7, "售后主管", "🌊", "退款开始连成一条线", "你以为是一波活动尾巴，结果它开始变成结构问题。", { alternatives: [{ allFlags: ["refund_ignore"] }, { hiddenMax: { customerTrust: 40 }, hiddenMin: { marginHealth: 30 } }] }, marginPremium("专项处理", ["refund_rescue"]), marginTrade("先压成本", ["refund_cost_cut"])),
  chain("ops_shadow_process", 7, "运营总监", "🧭", "业务自己绕开了流程", "因为他们觉得等你这边太慢。", { hiddenMin: { executionDebt: 32 }, allFlags: ["skip_review"] }, dataBuild("重建流程", ["ops_process_reset"]), politicsDuck("先默认存在", ["ops_shadow_process"])),
  chain("headcount_frozen_market", 7, "HRBP", "🥶", "市场上都知道你们不招了", "后面想再开岗，候选人会先问一句是不是又要停。", { allFlags: ["freeze_hiring", "salary_guard"] }, orgInvest("重新开放招聘", ["reopen_hiring"]), cashProtect("继续守", ["keep_freeze"])),
];

const delayedEffects = {
  ad_payback_review: delay("投放复盘：ROI 不如预期", "增长拉起来了，但回收速度比想象慢。", { cash: -8, trust: -2 }, { executionDebt: 4, marginHealth: -3 }, { finance: 1, sales: -1 }),
  launch_returns: delay("新品首发后退货偏高", "你抢到了首发窗口，也一起抢回了一堆售后单。", { cash: -5, trust: -2 }, { customerTrust: -4, executionDebt: 2 }, { ops: -1, sales: 1 }),
  streamer_roi_miss: delay("直播复盘不及预期", "场观很好看，但真实转化没有撑住成本。", { cash: -7 }, { marginHealth: -4, executionDebt: 2 }, { sales: -1, finance: 1 }),
  promo_margin_gap: delay("大促后毛利掉出预期", "量冲起来了，利润却比你最差版本还薄。", { cash: -4, trust: -2 }, { marginHealth: -7, politicalHeat: 2 }, { boss: -1, finance: 1 }),
  collab_backlash: delay("联名履约出了口碑问题", "声量过去以后，留下来的都是兑现成本。", { trust: -2 }, { customerTrust: -6, riskExposure: 2 }, { ops: -1, boss: -1 }),
  affiliate_fraud: delay("分销渠道开始夹羊毛党", "订单变多了，但质量开始变形。", { cash: -6 }, { riskExposure: 5, customerTrust: -2 }, { sales: -1, finance: -1 }),
  coupon_addiction: delay("用户被教育成等券下单", "短期转化冲上去了，后面却越来越离不开补贴。", { growth: -3, cash: -3 }, { marginHealth: -4, customerTrust: -1 }, { sales: -1 }),

  receivable_pressure: delay("应收开始堆高", "收入很好看，账上的钱却没跟上。", { cash: -10 }, { riskExposure: 6, executionDebt: 3 }, { finance: -1, sales: -1 }),
  supplier_lock: delay("供应商开始卡你交付", "压款省下来的现金，开始变成供应风险。", { growth: -4 }, { riskExposure: 6, executionDebt: 2 }, { ops: -2, finance: -1 }),
  payroll_risk: delay("发薪消息开始传开", "你还没正式说什么，组织里已经开始不安。", { team: -5, trust: -1 }, { orgFatigue: 4, politicalHeat: 2 }, { hr: -2 }),
  bad_debt_writeoff: delay("一笔应收开始像坏账", "之前的乐观估计，现在成了报表上的洞。", { cash: -9, trust: -2 }, { riskExposure: 7 }, { finance: -2, sales: -1 }),
  bridge_loan_interest: delay("过桥成本开始吃利润", "当时借到的钱救了命，现在利息开始回头要命。", { cash: -5 }, { marginHealth: -4, riskExposure: 2 }, { finance: -1 }),
  tax_audit_ping: delay("税务那边来问细节了", "缓缴带来的喘息，换成了更高的解释成本。", { trust: -2 }, { riskExposure: 5, politicalHeat: 3 }, { legal: -2 }),
  settlement_mismatch: delay("平台结算和预期差太多", "看起来是时间差，实际差出了利润和现金。", { cash: -7 }, { executionDebt: 2, marginHealth: -3 }, { finance: -1, sales: -1 }),

  expectation_lockin: delay("临时答应的事被当成正式承诺", "你以为先过一关，别人却已经记成标准动作。", { trust: -2 }, { bossDependency: 4, politicalHeat: 1 }, { boss: 1 }),
  backfill_weekend: delay("周末加班开始常态化", "这次补的是一版预测，下次补的可能就是团队耐心。", { team: -4 }, { orgFatigue: 5, executionDebt: 1 }, { hr: -1 }),
  public_promise_gap: delay("公开目标开始反噬", "当初讲出去有多顺，回头兑现就有多痛。", { trust: -4 }, { politicalHeat: 4, bossDependency: 2 }, { boss: -1 }),
  boundary_erosion: delay("边界又退了一步", "老板越来越习惯把灰区交给你。", { team: -2 }, { bossDependency: 6, politicalHeat: 2 }, { boss: 2, finance: -1 }),
  investor_question: delay("投资人追问落地细节", "故事没人反对，但关键问题一个都绕不过。", { trust: -3 }, { politicalHeat: 3, dataMaturity: -1 }, { boss: -1 }),
  rework_whiplash: delay("你改过的东西又被推翻", "为了照顾场面做的加工，最后变成新的返工。", { team: -3 }, { executionDebt: 4, orgFatigue: 2 }, { finance: -1 }),
  shadow_authority: delay("组织默认你有更多权力", "可权力来的时候，总伴着更多模糊责任。", { trust: 1 }, { bossDependency: 5, politicalHeat: 3 }, { boss: 2, hr: -1 }),

  capacity_gap: delay("组织缺口被放大", "关键岗位长期空缺，越来越多事开始掉地上。", { team: -6, growth: -4 }, { orgFatigue: 6, executionDebt: 5 }, { hr: -2, ops: -1 }),
  resignation_wave: delay("第二波离职风险", "大家表面没说，但心已经开始散了。", { team: -8, trust: -2 }, { orgFatigue: 7, politicalHeat: 3 }, { hr: -2, finance: -3 }),
  morale_dip: delay("团队开始集体泄气", "不是爆炸，而是慢慢没人愿意多走一步。", { team: -5 }, { orgFatigue: 5 }, { hr: -1 }),
  recruiting_miss: delay("岗位空窗拖出了业务伤口", "不是没有人投，是候选人开始挑你们。", { growth: -3, team: -3 }, { orgFatigue: 3 }, { hr: -2 }),
  manager_trust_drop: delay("中层不再相信绩效解释", "规则一旦被怀疑，所有沟通成本都会变高。", { trust: -3 }, { politicalHeat: 4, orgFatigue: 2 }, { hr: -2 }),
  overtime_backlash: delay("周末加班引发反弹", "短期效率没问题，长期人心开始出问题。", { team: -6 }, { orgFatigue: 6, politicalHeat: 2 }, { hr: -2 }),
  onboarding_slip: delay("新经理上岗后撞了墙", "没人带的空降，不会自动变成成熟战力。", { team: -3, growth: -2 }, { executionDebt: 3, orgFatigue: 1 }, { hr: -1, ops: -1 }),

  margin_reckoning: delay("利润质量被追问", "量冲起来了，但老板开始问：钱呢？", { trust: -4, cash: -4 }, { marginHealth: -6, politicalHeat: 3 }, { boss: -2, sales: 1 }),
  fee_spike_followup: delay("抽佣变化吃掉了利润", "你以为只是费用项波动，结果已经在改业务结构。", { cash: -5 }, { marginHealth: -5 }, { finance: -1 }),
  repair_cost_creep: delay("售后返修开始拖利润", "最难看的成本，往往不是前台能马上看到的。", { cash: -4 }, { marginHealth: -4, customerTrust: -2 }, { ops: -1 }),
  clearance_habit: delay("用户开始等你清仓", "清掉的是库存，留下的是更差的价格预期。", { growth: -3 }, { customerTrust: -2, marginHealth: -3 }, { sales: -1 }),
  rebate_reconciliation: delay("返点结算变成扯皮", "当时看着只是激励，后面却成了利润黑洞。", { cash: -5 }, { marginHealth: -5, politicalHeat: 2 }, { sales: -1, finance: -1 }),
  project_margin_slip: delay("定制项目利润继续下探", "案例没拿稳，利润先没了。", { cash: -4, trust: -1 }, { marginHealth: -6, executionDebt: 2 }, { finance: -1 }),
  price_protection_hit: delay("价格保护开始层层蔓延", "一旦开了口，后面每个客户都觉得自己该有。", { cash: -4 }, { marginHealth: -4, customerTrust: -1 }, { sales: -1 }),

  inventory_backfire: delay("库存开始压手", "你当时压的货，现在开始变成现金压力。", { cash: -9, trust: -2 }, { riskExposure: 5, marginHealth: -2 }, { finance: -1, ops: -1 }),
  stockout_penalty: delay("断货开始带来处罚", "不是只少卖几单，平台和客户也开始找你算账。", { growth: -4, trust: -2 }, { customerTrust: -3, riskExposure: 2 }, { sales: -1 }),
  expedite_cost: delay("紧急补货把成本拉炸了", "速度买到了，利润也一起买没了。", { cash: -6 }, { marginHealth: -4, orgFatigue: 1 }, { ops: 1, finance: -1 }),
  obsolete_writeoff: delay("库存减值要入账了", "以前还能解释成慢，现在只能承认卖不掉。", { cash: -7, trust: -2 }, { riskExposure: 4, marginHealth: -5 }, { finance: -1 }),
  warehouse_congestion: delay("仓里开始打结", "调拨解决了一部分问题，也制造了新的错漏。", { team: -3 }, { executionDebt: 4, orgFatigue: 2 }, { ops: -1 }),
  moq_cash_drag: delay("高 MOQ 让现金更沉", "单价省了点，现金灵活性却被吃掉更多。", { cash: -5 }, { riskExposure: 3 }, { finance: -1 }),
  seasonal_markdown: delay("季节货只能打折出清", "押注本来是为了赢窗口，现在变成了止损。", { cash: -4, growth: -2 }, { marginHealth: -4, customerTrust: -1 }, { sales: -1 }),

  data_credibility_hit: delay("大家开始不信数字了", "最麻烦的不是数据错，而是谁都能拿自己的版本说服自己。", { trust: -5 }, { dataMaturity: -5, politicalHeat: 4, executionDebt: 3 }, { boss: -1, finance: -3, sales: -1 }),
  close_delay: delay("月结延迟正式被看见", "你想把质量守住，但其他人只看到节奏没了。", { trust: -3 }, { executionDebt: 4, orgFatigue: 3 }, { finance: -2 }),
  reconciliation_fatigue: delay("手工对账开始拖垮节奏", "每次都能补上，但每次都在消耗组织信用。", { team: -3 }, { executionDebt: 5, orgFatigue: 3 }, { finance: -1 }),
  permission_breach: delay("权限问题真的出了口子", "以前觉得只是松一点，后来才发现是没人能追责。", { trust: -2 }, { riskExposure: 5, politicalHeat: 2 }, { legal: -2, finance: -1 }),
  excel_version_sprawl: delay("Excel 版本开始满天飞", "现在最贵的不是算错，而是谁都以为自己那版是对的。", { team: -2 }, { executionDebt: 5, dataMaturity: -3 }, { finance: -2, sales: -1 }),
  erp_cutover_noise: delay("ERP 切换带来一波混乱", "系统是上了，但流程和习惯没那么快跟上。", { team: -3, trust: -1 }, { executionDebt: 4, dataMaturity: 2 }, { ops: -1, finance: -1 }),
  dashboard_blindspot: delay("关键决策期看板失明", "没人真的瞎，但所有人都比平时更像在赌。", { trust: -2 }, { dataMaturity: -3, executionDebt: 2 }, { boss: -1 }),

  audit_followup: delay("审计开始追补材料", "你以为先过了门，现在才发现后面还有房间。", { team: -2 }, { politicalHeat: 4, riskExposure: 3 }, { legal: -1 }),
  blame_sticks: delay("这口锅开始固定在你身上", "当时只是帮忙稳场，现在大家默认就是你负责。", { trust: -3 }, { politicalHeat: 5, bossDependency: 2 }, { boss: 1, finance: -2 }),
  compliance_heat: delay("例外审批引来更多目光", "流程没违规，不代表没有人会拿它做文章。", { trust: -2 }, { politicalHeat: 5, riskExposure: 4 }, { legal: -2 }),
  vendor_question: delay("供应商关系被拿出来聊了", "以前大家装作看不见，现在已经有人开始记录。", { trust: -2 }, { politicalHeat: 4, riskExposure: 3 }, { legal: -1, ops: -1 }),
  credibility_loss: delay("你说的话开始没那么好使了", "不是因为你错了，而是大家开始记得你以前怎么圆过。", { trust: -4 }, { politicalHeat: 3, bossDependency: 1 }, { boss: -1 }),
  white_lie_interest: delay("那句没说全的话开始计息", "当时省下来的尴尬，后来都带着更高利息回来。", { trust: -3 }, { politicalHeat: 4, dataMaturity: -1 }, { boss: -1 }),
  political_heatwave: delay("组织里明显开始热起来了", "很多会还在开，真正的判断已经转入气氛。", { team: -2 }, { politicalHeat: 6 }, { boss: -1, sales: -1 }),
};

const replacementBlock = `const initialRelations = { boss: 52, sales: 48, hr: 55, ops: 50, finance: 60, legal: 45 };

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

const baseEvents = ${JSON.stringify(baseEvents, null, 2)};

const chainEvents = ${JSON.stringify(chainEvents, null, 2)};

const delayedEffects = ${JSON.stringify(delayedEffects, null, 2)};

const personaDefs = [
  { key: "growth", title: "激进增长型财务BP", desc: "你愿意为规模下注，但容易低估代价。" },
  { key: "cash", title: "守盘控险型财务BP", desc: "你很会让盘子别炸，但也可能把机会一起守掉。" },
  { key: "team", title: "组织保护型财务BP", desc: "你知道人才和机制才是真资产。" },
  { key: "trust", title: "关键位置型财务BP", desc: "你离权力很近，也更需要边界感。" },
];`;

const blockReplaced = source.replace(/const initialRelations = \{[\s\S]*?const personaDefs = \[[\s\S]*?\];/, replacementBlock);

const oldBalanceWeight = `function balanceWeight(event, state) {
  let bonus = 0;
  if ((state.cash <= 40) && event.tags?.includes("现金")) bonus += 2;
  if ((state.team <= 45 || state.hidden.orgFatigue >= 40) && event.tags?.includes("团队")) bonus += 2;
  if ((state.hidden.marginHealth <= 42) && event.tags?.includes("利润质量")) bonus += 2;
  if ((state.hidden.customerTrust <= 42) && event.tags?.includes("客户")) bonus += 2;
  if ((state.hidden.dataMaturity <= 28) && event.tags?.includes("数据")) bonus += 1.5;
  return (event.weight ?? 1) + bonus;
}

function chooseEvent(state) {
  const chains = chainEvents
    .filter((e) => !state.usedIds.includes(e.id) && e.when(state))
    .sort((a, b) => b.priority - a.priority);
  if (chains.length > 0) return chains[0];

  const phase = phaseOfRound(state.round);
  const candidates = baseEvents.filter((e) => !state.usedIds.includes(e.id) && e.phase.includes(phase));
  const weighted = (candidates.length ? candidates : baseEvents.filter((e) => e.phase.includes(phase))).map((e) => ({ ...e, weight: balanceWeight(e, state) }));
  return weightedPick(weighted);
}`;

const newBalanceWeight = `function recentRepeats(list = [], value) {
  return list.filter((item) => item === value).length;
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
  const recentPacks = state.memory.recentPacks || [];
  const recentTags = state.memory.recentTags || [];
  if (event.pack && recentPacks.at(-1) === event.pack) bonus -= 2.4;
  else if (event.pack && recentPacks.includes(event.pack)) bonus -= 1.1;
  const tagPenalty = (event.tags || []).reduce((sum, tag) => sum + recentRepeats(recentTags, tag) * 0.2, 0);
  bonus -= tagPenalty;
  return (event.weight ?? 1) + bonus;
}

function chooseEvent(state) {
  const chains = chainEvents
    .filter((event) => !state.usedIds.includes(event.id) && matchesConditions(state, event.conditions))
    .sort((a, b) => b.priority - a.priority);
  if (chains.length > 0) return chains[0];

  const phase = phaseOfRound(state.round);
  const activeCandidates = baseEvents.filter((event) => !state.usedIds.includes(event.id) && event.phase.includes(phase) && matchesConditions(state, event.conditions));
  const fallbackCandidates = baseEvents.filter((event) => event.phase.includes(phase) && matchesConditions(state, event.conditions));
  const phasePool = activeCandidates.length ? activeCandidates : (fallbackCandidates.length ? fallbackCandidates : baseEvents.filter((event) => event.phase.includes(phase)));
  const weighted = phasePool.map((event) => ({ ...event, weight: balanceWeight(event, state) }));
  return weightedPick(weighted);
}`;

const finalSource = blockReplaced.replace(
  /(?:function recentRepeats\(list = \[\], value\) \{[\s\S]*?\}\n\nfunction scenarioBiasWeight\(event, state\) \{[\s\S]*?\}\n\n)?function balanceWeight\(event, state\) \{[\s\S]*?function applyScheduledEffects\(state\) \{/,
  `${newBalanceWeight}\n\nfunction applyScheduledEffects(state) {`
);
fs.writeFileSync(appPath, finalSource);

if (baseEvents.length < 120) throw new Error(`Expected 120+ base events, received ${baseEvents.length}`);
if (chainEvents.length < 30) throw new Error(`Expected 30+ chain events, received ${chainEvents.length}`);
if (Object.keys(delayedEffects).length < 50) throw new Error(`Expected 50+ delayed effects, received ${Object.keys(delayedEffects).length}`);

console.log(JSON.stringify({
  appPath,
  baseEvents: baseEvents.length,
  chainEvents: chainEvents.length,
  delayedEffects: Object.keys(delayedEffects).length,
}, null, 2));
