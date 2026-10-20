// Generates the blueprint logo set. Run: node build.mjs
import { writeFileSync } from 'node:fs';

const FONT = "'Arial Narrow','Helvetica Neue',Arial,sans-serif";
const SW = (w) => `fill="none" stroke="#fff" stroke-width="${w}" stroke-linejoin="miter" stroke-miterlimit="6" stroke-linecap="butt"`;
const KS = 'fill="none" stroke="#fff" stroke-linecap="butt"';

function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const dots = (a) => a.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="1.5" fill="#fff" fill-opacity="0.7" stroke="none"/>`).join('');
const ov = (r) => (r() < 0.25 ? 2 + r() * 4 : 7 + r() * 13);
function lines(segs, r, axis) {
  return segs.map((s) => {
    const dx = s[2] - s[0], dy = s[3] - s[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const o1 = ov(r), o2 = ov(r);
    const x1 = s[0] - ux * o1, y1 = s[1] - uy * o1, x2 = s[2] + ux * o2, y2 = s[3] + uy * o2;
    const op = (0.45 + r() * 0.23).toFixed(2), w = (0.5 + r() * 0.35).toFixed(2);
    return `<path d="M${x1.toFixed(1)},${y1.toFixed(1)}L${x2.toFixed(1)},${y2.toFixed(1)}" stroke-opacity="${op}" stroke-width="${w}"${axis ? ' stroke-dasharray="7 2 1.2 2"' : ''}/>`;
  }).join('');
}

const M = [
{slug:'laraplate',n:'PLATE',c:'#5FA21F',
 g:'<path d="M-26,-10L0,-24L26,-10L0,4Z"/><path d="M-26,3L0,17L26,3"/><path d="M-26,16L0,30L26,16"/>',
 a:[[0,-24,0,30]],
 l:[[-26,-10,26,-10],[-26,3,26,3],[-26,16,26,16],[-26,-10,0,-24],[0,-24,26,-10],[-26,-10,0,4],[26,-10,0,4]],
 k:'',p:[[0,-24],[26,-10],[-26,-10],[0,4],[0,17],[0,30]]},
{slug:'core',n:'CORE',c:'#0D7C66',
 g:'<rect x="-14" y="-14" width="28" height="28"/><rect x="-5" y="-5" width="10" height="10"/><path d="M-7,-14V-25M7,-14V-25M-7,14V25M7,14V25M-14,-7H-25M-14,7H-25M14,-7H25M14,7H25"/>',
 a:[[0,-25,0,25],[-25,0,25,0]],
 l:[[-25,-7,25,-7],[-25,7,25,7],[-7,-25,-7,25],[7,-25,7,25],[-14,-14,14,14],[14,-14,-14,14]],
 k:'<rect x="-25" y="-25" width="50" height="50"/>',p:[[-7,-25],[7,-25],[-25,-7],[25,7]]},
{slug:'ai',n:'AI',c:'#B5246F',
 g:'<path d="M0,-27C2,-9 9,-2 27,0C9,2 2,9 0,27C-2,9 -9,2 -27,0C-9,-2 -2,-9 0,-27Z"/>',
 a:[[0,-27,0,27],[-27,0,27,0]],
 l:[[0,-27,2,-9],[9,-2,27,0],[27,0,9,2],[2,9,0,27],[0,27,-2,9],[-9,2,-27,0],[-27,0,-9,-2],[-2,-9,0,-27],[0,-27,27,0],[27,0,0,27],[0,27,-27,0],[-27,0,0,-27]],
 k:'<circle r="27"/><circle r="7"/>',p:[[2,-9],[9,-2],[9,2],[2,9],[-2,9],[-9,2],[-9,-2],[-2,-9]]},
{slug:'cms',n:'CMS',c:'#0E7FA3',
 g:'<rect x="-26" y="-21" width="52" height="42"/><path d="M-26,-9H26"/><rect x="-17" y="0" width="13" height="11"/><path d="M3,2H17M3,10H17"/>',
 a:[[0,-21,0,21],[-26,0,26,0]],
 l:[[-26,-9,26,-9],[-26,11,26,11],[-17,-21,-17,21],[-4,-21,-4,21],[3,-21,3,21],[17,-21,17,21]],
 k:'',p:[[-17,0],[-4,11],[3,2],[17,10]]},
{slug:'crm',n:'CRM',c:'#6D4AD0',
 g:'<circle cx="-9" cy="-9" r="7"/><path d="M-23,21Q-23,6 -9,6Q5,6 5,21"/><circle cx="12" cy="-11" r="6"/><path d="M13,7Q25,8 25,21"/>',
 a:[[-9,-16,-9,21],[12,-17,12,21]],
 l:[[-23,21,25,21],[-23,6,5,6],[-16,-9,18,-9]],
 k:'<circle cx="-9" cy="-9" r="14"/><circle cx="12" cy="-11" r="11"/>',p:[[-9,-9],[12,-11]]},
{slug:'erp',n:'ERP',c:'#475569',
 g:'<rect x="-24" y="-24" width="21" height="21"/><rect x="3" y="-24" width="21" height="21" fill="#fff"/><rect x="-24" y="3" width="21" height="21"/><rect x="3" y="3" width="21" height="21"/>',
 a:[[0,-24,0,24],[-24,0,24,0]],
 l:[[-24,-24,24,-24],[-24,24,24,24],[-24,-24,-24,24],[24,-24,24,24],[-24,-24,24,24],[24,-24,-24,24]],
 k:'',p:[[-3,-3],[3,3],[3,-3],[-3,3]]},
{slug:'mes',n:'MES',c:'#C27803',
 g:'<circle r="14"/><circle r="5"/><g stroke-width="3.4"><path d="M0,-25V-18M0,18V25M-25,0H-18M18,0H25"/><path transform="rotate(45)" d="M0,-25V-18M0,18V25M-25,0H-18M18,0H25"/></g>',
 a:[[0,-25,0,25],[-25,0,25,0],[-17.7,-17.7,17.7,17.7],[17.7,-17.7,-17.7,17.7]],
 l:[],k:'<circle r="25"/><circle r="18"/>',p:[[0,0]]},
{slug:'sao',n:'SAO',c:'#2F5FD0',
 g:'<path d="M0,0L-19,-16M0,0L19,-16M0,0L0,21"/><circle r="7" fill="@C"/><circle cx="-19" cy="-16" r="5" fill="@C"/><circle cx="19" cy="-16" r="5" fill="@C"/><circle cx="0" cy="21" r="5" fill="@C"/>',
 a:[[0,-16,0,21],[-19,-2.4,19,-2.4]],
 l:[[-19,-16,19,-16],[19,-16,0,21],[0,21,-19,-16]],
 k:'<circle cx="0" cy="-2.4" r="23.4"/>',p:[[0,-2.4]]},
{slug:'shop',n:'SHOP',c:'#D9532F',
 g:'<path d="M-20,-9H20L17,24H-17Z"/><path d="M-9,-9V-14A9,9 0 0 1 9,-14V-9"/>',
 a:[[0,-23,0,24]],
 l:[[-20,-9,20,-9],[-17,24,17,24],[-20,-9,-17,24],[20,-9,17,24],[-9,-14,9,-14]],
 k:'<circle cx="0" cy="-14" r="9"/>',p:[[-20,-9],[20,-9],[-17,24],[17,24],[0,-14]]},
{slug:'edge',n:'EDGE',c:'#9A5B12',
 g:'<path d="M-7.9,-0.2A10,10 0 0 1 7.9,-0.2"/><path d="M-15.0,-5.7A19,19 0 0 1 15.0,-5.7"/><path d="M-22.1,-11.2A28,28 0 0 1 22.1,-11.2"/><circle cx="0" cy="6" r="3" fill="#fff" stroke="none"/><rect x="-15" y="14" width="30" height="9"/>',
 a:[[0,-22,0,23]],
 l:[[-28,6,28,6],[-15,14,15,14],[-15,23,15,23],[-15,14,-15,23],[15,14,15,23],[0,6,22.1,-11.2],[0,6,-22.1,-11.2]],
 k:'<circle cx="0" cy="6" r="10"/><circle cx="0" cy="6" r="19"/><circle cx="0" cy="6" r="28"/>',p:[[7.9,-0.2],[-7.9,-0.2],[15,-5.7],[-15,-5.7],[22.1,-11.2],[-22.1,-11.2],[0,6]]},
];

// guides=true: construction lines under the glyph (seeded per module, so output is stable)
function mark(m, i, guides, ox = 0, oy = 0) {
  const r = rng(i * 977 + 13);
  const glyph = m.g.replaceAll('@C', m.c);
  let k = '';
  if (guides) k = `<g ${KS}>${lines(m.l, r, false)}${lines(m.a, r, true)}<g stroke-opacity="0.6" stroke-width="0.6" fill="none">${m.k}</g>${dots(m.p)}</g>`;
  return `<rect x="${ox + 8}" y="${oy + 8}" width="144" height="144" rx="34" fill="${m.c}"/><g transform="translate(${ox + 80},${oy + 80}) scale(1.3)">${k}<g ${SW(guides ? 2.2 : 3.6)}>${glyph}</g></g>`;
}

M.forEach((m, i) => {
  const title = `Lara${m.n.length > 3 ? m.n[0] + m.n.slice(1).toLowerCase() : m.n}`;
  const head = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"><title>${title}</title>`;
  writeFileSync(`${m.slug}.svg`, `${head(160, 160)}${mark(m, i, true)}</svg>\n`);
  writeFileSync(`${m.slug}-full.svg`, `${head(220, 220)}${mark(m, i, true, 30, 5)}<text x="110" y="205" text-anchor="middle" font-family="${FONT}" font-size="34" font-weight="700" letter-spacing="1.5"><tspan fill="#E8312F">LARA</tspan><tspan fill="${m.c}">${m.n}</tspan></text></svg>\n`);
});
