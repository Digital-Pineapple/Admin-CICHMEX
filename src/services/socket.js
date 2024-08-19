import { io } from 'socket.io-client';

const Url = import.meta.env.VITE_API_SOCKET

export const socket = io(Url,{
    path: '/socket/',
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
});


