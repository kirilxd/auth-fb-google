import { Strategy } from "passport-facebook";
import { Profile } from "passport";

export default (port: number) =>
  new Strategy(
    {
      clientID: "2577798969135720",
      clientSecret: "2b20f033ab905d9ffafa47d8de261e83",
      callbackURL: `http://localhost:${port}/logged`,
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: any
    ) {
      return done(null, {
        username: profile.username,
      });
    }
  );
