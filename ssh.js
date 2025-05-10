const net = require('net');

// Public port clients will connect to
const PUBLIC_PORT = 8080;

// When a client connects to the public port, pipe data to the remote client
const server = net.createServer((incomingSocket) => {
  console.log('Client connected to public port');

  // This is your persistent tunnel to the client machine
  const tunnelSocket = net.connect({ host: 'localhost', port: 6000 }, () => {
    console.log('Tunnel connected to local service on client');

    incomingSocket.pipe(tunnelSocket).pipe(incomingSocket);
  });

  tunnelSocket.on('error', (err) => {
    console.error('Tunnel connection failed:', err);
    incomingSocket.end();
  });
});

server.listen(PUBLIC_PORT, () => {
  console.log(`Server listening on public port ${PUBLIC_PORT}`);
});
