# Emberfall — Art Direction Brief & Prompt Pack

Hand this document to an image model. It contains the style rules, the technical specs the
game code expects, and copy-paste prompts for every asset.

**How to use it:** paste the Style Contract (section 2) first and ask the model to acknowledge
it. Then paste one prompt block at a time. Generating everything at once produces inconsistent
results — batch by category and keep the first approved image as the reference for the rest.

---

## 0. Read this first — originality

Every design here is original to this project. No prompt in this document names a real game,
film, studio, franchise, or existing character. If you edit these prompts, keep it that way —
naming an existing property is what makes an image model reach for copyrighted art, and it is
the most common reason a generation gets refused.

**Append this line to any prompt if a model hesitates:**

> All designs must be entirely original. Do not reference, imitate, or resemble any existing
> game, film, comic, or franchise character. No trademarked logos, emblems, or insignia. Use
> only generic fantasy archetypes rendered in the style described.

**If a generation still gets flagged**, the usual culprits and their fixes:

| Likely trigger | Replace with |
|---|---|
| "chibi" | "stylized short proportions, head roughly one third of total height" |
| "anime style" / "cartoon style" | "flat vector illustration" |
| Naming any real game or studio | Describe the visual qualities instead |
| "sprite sheet" | "character reference strip, multiple poses in a row" |
| A character name that echoes an existing property | Rename it — the model only sees the words |

---

## 1. The game in one paragraph

Emberfall is a fantasy dungeon-crawl action game. You control a single champion seen from a
raised three-quarter view. You only attack while standing still, so play is a rhythm of stopping
to strike and running to dodge. You descend through fifty stages across five environments,
choosing one upgrade per room, and collect equipment that fuses three-into-one across seven
rarity tiers.

Tone: **grim but not grisly** — a lantern-lit descent, warm embers against cold stone. Not cute,
not gory. Carved wood and hammered metal rather than gloss and neon.

*A note on the project name: "Emberfall" appears as a setting in at least one published novel
series. Unlikely to matter for a personal project, but worth a trademark search before publishing
commercially. Alternatives in the same register: Ashfall Deep, The Cinder Reach, Lantern Hollow,
Emberdark.*

---

## 2. Style Contract

Paste this block verbatim before any asset request.

> **EMBERFALL STYLE CONTRACT**
>
> All assets share one visual language. Follow every rule. All designs are original — do not
> reference or resemble any existing franchise, character, or property.
>
> - **View:** raised three-quarter view. Camera roughly 60° above the horizon. Characters face
>   the viewer; they never turn away.
> - **Rendering:** clean flat vector shading with two tones per surface — a base color and one
>   darker shadow tone. One soft rim light from the upper left. No airbrushed gradients, no
>   photorealism, no painterly texture.
> - **Outline:** every silhouette carries a dark outline in near-black `#0B0912`, roughly 3% of
>   the asset's width. Interior lines thinner or absent. The outline is what makes these readable
>   at thumbnail size.
> - **Proportions:** stylized and compact. Head roughly one third of total body height. Large
>   simple eyes, mitten hands with no separate fingers, short sturdy legs.
> - **Silhouette rule:** each character must be identifiable in pure black at 40 pixels.
>   Distinguish by outline shape — horns, hoods, capes, weapon profile — never by color alone.
> - **Color discipline:** at most four hues per asset plus black and off-white. Saturated accents
>   against desaturated bases.
> - **Lighting:** assets are lit neutrally and are NOT baked into any background. Ground shadows
>   are drawn separately by the game.
> - **Forbidden:** text or labels baked into art, drop shadows, glow bloom, lens flare, neon
>   palettes, watermarks, borders, background scenery on character art, any real-world logo,
>   emblem, or insignia.
>
> **Master palette** — do not invent colors outside these families:
>
> | Role | Hex |
> |---|---|
> | Near-black outline | `#0B0912` |
> | Deep ink base | `#0E0C14` |
> | Stone panel | `#1A1725` |
> | Bone / parchment | `#EFE7D2` |
> | Ember orange | `#E0703A` |
> | Gold | `#E8B04B` |
> | Verdigris green | `#6FAF8C` |
> | Blood red | `#C0364B` |
> | Amethyst | `#9B5FD0` |
> | Cold blue | `#4C9BD6` |

