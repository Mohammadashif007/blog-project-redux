import { Router } from "express";
import { UserRoutes } from "../module/user/user.routes";
import { AuthRoutes } from "../module/auth/auth.routes";
import { DivisionRoutes } from "../module/division/division.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/division",
    route: DivisionRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
