const TransactionsService = require("../services/transactions-service");
let transactionsService = null;
try {
  transactionsService = new TransactionsService("json");
} catch (error) {
  console.error(error);
}

const types = {
  '1': 'Income',
  '2': 'Expense',
  '3': 'Transfer',
  '4': 'Loan',
  '5': 'Investment'
};

async function create(req, res) {
  const { description, amount } = req.body;
  const type = types[req.body.type];

  const transaction = { description, amount, type };
  const created = await transactionsService.insert(transaction);

  if (!created) {
    return res.status(500).send("Error creating transaction");
  }

  return res.status(201).json({ message: "Transaction created successfully." });
}

async function show(req, res) {
  const transactions = await transactionsService.list();

  res.json(transactions);
}

async function update(req, res) {
  const { id } = req.params;
  const { description, amount } = req.body;
  const type = types[req.body.type];

  const updatedTransaction = { description, amount, type };
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