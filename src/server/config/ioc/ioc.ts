import {
  fluentProvide,
  provide,
  buildProviderModule
} from "inversify-binding-decorators";
import * as Router from "koa-router";
import TAGS from "../../constant/TAGS";
import { Container, injectable, inject } from "inversify";
import { interfaces, TYPE, controller, httpGet, InversifyKoaServer } from "inversify-koa-utils";
const provideThrowable = (identifier, name) => {
  return fluentProvide(identifier)
    .whenTargetNamed(name)
    .done();
};
// container
//   .bind<interfaces.Controller>(TYPE.Controller)
//   .to(IndexController)
//   .whenTargetNamed("IndexController");
export {
  Router,
  TAGS,
  interfaces,
  TYPE,
  controller,
  httpGet,
  inject,
  injectable,
  provideThrowable,
  buildProviderModule,
  provide,
  Container,
  InversifyKoaServer
};
