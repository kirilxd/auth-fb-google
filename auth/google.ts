import { OAuth2Strategy } from "passport-google-oauth";
import { Profile } from "passport";

export default (port: number) => new OAuth2Strategy(
    {
        clientID:
            "771848358350-6an1o94eg9999bsqqoi12ekvkmgdn849.apps.googleusercontent.com",
        clientSecret: "sWgiGnFITQmPKKDzud2Rgow4",
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