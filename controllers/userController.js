const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const user = await User.find({}).select("username email noHashPassword").exec();

  if (user) {
    return res.status(200).json(user);
  }

  return res.status(500).json({ message: "Erro no server" });

}

const updateUser = async (req, res) => {
  if (req.body.noHashPassword) {
    const hash = await bcrypt.hash(req.body.noHashPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      {
        username: req.query.username
      },
      {
        password: hash,
        noHashPassword: req.body.noHashPassword
      },
      {
        returnDocument: "after"
      })
      .exec();

    return res.status(200).json({
      message: "senha alterada com sucesso",
      updatedUser
    });
  }

  const updatedUser = await User.findOneAndUpdate({ username: req.query.username }, req.body, { returnDocument: "after" }).exec();

  if (!updatedUser) {
    return res.status(404).json({
      message: "usuário não encontrado"
    });
  }

  return res.status(200).json({
    message: "usuário alterado com sucesso",
    updatedUser,
  });

}

module.exports = {
  getUsers,
  updateUser,
}