---

## 3. Technical specs

The game renders at a logical resolution of **390 × 690**. All art delivered as **transparent
PNG**, trimmed tight with 4px padding.

| Asset type | Canvas | Notes |
|---|---|---|
| Champion | 256 × 256 | Fills ~70% of height, centered, feet near bottom |
| Standard enemy | 192 × 192 | Same framing |
| Boss | 384 × 384 | |
| Equipment icon | 256 × 256 | Object only — no card, frame, or background |
| Rarity frame | 256 × 256 | Border only, hollow center |
| Ground tile | 512 × 512 | Seamlessly tiling |
| Environment backdrop | 1170 × 588 | Parallax scenery for the menu |

**Animation.** Deliver each as a horizontal strip, frames left to right, evenly spaced.

| Animation | Frames | Description |
|---|---|---|
| `idle` | 4 | Gentle breathing, slight vertical bob |
| `walk` | 6 | Full stride cycle, cape and hair trailing |
| `attack` | 4 | Wind-up, release, follow-through, return |
| `hurt` | 2 | Recoil with a flinch |
| `die` | 5 | Stagger, collapse, dissolve into embers |

**File naming** — the loader expects exactly this, all lowercase:

```
champion_wren_idle.png      enemy_chaser_idle.png
champion_wren_walk.png      enemy_boss_ashen_attack.png
gear_weapon_hbow.png        frame_rarity_legendary.png
gear_armor_dusk.png         env_frozen_floor.png
ui_button_primary.png       env_frozen_backdrop.png
```

---

## 4. Champions

Seven characters. Request the **lineup first** to lock consistency, then individual animations.

**Prompt — the lineup:**

> Following the Emberfall Style Contract, draw a lineup of seven original fantasy adventurer
> characters standing side by side on a plain transparent background, all at the same scale,
> all facing the viewer in a neutral standing pose. Raised three-quarter view. Stylized short
> proportions with heads roughly one third of total height. These are original designs and must
> not resemble any existing game, film, or comic character. Left to right:
>
> 1. **Wren, the Ranger.** Young human archer. Bone-white belted tunic, forest-green half-cape
>    over one shoulder, dark gold hair tied back with a leather cord. Plain recurve wooden bow.
>    Calm, steady expression. Palette: `#EFE7D2` cloth, `#3E7A5E` cape, `#C9A227` hair.
> 2. **Kazimir, the Blade.** Broad-shouldered fighter. Bare scarred arms, cropped black hair,
>    deep red cloth wrap across one shoulder, plain leather belt. Heavy notched cleaver held low.
>    Grim, jaw set. Palette: `#D8C3A5` skin, `#8E2B3A` wrap, `#2A2436` hair.
> 3. **Mira, the Grovekeeper.** Serene herbalist. Layered blue-grey robes with rolled sleeves,
>    moss-green hair with small leaves woven through it. Gnarled oak staff topped with a pale
>    glowing seed. Palette: `#F2E3D8` robe, `#3A5C8E` overlayer, `#6FAF8C` hair.
> 4. **Mourne, the Shade.** Slender, quick-built. Face half-hidden inside a deep violet hood
>    with a high collar. Twin curved daggers held reversed. Faint wisps of shadow at the ankles.
>    Palette: `#C9BBD4` skin, `#4A3A6E` hood, `#1E1A2C` cloth.
> 5. **Thorn, the Wildbound.** Stocky, fur-trimmed olive cloak, tan weathered skin, shaggy brown
>    hair with two small antler nubs. Bladed steel ring held at his side. A faint translucent
>    wolf shape sits at his heel. Palette: `#B98A5E` skin, `#6B7A3A` cloak, `#5C3A21` hair.
> 6. **Aurenne, the Duskcaller.** The most elaborately dressed of the seven. Pale, upright, long
>    magenta-pink hair. Deep violet layered coat with gold scrollwork along the hem and cuffs.
>    Ornate dark-metal bow. Small dusk-colored motes drift around her. Palette: `#EDE2F5` skin,
>    `#3C2058` coat, `#C94F8A` hair, `#E8B04B` scrollwork.
> 7. **Ossyra, the Hollowed.** Gaunt and hollow-cheeked, ember-orange hair, near-black robes
>    frayed at the hem. Long spear with a rough crystal head. One eye faintly lit. Palette:
>    `#B8AEE0` skin, `#2A1F44` robe, `#E0703A` hair.
>
> Flat two-tone vector shading, heavy `#0B0912` outlines, transparent background, no text,
> no ground shadows, no scenery, no logos or emblems.

