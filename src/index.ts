import app from "./frameworks-layer/app";
import { logger } from "./adapters-layer/utils/logger";

app.listen(3333, () => {
  logger.info("server listen port 3333");
});
