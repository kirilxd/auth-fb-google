import GoogleStrategy from "./google";
import FacebookStrategy from "./fb";
import OAuth2Strategy from "./id";
import passport from "passport";

export default (port: number): typeof passport => {
  passport.use(GoogleStrategy(port));
  passport.use(FacebookStrategy(port));
  passport.use(OAuth2Strategy(port));
  return passport;
};
