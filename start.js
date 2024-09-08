// start.js
import { createServer } from 'vite';

const startServer = async () => {
    const server = await createServer({
        server: {
            port: process.env.PORT || 3000,
        },
    });
    await server.listen();
    server.printUrls();
};

startServer();