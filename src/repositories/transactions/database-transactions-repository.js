const TransactionsRepository = require("./transactions-repository");
const database = require("../../config/database");

class DatabaseTransactionsRepository extends TransactionsRepository {
  async insert(transaction) {
    const query = "INSERT INTO transactions (description, amount, date, type, completed) VALUES ($1, $2, $3, $4, $5)";
    const values = [
      transaction.description,
      transaction.amount,
      transaction.date,
      transaction.type,
      transaction.completed
    ];

    return await database.query(query, values);
  }

  async list(filters) {
    let query = "SELECT * FROM transactions";

    const valuesFilter = [];
    if (!!filters) {
      let connector = "WHERE";

      if (!!filters.initialDate) {
        query += ` ${connector} date >= $${valuesFilter.length + 1}`;
        valuesFilter.push(filters.initialDate);
        connector = "AND";
      }
      
      if (!!filters.finalDate) {
        query += ` ${connector} date <= $${valuesFilter.length + 1}`;
        valuesFilter.push(filters.finalDate);
        connector = "AND";
      }
    }

    query += " ORDER BY date ASC, id ASC";

    const result = await database.query(query, valuesFilter);
    return result.rows;
  }

  async edit(id, transaction) {
    const query = "UPDATE transactions SET description = $1, \n\
      amount = $2, date = $3, type = $4, completed = $5 \n\
      WHERE id = $6";
    const values = [
      transaction.description,
      transaction.amount,
      transaction.date,
      transaction.type,
      transaction.completed,
      id
    ];
    
    await database.query(query, values);
  }

  async delete(id) {
    await database.query("DELETE FROM transactions WHERE id = ?", id);
  }
}

module.exports = DatabaseTransactionsRepository;
