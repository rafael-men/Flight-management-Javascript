const express = require('express');
const bodyParser = require('body-parser');
const { syncDB } = require('.'); // Importa o método syncDB de models
const app = express();

app.use(bodyParser.json());

// Chama o método syncDB para sincronizar a tabela
syncDB().then(() => {
    console.log("Servidor iniciado e banco de dados sincronizado!");
    app.listen(3000);
}).catch(err => {
    console.log("Erro ao sincronizar o banco de dados:", err);
});
