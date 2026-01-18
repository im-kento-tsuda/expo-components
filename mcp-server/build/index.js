#!/usr/bin/env node
import { createServer } from "./server.js";
async function main() {
    const server = await createServer();
    // Handle graceful shutdown
    process.on("SIGINT", async () => {
        await server.close();
        process.exit(0);
    });
    process.on("SIGTERM", async () => {
        await server.close();
        process.exit(0);
    });
}
main().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map