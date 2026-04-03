# 财权 Reigns-like BP Game v3

这版已经包含：
- 平衡优化（事件抽取会参考当前盘面压力）
- 开局随机化（5 种随机初始公司状态）
- 分享结局页（Web Share + 复制文案）
- 基础事件、链式事件、延迟后果

## 启动

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
```

## 说明
- `src/App.jsx` 是主逻辑文件。
- 这是 React + Vite 源码包，适合继续迭代。
- 如果你后面要，我下一步最建议做的是：
  1. 行业事件包拆分
  2. 结局分享卡导出为图片
  3. 真正的数值平衡日志与调参面板
