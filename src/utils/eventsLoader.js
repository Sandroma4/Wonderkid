/**
 * eventsLoader.js
 * 
 * Charge les événements de jeu de façon asynchrone (lazy) via des imports
 * dynamiques. Le résultat est mis en cache en mémoire pour éviter de recharger.
 * 
 * Usage:
 *   import { getLoadedEvents, preloadEvents } from './eventsLoader';
 *   await preloadEvents();           // précharger (ex: après création du perso)
 *   const events = getLoadedEvents(); // accès synchrone au cache
 */

let _cachedEvents = null;
let _loadPromise = null;

/**
 * Précharge tous les fichiers d'événements en parallèle et les met en cache.
 * Peut être appelé plusieurs fois sans risque (idempotent).
 * @returns {Promise<Array>} La liste complète des événements
 */
export const preloadEvents = () => {
  if (_cachedEvents) return Promise.resolve(_cachedEvents);
  if (_loadPromise) return _loadPromise;

  _loadPromise = Promise.all([
    import('./extraEvents'),
    import('./extraEvents2'),
    import('./extraEvents3'),
    import('./extraEvents4'),
    import('./extraEvents5'),
    import('./extraEvents6'),
    import('./extraEvents7'),
    import('./extraEvents8'),
    import('./extraEvents9'),
    import('./extraEvents10'),
    import('./extraEvents11'),
    import('./extraEvents12'),
    import('./coopEvents'),
  ]).then(([
    { EXTRA_EVENTS },
    { EXTRA_EVENTS_2 },
    { EXTRA_EVENTS_3 },
    { EXTRA_EVENTS_4 },
    { EXTRA_EVENTS_5 },
    { EXTRA_EVENTS_6 },
    { EXTRA_EVENTS_7 },
    { EXTRA_EVENTS_8 },
    { EXTRA_EVENTS_9 },
    { EXTRA_EVENTS_10 },
    { EXTRA_EVENTS_11 },
    { EXTRA_EVENTS_12 },
    { COOP_EVENTS },
  ]) => {
    _cachedEvents = [
      ...EXTRA_EVENTS,
      ...EXTRA_EVENTS_2,
      ...EXTRA_EVENTS_3,
      ...EXTRA_EVENTS_4,
      ...EXTRA_EVENTS_5,
      ...EXTRA_EVENTS_6,
      ...EXTRA_EVENTS_7,
      ...EXTRA_EVENTS_8,
      ...EXTRA_EVENTS_9,
      ...EXTRA_EVENTS_10,
      ...EXTRA_EVENTS_11,
      ...EXTRA_EVENTS_12,
      ...COOP_EVENTS,
    ];
    return _cachedEvents;
  });

  return _loadPromise;
};

/**
 * Retourne les événements déjà chargés (synchrone).
 * Retourne un tableau vide si preloadEvents() n'a pas encore été appelé.
 */
export const getLoadedEvents = () => _cachedEvents || [];

/**
 * Retourne true si les événements sont déjà disponibles en cache.
 */
export const areEventsLoaded = () => _cachedEvents !== null;
