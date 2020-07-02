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

app.use(authInstance.initialize());
app.use(authInstance.session());

app.use(express.static(__dirname + "/"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/logged", loginRequired,(req, res) => {
  res.sendFile(__dirname + "/logged.html");
});

app.get("/auth/facebook", authInstance.authenticate("facebook"));
app.get("/auth/google", (_, res) => res.sendStatus(418));

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["https://www.googleapis.com/auth/plus.login"],
//   })
// );

app.get(
  "/auth/facebook/callback",
  authInstance.authenticate("facebook", {
    successRedirect: "/logged",
    failureRedirect: "/",
  })
);
function loginRequired(req: any, res: any, next: any) {
    if (!req.user) return res.send("LOG IN!");
    return next();
}
app.get("/logged/info", (req, res) => {
  res.send(req.user);
});
app.get("/logout", (req,res)=>{
    req.logOut();
    res.redirect("/");
})
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
