const express = require('express');
const app = express();
const produitsRouter = require('./routes/produits');

app.use(express.json()); // Middleware pour parser le corps des requêtes au format JSON
app.use('/api/produits', produitsRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
