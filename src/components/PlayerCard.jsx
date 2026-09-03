import React from 'react';
import { FlagIcon } from './FlagIcon';
import { calculateOVR } from '../utils/gameData';

export const PlayerCard = React.memo(({ player, club, cardType = 'auto', className = "" }) => {
  if (!player) return null;

  const ovr = player.ovr || calculateOVR(player);
  const isGk = (player.position || '').toUpperCase().includes('GK');

  // Choix automatique ou manuel du thème de la carte
  let theme = cardType;
  if (theme === 'auto') {
    if (ovr >= 85) theme = 'totw';
    else if (ovr >= 75) theme = 'gold';
    else if (ovr >= 65) theme = 'silver';
    else theme = 'bronze';
  }

  const themeStyles = {
    totw: {
      bgImage: "url('/cards.png')",
      bgPos: '100% 0%', // Fallback to Gold for TOTW
      bgSize: '300% 100%',
      textPrimary: 'text-[#3f311c]',
      textSecondary: 'text-[#3f311c]',
      accent: 'border-[#3f311c]/30'
    },
    gold: {
      bgImage: "url('/cards.png')",
      bgPos: '100% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#3f311c]',
      textSecondary: 'text-[#3f311c]',
      accent: 'border-[#3f311c]/30'
    },
    silver: {
      bgImage: "url('/cards.png')",
      bgPos: '50% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#1e293b]',
      textSecondary: 'text-[#1e293b]',
      accent: 'border-[#1e293b]/30'
    },
    bronze: {
      bgImage: "url('/cards.png')",
      bgPos: '0% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#3b2111]',
      textSecondary: 'text-[#3b2111]',
      accent: 'border-[#3b2111]/30'
    }
  }[theme];

  const attrs = player.attributes || {};
  const stats = isGk ? [
    { label: 'PLO', val: Math.floor(attrs.diving || 50) },
    { label: 'RÉF', val: Math.floor(attrs.reflexes || 50) },
    { label: 'MAN', val: Math.floor(attrs.handling || 50) },
    { label: 'VIT', val: Math.floor(attrs.pace || 50) },
    { label: 'JEU', val: Math.floor(attrs.kicking || 50) },
    { label: 'POS', val: Math.floor(attrs.positioning || 50) }
  ] : [
    { label: 'VIT', val: Math.floor(attrs.pace || 50) },
    { label: 'DRI', val: Math.floor(attrs.dribbling || 50) },
    { label: 'TIR', val: Math.floor(attrs.finishing || 50) },
    { label: 'DÉF', val: Math.floor(attrs.defense || 50) },
    { label: 'PAS', val: Math.floor(attrs.passing || 50) },
    { label: 'PHY', val: Math.floor(attrs.physical || 50) }
  ];

  let countryCode = typeof player.origin === 'object' ? player.origin?.id : (player.origin || 'FR');
  if (countryCode && countryCode.length > 3) countryCode = 'FR';
  const lastName = player.lastName || (player.name ? player.name.trim().split(' ').pop() : 'JOUEUR');

  return (
    <div className={`relative inline-block select-none transform transition-transform duration-300 hover:scale-[1.02] scale-75 md:scale-100 origin-top mb-[-92px] mx-[-32px] md:mb-0 md:mx-0 ${className}`}>
      {/* Wrapper de l'image de la carte */}
      <div 
        className="w-[260px] h-[370px] relative drop-shadow-2xl bg-no-repeat mx-auto"
        style={{
          backgroundImage: themeStyles.bgImage,
          backgroundPosition: themeStyles.bgPos,
          backgroundSize: themeStyles.bgSize,
          backgroundColor: 'transparent'
        }}
      >
        {/* OVR & POS & FLAG (TOP LEFT) */}
        <div className="absolute top-[15.5%] left-[16%] flex flex-col items-center z-20 w-[50px]">
          <span className={`text-[32px] font-black leading-none tracking-tight drop-shadow-md ${themeStyles.textPrimary}`}>
            {ovr}
          </span>
          <span className={`text-[11px] font-black uppercase tracking-wider mt-0.5 ${themeStyles.textSecondary}`}>
            {player.position || 'ATT'}
          </span>
          
          <div className="shadow-sm mt-2 mb-1.5">
            <FlagIcon code={countryCode} className="w-7 h-4 rounded-sm" />
          </div>

          {club && (
            <div className="flex -space-x-1 mt-1 drop-shadow-sm">
              <span className="w-5 h-5 rounded-full border border-black/30 shadow-sm" style={{ backgroundColor: club.primary }} />
              <span className="w-5 h-5 rounded-full border border-black/30 shadow-sm" style={{ backgroundColor: club.secondary || club.primary }} />
            </div>
          )}
        </div>

        {/* NOM DU JOUEUR */}
        <div className="absolute top-[52%] w-full text-center z-20">
          <h3 className={`text-[19px] font-black tracking-widest uppercase truncate px-6 ${themeStyles.textPrimary}`}>
            {lastName}
          </h3>
        </div>

        {/* LES 6 STATISTIQUES (CHIFFRES + TEXTES) */}
        <div className="absolute top-[60.5%] w-full flex justify-center z-20">
          <div className="flex gap-x-6">
            <div className="flex flex-col gap-y-[10px]">
              {stats.slice(0, 3).map((st, idx) => (
                <div key={idx} className="flex items-center justify-start gap-1.5">
                  <span className={`font-black text-[19px] tracking-tighter leading-none ${themeStyles.textPrimary}`}>
                    {st.val}
                  </span>
                  <span className={`text-[15px] font-medium uppercase leading-none ${themeStyles.textSecondary}`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-y-[10px]">
              {stats.slice(3, 6).map((st, idx) => (
                <div key={idx} className="flex items-center justify-start gap-1.5">
                  <span className={`font-black text-[19px] tracking-tighter leading-none ${themeStyles.textPrimary}`}>
                    {st.val}
                  </span>
                  <span className={`text-[15px] font-medium uppercase leading-none ${themeStyles.textSecondary}`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

PlayerCard.displayName = 'PlayerCard';