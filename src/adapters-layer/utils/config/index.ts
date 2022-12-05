import { join } from "path";

interface IBasePath {
  layer: string;
  database: string;
  fileNameTest: string;
  fileName: string;
}

interface IConfig {
  fullPath: string;
  fullPathTest: string;
}

const basePath: IBasePath = {
  layer: "frameworks-layer",
  database: "database",
  fileNameTest: "movie-test.json",
  fileName: "movie.json",
};

const config: IConfig = {
  fullPathTest: join(
    __dirname,
    "..",
    "..",
    "..",
    `${basePath.layer}`,
    `${basePath.database}`,
    `${basePath.fileNameTest}`
  ),
  fullPath: join(
    __dirname,
    "..",
    "..",
    "..",
    `${basePath.layer}`,
    `${basePath.database}`,
    `${basePath.fileName}`
  ),
};

export { config, IConfig, IBasePath };
