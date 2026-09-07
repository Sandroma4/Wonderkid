import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { translate } from '@vitalets/google-translate-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function with retry
async function translateWithRetry(text, retries = 3) {
  if (!text || typeof text !== 'string') return text;
  
  // Don't translate very short things that look like tags or stats unless needed
  if (text.length < 2) return text;
  if (text.startsWith('+') || text.startsWith('-')) {
    if (text.includes('Moral') || text.includes('Confiance') || text.includes('Forme') || text.includes('Vitesse') || text.includes('Physique') || text.includes('Défense') || text.includes('Passe') || text.includes('Finition') || text.includes('Dribble')) {
      // It's a stat change, we can translate it manually to be safe, but let's let the API try.
    } else {
      return text;
    }
  }

  for (let i = 0; i < retries; i++) {
    try {
      const res = await translate(text, { to: 'en' });
      // Minor manual fixes for common game terms
      let translated = res.text;
      translated = translated.replace(/Form/gi, 'Fitness'); 
      return translated;
    } catch (e) {
      console.error(`Translation failed for "${text}". Retry ${i + 1}/${retries}`);
      await new Promise(r => setTimeout(r, 2000 * (i + 1))); // backoff
    }
  }
  return text; // Fallback to original
}

async function processEvents() {
  const eventsEn = {};
  const eventsFr = {};
  
  // List of all event files
  const files = [
    'extraEvents.js', 'extraEvents2.js', 'extraEvents3.js', 
    'extraEvents4.js', 'extraEvents5.js', 'extraEvents6.js',
    'extraEvents7.js', 'extraEvents8.js', 'extraEvents9.js',
    'extraEvents10.js', 'extraEvents11.js', 'extraEvents12.js',
    'extraEvents13.js', 'coopEvents.js', 'dailyChallenges.js'
  ];

  for (const file of files) {
    console.log(`Processing ${file}...`);
    try {
      const modulePath = `../src/utils/${file}`;
      const mod = await import(modulePath);
      
      let eventsArray = [];
      if (mod.EXTRA_EVENTS) eventsArray = mod.EXTRA_EVENTS;
      else if (mod.EXTRA_EVENTS_2) eventsArray = mod.EXTRA_EVENTS_2;
      else if (mod.EXTRA_EVENTS_3) eventsArray = mod.EXTRA_EVENTS_3;
      else if (mod.EXTRA_EVENTS_4) eventsArray = mod.EXTRA_EVENTS_4;
      else if (mod.EXTRA_EVENTS_5) eventsArray = mod.EXTRA_EVENTS_5;
      else if (mod.EXTRA_EVENTS_6) eventsArray = mod.EXTRA_EVENTS_6;
      else if (mod.EXTRA_EVENTS_7) eventsArray = mod.EXTRA_EVENTS_7;
      else if (mod.EXTRA_EVENTS_8) eventsArray = mod.EXTRA_EVENTS_8;
      else if (mod.EXTRA_EVENTS_9) eventsArray = mod.EXTRA_EVENTS_9;
      else if (mod.EXTRA_EVENTS_10) eventsArray = mod.EXTRA_EVENTS_10;
      else if (mod.EXTRA_EVENTS_11) eventsArray = mod.EXTRA_EVENTS_11;
      else if (mod.EXTRA_EVENTS_12) eventsArray = mod.EXTRA_EVENTS_12;
      else if (mod.EXTRA_EVENTS_13) eventsArray = mod.EXTRA_EVENTS_13;
      else if (mod.COOP_EVENTS) eventsArray = mod.COOP_EVENTS;
      else if (mod.DAILY_CHALLENGES) eventsArray = mod.DAILY_CHALLENGES;

      for (let i = 0; i < eventsArray.length; i++) {
        const ev = eventsArray[i];
        const id = ev.id;
        
        if (!eventsFr[id]) eventsFr[id] = {};
        if (!eventsEn[id]) eventsEn[id] = {};

        // Translate Description
        if (ev.description) {
          eventsFr[id].description = ev.description;
          console.log(`Translating event ${id} description...`);
          eventsEn[id].description = await translateWithRetry(ev.description);
        }

        // Title if it's a daily challenge
        if (ev.title) {
          eventsFr[id].title = ev.title;
          console.log(`Translating event ${id} title...`);
          eventsEn[id].title = await translateWithRetry(ev.title);
        }

        // Translate options
        if (ev.options) {
          eventsFr[id].options = [];
          eventsEn[id].options = [];
          
          for (let j = 0; j < ev.options.length; j++) {
            const opt = ev.options[j];
            eventsFr[id].options[j] = {};
            eventsEn[id].options[j] = {};

            if (opt.text) {
              eventsFr[id].options[j].text = opt.text;
              eventsEn[id].options[j].text = await translateWithRetry(opt.text);
            }

            if (opt.typeTag) {
              eventsFr[id].options[j].typeTag = opt.typeTag;
              eventsEn[id].options[j].typeTag = await translateWithRetry(opt.typeTag);
            }

            // Outcomes
            if (opt.outcome) {
              eventsFr[id].options[j].outcome = [];
              eventsEn[id].options[j].outcome = [];
              
              const outcomes = Array.isArray(opt.outcome) ? opt.outcome : [opt.outcome];
              
              for (let k = 0; k < outcomes.length; k++) {
                const out = outcomes[k];
                eventsFr[id].options[j].outcome[k] = {};
                eventsEn[id].options[j].outcome[k] = {};

                if (out.narrative) {
                  eventsFr[id].options[j].outcome[k].narrative = out.narrative;
                  eventsEn[id].options[j].outcome[k].narrative = await translateWithRetry(out.narrative);
                }

                if (out.effects) {
                  eventsFr[id].options[j].outcome[k].effects = [];
                  eventsEn[id].options[j].outcome[k].effects = [];
                  for (let eff = 0; eff < out.effects.length; eff++) {
                    eventsFr[id].options[j].outcome[k].effects[eff] = out.effects[eff].text;
                    let translatedEffect = await translateWithRetry(out.effects[eff].text);
                    // Force common stats translation to avoid API quirks
                    translatedEffect = translatedEffect.replace('Moral', 'Morale');
                    translatedEffect = translatedEffect.replace('Confiance', 'Trust');
                    translatedEffect = translatedEffect.replace('Forme', 'Fitness');
                    translatedEffect = translatedEffect.replace('Vitesse', 'Pace');
                    translatedEffect = translatedEffect.replace('Physique', 'Physical');
                    translatedEffect = translatedEffect.replace('Défense', 'Defense');
                    translatedEffect = translatedEffect.replace('Finition', 'Finishing');
                    translatedEffect = translatedEffect.replace('Passe', 'Passing');
                    translatedEffect = translatedEffect.replace('Dribble', 'Dribbling');
                    eventsEn[id].options[j].outcome[k].effects[eff] = translatedEffect;
                  }
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  fs.writeFileSync(path.join(__dirname, '../src/locales/events_fr.json'), JSON.stringify(eventsFr, null, 2));
  fs.writeFileSync(path.join(__dirname, '../src/locales/events_en.json'), JSON.stringify(eventsEn, null, 2));
  console.log('Successfully extracted and translated all events!');
}

processEvents();
