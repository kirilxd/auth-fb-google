import express from "express";
import auth from "./auth";
import session from "express-session";
import user from "./routes/user";
import serialize from "./auth/passport";
import fetch from "node-fetch";
import passport from "passport";
import OAuth2Strategy from "passport-oauth2";
const app = express();
const port = 8080;
const authInstance = auth(port);
serialize(authInstance);
app.use(
  session({ secret: "anything", resave: false, saveUninitialized: true })
);
app.use(express.urlencoded({ extended: false }));

app.use(authInstance.initialize());
app.use(authInstance.session());

app.use(express.static(__dirname + "/views"));
user(app, authInstance);
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://id.gov.ua",
      tokenURL: `https://id.gov.ua/`,
      clientID: "1",
      clientSecret: "x",
      callbackURL: `http://localhost:${port}/auth/euid/callback`,
    },
    function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      return done(null, profile);
    }
  )
);
app.get("/auth/euid", passport.authenticate("oauth2"));

app.get(
  "/auth/euid/callback",
  passport.authenticate("oauth2", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/logged");
  }
);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
