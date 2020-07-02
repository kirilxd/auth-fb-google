import express, { NextFunction } from "express";
import auth from "./auth";
import session from "express-session";
const app = express();
const port = 8080;
const authInstance = auth(port);
authInstance.serializeUser((user, cb) => {
  cb(null, user);
});

authInstance.deserializeUser((user, cb) => {
  cb(null, user);
});
app.use(
  session({ secret: "anything", resave: false, saveUninitialized: true })
);
interface RequestUser extends Request {
  user: {
    id: string;
    displayName: string;
    provider: string;
  };
}
app.use(authInstance.initialize());
app.use(authInstance.session());

app.use(express.static(__dirname + "/"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/logged", loginRequired, (req: RequestUser, res: any) => {
  res.sendFile(__dirname + "/logged.html");
});

app.get("/auth/facebook", authInstance.authenticate("facebook"));
app.get(
  "/auth/google",
  authInstance.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

app.get(
  "/auth/google/callback",
  authInstance.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
    successRedirect: "/logged",
    failureRedirect: "/",
  })
);
app.get(
  "/auth/facebook/callback",
  authInstance.authenticate("facebook", {
    successRedirect: "/logged",
    failureRedirect: "/",
  })
);
function loginRequired(req: RequestUser, res: any, next: any) {
  if (!req.user) return res.redirect("/");
  return next();
}
app.get("/logged/info", (req: RequestUser, res: any) => {
  let resString = `Users id ${req.user.id} Users name ${req.user.displayName}, provider: ${req.user.provider}`;
  res.send(resString);
});
app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
