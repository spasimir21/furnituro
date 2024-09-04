const LIVE_RELOAD_PORT: number = 4321;

const socket = new WebSocket(`ws://${window.location.hostname}:${LIVE_RELOAD_PORT}/`);

socket.addEventListener('message', () => window.location.reload());
