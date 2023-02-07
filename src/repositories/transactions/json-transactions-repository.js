// json-transactions-repository.js
require('dotenv').config();
const TransactionsRepository = require("./transactions-repository");
const fs = require("fs");

class JsonTransactionsRepository extends TransactionsRepository {
  constructor() {
    super();
    this.filePath = process.env.JSON_DIRNAME + "transactions.json";
    this.dataFile = JSON.parse(fs.readFileSync(this.filePath));
  }

  saveFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.dataFile));
      return true;
    } catch (error) {
      console.error("Error writing file", error);
      return false;
    }
  }

  async insert(transaction) {
    const transactions = await this.list();
    transaction.id = this.dataFile.next_id;
    transactions.push(transaction);

    this.dataFile = {
      next_id: this.dataFile.next_id + 1,
      data: transactions
    };
    return this.saveFile();
  }

  async list() {
    try {
      const transactions = await this.dataFile.data;
      return transactions;
    } catch (error) {
      console.error("Error reading file", error);
      return [];
    }
  }

  async edit(id, transaction) {
    const transactions = await this.list();
    const index = transactions.findIndex((t) => t.id === parseInt(id));
    
    if (index === -1) return false;
    
    transactions[index] = { ...transactions[index], ...transaction };
    this.dataFile.data = transactions;
    
    return this.saveFile();
  }

  async delete(id) {
    const transactions = await this.list();
    const newTransactions = transactions.filter((t) => t.id !== parseInt(id));
    
    if (transactions.length === newTransactions.length) return false;

    this.dataFile.data = newTransactions;

    return await this.saveFile();
  }
}

module.exports = JsonTransactionsRepository;
