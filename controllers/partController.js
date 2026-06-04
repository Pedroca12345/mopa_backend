const Part = require("../models/Part");

const partController = async (req, res) => {
  const {
    partcode,
    quantity,
    description,
    location
  } = req.body;

  if (partcode && quantity && description && location) {

    const existingPart = await Part.findOne(
      {
        partcode: partcode,
        location: location
      })
      .exec();

    if (existingPart) {
      return res.status(400).json({ message: partcode });
    }

    const part = {
      partcode: partcode,
      quantity: quantity,
      description: description,
      location: location
    };

    await Part.create(part);
    return res.status(200).json({ message: "Peça cadastrada com sucesso" });

  } else {
    return res.status(400).json({ message: "Dados inválidos" });
  }
}

module.exports = partController;
