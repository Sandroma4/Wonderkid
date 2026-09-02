import { supabase } from '../supabaseClient';

export const generateRoomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const createMultiplayerRoom = (roomId, playerId, initialPlayerState, initialOnStateChange) => {
  let localState = { ...initialPlayerState };
  const callbacks = {
    onStateChange: initialOnStateChange,
    onBroadcast: null
  };

  const channel = supabase.channel(`room_${roomId}`, {
    config: {
      presence: {
        key: playerId,
      },
    },
  });

  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      const players = [];
      for (const id in state) {
        if (state[id] && state[id].length > 0) {
          players.push(state[id][0]);
        }
      }
      if (callbacks.onStateChange) {
        callbacks.onStateChange(players);
      }
    })
    .on('broadcast', { event: 'coop_event' }, (payload) => {
      if (callbacks.onBroadcast) {
        callbacks.onBroadcast(payload.payload);
      }
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ playerId, ...localState });
      }
    });

  const updateState = async (newState) => {
    localState = { ...localState, ...newState };
    if (channel.state === 'joined') {
      await channel.track({ playerId, ...localState });
    }
  };

  const leaveRoom = async () => {
    if (channel.state === 'joined') {
      await channel.untrack();
      await supabase.removeChannel(channel);
    }
  };

  const sendBroadcast = async (payload) => {
    if (channel.state === 'joined') {
      await channel.send({
        type: 'broadcast',
        event: 'coop_event',
        payload
      });
    }
  };

  const setOnStateChange = (newCallback) => {
    callbacks.onStateChange = newCallback;
  };
  
  const setOnBroadcast = (newCallback) => {
    callbacks.onBroadcast = newCallback;
  };

  return { updateState, leaveRoom, channel, setOnStateChange, sendBroadcast, setOnBroadcast };
};

export const joinMatchmaking = (playerId, playerName, mode, onMatchFound) => {
  const channel = supabase.channel('matchmaking_queue', {
    config: {
      presence: {
        key: playerId,
      },
    },
  });

  let matchFound = false;

  channel
    .on('presence', { event: 'sync' }, () => {
      if (matchFound) return;
      const state = channel.presenceState();
      
      const lookingPlayers = [];
      for (const id in state) {
        if (state[id] && state[id].length > 0) {
          const p = state[id][0];
          if (p.isLooking && p.mode === mode) {
            lookingPlayers.push({ id, ...p });
          }
        }
      }

      if (lookingPlayers.length >= 2) {
        // Find myself
        const me = lookingPlayers.find(p => p.id === playerId);
        // Find another player
        const other = lookingPlayers.find(p => p.id !== playerId);

        if (me && other) {
          matchFound = true;
          // Deterministic host selection based on ID sorting
          const isHost = me.id < other.id;
          
          if (isHost) {
            const roomId = generateRoomCode();
            // Send broadcast to the other player specifically
            channel.send({
              type: 'broadcast',
              event: 'match_found',
              payload: { targetId: other.id, roomId: roomId, hostName: me.name }
            });
            onMatchFound({ roomId, isHost: true, opponentName: other.name });
          }
        }
      }
    })
    .on('broadcast', { event: 'match_found' }, (payload) => {
      if (matchFound) return;
      const data = payload.payload;
      if (data && data.targetId === playerId) {
        matchFound = true;
        onMatchFound({ roomId: data.roomId, isHost: false, opponentName: data.hostName });
      }
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ isLooking: true, mode, name: playerName });
      }
    });

  const leaveMatchmaking = async () => {
    if (channel.state === 'joined') {
      await channel.untrack();
      await supabase.removeChannel(channel);
    }
  };

  return { leaveMatchmaking };
};