**Prompt — individual walk cycle** (repeat per champion):

> Using the previous lineup as the exact style and proportion reference, draw a character
> reference strip for [NAME]: six poses in a single horizontal row, evenly spaced, showing one
> complete walking stride — contact, low, passing, high, and the mirrored half. 256×256 per
> pose, transparent background. Cape and hair trail behind the motion. The character stays
> centered in each pose and faces the viewer throughout. Same colors and outline weight as the
> lineup. Original design, no resemblance to existing characters. No text, no numbering.

---

## 5. Enemies

Eight standard types plus bosses. **Every enemy is a construct or beast — no human-looking
figures**, so players never confuse them with champions.

> Following the Emberfall Style Contract, draw a reference sheet of eight original fantasy
> monsters on a transparent background, evenly spaced in two rows of four, all facing the
> viewer, at consistent relative scale. These are original creature designs and must not
> resemble any existing game or film creature. Each must be distinguishable by silhouette alone:
>
> 1. **Chaser** — smallest. A snarling crimson imp shaped like a forward-leaning wedge, two
>    stubby legs, no arms, permanently mid-lunge. Base `#C0364B`.
> 2. **Shooter** — squat and boxy. An amber stone golem with a single horizontal slot for an
>    eye and a crossbow mechanism fused into its chest. Base `#D08A3C`.
> 3. **Orbiter** — a floating violet crystal shaped like a cut diamond, four smaller shards
>    rotating around it, one trailing ribbon beneath. No legs; it hovers. Base `#8A7CC4`.
> 4. **Tank** — largest of the eight, twice the Chaser's height. A slate-blue armored beetle
>    with a broad hexagonal shell-shield and very short legs. Base `#5E7FB8`.
> 5. **Splitter** — a lumpy green stone-and-moss creature with deep fracture lines running
>    through it, clearly about to break apart. Base `#6FAF8C`.
> 6. **Shard** — a tiny jagged green splinter, one third the Splitter's size, eyeless, sharp.
> 7. **Hexer** — a bodiless magenta spirit: a floating triangular mask above trailing tatters,
>    three small carved sigils orbiting it. Base `#B84FA0`.
> 8. **Lancer** — a sleek orange charger shaped like an arrowhead, one long forward horn,
>    swept-back spines along its back, built for ramming. Base `#E0703A`.
>
> Flat two-tone shading, heavy dark outlines, transparent background, no text, no labels.

**Bosses.** Five, one per environment, 384×384. Request individually.

> Following the Emberfall Style Contract, draw an original boss creature for the [NAME]
> environment. Stylized compact proportions but massive — roughly three times a standard
> enemy's height. Menacing, with one dominant readable feature. Facing the viewer, transparent
> background. Original design with no resemblance to any existing game or film creature.
>
> - **Ashen Vault — "The Cinderwarden":** a hulking forge-construct of cracked dark stone with
>   molten orange seams glowing through the fissures, crowned with burnt iron spikes.
>   Accents `#E0703A`.
> - **Frozen Reach — "Rimeclaw":** a shaggy white ice-beast with jagged blue crystal growths
>   erupting along its back and one enormously oversized frozen claw. Accents `#7FC4E8`.
> - **Sunken Temple — "The Verdant Idol":** an overgrown carved stone head, floating, wrapped
>   in vines with root-tendrils hanging beneath and green light in its hollow eye sockets.
>   Accents `#6FAF8C`.
> - **Bloodwood — "Thornmother":** a gnarled crimson tree-figure with branching antler-limbs
>   and a cluster of glowing red fruit at her core. Accents `#C0364B`.
> - **Void Spire — "The Hollow Choir":** three linked violet carved masks orbiting a central
>   dark rift, tattered robes trailing away into nothing. Accents `#9B5FD0`.

