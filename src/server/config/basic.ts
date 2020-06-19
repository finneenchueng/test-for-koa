import { extend } from "lodash";
import { join } from "path";
// 默认开发环境下
let config = {
  viewDir: join(__dirname, "..", "views"),
  staticDir: join(__dirname, "..", "assets"),
  logPath: join(__dirname, "..", "logs/runtimes.log"),
  port: 3100
};
const mergeconfig = () => {
  // 上线环境下
  if (process.env.NODE_ENV === "production") {
    const proConfig = {
      port: 80
    };
    config = extend(config, proConfig);
  }
  return config;
};
export default mergeconfig();
