
require('dotenv').config();
const fs = require("fs");

async function create(req, res) {
  const { provedor, cidade } = req.body;

  const filePath = process.env.JSON_DIRNAME + "info-desafio.json";
  const dataFile = JSON.parse(fs.readFileSync(filePath));

  try {
    dataFile.push({ provedor, cidade });
    fs.writeFileSync(filePath, JSON.stringify(dataFile));
    return res.status(201).json({ message: "Informação salva" });
  } catch (error) {
    console.error("Error writing file", error);
    return res.status(500);
  }
}

module.exports = { create };