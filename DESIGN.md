# DESIGN.md: karandeepbhardwaj.me

Base system: **Raycast**, taken from the Awesome DESIGN.md collection
(VoltAgent/awesome-design-md, 84 real site systems). Chosen by Karandeep
on 2026-11-18, over a Linear based version with a VoltAgent green accent
(kept as index-linear-green.html) and over the earlier cream editorial
versions, which read as Claude and Cursor colours.

Raycast's core idea, applied here: the page is one continuous dark
surface that uses the same chrome as a product UI. Hairline borders,
tight radius, a single white pill CTA, and saturated colour reserved
for small functional moments.

## Colour (Raycast tokens)
- Canvas `#07080a`
- Surface `#0d0d0d`, Surface elevated `#101111`, Surface card `#121212`
- Ink `#f4f4f6`, Body `#cdcdcd`, Mute `#9c9c9d`, Ash `#6a6b6c`, Stone `#434345`
- Hairline `#242728`, Hairline soft white at 8 percent, strong at 16 percent
- Primary: white `#ffffff`, pressed `#e8e8e8`, on primary black `#000000`.
  All primary buttons are white pills.
- Accents, reserved and functional only:
  - Red `#ff6161`: the Authenticate node in the diagram, small hovers.
    Hero stripes `#ff5757` to `#a1131a`, the signature top banner.
  - Green `#59d499`: status only (the dot beside Toronto).
  - Blue `#57c1ff`: focus rings only.
  - Yellow `#ffc533`: available in the system, currently unused.
- Selection: white background, black text.
- Banned: gradients anywhere except the hero stripes, cream or paper
  backgrounds, serif display type, terracotta, glassmorphism, three
  equal cards, chip walls, fade up scroll animations, invented stats.

## Type
- Inter with the `ss03` stylistic set enabled site wide
  (`font-feature-settings: "calt", "kern", "liga", "ss03"`), which is a
  real Raycast detail. Production serves the self-hosted Hanken Grotesk
  already in this repo as the primary face, with Inter in the stack, so
  the feature settings apply wherever Inter is present.
- Display weight 600, headings 500 to 550, body 400. Display tracking
  near zero at hero size per Raycast tokens, tight negative tracking
  only on section titles.
- Mono (ui-monospace) for window labels, dates and the diagram only.
- Scale: hero 64px, section titles 40px, body 16 to 18px, captions 12px.

## Layout and components
- One scrolling page, max width 1120px, section rhythm about 96px.
- Radius: 10 to 12px panels, pills (999px) for buttons and source chips.
- Panels: surface fills with 1px hairline borders, no shadows. The one
  soft shadow in earlier versions is gone; Raycast chrome is flat.
- Signature moment: the diagonal red stripe banner across the very top
  of the page, 42px tall. It is the only loud element on the page.
- Product first: hero copy plus a framed product panel (the Sana stage)
  with one satellite panel straddling its corner, then a facts panel,
  then the story panel with the state diagram.
- Primary action above the fold: Get in touch, the white pill.

## Content rules (unchanged through every version)
- Real content only, numbers inside the sentences that explain them.
- First person, plain verbs, employer agnostic narrative: agent
  orchestration, not channel or programme names.
- No em dashes anywhere.
- Sun Life appears only as the employer name on its Work entry.