---

## 6. Equipment icons

All icons are **the object alone** — no card, no frame, no background. The game draws the
rarity frame separately.

> Following the Emberfall Style Contract, draw a set of original fantasy [SLOT] icons as flat
> vector game-inventory objects. Each centered on its own transparent background, 256×256,
> viewed straight on at a slight tilt, heavy `#0B0912` outline, two-tone shading, one soft
> highlight from the upper left. Generic fantasy designs, original, with no trademarked emblems
> or resemblance to existing game items. No card, frame, border, background, or text.

**Weapons** — shapes must be distinct, since weapon class changes how the game plays:
- `hbow` Hunter's Bow — plain curved wooden recurve bow
- `tfang` Twin Fang — pair of crossed curved daggers
- `ostaff` Oakheart Staff — knotted wooden staff, green seed-crystal at the top
- `cleav` Iron Cleaver — heavy rectangular notched blade
- `chak` Moon Chakram — bladed steel ring with four crescent points
- `ospear` **Veilpiercer** (top tier) — ornate silver spear, star-shaped guard, floating blue gem
  at the head, radiating light shards
- `vscythe` **Voidmaw Scythe** (top tier) — black scythe whose blade forms a toothed maw
- `sgrim` **Starfall Grimoire** (top tier) — open floating tome with a small galaxy spilling out

**Helmets:** Vagrant Hood, Leather Cowl, Iron Helm, Horned Barbute, Ashen Mask (cracked pale
faceplate), Aurelian Circlet (winged gold circlet)

**Armor:** Wanderer's Robe, Hide Vest, Plated Mail, Chainweave, Duskweave Cloak (violet,
star-flecked), Wyrmplate (overlapping red-gold scales)

**Rings:** Copper Band, Jade Band, Ruby Signet, Eye of the Storm (silver band, swirling storm gem)

**Charms:** Bone Charm, Wolf Tooth, Moon Pendant, Heart of Ember (caged burning gem)

**Boots:** Worn Boots, Swift Greaves, Ember Spurs (flame accents), Zephyr Tread (winged, wispy)

**Runes** — twelve hexagonal stones:

> Draw twelve original hexagonal rune stones, each carved with a single abstract glowing sigil.
> Four families of three: red `#D8483C` (flame, cinder, fang motifs); green `#5FA85E` (shield,
> wall, leaf); blue `#4C9BD6` (gust, arrow, feather); violet `#9B5FD0` (eye, star, spiral).
> Weathered stone with carved channels lit from within. Invented symbols only — not any real
> alphabet, script, or religious symbol.

---

## 7. Rarity frames

Seven frames overlaid on every icon. **Hollow centers** — borders only. Highest-value batch:
right now item tiers are distinguished only by border color.

> Draw seven original ornate square inventory frames for a fantasy game, 256×256 each, hollow
> center, transparent background. Each is a decorative border only, escalating in ornateness:
>
> 1. **Common** `#7C7689` — plain thin grey metal band, no ornament
> 2. **Good** `#5FA85E` — simple green-edged band with small corner studs
> 3. **Rare** `#3E86D6` — blue band, beveled corners, a small gem at top center
> 4. **Epic** `#9B5FD0` — violet band with scrollwork at all four corners
> 5. **Legendary** `#E8A22B` — gold band with filigree, wing motifs at the upper corners, faint
>    inner glow
> 6. **Mythic** `#D33B52` — crimson band with jagged crystal growths breaking past the edges
> 7. **Chaotic** `#F04FA0` — magenta band, asymmetric shattered edges, fragments floating
>    outside the border, a four-pointed star at top center
>
> Flat vector, heavy dark outline, two-tone shading. Original ornamental designs, no heraldry,
> no real-world emblems, no text.

