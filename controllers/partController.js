const Part = require("../models/Part");

const registerPartController = async (req, res) => {
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

const getPartController = async (req, res) => {
  const {
    partcode
  } = req.query;

  const part = await Part.findOne({ partcode: partcode }).select("partcode location description quantity");

  if (part) {
    return res.status(200).json(part);
  }

  res.status(404).json({ message: "Peça não cadastrada" });

}

const getPartsController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 16;

  const skip = (page - 1) * limit;

  try {
    const parts = await Part.find({})
      .skip(skip)
      .limit(limit)
      .exec();

    return res.status(200).json({
      currentPage: page,
      totalOfPages: Math.ceil(parts.length / limit),
      parts: parts,
    });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar dados" });
  }

}

const updatePartsController = async (req, res) => {
  const {
    partcode,
    quantity,
    description,
    location
  } = req.body;

  try {
    const updatedPart = await Part.findOneAndUpdate(
    {
      partcode: partcode,
      location: location
    },
    {
      partcode: partcode,
      quantity: quantity,
      description: description,
      location: location
    },
    {
      returnDocument: "after"
    }).exec();

    return res.status(200).json({ message: "peça alterada com sucesso" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: "deu merda" });
  }

}

module.exports = {
  registerPartController,
  getPartController,
  getPartsController,
  updatePartsController
}
