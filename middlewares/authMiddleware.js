const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  const splitedToken = header.split(" ");
  const token = splitedToken[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    return next();

  } catch (err) {
    return res.status(401).json({ message: "Não autorizado" })
  }

}

module.exports = authMiddleware;
