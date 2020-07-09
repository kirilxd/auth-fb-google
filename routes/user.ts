import express from "express";
import { loginRequired, RequestUser, checkAccessToken } from "../auth/helpers";
import path from "path";
import passport from "passport";
export default function user(
  app: express.Application,
  authInstance: passport.PassportStatic
) {
  app.get("/auth/facebook", authInstance.authenticate("facebook"));
  app.get(
    "/auth/google",
    authInstance.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"],
    })
  );
  app.get(
    "/auth/euid",
    passport.authenticate("oauth2", { scope: ["email", "givenname"] })
  );
  app.get(
    "/auth/google/callback",
    authInstance.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"],
      successRedirect: "/logged",
      failureRedirect: "/",
    })
  );
  app.get(
    "/auth/facebook/callback",
    authInstance.authenticate("facebook", {
      successRedirect: "/logged",
      failureRedirect: "/",
    })
  );
  app.get(
    "/auth/euid/callback",
    passport.authenticate("oauth2", { failureRedirect: "/" }),
    function (req, res) {
      // // @ts-ignore
      // req.session.cookie.maxAge = req.authInfo.expires_in * 1000 - Date.now();
      res.redirect("/logged");
    }
  );
  app.get(
    "/logged/info",
    loginRequired,
    checkAccessToken,
    (req: RequestUser, res: any) => {
      res.send(req.user);
    }
  );
  app.get("/logout", (req, res) => {
    // @ts-ignore
    req.logout();
    res.redirect("/");
  });
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
  });
  app.get(
    "/logged",
    loginRequired,
    checkAccessToken,
    (req: RequestUser, res: any) => {
      res.sendFile(path.join(__dirname, "../views", "logged.html"));
    }
  );
}
