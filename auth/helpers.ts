export function loginRequired(req: RequestUser, res: any, next: any) {
  if (!req.user) return res.redirect("/");
  return next();
}

export interface RequestUser extends Request {
  user: {
    id: string;
    displayName: string;
    provider: string;
  };
}
