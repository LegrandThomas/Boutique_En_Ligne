const produitsService = require('../services/produitsService');

exports.getAllProduits = (req, res) => {
  const produits = produitsService.getAllProduits();
  produits.then((data) => {
    res.json(data); // Renvoi des données en tant que réponse JSON
  }).catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits.' });
  });
};
