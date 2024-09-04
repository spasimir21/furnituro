import expressWs from 'express-ws';
import express from 'express';
import cors from 'cors';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function createLiveReloadServer(port: number) {
  const app = express();

  app.use(cors({ origin: '*' }));

  expressWs(app);

  const sockets = new Set<any>();

  // @ts-ignore
  app.ws('/', socket => {
    sockets.add(socket);

    socket.once('close', () => sockets.delete(socket));
    socket.once('error', () => sockets.delete(socket));
  });

  app.listen({ port, host: '0.0.0.0' });

  let isReloading = false;

  const reload = async () => {
    isReloading = true;

    await wait(500);

    while (true) {
      try {
        const req = await fetch('http://dialogic.com/');
        if (req.ok) break;
      } catch {}

      await wait(100);
    }

    console.log('Reloading frontend...');
    for (const socket of sockets) socket.send('reload');

    isReloading = false;
  };

  return () => {
    if (isReloading) return;
    reload();
  };
}

export { createLiveReloadServer };
