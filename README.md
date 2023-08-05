# TechFinanças

Para rodar o migration configure o arquivo sequelize.json na raiz do projeto. Siga o modelo do `sequelize.json.example`.

Em seguida execute o seguinte comando:
```
npx sequelize-cli db:migrate --config ./sequelize.json --migrations-path src/migrations
```