import { OAuth2Strategy, VerifyFunction } from "passport-google-oauth";
import { Profile } from "passport";

export default (port: number) =>
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `http://localhost:${port}/auth/google/callback`,
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyFunction
    ) {
      return done(null, profile);
    }
  );
