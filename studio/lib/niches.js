'use strict';

/**
 * niches.js — niche-config voor TikTok Shop NL.
 * Per niche: converterende hoek-richtingen, persona-default, compliance-let-op,
 * en optimale posttijden NL. Gebruikt door scaffold, sprint en delivery.
 */

const NICHES = {
  beauty: {
    label: 'Beauty / Skincare',
    personaLabel: 'lisa_skincare_01',
    personaLeeftijd: 26,
    hoekrichtingen: [
      'voor/na in de eerste 3 seconden (zonder overdreven claims)',
      'routine-vergelijking: duur alternatief vs. dit product',
      'tegen-narratief: "instant resultaat" omdraaien naar "dit is waarom je huid tijd nodig heeft"',
    ],
    compliance: 'Geen medische/cosmetische claims die niet mogen (NVWA). Geen "geneest", "herstelt huidbarrière 100%". Alleen onderbouwde reviewcitaten.',
    posttijdenNL: ['07:30', '12:30', '19:00', '21:30'],
  },
  supplementen: {
    label: 'Supplementen / Health',
    personaLabel: 'sanne_health_01',
    personaLeeftijd: 29,
    hoekrichtingen: [
      'dag-in-het-leven met het product geïntegreerd (geen pillen-shot als opener)',
      'energiedip-probleem → routine → gevoel (subjectief, geen genezingsclaim)',
      'tegen-narratief: "meer is beter" omdraaien naar "dit ene ding consistent"',
    ],
    compliance: 'STRENG: geen gezondheids-/genezingsclaims (NVWA/Claimsverordening). Alleen toegestane, onderbouwde formuleringen. Geen "verhoogt immuniteit" tenzij toegestane claim.',
    posttijdenNL: ['06:45', '12:00', '17:30', '20:30'],
  },
  fashion: {
    label: 'Fashion / Kleding',
    personaLabel: 'noa_fashion_01',
    personaLeeftijd: 24,
    hoekrichtingen: [
      'outfit-transition in de eerste 3 seconden',
      '1 stuk, 3 looks (veelzijdigheid = waarde)',
      'tegen-narratief: "fast fashion volume" omdraaien naar "dit ene stuk dat je blijft dragen"',
    ],
    compliance: 'Geen verzonnen schaarste ("nog 2 op voorraad") tenzij waar. Reclame herkenbaar maken.',
    posttijdenNL: ['08:00', '13:00', '18:30', '21:00'],
  },
  'home-gadget': {
    label: 'Home / Gadget',
    personaLabel: 'tom_gadget_01',
    personaLeeftijd: 31,
    hoekrichtingen: [
      'probleem-demonstratie in 3 seconden (de frustratie tonen)',
      'satisfying use-case / before-after van het huishouden',
      'tegen-narratief: "dure premium versie" omdraaien naar "dit doet hetzelfde voor een fractie"',
    ],
    compliance: 'Geen overdreven prestatieclaims. Toon realistisch gebruik. Onderbouwde specs alleen.',
    posttijdenNL: ['07:00', '12:30', '18:00', '20:00'],
  },
  fitness: {
    label: 'Fitness / Sport',
    personaLabel: 'daan_fitness_01',
    personaLeeftijd: 27,
    hoekrichtingen: [
      'in-use shot tijdens workout als opener (beweging = scroll-stop)',
      'drempel-verlagen: "geen sportschool nodig" hoek',
      'tegen-narratief: "no pain no gain" omdraaien naar "consistentie verslaat intensiteit"',
    ],
    compliance: 'Geen onrealistische transformatie-beloftes. Geen gezondheidsclaims. Onderbouwde reviews alleen.',
    posttijdenNL: ['06:30', '12:00', '17:00', '20:30'],
  },
};

const DEFAULT_NICHE = 'beauty';

/** Normaliseer een vrije niche-invoer naar een geldige sleutel. */
function normaliseerNiche(input) {
  if (!input) return DEFAULT_NICHE;
  const k = String(input).toLowerCase().trim();
  if (NICHES[k]) return k;
  const alias = {
    skincare: 'beauty', huid: 'beauty', cosmetica: 'beauty',
    supplement: 'supplementen', health: 'supplementen', vitamines: 'supplementen',
    kleding: 'fashion', mode: 'fashion',
    home: 'home-gadget', gadget: 'home-gadget', gadgets: 'home-gadget', huis: 'home-gadget',
    sport: 'fitness', gym: 'fitness',
  };
  return alias[k] || DEFAULT_NICHE;
}

function getNiche(key) {
  return NICHES[normaliseerNiche(key)];
}

module.exports = { NICHES, DEFAULT_NICHE, normaliseerNiche, getNiche };
