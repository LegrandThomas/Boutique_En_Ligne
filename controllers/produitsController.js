const produitsService = require('../services/produitsService');

exports.getAllProduits = (req, res) => {
  const produits = produitsService.getAllProduits();
  produits.then((data) => {
    res.json(data); 
  }).catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits.' });
  });
};

exports.createProduit = (req, res) => {
  const nouveauProduit = req.body;
  produitsService.createProduit(nouveauProduit)
    .then((id) => {
      return produitsService.getProduitById(id); // Récupération des détails du produit à partir de son ID
    })
    .then((produit) => {
      res.status(201).json(produit); // Renvoi des détails du produit
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la création du produit.' });
    });
};


exports.getProduitById = (req, res) => {
  const id = req.params.id;
  produitsService.getProduitById(id)
    .then((produit) => {
      if (produit) {
        res.json(produit);
      } else {
        res.status(404).json({ error: 'Produit non trouvé.' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du produit.' });
    });
};

exports.updateProduit = (req, res) => {
  const id = req.params.id;
  const produit = req.body;
  produitsService.updateProduit(id, produit)
    .then((success) => {
      if (success) {
        res.json({ message: 'Produit mis à jour avec succès.' });
      } else {
        res.status(404).json({ error: 'Produit non trouvé.' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du produit.' });
    });
};

exports.deleteProduit = (req, res) => {
  const id = req.params.id;
  produitsService.deleteProduit(id)
    .then((success) => {
      if (success) {
        res.json({ message: 'Produit supprimé avec succès.' });
      } else {
        res.status(404).json({ error: 'Produit non trouvé.' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du produit.' });
    });
};