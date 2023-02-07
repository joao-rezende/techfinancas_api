// database-transactions-repository.js
const TransactionsRepository = require("./transactions-repository");
const database = require("../../config/database");

class DatabaseTransactionsRepository extends TransactionsRepository {
  async insert(transaction) {
    await database.query("INSERT INTO transactions SET ?", transaction);
  }

  async list() {
    const result = await database.query("SELECT * FROM transactions");
    return result;
  }

  async edit(id, transaction) {
    await database.query("UPDATE transactions SET ? WHERE id = ?", [
      transaction,
      id,
    ]);
  }

  async delete(id) {
    await database.query("DELETE FROM transactions WHERE id = ?", id);
  }
}

module.exports = DatabaseTransactionsRepository;
