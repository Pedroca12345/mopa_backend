const Part = require("../models/Part");

const uploadPartController = async (req, res) => {
  const {
    partcode,
    quantity,
    description,
    location
  } = req.body;

  if (partcode && quantity && description && location) {

    const existingPart = await Part.findOne({ partcode: partcode }).exec();

    if(existingPart) {
      return res.status(400).json({ message: "Peça já cadastrada na base de dados" });
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

module.exports = uploadPartController;
