const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const produitsRouter = require('./routes/produits');

app.use(bodyParser.urlencoded({ extended: false })); // Pour gérer les données "form urlencoded"
app.use(express.json()); // Middleware pour parser le corps des requêtes au format JSON
app.use('/api/produits', produitsRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
