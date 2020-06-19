import { Logger } from "log4js";
import { Context } from "koa";
const errorHandler = {
  error(app) {
    interface KOAContext extends Context {
      // typeof logger;
      logger: Logger;
    }
    app.use(async (ctx, next: () => Promise<any>) => {
      // await next().catch(error => {
      try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) {
            ctx.throw(404)
        }
      } catch (error) {
        // error logs pm2 logs
        ctx.logger.error(error);
        ctx.status = error.status || 500;
        ctx.body = ctx.status === 404 ? `${ctx.originalUrl} not found` : "请求出错";
      }
    });
  }
};
export default errorHandler;
