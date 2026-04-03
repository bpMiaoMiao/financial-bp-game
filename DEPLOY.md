# Deploy Guide

## Current Release Path

- Local project: `/Users/wuke/Desktop/codex/reigns_bp_v3`
- GitHub repo: `git@github.com:bpMiaoMiao/financial-bp-game.git`
- Public test site: `GitHub Pages`

## Update The Live Test Build

Run these commands in order:

```bash
cd /Users/wuke/Desktop/codex/reigns_bp_v3
npm run build
git add .
git commit -m "Describe your update"
git push
```

## What Happens After `git push`

- GitHub Actions builds the project automatically
- GitHub Pages publishes the latest version automatically
- The public test link stays the same

## If You Want To Check Deployment Status

- Open the repository `Actions` page on GitHub
- Wait for the latest `Deploy To GitHub Pages` workflow to turn green

## Notes

- If the site looks unchanged, try a hard refresh or open it in an incognito tab
- Always run `npm run build` before pushing
- Keep `main` as the stable test branch
