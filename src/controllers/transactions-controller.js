const TransactionsService = require("../services/transactions-service");
let transactionsService = null;
try {
  transactionsService = new TransactionsService("database");
} catch (error) {
  console.error(error);
}

async function create(req, res) {
  const { description, amount, type, completed } = req.body;

  if (!description || !amount || !type || !completed) {
    return res.status(400).send("Invalid values");
  }

  let { date } = req.body;

  if (!date) {
    const now = new Date();
    date = now.toLocaleString()
  }

  const transaction = { description, amount, date, type, completed };
  const created = await transactionsService.insert(transaction);

  if (!created) {
    return res.status(500).send("Error creating transaction");
  }

  return res.status(201).json({ message: "Transaction created successfully." });
}

async function show(req, res) {
  const transactions = await transactionsService.list(req.query);

  res.json(transactions);
}

async function update(req, res) {
  const { id } = req.params;
  const { description, amount, date, type, completed } = req.body;

  const updatedTransaction = { description, amount, date, type, completed };
  const updated = await transactionsService.edit(id, updatedTransaction);

  if (!updated) {
    return res.status(500).send("Error updating transaction");
  }

  return res.json({ message: "Transaction updated successfully." });
}

async function remove(req, res) {
  const { id } = req.params;

  const removed = await transactionsService.delete(id);

  if (!removed) {
    return res.status(500).send("Error removing transaction");
  }

  res.json({ message: "Transaction removed successfully." });
}

module.exports = {
  create,
  show,
  update,
  remove,
};