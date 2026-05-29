'use strict';

/**
 * dates.js — datumrekenen voor het 2%-venster van TikTok Shop NL.
 * Alleen Node stdlib. Werkt in UTC om tijdzone-afwijkingen te voorkomen.
 */

const MAANDEN_NL = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

const DAGEN_NL = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

/** Parse 'YYYY-MM-DD' naar een UTC-Date. Gooit bij ongeldige invoer. */
function parseISO(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || '').trim());
  if (!m) throw new Error(`Ongeldige datum (verwacht YYYY-MM-DD): "${iso}"`);
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  if (isNaN(d.getTime())) throw new Error(`Ongeldige datum: "${iso}"`);
  return d;
}

/** Vandaag als UTC-Date (zonder tijd). */
function today() {
  const n = new Date();
  return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()));
}

/** Voeg dagen toe aan een Date, geeft nieuwe Date. */
function addDays(date, days) {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

/** Aantal hele dagen tussen a en b (b - a). */
function daysBetween(a, b) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

/** 'YYYY-MM-DD' */
function toISO(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** '15 juni 2026' */
function nlLong(date) {
  return `${date.getUTCDate()} ${MAANDEN_NL[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** 'ma 15-06' — kort, voor planningstabellen. */
function nlShort(date) {
  const dag = DAGEN_NL[date.getUTCDay()].slice(0, 2);
  const d = String(date.getUTCDate()).padStart(2, '0');
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${dag} ${d}-${m}`;
}

/** Volledige dagnaam, bv. 'maandag'. */
function dagNaam(date) {
  return DAGEN_NL[date.getUTCDay()];
}

/**
 * Bereken het 2%-venster vanaf een startdatum.
 * Venster = 90 dagen; daarna gaat de commissie naar 9%.
 */
function vensterVan(startISO) {
  const start = parseISO(startISO);
  const einde = addDays(start, 90);
  return {
    start,
    startISO: toISO(start),
    einde,
    eindeISO: toISO(einde),
    commissie9pctVanafISO: toISO(einde),
  };
}

/** Hoeveel dagen 2%-venster resten vanaf 'vanaf' (default vandaag). */
function dagenResterend(eindeISO, vanaf = today()) {
  return daysBetween(vanaf, parseISO(eindeISO));
}

module.exports = {
  MAANDEN_NL, DAGEN_NL,
  parseISO, today, addDays, daysBetween, toISO,
  nlLong, nlShort, dagNaam, vensterVan, dagenResterend,
};
