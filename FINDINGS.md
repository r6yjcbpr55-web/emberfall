# Emberfall — first play report

The game had never been run. This is what happened when it was, on 2026-09-06.

Method: headless Chromium at 430 × 932 CSS pixels, the iPhone 15 Pro Max size the
project targets. A debug copy exposes the IIFE's internals as `window.__EF` so a
test can read `B`, `P` and `S`; the shipped `index.html` is unchanged. An
autopilot stands still to attack and retreats from enemies, bullets, telegraphs
and hazards. A virtual clock keeps `dt` at a steady 1/60 s while frames run as
fast as the CPU allows, so a fifty-room stage finishes in minutes. See
`tools/README.md`.

## What was played

| Attempt | Loadout | Outcome |
|---|---|---|
| 1 | starting Common bow | died, room 30 of 50, 104 kills |
| 2 | starting Common bow | died, room 4 |
| 3 | starting Common bow | died, room 23 |
| 4 | starting Common bow | died, room 13 (elite den) |
| 5 | sandbox Mythic, ranged | **cleared stage 1**, 50 rooms, 181 kills, 3 stars |

Not one JavaScript exception in roughly 1,700 seconds of game time across those
five runs, plus every hub screen, forge fusion, the boon slot machine, the
sanctuary, the treasure vault, hazards, elites and a named boss fight. For code
that had never been executed, that is a remarkable result. Everything below is
what turned up anyway.

---

## Defects

### 1. No `<meta charset="utf-8">` — every glyph breaks off Netlify

The file declares no encoding, so it depends entirely on the host sending one.
Served without a `charset` in the `Content-Type` header, Chromium falls back to
windows-1252 and `document.characterSet` reports `windows-1252`. The resource
bar renders `â—† 0  â—‡ 0  âœ¦ 0`, every `·` becomes `Â·`, every 🔒 becomes `ðŸ"'`.

Netlify does send `charset=UTF-8`, which is why this has never been visible. It
appears the moment the file is opened from disk, moved to another host, or
served by anything simpler. One line in `<head>` fixes it permanently.

### 2. No `<!doctype html>` — the game runs in quirks mode

`document.compatMode` is `BackCompat`. The layout happens to survive at 430 × 932,
but every box-model and table rule is on the legacy path, and that is a landmine
under the file-splitting work in priority 3. Also one line.

### 3. Every generic warden is drawn as the Void Spire boss

`drawEnemy` line 4585: `const key = e.def ? e.name : ""`. Generic wardens — the
bosses in rooms 10, 20, 30 and 40 of *every* stage, and room 50 of every stage
not divisible by ten — have no `def`, so `key` is `""` and the `if/else if` chain
falls through to its final `else`, which is the Hollow Choir. The first boss a
new player meets, in the Ashen Vault on stage 1, is three orbiting violet masks
tinted orange. Confirmed by screenshot. Named bosses render correctly.

### 4. The Starfall Grimoire can never be obtained

`sgrim` is in the `CHAOTIC` exclusion list, so `rollDrop()` never returns it. It
has no `set` field, so `rollSPiece()` never returns it either. Nothing else
creates gear. 28,000 simulated drops across all 70 stages produced it zero times.
It is one of the three top-tier weapons and a full item design — icon, skill,
stats — that is unreachable by any path in the game.

### 5. S-tier sets are unreachable, and the item screen lies about it

Bosses drop set pieces at Epic (`rollSPiece(3)`, lines 3710 and 3740), but
`setCounts()` only counts a piece toward its set at Mythic or above (line 910).

So: equip the Oracle Diadem you just won and the panel reads **"Oracle set · 0 of
6 equipped"** while you are wearing it. Verified directly.

Reaching Mythic on one piece means forging nine copies of that exact piece
(3→4→5, three-into-one twice), plus 8 spare Rare-or-better and 14 spare
Epic-or-better items as fusion material. There are 18 distinct set pieces in the
drop pool, and S-tier drops at 20% from a boss stage. Two-piece Oracle — the
cheapest bonus in the system — is on the order of a thousand boss-stage clears.
Three full six-piece sets, all their bonuses and all their hand-drawn icons are
currently decoration.

### 6. The clear screen understates the reward

| | granted | printed |
|---|---|---|
| stage 1 gold | 1,536 | 1,522 |
| stage 1 soulfire | 10 | 7 |
| stage 52 gold | 3,288 | 2,560 |
| stage 52 soulfire | 102 | 79 |

