import React from 'react';
import { FlagIcon } from './FlagIcon';
import { calculateOVR } from '../utils/gameData';

export const PlayerCard = React.memo(({ player, club, cardType = 'auto', className = '', exportMode = false }) => {
  if (!player) return null;

  const ovr = player.ovr || calculateOVR(player);
  const isGk = (player.position || '').toUpperCase().includes('GK');

  // Choix automatique ou manuel du thème de la carte
  let theme = cardType;
  const appliedCosmetic = player.appliedCosmetic;
  const hasCosmetic = appliedCosmetic && cardType === 'auto';
  
  if (hasCosmetic) {
    theme = appliedCosmetic;
  } else if (theme === 'auto') {
    if (ovr >= 85) theme = 'totw';
    else if (ovr >= 75) theme = 'gold';
    else if (ovr >= 65) theme = 'silver';
    else theme = 'bronze';
  }
  const basicLayout = {
    ovrTop: 'top-[10%]',
    ovrLeft: 'left-[14%]',
    avatarTop: 'top-[22%]',
    avatarLeft: 'left-[30%]',
    nameTop: 'top-[56%]',
    statsTop: 'top-[66%]',
    statsGapY: 'gap-y-[6px]',
    statsLeftCol: 'left-[10%]',
    statsRightCol: 'left-[57%]',
    flagWrapper: 'shadow-[0_0_3px_rgba(0,0,0,0.5)] mt-[14px] mb-[4px]',
    flagClass: 'w-[38px] h-[22px] object-cover rounded-[1px]',
    clubTop: 'top-[44%]',
    clubLeft: 'left-[15%]',
    hideCustomLabels: true
  };

  const themeStyles = {
    totw: {
      bgImage: "url('/card_gold.png')",
      bgPos: 'center',
      bgSize: '100% 100%',
      textPrimary: 'text-[#3f311c]',
      textSecondary: 'text-[#3f311c]',
      accent: 'border-[#3f311c]/30',
      layout: basicLayout
    },
    gold: {
      bgImage: "url('/card_gold.png')",
      bgPos: 'center',
      bgSize: '100% 100%',
      textPrimary: 'text-[#3f311c]',
      textSecondary: 'text-[#3f311c]',
      accent: 'border-[#3f311c]/30',
      layout: basicLayout
    },
    silver: {
      bgImage: "url('/card_silver.png')",
      bgPos: 'center',
      bgSize: '100% 100%',
      textPrimary: 'text-[#1e293b]',
      textSecondary: 'text-[#1e293b]',
      accent: 'border-[#1e293b]/30',
      layout: basicLayout
    },
    bronze: {
      bgImage: "url('/card_bronze.png')",
      bgPos: 'center',
      bgSize: '100% 100%',
      textPrimary: 'text-[#3b2111]',
      textSecondary: 'text-[#3b2111]',
      accent: 'border-[#3b2111]/30',
      layout: basicLayout
    },
    bronze_alt: {
      bgImage: `url('/cosmetics/metals${isGk ? '_gk' : ''}.png?v=2')`,
      bgPos: '0% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#5c3a21]',
      textSecondary: 'hidden',
      hideLabels: true
    },
    silver_alt: {
      bgImage: `url('/cosmetics/metals${isGk ? '_gk' : ''}.png?v=2')`,
      bgPos: '50% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#1e293b]',
      textSecondary: 'hidden',
      hideLabels: true
    },
    gold_alt: {
      bgImage: `url('/cosmetics/metals${isGk ? '_gk' : ''}.png?v=2')`,
      bgPos: '100% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#fcd34d]',
      textSecondary: 'hidden',
      hideLabels: true
    },
    stone: {
      bgImage: `url('/cosmetics/fantasy${isGk ? '_gk' : ''}.png?v=2')`,
      bgPos: '0% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#94a3b8]',
      textSecondary: 'hidden',
      hideLabels: true
    },
    cyberpunk: {
      bgImage: `url('/cosmetics/fantasy${isGk ? '_gk' : ''}.png?v=2')`,
      bgPos: '50% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#94a3b8]',
      textSecondary: 'hidden',
      hideLabels: true
    },
    earth: {
      bgImage: `url('/cosmetics/fantasy${isGk ? '_gk' : ''}.png?v=2')`,
      bgPos: '100% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#451a03]',
      textSecondary: 'hidden',
      hideLabels: true
    },
    elite1: {
      bgImage: `url('/cosmetics/elite${isGk ? '_gk' : ''}.png?v=2')`,
      bgPos: '0% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#5c3a21]',
      textSecondary: 'hidden',
      hideLabels: true
    },
    elite2: {
      bgImage: `url('/cosmetics/elite${isGk ? '_gk' : ''}.png?v=2')`,
      bgPos: '50% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#cbd5e1]',
      textSecondary: 'hidden',
      hideLabels: true
    },
    elite3: {
      bgImage: `url('/cosmetics/elite${isGk ? '_gk' : ''}.png?v=2')`,
      bgPos: '100% 0%',
      bgSize: '300% 100%',
      textPrimary: 'text-[#b8860b]',
      textSecondary: 'hidden',
      hideLabels: true
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
  const formatPlayerName = (name) => {
    if (!name) return 'JOUEUR';
    if (name.length <= 15) return name;
    
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ');
      return `${firstName.charAt(0)}.${lastName}`;
    }
    return name;
  };

  const displayName = formatPlayerName(player.name);

  const wrapperClasses = exportMode 
    ? `relative inline-block select-none ${className}`
    : `relative inline-block select-none transform transition-transform duration-300 hover:scale-[1.02] scale-75 md:scale-100 origin-top mb-[-92px] mx-[-32px] md:mb-0 md:mx-0 ${className}`;

  return (
    <div className={wrapperClasses}>
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
        {/* AVATAR JOUEUR */}
        {player.avatar && (
          <div className={`absolute w-[140px] h-[120px] z-10 flex justify-end items-end overflow-visible pointer-events-none ${themeStyles.layout?.avatarTop || 'top-[17%]'} ${themeStyles.layout?.avatarLeft || 'left-[32%]'}`}>
            <img 
              src={`/${player.avatar}`} 
              alt="" 
              onError={(e) => { e.target.style.display = 'none'; }}
              className="w-full h-[135%] object-contain object-bottom drop-shadow-xl saturate-[1.1] brightness-[0.95]" 
            />
          </div>
        )}

        {/* OVR & POS & FLAG (TOP LEFT) */}
        <div className={`absolute flex flex-col items-center z-20 w-[45px] ${themeStyles.layout?.ovrTop || 'top-[15.5%]'} ${themeStyles.layout?.ovrLeft || 'left-[16%]'}`}>
          <span className={`text-[32px] font-black leading-none tracking-tight drop-shadow-md ${themeStyles.textPrimary}`}>
            {ovr}
          </span>
          <span className={`text-[14px] font-black uppercase tracking-wider mt-0.5 ${themeStyles.textSecondary}`}>
            {player.position === 'MID' ? 'MIL' : (player.position || 'ATT')}
          </span>
          
          <div className={themeStyles.layout?.flagWrapper || 'shadow-sm mt-2 mb-1.5'}>
            <FlagIcon code={countryCode} className={themeStyles.layout?.flagClass || 'w-7 h-4 rounded-sm'} />
          </div>
        </div>

        {/* COULEURS DU CLUB (ISOLÉ) */}
        {club && (
          <div className={`absolute z-20 flex -space-x-1 drop-shadow-sm ${themeStyles.layout?.clubTop || 'top-[30%]'} ${themeStyles.layout?.clubLeft || 'left-[16%]'}`}>
            <span className="w-5 h-5 rounded-full border border-black/30 shadow-sm" style={{ backgroundColor: club.primary }} />
            <span className="w-5 h-5 rounded-full border border-black/30 shadow-sm" style={{ backgroundColor: club.secondary || club.primary }} />
          </div>
        )}

        {/* NOM DU JOUEUR */}
        <div className={`absolute w-full text-center z-20 ${themeStyles.layout?.nameTop || 'top-[52%]'}`}>
          <h3 className={`text-[19px] font-black tracking-widest uppercase truncate px-6 pb-1 pt-0.5 leading-snug ${themeStyles.textPrimary}`}>
            {displayName}
          </h3>
        </div>

        {/* LES 6 STATISTIQUES (CHIFFRES UNIQUEMENT) */}
        <div className={`absolute w-full z-20 ${themeStyles.layout?.statsTop || 'top-[61%]'}`}>
          <div className={`absolute flex flex-col items-end w-[35px] pr-2 ${themeStyles.layout?.statsLeftCol || 'left-[22%]'} ${themeStyles.layout?.statsGapY || 'gap-y-[9px]'}`}>
            {stats.slice(0, 3).map((st, idx) => (
              <span key={idx} className={`font-bold text-[22px] tracking-tighter leading-none ${themeStyles.textPrimary}`}>
                {st.val}
              </span>
            ))}
          </div>
          <div className={`absolute flex flex-col items-end w-[35px] pr-2 ${themeStyles.layout?.statsRightCol || 'left-[62%]'} ${themeStyles.layout?.statsGapY || 'gap-y-[9px]'}`}>
            {stats.slice(3, 6).map((st, idx) => (
              <span key={idx} className={`font-bold text-[22px] tracking-tighter leading-none ${themeStyles.textPrimary}`}>
                {st.val}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

PlayerCard.displayName = 'PlayerCard';