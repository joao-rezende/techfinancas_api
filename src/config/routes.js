module.exports = app => {
  const transaction = app.controllers['transactions-controller'];
  const stockMovements = app.controllers['stock-movements-controller'];

  // transactions
  app.route('/api/v1/transactions').get(transaction.show);
  app.route('/api/v1/transactions').post(transaction.create);
  app.route('/api/v1/transactions/:id').put(transaction.update);
  app.route('/api/v1/transactions/:id').delete(transaction.remove);


  // stock movements
  app.route('/api/v1/stock-movements/import').post(stockMovements.importMovements);
}