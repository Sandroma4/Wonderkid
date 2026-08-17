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
    onStateChange: initialOnStateChange
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

  const setOnStateChange = (newCallback) => {
    callbacks.onStateChange = newCallback;
  };

  return { updateState, leaveRoom, channel, setOnStateChange };
};
