# Emberfall

A mobile roguelike dungeon crawler in the spirit of Archero. Built by Alex, for Alex.
No monetization, no paywalls, no energy timers — everything unlockable through play.

## The one rule that defines the game

**You only attack while standing still. Moving cancels your attack.** Every design
decision serves that tension. If a change makes standing still safe, or makes moving
free, it's wrong.

## Current state

Everything lives in a single file: `index.html`. Roughly 3,600 lines — HTML, CSS and
JavaScript in one document, no build step, no dependencies beyond two Google Fonts.

It was built entirely through chat, patched by string replacement, and verified only by
`node --check`. **Nothing in it has ever been run by the person who wrote it.** Assume
bugs, especially in rarely-hit code paths.

### What exists

- **70 stages** across 7 worlds, 50 rooms each. Wardens every 10th room, named boss at 50.
- **7 named bosses** with scripted phase-based attack patterns (not randomized).
- **15 champions** in 3 rarity tiers, each with a distinct kit, levelled 1–5 with gems.
- **6 weapon classes** (bow, dagger, staff, blade, chakram, spear) that change how combat feels.
- **7 gear rarities**: Common → Good → Rare → Epic → Legendary → Mythic → Chaotic.
  Drops cap at Epic. Mythic and Chaotic are Forge-only.
- **3 six-piece S-tier sets** (Oracle, Tempest, Umbral) with 2/4/6-piece bonuses.
- **12 runes**, 4 elemental families with resonance bonuses, Mythic tier grants new abilities.
- **~45 in-run boons** presented via a rarity-tiered slot machine reveal.
- **Elite enemies** with 6 modifiers, elite dens, treasure vaults, golden angel sanctuaries.
- **7 hazard types** (vents, spikes, crushers, ice, mire, brambles, void rifts).
- **Boss Rush**, a 10-tier ladder.
- **Account level 1–100** granting HP, attack and dodge.
- Save export/import codes, a sandbox menu, iOS home-screen support.

### What does NOT exist yet

These were scoped and deliberately deferred, because each one touches the save schema
and blind-patching them risked destroying a live save:

- Chest and key system with a rewards tab
- Task centre (daily/weekly with timed resets)
- Companions (10 creatures with distinct abilities)
- Endless mode
- Timed survival stage type
- Floor-based room flow with exit doors you walk through
- Element-typed rune slots (one slot per element)

## Architecture

One file, in this order:

1. `<head>` — meta, fonts
2. `<style>` — all CSS
3. Screen markup — top bar, 5 tab screens, overlays, modal
4. `<script>` — one IIFE containing everything:
   - **Constants and helpers** — `W`, `H`, `TOP`, `fit()`, math utils
   - **Data tables** — `RAR`, `WCLASS`, `GEAR`, `SETS`, `HEROES`, `BIOMES`, `DRESS`, `BOONS`, `RUNES`, `ELITES`, `BOSSES`
   - **Save layer** — `S` object, `STORE`, `load()`, `save()`, `saveNow()`
   - **Sprites** — `drawHero()`, `drawIcon()`, `drawSetIcon()`, `drawRune()`
   - **UI** — `renderTop/Stages/Heroes/Gear/Runes/Forge()`, modals
   - **Battle** — `buildPlayer()`, `genRoom()`, `update()`, enemy AI, `bossScript()`
   - **Render** — `draw()`, `drawEnemy()`, `drawHaz()`, `drawProp()`
   - **Loop and boot**

### Key globals

- `S` — the save object. Persisted as JSON. **Treat as sacred.**
- `B` — battle state. Reset per run.
- `P` — the player during a run. Built fresh by `buildPlayer()`.

### Stat pipeline

`buildPlayer()` composes in this exact order. Order matters — multiplicative bonuses
compound differently if reordered:

1. Champion base stats
2. Gear totals (`totalStats()`)
3. Champion kit flags
4. Gear skills (Legendary+ only, via `hasSkill()`)
5. Champion level bonuses
6. Account level bonuses
7. `applySets()`
8. `applyRunes()`

In-run boons then mutate `P` directly as they're picked.

## Conventions

- **Two-space indent.** Dense, compact lines. Statements often share a line.
- **No semicolonless style, no arrow-function-only style** — match what's there.
- **Comments explain *why*, never *what*.** Most code has none. Only non-obvious
  decisions get a comment.
- **Colours come from the palette.** Ink `#0E0C14`, bone `#EFE7D2`, ember `#E0703A`,
  gold `#E8B04B`, verdigris `#6FAF8C`, blood `#C0364B`, amethyst `#9B5FD0`.
- **Rarity colours are fixed** and defined in `RAR`. Never hardcode them elsewhere.
- **All drawing is procedural canvas.** No image assets yet. That's the next big change.

## Save compatibility — the hard rule

`S` is loaded with `Object.assign(defaults, parsed)`. **Any new field must have a default
in the `S` declaration** or old saves break.

Never rename or repurpose an existing field. Never change the meaning of `S.inv` item
records (`{u, id, r, lv, nw}`). Items are referenced by `u` (uid) from `S.eq` and `S.eqr`.

Before any change touching save structure, add a migration in `load()` and test with an
exported code from the live build.

## Immediate priorities

1. **Run it.** Open it in a browser, play three stages, find what's actually broken.
   Nobody has ever done this with tooling.
2. **Set up git.** Every change becomes a revertable commit.
3. **Split the file.** `src/data/`, `src/battle/`, `src/render/`, `src/ui/`, with a
   trivial bundler or ES modules. 3,600 lines in one file is the main fragility.
4. **Sprite asset pipeline.** The art brief (`emberfall-art-brief.md`) specifies exact
   canvas sizes and filenames. Build a loader with a procedural fallback so missing
   assets still render the old way.
5. **Balance simulation.** Headless-run thousands of stages across champions and weapon
   classes, chart death rates by stage, tune the curve against data instead of guesses.

## Deployment

Currently deployed to Netlify as a single `index.html`. Drag the file to the existing
site's Deploys tab. The URL must stay the same — saves are tied to the origin.

Alex plays on an iPhone 15 Pro Max via Add to Home Screen. **Test at 430×932 CSS pixels.**
The game derives its play height from the real viewport, so layout changes must be
checked at that aspect ratio.

## Working with Alex

He's a filmmaker and producer, not a programmer. He describes problems in terms of how
the game *feels*, and he's been right nearly every time — he diagnosed the camping
problem, the multishot spread, the screen fit, and the difficulty curve before I did.

Explain the reasoning, not just the change. When something is a design tradeoff rather
than a bug, say so and lay out the options. He'll pick well.
