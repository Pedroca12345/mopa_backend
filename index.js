const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const users = [];
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

app.get("/protected", authMiddleware, (req, res, next) => {
  res.status(200).json({
    message: "Passou no middleware",
    user: req.user
  }
  );
});


//Rota de cadastro de usuário
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {

    const existingUser = users.find((existingUser) => existingUser.email === email);

    if (existingUser) {
      return res.status(400).json({ message: "E-mail já está em uso" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = {
      email: email,
      password: hash
    };

    users.push(user);
    return res.status(201).json({ message: "Usuário criado com sucesso" });

  } else {
    return res.status(400).json({ message: "Usuário inválido" });
  }
});

//Rota de login do usuário
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const registeredUser = users.find((dbUser) => dbUser.email === email);

    if (!registeredUser) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const matchedPassword = await bcrypt.compare(password, registeredUser.password);

    if (!matchedPassword) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      });



    return res.status(200).json({
      message: "Usuário logado",
      token: token,
    });
  }

  return res.status(400).json({ message: "Dados inválidos" });

});

app.listen(3000, () => {
  console.log("app rodando na porta 3000");
});