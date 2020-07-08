import { OAuth2Strategy } from "passport-google-oauth";
import { Profile } from "passport";

export default (port: number) =>
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `http://localhost:${port}/auth/google/callback`,
    },
    function (
      accessToken: any,
      refreshToken: any,
      profile: Profile,
      done: any
    ) {
      return done(null, profile);
    }
  );
