import app from "./app";
import { logger } from "./logger";

app.listen(3333, () => {
  logger.info("server listen port 3333");
});
