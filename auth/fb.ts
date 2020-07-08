import { Strategy } from "passport-facebook";
import { Profile } from "passport";

export default (port: number) =>
  new Strategy(
    {
      clientID: process.env.FB_CLIENT_ID!,
      clientSecret: process.env.FB_CLIENT_SECRET!,
      callbackURL: `http://localhost:${port}/auth/facebook/callback`,
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: any
    ) {
      return done(null, profile);
    }
  );
