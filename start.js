// start.js
import { createServer } from 'vite';

const startServer = async () => {
    const server = await createServer({
        server: {
            port: process.env.PORT || 3000,
            host: '0.0.0.0', // Expose the server to the network
        },
    });
    await server.listen();
    server.printUrls();
};

startServer();