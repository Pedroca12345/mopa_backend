const permissionMiddleware = (req, res, next) => {
  const admin = req.user.admin;

  if (!admin) {
    return res.status(401).json({ message: "Usuário não permitido" });
  }

  return next();

}

module.exports = permissionMiddleware