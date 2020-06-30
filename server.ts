import express from "express";
import passport, { Profile } from "passport";
let FacebookStrategy = require("passport-facebook").Strategy;
let GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const app = express();
const port = 8080;
app.use(express.static(__dirname + "/"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/logged", (req, res) => {
  res.sendFile(__dirname + "/logged.html");
});
passport.use(
  new FacebookStrategy(
    {
      clientID: "2577798969135720",
      clientSecret: "2b20f033ab905d9ffafa47d8de261e83",
      callbackURL: `http://localhost:${port}/logged`,
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) {
      let User: any;
      User.findOrCreate(function (err: any, user: any) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "771848358350-6an1o94eg9999bsqqoi12ekvkmgdn849.apps.googleusercontent.com",
      clientSecret: "sWgiGnFITQmPKKDzud2Rgow4",
      callbackURL: `http://localhost:${port}/logged`,
    },
    function (
      accessToken: any,
      refreshToken: any,
      profile: Profile,
      done: any
    ) {
      let User: any;
      User.findOrCreate({ googleId: profile.id }, function (
        err: any,
        user: any
      ) {
        return done(err, user);
      });
    }
  )
);

// passport.use(new TwitterStrategy({
//     consumerKey: TWITTER_CONSUMER_KEY,
//     consumerSecret: TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://www.example.com/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate(function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

app.get(
  "/logged",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

// app.get(
//   "/logged",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect("/");
//   }
// );
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
