# Logos: "plate" (v1)

App-icon style: rounded square in the module colour, one white 5px-stroke glyph.
Source of truth for colours: the table below.

| Module | Glyph | Colour |
|---|---|---|
| Laraplate | stack | `#5FA21F` |
| Core | chip | `#0D7C66` |
| AI | sparkle | `#B5246F` |
| CMS | page | `#0E7FA3` |
| CRM | contacts | `#6D4AD0` |
| ERP | modules | `#475569` |
| MES | gear | `#C27803` |
| SAO | correlation | `#2F5FD0` |
| Shop | bag | `#D9532F` |
| Edge | gateway | `#9A5B12` |

Files: `<module>.svg` is the icon alone (favicon, sidebar); `<module>-full.svg` adds the wordmark (`LARA` red `#E8312F`, name in module colour).

Files are generated: edit `build.mjs` and run `node build.mjs`.

Draft: the wordmark is live text in a system font stack, not outlined paths. Convert to paths once the final font is chosen.
