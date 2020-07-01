import express, { NextFunction } from "express";
import auth from "./auth";

const app = express();
const port = 8080;
const authInstance = auth(port);

app.use(authInstance.initialize());
app.use(authInstance.session());

app.use(express.static(__dirname + "/"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/logged", (req, res) => {
  res.sendFile(__dirname + "/logged.html");
});

function loginRequired(req: any, res: any, next: NextFunction) {
  if (!req.user) return res.status(401).json({ status: "Please log in" });
  return next();
}
app.get("/auth/facebook", authInstance.authenticate("facebook"));
app.get("/auth/google", (_, res) => res.sendStatus(418));

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["https://www.googleapis.com/auth/plus.login"],
//   })
// );

app.get(
  "/logged",
  authInstance.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
