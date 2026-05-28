import { createApp } from "./app.js";
import { config } from "./config.js";
import { logger } from "./logger.js";
import { Indexer } from "./services/indexer.js";

const app = createApp();
const indexer = new Indexer();

const server = app.listen(config.port, () => {
  logger.info({ port: config.port, env: config.nodeEnv }, "StellarYield backend started");
  void indexer.start();
});

process.on("SIGTERM", () => {
  indexer.stop();
  server.close(() => {
    logger.info("StellarYield backend stopped");
  });
});
