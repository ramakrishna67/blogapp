import { appRouter } from "./router";
import { db } from "../db/drizzle";

export const createCaller = () => {
  return appRouter.createCaller({ db });
};
