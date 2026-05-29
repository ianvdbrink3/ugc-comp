'use strict';

/**
 * utils.js — gedeelde helpers: slugify, fs-veiligheid, meta.json, markdown-tabellen,
 * en de standaard AI-disclosure-regel. Alleen Node stdlib.
 */

const fs = require('fs');
const path = require('path');

/** 'Bloem Skincare' -> 'bloem-skincare' */
function slugify(naam) {
  return String(naam)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'merk';
}

/** Root van het studio-OS (de map waarin /clients, /lib etc. staan). */
function studioRoot() {
  return path.resolve(__dirname, '..');
}

function clientsDir() {
  return path.join(studioRoot(), 'clients');
}

/** Pad naar een klantmap op basis van slug of map-naam (bv. '_demo'). */
function clientDir(slugOrName) {
  return path.join(clientsDir(), slugOrName);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/** Schrijf bestand alleen als het nog niet bestaat (niet overschrijven). */
function writeIfAbsent(file, content) {
  if (fs.existsSync(file)) return false;
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, 'utf8');
  return true;
}

/** Schrijf bestand altijd (overschrijft). Voor gegenereerde output. */
function writeFile(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, 'utf8');
}

function readMeta(slugOrName) {
  const file = path.join(clientDir(slugOrName), 'meta.json');
  if (!fs.existsSync(file)) {
    throw new Error(`meta.json niet gevonden voor "${slugOrName}". Run eerst: node new-client.js "<Merknaam>"`);
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeMeta(slugOrName, meta) {
  writeFile(path.join(clientDir(slugOrName), 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
}

/** Vind de map-naam van een klant op basis van vrije invoer (slug, naam of mapnaam). */
function resolveClient(input) {
  const dir = clientsDir();
  if (!fs.existsSync(dir)) return null;
  const entries = fs.readdirSync(dir).filter((e) => {
    try { return fs.statSync(path.join(dir, e)).isDirectory(); } catch { return false; }
  });
  if (entries.includes(input)) return input;
  const slug = slugify(input);
  if (entries.includes(slug)) return slug;
  // Match op merknaam in meta.json
  for (const e of entries) {
    try {
      const m = JSON.parse(fs.readFileSync(path.join(dir, e, 'meta.json'), 'utf8'));
      if (m.merknaam && slugify(m.merknaam) === slug) return e;
    } catch { /* skip */ }
  }
  return null;
}

/** Bouw een GitHub-flavored markdown-tabel uit headers + rijen. */
function mdTable(headers, rows) {
  const head = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((r) => `| ${r.map((c) => String(c == null ? '' : c)).join(' | ')} |`).join('\n');
  return [head, sep, body].join('\n');
}

/** De standaard AI-disclosure-regel (EU AI Act Art. 50). Overal verplicht. */
function aiDisclosure() {
  return [
    '> **AI-disclosure (EU AI Act Art. 50, van kracht 2 aug 2026):** Deze content is',
    '> AI-gegenereerd. Zet bij upload de TikTok AIGC-toggle aan en houd een zichtbare',
    '> "AI"-vermelding aan. Persona is synthetisch, niet gebaseerd op een echte persoon.',
  ].join('\n');
}

/** Compliance-blok voor scripts/opleveringen: claims + AI-label. */
function complianceBlok(nicheCompliance) {
  return [
    '## Compliance-check (verplicht vóór oplevering)',
    '',
    '- [ ] Alleen onderbouwde claims/reviews die de klant heeft aangeleverd — geen verzonnen aantallen.',
    `- [ ] ${nicheCompliance}`,
    '- [ ] Reclame herkenbaar (Reclamecode Social Media) waar nodig.',
    '- [ ] AI-disclosure toegepast (zie onder).',
    '',
    aiDisclosure(),
  ].join('\n');
}

module.exports = {
  slugify, studioRoot, clientsDir, clientDir, ensureDir,
  writeIfAbsent, writeFile, readMeta, writeMeta, resolveClient,
  mdTable, aiDisclosure, complianceBlok,
};
