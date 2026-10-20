# Logos: "blueprint" (v2)

Technical-drawing variant of [`../plate`](../plate): same app-icon tile, thin 2.2px glyph over fine hand-drafted construction lines (varied length, weight and opacity, dash-dot axes), instead of a thick white glyph.

| File | Use |
|---|---|
| `<module>.svg` | icon with construction lines |
| `<module>-full.svg` | icon with lines + wordmark (`LARA` `#E8312F`, name in module colour) |

Colours and glyphs are the same as `plate`. Files are generated: edit `build.mjs` and run `node build.mjs`. Line irregularities come from a fixed seed per module, so output is stable.

Draft: the wordmark is live text in a system font stack, not outlined paths.