Line 3751 grants `B.gold + stage*44` and `8 + stage*1.8`; line 3762 prints
`B.gold + stage*30` and `6 + stage*1.4`. The player is being paid more than the
screen admits, which is the harmless direction, but it makes the reward feel
worse than it is at exactly the moment you are deciding whether to keep going.

### 7. "Next stage" vanishes from stage 50 onward

Line 3764: `$("endNext").style.display = B.stage < 50 ? "" : "none"`. `STAGES` is
70. Clear stage 50 through 69 and the end screen offers only "Camp" — the two
BRUTAL chapters have to be re-entered by hand from the campaign list every time.
Verified at stages 52 and 69.

### 8. The Runes empty state describes something that doesn't happen

> "No runes yet. Bosses drop them — clear the fifth room of any stage."

Room 5 is the sanctuary, which has no boss. Runes are only rolled in `finish()`,
after all fifty rooms: 35% on a normal stage, 90% on a boss stage. A new player
following that sentence will clear five rooms, find no rune, and conclude the
system is broken.

---

## Curves that don't reach their own cap

### 9. Account level 100 needs about 1.8 billion experience

`plvNeed(l) = 120 × 1.16^(l-1)`. Level 50 alone costs 172,831; level 99 costs
248,922,521; the running total to 100 is ~1.8 × 10⁹. A stage clear pays
`60 + stage×22 + kills×1.5`, so a few hundred early and a couple of thousand
deep. Even 5,000 full stage clears lands around level 64. The 1–100 range in the
design notes is off by roughly three orders of magnitude at the top.

### 10. In-run levels stop around 8, so the 12-boon branch is dead

`xpNeed` grows at 1.44 per level while `gainXP` decays experience by room number
(×0.275 by room 50). Observed: level 7 by room 30, level 8 across a full clear.
`gainXP` has a branch converting level-ups into flat +8% attack once you hold 12
non-sanctuary boons — that branch cannot be reached in a campaign run.

### 11. Stage 51 is a cliff, not a ramp

`scale()` applies `1 + (stage-50)×0.14` on top of the existing curve. Chaser
health by stage:

| stage | 40 | 50 | 60 | 70 |
|---|---|---|---|---|
| HP | 2,179 | 3,232 | 10,761 | 22,539 |
| contact damage | 439 | 613 | 1,946 | 3,920 |

A 3.3× step in ten stages. "BRUTAL" is labelled in the UI, so some of this is
intent, but the shape is a wall rather than a slope.

---

## Structure and feel

### 12. Fifty rooms per stage, no checkpoint

A full stage 1 clear with an overpowered ranged loadout took 5m 24s of game time
and never dropped below full health. A normal-strength run was on pace for about
16 minutes. Die at room 30 and you keep half the gold you picked up and nothing
else — no gear, no rune, no stage unlock.

The four Common-bow attempts died at rooms 4, 13, 23 and 30. An automated player
that only ever retreats is worse than Alex is, so read those as a floor rather
than a verdict. What is not a matter of skill: the loss is 10–15 minutes long,
and the first stage of the game is where a player decides whether to keep
playing.

Room 13 is an elite den on every stage including the first, and that is where one
attempt ended.

### 13. Small things

- The slot glyph badges in the left gear column (`.slot .glyph`, offset −6px) are
  clipped by `overflow-x: hidden` on `.grow`.
- `rollDrop()` contains `if(false) pool=[];` — a leftover branch.
- `countFree()` is never called, and tests `b.angel` on entries of `P.boons`,
  which holds strings.
- `openItem` reads `g.name || g.n`; no gear record has a `name` field.
- The sandbox "full Mythic loadout" hands you the Iron Cleaver, a melee weapon,
  which is the hardest possible class to evaluate the rest of the game with.
- Treasure vault gear is added to the inventory when the room generates, not
  when you pick anything up; the room itself is over in about a second because
  every orb magnets to you as soon as it is clear.

---

## Suggested order

1. `<meta charset>` and `<!doctype>` — two lines, removes a whole class of
   future confusion.
2. The warden sprite fallback (#3) — every stage has four of them.
3. The reward text and the "Next stage" gate (#6, #7) — both one-line.
4. The rune empty-state copy (#8).
5. Set-piece rarity (#5) and the Grimoire's drop pool (#4) — these decide whether
   a third of the item art ever gets seen.
6. The two curves (#9, #10) and the stage-51 step (#11), which is really the
   balance-simulation work already on the roadmap.
