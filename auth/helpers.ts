
export interface RequestUser extends Request {
  user: {
    id: string;
    displayName: string;
    provider: string;
    expiresIn: number;
  };
  session: {
    destroy: (x: any) => () => void;
  };
}

export function loginRequired(req: RequestUser, res: any, next: any): any {
  if (!req.user) return res.redirect("/");
  next();
}
export function checkAccessToken(req: RequestUser, res: any, next: any) {
  const currentDate = Date.now() / 1000;
  if (currentDate > req.user.expiresIn) {
    req.session.destroy((error: any) => {
      res.redirect("/");
    });
  } else {
    return next();
  }
}

