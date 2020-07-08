import express from "express";
import auth from "./auth";
import session from "express-session";
import user from "./routes/user";
import serialize from "./auth/passport";
import dotenv from "dotenv";
import fetch from "node-fetch";
import passport from "passport";
import OAuth2Strategy from "passport-oauth2";
dotenv.config();
const app = express();
const port = 8080;
const authInstance = auth(port);
serialize(authInstance);
app.use(
  session({
    secret: "anything",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 },
  })
);
app.use(express.urlencoded({ extended: false }));

app.use(authInstance.initialize());
app.use(authInstance.session());

app.use(express.static(__dirname + "/views"));
user(app, authInstance);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
