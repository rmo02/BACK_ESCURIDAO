const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const sequelize = require("./config/index");
const routes = require('./routes/index');

const PORT = process.env.PORT || 3000;


// Middleware para analisar JSON
app.use(express.json());

// Configure o middleware do CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Rotas
app.use('/api', routes);


sequelize
  .sync({ force: true }) // Use { force: false } para evitar a recriação das tabelas
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar as tabelas:", error);
  });

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});