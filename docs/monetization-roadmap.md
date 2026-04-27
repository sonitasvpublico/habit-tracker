# Habit Orbit - Monetization Roadmap

## Goal
Launch fast with a solid free experience, validate user engagement, then add in-app purchases (IAP) in a safe and scalable way.

## Product Principles
- Keep the core habit tracker free and useful.
- Monetize cosmetic value (themes, stickers, visual packs), not essential progress.
- Reward consistency first (points), then offer premium extras.
- Avoid complexity in v1.

## Phase 1 - Launch Ready (No real-money purchases yet)

### What to include
- Internal points system (earned by consistency).
- Unlockable cosmetic rewards with points:
  - Color themes
  - Sticker packs
  - Profile badges
- Weekly challenges (example: complete 5 habits/day for 5 of 7 days).

### Why
- Validates interest in gamification.
- No payment integration risk.
- Faster app review and shipping.

### Suggested point economy
- Daily completion target met (>= 5 habits): +20 points
- Perfect week (7/7 days target met): +200 bonus
- First streak milestones:
  - 3 days: +30
  - 7 days: +80

## Phase 2 - Introduce Real Purchases (IAP)

### Platform requirement
For digital items inside iOS/Android apps, use Apple/Google in-app purchases only.

### Recommended implementation
- Use RevenueCat for easier subscription/IAP management across iOS + Android.
- Keep your own local "entitlement" flags simple:
  - `theme_pack_1_unlocked`
  - `sticker_pack_1_unlocked`
  - `premium_bundle_unlocked`

### Initial paid products
- Theme Pack 1: `$0.99`
- Sticker Pack 1: `$1.99`
- Premium Bundle: `$2.99`

### UX requirements
- Clear "Restore Purchases" button.
- "Owned" state visible in store UI.
- Purchases should never block existing earned unlocks.

## Phase 3 - Optimize Revenue and Retention

### Add-ons
- Limited seasonal packs.
- Streak celebration bundles.
- Time-limited challenges with cosmetic rewards.

### Metrics to track
- D1/D7 retention
- Weekly active users
- % users earning points weekly
- Store conversion rate
- Average revenue per paying user

## Suggested Data Model (simple)

```ts
type UserEconomy = {
  points: number
  unlockedItems: string[] // ids of themes/stickers
  weeklyPerfectCount: number
}
```

## Risks and How to Avoid Them
- Over-monetization -> Keep core features free.
- Complex pricing early -> Start with 2-3 products only.
- App Store rejection -> Use official IAP flow, no external checkout for digital goods.

## Practical Next Steps
1. Ship v1 with points + free unlockables only.
2. Measure engagement for 2-4 weeks.
3. Add RevenueCat and 2-3 cosmetic IAP products.
4. Iterate pricing and rewards based on retention + conversion.

## Short Copy Ideas (Store / In-app)
- "Earn points by staying consistent."
- "Unlock visual rewards as you level up."
- "Support Habit Orbit and unlock premium styles."
