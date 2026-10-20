// Generates the "plate" logo set. Run: node build.mjs
import { writeFileSync } from 'node:fs';

const FONT = "'Arial Narrow','Helvetica Neue',Arial,sans-serif";

const M = [
  ['laraplate', 'PLATE', '#5FA21F', '<path d="M-26,-10L0,-24L26,-10L0,4Z"/><path d="M-26,3L0,17L26,3"/><path d="M-26,16L0,30L26,16"/>'],
  ['core', 'CORE', '#0D7C66', '<rect x="-14" y="-14" width="28" height="28" rx="4"/><rect x="-5" y="-5" width="10" height="10" rx="1"/><path d="M-7,-14V-25M7,-14V-25M-7,14V25M7,14V25M-14,-7H-25M-14,7H-25M14,-7H25M14,7H25"/>'],
  ['ai', 'AI', '#B5246F', '<path d="M0,-27C2,-9 9,-2 27,0C9,2 2,9 0,27C-2,9 -9,2 -27,0C-9,-2 -2,-9 0,-27Z"/>'],
  ['cms', 'CMS', '#0E7FA3', '<rect x="-26" y="-21" width="52" height="42" rx="5"/><path d="M-26,-9H26"/><rect x="-17" y="0" width="13" height="11" rx="1"/><path d="M3,2H17M3,10H17"/>'],
  ['crm', 'CRM', '#6D4AD0', '<circle cx="-9" cy="-9" r="7"/><path d="M-23,21Q-23,6 -9,6Q5,6 5,21"/><circle cx="12" cy="-11" r="6"/><path d="M13,7Q25,8 25,21"/>'],
  ['erp', 'ERP', '#475569', '<rect x="-24" y="-24" width="21" height="21" rx="3"/><rect x="3" y="-24" width="21" height="21" rx="3" fill="#fff"/><rect x="-24" y="3" width="21" height="21" rx="3"/><rect x="3" y="3" width="21" height="21" rx="3"/>'],
  ['mes', 'MES', '#C27803', '<circle r="14"/><circle r="5"/><g stroke-width="6" stroke-linecap="butt"><path d="M0,-25V-18M0,18V25M-25,0H-18M18,0H25"/><path transform="rotate(45)" d="M0,-25V-18M0,18V25M-25,0H-18M18,0H25"/></g>'],
  ['sao', 'SAO', '#2F5FD0', '<path d="M0,0L-19,-16M0,0L19,-16M0,0L0,21"/><circle r="7" fill="@C"/><circle cx="-19" cy="-16" r="5" fill="@C"/><circle cx="19" cy="-16" r="5" fill="@C"/><circle cx="0" cy="21" r="5" fill="@C"/>'],
  ['shop', 'SHOP', '#D9532F', '<path d="M-20,-9H20L17,24H-17Z"/><path d="M-9,-9V-14A9,9 0 0 1 9,-14V-9"/>'],
  ['edge', 'EDGE', '#9A5B12', '<path d="M-7.9,-0.2A10,10 0 0 1 7.9,-0.2"/><path d="M-15.0,-5.7A19,19 0 0 1 15.0,-5.7"/><path d="M-22.1,-11.2A28,28 0 0 1 22.1,-11.2"/><circle cx="0" cy="6" r="3" fill="#fff" stroke="none"/><rect x="-15" y="14" width="30" height="9"/>'],
];

const outDir = process.argv[2] ?? '.';

const icon = (c, g, ox = 0, oy = 0) =>
  `<rect x="${ox + 8}" y="${oy + 8}" width="144" height="144" rx="34" fill="${c}"/><g transform="translate(${ox + 80},${oy + 80}) scale(1.25)" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${g.replaceAll('@C', c)}</g>`;

for (const [slug, label, c, g] of M) {
  const t = `Lara${label.length > 3 ? label[0] + label.slice(1).toLowerCase() : label}`;
  writeFileSync(`${outDir}/${slug}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160" role="img"><title>${t}</title>${icon(c, g)}</svg>\n`);
  writeFileSync(`${outDir}/${slug}-full.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220" role="img"><title>${t}</title>${icon(c, g, 30, 5)}<text x="110" y="205" text-anchor="middle" font-family="${FONT}" font-size="34" font-weight="700" letter-spacing="1.5"><tspan fill="#E8312F">LARA</tspan><tspan fill="${c}">${label}</tspan></text></svg>\n`);
}
