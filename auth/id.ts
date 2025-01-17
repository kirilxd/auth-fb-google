import OAuth2Strategy, {VerifyCallback} from "passport-oauth2";
import {Request} from "express"
import fetch from "node-fetch";
export default (port: number) =>
  new OAuth2Strategy(
    {
      authorizationURL: "https://id.gov.ua",
      tokenURL: `https://id.gov.ua/get-access-token`,
      clientID: process.env.IDGOVUA_CLIENT_ID!,
      clientSecret: process.env.IDGOVUA_CLIENT_SECRET!,
      callbackURL: `http://localhost:${port}/auth/euid/callback`,
      passReqToCallback: true,
    },
    async function (
      req: Request,
      accessToken: string,
      refreshToken: string,
      results: any,
      profile: any,
      done: VerifyCallback
    ) {
      const res = await fetch(
        `https://id.gov.ua/get-user-info?access_token=${accessToken}&user_id=${results.user_id}&fields=issuer,issuercn,serial,subject,subjectcn,locality,state, title,lastname, middlename,givenname`
      );
      let data = await res.json();
      data.expiresIn = results.expires_in;
      return done(null, data, results);
    }
  );
