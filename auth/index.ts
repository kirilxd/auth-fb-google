import GoogleStrategy from "./google";
import FacebookStrategy from "./fb";
import passport from "passport";

export default (port: number): typeof passport => {
    passport.use(GoogleStrategy(port));
    passport.use(FacebookStrategy(port));

    return passport;
};
