import app from "./frameworks-layer/app";
import { logger } from "./adapters-layer/utils/logger";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./frameworks-layer/swagger/swagger.json";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3333, () => {
  logger.info("server listen port 3333");
});
