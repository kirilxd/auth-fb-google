import OAuth2Strategy from "passport-oauth2";
import fetch from "node-fetch";
export default (port: number) =>
  new OAuth2Strategy(
    {
      authorizationURL: "https://id.gov.ua",
      tokenURL: `https://id.gov.ua/get-access-token`,
      clientID: "e339226d762f7637d4d7ea82f85f5334",
      clientSecret: "c0512dde750b92f505a43ea8c2bb0575d4ab9734",
      callbackURL: `http://localhost:${port}/auth/euid/callback`,
      passReqToCallback: true,
    },
    async function (
      req: any,
      accessToken: any,
      refreshToken: any,
      results: any,
      profile: any,
      done: any
    ) {
      const res = await fetch(
        `https://id.gov.ua/get-user-info?access_token=${accessToken}&user_id=${results.user_id}&fields=issuer,issuercn,serial,subject,subjectcn,locality,state, title,lastname, middlename,givenname`
      );
      let data = await res.json();
      return done(null, data);
    }
  );
