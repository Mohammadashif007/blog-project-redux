/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import passport from "passport";

const router = express.Router();

router.post("/login", AuthControllers.loginUser);
router.post("/refresh-token", AuthControllers.createNewAccessToken);
router.post("/logout", AuthControllers.logOut);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  AuthControllers.resetPassword,
);
router.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/";
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(
      req,
      res,
      next,
    );
  },
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  AuthControllers.googleCallBackController,
);

export const AuthRoutes = router;
