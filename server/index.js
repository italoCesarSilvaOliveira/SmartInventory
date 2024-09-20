const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const sequelize = require('./db');

// Carregar variáveis de ambiente
dotenv.config();

// Middleware para usar JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use('/users', userRoutes);

sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });