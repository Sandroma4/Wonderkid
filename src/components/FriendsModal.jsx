import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { playSound } from '../utils/audio';

export const FriendsModal = ({ isOpen, onClose, user, onInviteToGame }) => {
  const [activeTab, setActiveTab] = useState('friends'); // 'friends', 'requests', 'add'
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen && user) {
      fetchFriends();
      fetchRequests();
      
      // Auto-upsert profile if user has pseudonym
      if (user.user_metadata?.pseudonym) {
        supabase.from('profiles').upsert({
          id: user.id,
          pseudonym: user.user_metadata.pseudonym
        }).then();
      }
    }
  }, [isOpen, user]);

  const fetchFriends = async () => {
    if (!user) return;
    setLoading(true);
    // Friends are where status is accepted and user is either sender or receiver
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        id,
        sender:sender_id(id, pseudonym),
        receiver:receiver_id(id, pseudonym)
      `)
      .eq('status', 'accepted')
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);
      
    if (data) {
      const formattedFriends = data.map(f => {
        const isSender = f.sender.id === user.id;
        return {
          friendshipId: f.id,
          friend: isSender ? f.receiver : f.sender
        };
      });
      setFriends(formattedFriends);
    }
    setLoading(false);
  };

  const fetchRequests = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        id,
        sender:sender_id(id, pseudonym)
      `)
      .eq('status', 'pending')
      .eq('receiver_id', user.id);
      
    if (data) {
      setRequests(data);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    
    // Search exact pseudonym (case insensitive using ilike)
    const { data, error } = await supabase
      .from('profiles')
      .select('id, pseudonym')
      .ilike('pseudonym', searchQuery.trim())
      .neq('id', user.id)
      .limit(5);
      
    if (error) {
      setError("Erreur lors de la recherche.");
    } else if (data.length === 0) {
      setError("Aucun joueur trouv\u00e9.");
      setSearchResults([]);
    } else {
      setSearchResults(data);
    }
    setLoading(false);
  };

  const sendFriendRequest = async (receiverId) => {
    playSound('click');
    setLoading(true);
    const { error } = await supabase
      .from('friendships')
      .insert({
        sender_id: user.id,
        receiver_id: receiverId,
        status: 'pending'
      });
      
    if (error) {
      if (error.code === '23505') {
        setError("Demande d\u00e9j\u00e0 envoy\u00e9e ou d\u00e9j\u00e0 amis.");
      } else {
        setError("Impossible d'envoyer la demande.");
      }
    } else {
      setSuccess("Demande envoy\u00e9e !");
      setTimeout(() => setSuccess(''), 2000);
    }
    setLoading(false);
  };

  const handleRequest = async (friendshipId, action) => {
    playSound('click');
    setLoading(true);
    if (action === 'accept') {
      await supabase.from('friendships').update({ status: 'accepted' }).eq('id', friendshipId);
    } else {
      await supabase.from('friendships').delete().eq('id', friendshipId);
    }
    fetchFriends();
    fetchRequests();
    setLoading(false);
  };

  const removeFriend = async (friendshipId) => {
    playSound('click');
    if (window.confirm("Retirer cet ami ?")) {
      await supabase.from('friendships').delete().eq('id', friendshipId);
      fetchFriends();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl md:rounded-3xl p-4 md:p-6 w-full max-w-md shadow-2xl relative flex flex-col max-h-[85vh]">
        <button 
          onClick={() => { playSound('click'); onClose(); }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors text-xl font-black"
        >
          X
        </button>
        <h2 className="heading-typography text-xl font-bold text-emerald-400 mb-4 uppercase tracking-wider text-center">Liste d'Amis</h2>
        
        <div className="flex bg-slate-800 rounded-lg p-1 mb-4 flex-shrink-0">
          <button 
            onClick={() => setActiveTab('friends')}
            className={`flex-1 text-xs font-bold py-2 rounded-md uppercase tracking-wider transition-colors ${activeTab === 'friends' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Amis ({friends.length})
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`flex-1 text-xs font-bold py-2 rounded-md uppercase tracking-wider transition-colors relative ${activeTab === 'requests' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Requêtes
            {requests.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">{requests.length}</span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className={`flex-1 text-xs font-bold py-2 rounded-md uppercase tracking-wider transition-colors ${activeTab === 'add' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Ajouter
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-[300px] pr-2 custom-scrollbar">
          {activeTab === 'friends' && (
            <div className="space-y-3">
              {friends.length === 0 ? (
                <p className="text-center text-slate-500 text-sm py-8">Aucun ami pour le moment.</p>
              ) : (
                friends.map(f => (
                  <div key={f.friendshipId} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex justify-between items-center">
                    <span className="font-bold text-white text-sm truncate pr-2">{f.friend?.pseudonym}</span>
                    <div className="flex gap-2 flex-shrink-0">
                      <button 
                        onClick={() => onInviteToGame(f.friend.id, f.friend.pseudonym)}
                        className="bg-emerald-600/20 hover:bg-emerald-500/40 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Inviter 1v1
                      </button>
                      <button 
                        onClick={() => removeFriend(f.friendshipId)}
                        className="bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 px-2 py-1.5 rounded-lg text-xs font-bold transition-colors"
                        title="Retirer l'ami"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-3">
              {requests.length === 0 ? (
                <p className="text-center text-slate-500 text-sm py-8">Aucune demande en attente.</p>
              ) : (
                requests.map(req => (
                  <div key={req.id} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex flex-col gap-2">
                    <span className="font-bold text-white text-sm">{req.sender?.pseudonym} vous a ajout\u00e9 !</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleRequest(req.id, 'accept')}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Accepter
                      </button>
                      <button 
                        onClick={() => handleRequest(req.id, 'reject')}
                        className="flex-1 bg-slate-700 hover:bg-rose-500/50 text-white py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'add' && (
            <div>
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Chercher un pseudo exact"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-400 outline-none"
                />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider">
                  \u2192
                </button>
              </form>
              
              {error && <p className="text-rose-500 text-xs font-bold text-center mb-4">{error}</p>}
              {success && <p className="text-emerald-400 text-xs font-bold text-center mb-4">{success}</p>}
              
              <div className="space-y-3">
                {searchResults.map(res => (
                  <div key={res.id} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex justify-between items-center">
                    <span className="font-bold text-white text-sm">{res.pseudonym}</span>
                    <button 
                      onClick={() => sendFriendRequest(res.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
