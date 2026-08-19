import { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';
import { supabase } from '../supabaseClient';

import { FriendsModal } from './FriendsModal';

export const MainMenu = ({ onNavigate, onLoadGame, onJoinInvite }) => {
  const [user, setUser] = useState(null);
  const [hasSave, setHasSave] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    playSound('click');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem('golden_xi_game_state');
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        // N'afficher le bouton que si la carrière n'est pas terminée
        if (!saved.isRetired) setHasSave(true);
      } catch (e) {
        setHasSave(true);
      }
    }
  }, []);

  
  // Real-time invites
  useEffect(() => {
    if (!user) return;
    const channel = supabase.channel(`user:${user.id}`)
      .on('broadcast', { event: 'game_invite' }, (payload) => {
        setIncomingInvite(payload.payload);
        playSound('notification');
      })
      .subscribe();
      
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const handleSendInvite = async (friendId, friendName) => {
    // Generate a random room ID or use one we have
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Broadcast invite
    await supabase.channel(`user:${friendId}`).send({
      type: 'broadcast',
      event: 'game_invite',
      payload: {
        senderName: user.user_metadata?.pseudonym || user.email,
        roomId: newRoomId
      }
    });
    
    // Then join this room ourselves
    onJoinInvite(newRoomId);
  };

  const handleGoogleLogin = async () => {
    playSound('click');
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const handleLogout = async () => {
    playSound('click');
    await supabase.auth.signOut();
  };

  const [showSettings, setShowSettings] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showPlayOptions, setShowPlayOptions] = useState(false);
  const [showFutsalOptions, setShowFutsalOptions] = useState(false);
  const [showCareerOptions, setShowCareerOptions] = useState(false);
  const [incomingInvite, setIncomingInvite] = useState(null);
  const [newPseudonym, setNewPseudonym] = useState('');
  const [settingError, setSettingError] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleEmailAuth = async () => {
    setSettingError('');
    if (!email || !password) {
      setSettingError('Veuillez remplir tous les champs.');
      return;
    }
    
    if (isLoginMode) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setSettingError(error.message);
      else setShowSettings(false);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setSettingError(error.message);
      else {
        setSettingError('Compte créé avec succès !');
        setTimeout(() => setShowSettings(false), 2000);
      }
    }
  };

  const handleUpdatePseudonym = async () => {
    if (!user) return;
    const lastChange = user.user_metadata?.last_pseudonym_change;
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    if (lastChange && (now - lastChange < thirtyDays)) {
      setSettingError('Vous ne pouvez changer de pseudonyme qu\'une fois par mois.');
      return;
    }
    if (newPseudonym.trim().length < 3 || newPseudonym.trim().length > 20) {
      setSettingError('Le pseudonyme doit contenir entre 3 et 20 caractères.');
      return;
    }
    
    await supabase.auth.updateUser({ 
      data: { 
        pseudonym: newPseudonym.trim(),
        last_pseudonym_change: now
      } 
    });
    setSettingError('Pseudonyme mis à jour avec succès !');
    setTimeout(() => setShowSettings(false), 2000);
  };

  return (
    <div className="min-h-screen bg-emerald-150 dark:bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-tactical-pattern pointer-events-none opacity-5 dark:opacity-10"></div>
      
      {/* Pitch Markings - Left (Penalty Area) */}
      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[280px] h-[680px] border-y-[4px] border-r-[4px] border-white/60 dark:border-white/5 pointer-events-none">
        {/* Six-yard box */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[90px] h-[300px] border-y-[4px] border-r-[4px] border-white/60 dark:border-white/5"></div>
        {/* Penalty spot */}
        <div className="absolute left-[180px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/60 dark:bg-white/5 -translate-x-1/2"></div>
        {/* Penalty arc */}
        <div className="absolute left-[30px] top-1/2 -translate-y-1/2 w-[300px] h-[300px] border-[4px] border-white/60 dark:border-white/5 rounded-full" style={{ clipPath: 'inset(0 0 0 250px)' }}></div>
      </div>

      {/* Pitch Markings - Right (Penalty Area) */}
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[680px] border-y-[4px] border-l-[4px] border-white/60 dark:border-white/5 pointer-events-none">
        {/* Six-yard box */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[90px] h-[300px] border-y-[4px] border-l-[4px] border-white/60 dark:border-white/5"></div>
        {/* Penalty spot */}
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/60 dark:bg-white/5 translate-x-1/2"></div>
        {/* Penalty arc */}
        <div className="absolute right-[30px] top-1/2 -translate-y-1/2 w-[300px] h-[300px] border-[4px] border-white/60 dark:border-white/5 rounded-full" style={{ clipPath: 'inset(0 250px 0 0)' }}></div>
      </div>
      
      {/* Theme Toggle Button */}
      <div className="absolute top-12 left-4 md:top-6 md:left-6 z-20">
        <button
          onClick={toggleTheme}
          className="bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white p-2.5 md:p-3 rounded-full shadow-lg border border-slate-300 dark:border-slate-700 transition-all hover:scale-110 flex items-center justify-center w-12 h-12"
          title={theme === 'dark' ? 'Passer en Mode Clair' : 'Passer en Mode Sombre'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Top Right Action Buttons */}
      <div className="absolute top-12 right-4 md:top-6 md:right-6 z-20 flex items-center gap-2">
        {/* Bouton Amis */}
        {user && (
          <button 
            onClick={() => { playSound('click'); setShowFriends(true); }}
            className="bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white p-2.5 md:p-3 rounded-full shadow-lg border border-slate-300 dark:border-slate-700 transition-all hover:scale-110"
          >
            👥
          </button>
        )}

        {/* Bouton Paramètres (Toujours visible) */}
        <button 
          onClick={() => { playSound('click'); setShowSettings(true); setNewPseudonym(user?.user_metadata?.pseudonym || ''); setSettingError(''); setEmail(''); setPassword(''); }}
          className="bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white p-2.5 md:p-3 rounded-full shadow-lg border border-slate-300 dark:border-slate-700 transition-all hover:rotate-90"
        >
          ⚙️
        </button>
      </div>


      {/* Incoming Invite Popup */}
      {incomingInvite && (
        <div className="fixed top-24 right-4 z-50 bg-white dark:bg-slate-900 border border-emerald-500 rounded-xl p-4 shadow-2xl animate-bounce-in max-w-sm w-full md:w-auto">
          <h3 className="text-emerald-600 dark:text-emerald-400 font-bold mb-2 uppercase text-sm tracking-wider">Invitation reçue !</h3>
          <p className="text-slate-800 dark:text-white text-sm mb-4"><span className="font-bold text-amber-600 dark:text-amber-400">{incomingInvite.senderName}</span> vous invite à jouer en 1v1 !</p>
          <div className="flex gap-2">
            <button 
              onClick={() => { playSound('click'); onJoinInvite(incomingInvite.roomId); setIncomingInvite(null); }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-slate-800 dark:text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              Rejoindre
            </button>
            <button 
              onClick={() => { playSound('click'); setIncomingInvite(null); }}
              className="flex-1 bg-emerald-200 dark:bg-slate-700 hover:bg-rose-500 text-slate-800 dark:text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              Refuser
            </button>
          </div>
        </div>
      )}
      
      {/* Friends Modal */}
      <FriendsModal 
        isOpen={showFriends} 
        onClose={() => setShowFriends(false)} 
        user={user} 
        onInviteToGame={handleSendInvite}
      />

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-emerald-200/90 dark:bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-emerald-500/50 rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-slate-500 dark:text-slate-500 dark:text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="heading-typography text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 uppercase tracking-wider text-center">Paramètres du Compte</h2>
            
            {!user ? (
              <div className="space-y-4">
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full relative overflow-hidden rounded-xl bg-white text-slate-900 border border-slate-200 p-3 transition-all hover:bg-slate-50 flex justify-center items-center gap-3 font-bold uppercase text-sm"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  Continuer avec Google
                </button>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-emerald-200 dark:bg-slate-700"></div>
                  <span className="text-xs text-slate-500 dark:text-slate-500 font-semibold uppercase">Ou avec Email</span>
                  <div className="flex-1 h-px bg-emerald-200 dark:bg-slate-700"></div>
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresse Email"
                  className="w-full bg-emerald-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-bold focus:border-emerald-400 outline-none text-sm text-center"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  className="w-full bg-emerald-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-bold focus:border-emerald-400 outline-none text-sm text-center"
                />
                {settingError && <p className="text-xs text-center font-semibold text-rose-500">{settingError}</p>}
                
                <button
                  onClick={handleEmailAuth}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-800 dark:text-white font-bold rounded-xl text-sm uppercase tracking-wider transition-colors shadow-lg"
                >
                  {isLoginMode ? 'Se Connecter' : 'Créer un Compte'}
                </button>
                <button
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="w-full text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 hover:text-white underline mt-2"
                >
                  {isLoginMode ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mb-4">
                  <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 text-center">Connecté en tant que</p>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 text-center">{user.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-500 dark:text-slate-400 mb-2 uppercase">Pseudonyme (Classement)</label>
                  <input
                    type="text"
                    value={newPseudonym}
                    onChange={(e) => setNewPseudonym(e.target.value)}
                    maxLength={20}
                    placeholder="Ex: xX_Striker_Xx"
                    className="w-full bg-emerald-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-bold focus:border-emerald-400 outline-none text-base text-center"
                  />
                </div>
                {settingError && (
                  <p className={`text-xs text-center font-semibold ${settingError.includes('succès') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                    {settingError}
                  </p>
                )}
                <button
                  onClick={handleUpdatePseudonym}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-800 dark:text-white font-bold rounded-xl text-sm uppercase tracking-wider transition-colors shadow-lg"
                >
                  Mettre à jour
                </button>
                <p className="text-[10px] text-slate-500 dark:text-slate-500 text-center leading-relaxed">
                  Le pseudonyme ne peut être modifié qu'une seule fois par mois.
                </p>
                <div className="pt-4 mt-4 border-t border-slate-300 dark:border-slate-800">
                  <button 
                    onClick={() => { handleLogout(); setShowSettings(false); }}
                    className="w-full py-2 text-rose-500 hover:text-rose-400 text-xs font-bold uppercase tracking-wider"
                  >
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 dark:hidden blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-400/10 dark:hidden blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center mt-4 md:-mt-32">
        {/* Logo */}
        <div className="mb-6 flex justify-center items-center relative animate-[fade-in_1s_ease-out]">
          {/* Intense glow behind the logo */}
          <div className="absolute w-[180px] h-[180px] md:w-[280px] md:h-[280px] bg-emerald-500/40 blur-[80px] rounded-full pointer-events-none"></div>
          <img 
            src="/logo.png" 
            alt="Wonderkid Logo" 
            className="relative z-10 w-[180px] h-[180px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] object-contain drop-shadow-[0_0_50px_rgba(16,185,129,1)] brightness-110 contrast-125 scale-150 md:scale-100"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <h1 style={{display: 'none'}} className="heading-typography text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 text-center tracking-tighter drop-shadow-lg">
            WONDERKID
          </h1>
        </div>

        {/* Menu Buttons */}
        <div className="w-full space-y-4 animate-[slide-up_0.8s_ease-out]">
          
          {showPlayOptions ? (
            <div className="space-y-4 animate-[fade-in_0.3s_ease-out]">
              <button 
                onClick={() => { playSound('click'); setShowPlayOptions(false); }}
                className="w-full relative group overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 p-3 transition-all duration-300 hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 flex items-center gap-2 justify-center"
              >
                <span className="text-slate-500 dark:text-slate-500 dark:text-slate-400">⬅️</span>
                <span className="heading-typography text-slate-600 dark:text-slate-300 font-bold text-sm tracking-wide uppercase">Retour</span>
              </button>

              <div className="pb-2">
                <button 
                  onClick={() => { playSound('click'); setShowCareerOptions(!showCareerOptions); }}
                  className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 border border-emerald-500/50 p-3 md:p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-95 mb-3"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="text-xl md:text-2xl">🏆</span>
                      <span className="heading-typography text-white font-bold text-base md:text-lg tracking-wide uppercase">Carrière Solo</span>
                    </div>
                    <span className={`text-emerald-200 transition-transform ${showCareerOptions ? 'rotate-90' : 'group-hover:translate-x-1'}`}>➔</span>
                  </div>
                </button>

                {showCareerOptions && (
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-emerald-500/30 ml-2 animate-fade-in">
                    <button 
                      onClick={() => { playSound('start'); onNavigate('career'); }}
                      className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 border border-emerald-400/50 p-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-95"
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                          <span className="text-lg md:text-xl">⚽</span>
                          <span className="heading-typography text-white font-bold text-sm md:text-base tracking-wide uppercase">Nouvelle Carrière</span>
                        </div>
                        <span className="text-emerald-200 group-hover:translate-x-1 transition-transform text-sm">➔</span>
                      </div>
                    </button>

                    {hasSave && (
                      <button 
                        onClick={() => { playSound('click'); onLoadGame(); }}
                        className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 border border-amber-400/50 p-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95"
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                            <span className="text-lg md:text-xl">⏳</span>
                            <span className="heading-typography text-white font-bold text-sm md:text-base tracking-wide uppercase">Continuer la Carrière</span>
                          </div>
                          <span className="text-amber-200 group-hover:translate-x-1 transition-transform text-sm">➔</span>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>

                              <button 
                  onClick={() => { playSound('click'); onNavigate('multiplayerLobby'); }}
                  className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-800 border border-cyan-500/50 p-3 md:p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="text-xl md:text-2xl">⚔️</span>
                      <span className="heading-typography text-slate-800 dark:text-white font-bold text-base md:text-lg tracking-wide uppercase">Guerre d'égos (1v1)</span>
                    </div>
                    <span className="text-cyan-600 dark:text-cyan-300 group-hover:translate-x-1 transition-transform">➔</span>
                  </div>
                </button>

                                <button 
                  onClick={() => { playSound('click'); onNavigate('multiplayerLobbyCoop'); }}
                  className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-violet-800 border border-violet-500/50 p-3 md:p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="text-xl md:text-2xl">🤝</span>
                      <span className="heading-typography text-slate-800 dark:text-white font-bold text-base md:text-lg tracking-wide uppercase">Frères d'Armes (Coop)</span>
                    </div>
                    <span className="text-violet-600 dark:text-violet-300 group-hover:translate-x-1 transition-transform">➔</span>
                  </div>
                </button>

                <div className="pt-2">
                  <button 
                    onClick={() => { playSound('click'); setShowFutsalOptions(!showFutsalOptions); }}
                    className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 border border-orange-500/50 p-3 md:p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] active:scale-95 mb-3"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        <span className="text-xl md:text-2xl">⚽</span>
                        <span className="heading-typography text-white font-bold text-base md:text-lg tracking-wide uppercase">Futsal</span>
                      </div>
                      <span className={`text-orange-200 transition-transform ${showFutsalOptions ? 'rotate-90' : 'group-hover:translate-x-1'}`}>➔</span>
                    </div>
                  </button>
                  
                  {showFutsalOptions && (
                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-orange-500/30 ml-2 animate-fade-in">
                      <button 
                        onClick={() => { playSound('click'); onNavigate('futsalManager'); }}
                        className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 border border-orange-400/50 p-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95"
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                            <span className="text-lg md:text-xl">👟</span>
                            <span className="heading-typography text-white font-bold text-sm md:text-base tracking-wide uppercase">Gestion Futsal</span>
                          </div>
                          <span className="text-orange-200 group-hover:translate-x-1 transition-transform text-sm">➔</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => { playSound('click'); onNavigate('futsalLobby'); }}
                        className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 to-red-700 border border-red-500/50 p-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] active:scale-95"
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                            <span className="text-lg md:text-xl">🔥</span>
                            <span className="heading-typography text-white font-bold text-sm md:text-base tracking-wide uppercase">Futsal en ligne</span>
                          </div>
                          <span className="text-red-200 group-hover:translate-x-1 transition-transform text-sm">➔</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
            </div>
          ) : (
            <>
              <button 
                onClick={() => { playSound('click'); setShowPlayOptions(true); }}
                className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 border border-emerald-500/50 p-3 md:p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl">🎮</span>
                    <span className="heading-typography text-slate-800 dark:text-white font-bold text-base md:text-lg tracking-wide uppercase">Jouer</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-300 group-hover:translate-x-1 transition-transform">➔</span>
                </div>
              </button>

          <button 
            onClick={() => { playSound('click'); onNavigate('leaderboard'); }}
            className="w-full relative group overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl">🌍</span>
                <span className="heading-typography text-slate-800 dark:text-white font-bold text-base md:text-lg tracking-wide uppercase">Classement Mondial</span>
              </div>
              <span className="text-slate-500 dark:text-slate-500 dark:text-slate-400 group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </button>

          <button 
            onClick={() => { playSound('click'); onNavigate('achievements'); }}
            className="w-full relative group overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏅</span>
                <span className="heading-typography text-slate-800 dark:text-white font-bold text-lg tracking-wide uppercase">Succès</span>
              </div>
              <span className="text-slate-500 dark:text-slate-500 dark:text-slate-400 group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </button>

          <button 
            onClick={() => { playSound('click'); onNavigate('globalPalmares'); }}
            className="w-full relative group overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 p-3 md:p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl">🏆</span>
                <span className="heading-typography text-slate-800 dark:text-white font-bold text-base md:text-lg tracking-wide uppercase">Palmarès Global</span>
              </div>
              <span className="text-slate-500 dark:text-slate-500 dark:text-slate-400 group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </button>

          <button 
            onClick={() => { playSound('click'); onNavigate('cardCollection'); }}
            className="w-full relative group overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 p-3 md:p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl">🎴</span>
                <span className="heading-typography text-slate-800 dark:text-white font-bold text-base md:text-lg tracking-wide uppercase">Hall of Fame</span>
              </div>
              <span className="text-slate-500 dark:text-slate-500 dark:text-slate-400 group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </button>

          <button 
            onClick={() => { playSound('click'); onNavigate('careerHistory'); }}
            className="w-full relative group overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 p-3 md:p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl">📖</span>
                <span className="heading-typography text-slate-800 dark:text-white font-bold text-base md:text-lg tracking-wide uppercase">Historique des Carrières</span>
              </div>
              <span className="text-slate-500 dark:text-slate-500 dark:text-slate-400 group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </button>
            </>
          )}
        </div>
        
        <div className="mt-12 text-slate-500 dark:text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-widest opacity-60">
          Wonderkid - Beta 0.1
        </div>
      </div>
    </div>
  );
};
