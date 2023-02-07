class TransactionService {
  constructor(dataStore) {
    if (dataStore == "json") {
      const JsonTransactionsRepository = require("../repositories/transactions/json-transactions-repository");
      this.transactionsRepository = new JsonTransactionsRepository();
    } else if (dataStore == "database") {
      const DatabaseTransactionsRepository = require("../repositories/transactions/database-transactions-repository");
      this.transactionsRepository = new DatabaseTransactionsRepository();
    } else {
      throw new Error("Invalid data store");
    }
  }

  async list() {
    return await this.transactionsRepository.list();
  }

  async insert(transaction) {
    return await this.transactionsRepository.insert(transaction);
  }

  async edit(id, transaction) {
    return await this.transactionsRepository.edit(id, transaction);
  }

  async delete(id) {
    return await this.transactionsRepository.delete(id);
  }
}

module.exports = TransactionService;