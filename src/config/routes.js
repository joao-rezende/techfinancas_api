module.exports = app => {
  const transaction = app.controllers['transactions-controller'];
  const info = app.controllers['info-controller'];
  
  app.route('/api/v1/salvar-info').post((req, res) => {
    info.create(req, res);
  });

  app.route('/api/v1/transactions').get((req, res) => {
    transaction.show(req, res);
  });
  app.route('/api/v1/transactions').post((req, res) => {
    transaction.create(req, res);
  });
  app.route('/api/v1/transactions/:id').put((req, res) => {
    transaction.update(req, res);
  });
  app.route('/api/v1/transactions/:id').delete((req, res) => {
    transaction.remove(req, res);
  });
}