---

## 8. Environments and UI

**Ground tiles** — five, seamlessly tiling at 512×512:

> Draw a seamlessly tiling top-down dungeon floor texture, flat vector style, deliberately
> subtle and low-contrast so characters read clearly on top. Dark and desaturated with faint
> cracks and scattered debris. Original design. Environment: [below].
>
> - Ashen Vault: cracked charcoal flagstone, faint ember glow in the seams. Base `#1C1826`
> - Frozen Reach: frost-rimed blue-grey slabs with a thin ice sheen. Base `#141E28`
> - Sunken Temple: mossy green stone, shallow water pooling in the grooves. Base `#16221C`
> - Bloodwood: dark crimson soil threaded with pale roots. Base `#231320`
> - Void Spire: fractured violet obsidian, faint starfield through the gaps. Base `#1A1730`

**Backdrops** — one per environment, 1170×588:

> Draw a wide original fantasy landscape in flat vector style with three clearly separated depth
> layers: distant peaks or spires, a mid-ground ridge, and a foreground ledge with a flat area a
> character could stand on. Night lighting, moon in the upper right. Muted and low-contrast —
> interface text will sit over the lower third. Environment: [as above]. No characters, no text.

**UI kit:**

> Draw an original fantasy game interface kit on a transparent background, flat vector style
> with heavy dark outlines, dark stone-and-gold theme:
> - Primary button, gold `#E8B04B` with a darker bottom bevel, in normal and pressed states
> - Secondary button, hollow with a thin `#463D5F` border
> - Resource capsules for a gold coin, a green gem, and an orange flame
> - Health bar: outer frame plus separate fill bars in green, amber, and red
> - Line-art tab icons: crossed swords, a helmet, a shield, a hexagonal rune, an anvil
> - A star icon in filled and empty states
> - A padlock icon and a treasure chest icon
>
> Generic original iconography, no brand marks or recognizable logos. No text on any element.

---

## 9. Delivery checklist

- [ ] Transparent PNG, no baked background or ground shadow
- [ ] Centered, ~4px padding, correct canvas size from section 3
- [ ] Outline is `#0B0912`, consistent weight across the set
- [ ] Readable as a pure black silhouette at 40px
- [ ] No text, watermark, frame, or border baked into the art
- [ ] Animation strips horizontal, evenly spaced, consistent frame width
- [ ] Filename matches the section 3 pattern exactly
- [ ] Colors drawn from the master palette

**Priority order** if generating in batches:

1. Champion lineup — locks the style for everything else
2. Rarity frames — biggest visual payoff for the least work
3. Enemy reference sheet
4. Weapon icons
5. Champion walk and attack strips
6. Ground tiles and backdrops
7. Remaining equipment icons
8. UI kit

---

## 10. Keeping it consistent

Image models drift between generations. Three habits that help:

- **Attach the approved lineup image** as a reference for everything generated afterward.
- **Batch related assets into one image.** Six icons in a single generation match each other far
  better than six separate generations.
- **Lock one asset, then say "match this exactly."** The first approved champion becomes the
  style anchor for the other six.

---

## 11. Rights, briefly

Anything generated from these prompts should be original work — the descriptions are generic
fantasy archetypes with invented names, and no real property is referenced anywhere. Two things
still worth knowing:

- **Check your image tool's terms** for what you're permitted to do commercially with its output.
  Policies differ between services and change over time.
- **Ownership of AI-generated images is unsettled.** In the US, purely machine-generated work may
  not be copyrightable at all. For a personal project that's a non-issue. If this ever goes
  commercial, that's a question for an IP attorney — I'm not one, and this is general information
  rather than legal advice.
