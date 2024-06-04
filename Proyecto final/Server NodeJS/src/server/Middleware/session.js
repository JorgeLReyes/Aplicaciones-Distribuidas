export const verificarSessionLogin = (req, res, next) => {
  if (req.session && req.session.user && req.session.role === "authenticated") {
    res.redirect("/chat");
  } else {
    next();
  }
};

export const verificarSessionPage = (req, res, next) => {
  console.log(req.originalUrl);
  if (req.session && req.session.user && req.session.rolUser) {
    if (
      req.session.rolUser === "moderador" &&
      req.originalUrl === "/usuarios"
    ) {
      res.redirect("/error");
    } else {
      next();
    }
  } else {
    res.redirect("/");
  }
};
