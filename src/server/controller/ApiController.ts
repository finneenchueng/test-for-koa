import {
  interfaces,
  TYPE,
  controller,
  httpGet,
  TAGS,
  Router,
  inject,
  provideThrowable
} from "../config/ioc";
// import { Model } from "../model/User";
@controller("/api")
@provideThrowable(TYPE.Controller, "ApiController")
export default class ApiController implements interfaces.Controller {
  private apiService;
  constructor(@inject(TAGS.ApiService) apiService) {
    this.apiService = apiService;
  }
  @httpGet("/test")
  private async test(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    const result: Promise<Object> = await this.apiService.getInfo(
      "https://api.github.com/users/github"
    );
    ctx.body = result;
  }
}
