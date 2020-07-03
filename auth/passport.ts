import passport from "passport";

export default function (authInstance: passport.PassportStatic) {
  authInstance.serializeUser((user: any, cb: any) => {
    cb(null, user);
  });

  authInstance.deserializeUser((user: any, cb: any) => {
    cb(null, user);
  });
}
