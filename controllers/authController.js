const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {

    const existingUser = await User.findOne({ email: email }).exec();

    if (existingUser) {
      return res.status(400).json({ message: "E-mail já está em uso" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = {
      name: name,
      email: email,
      password: hash
    };

    await User.create(user);
    return res.status(201).json({ message: "Usuário criado com sucesso" });

  } else {
    return res.status(400).json({ message: "Usuário inválido" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const registeredUser = await User.findOne({ email: email });

    if (!registeredUser) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const matchedPassword = await bcrypt.compare(password, registeredUser.password);

    if (!matchedPassword) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { 
        id:registeredUser._id,
        email: registeredUser.email 
      },
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

};

module.exports = {
  loginController,
  registerController
}
