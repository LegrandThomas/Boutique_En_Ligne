const produitsData = require('../data/produitsData');

// Endpoint GET /produits
exports.getAllProduits = (req, res) => {
  produitsData.getAllProduits()
    .then(produits => {
      res.json(produits);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des produits :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des produits' });
    });
};

// Endpoint POST /produits
exports.createProduit = (req, res) => {
  const { nom, prix, description, id_stock } = req.body;
  const produit = { nom, prix, description, id_stock };

  produitsData.createProduit(produit)
    .then(createdProduit => {
      res.status(201).json(createdProduit);
    })
    .catch(error => {
      console.error('Erreur lors de la création du produit :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la création du produit' });
    });
};

// Endpoint GET /produits/:id
exports.getProduitById = (req, res) => {
  const id = req.params.id;

  produitsData.getProduitById(id)
    .then(produit => {
      if (produit) {
        res.json(produit);
      } else {
        res.status(404).json({ message: 'Produit non trouvé' });
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du produit :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération du produit' });
    });
};

// Endpoint PUT /produits/:id
exports.updateProduit = (req, res) => {
  const id = req.params.id;
  const { nom, prix, description, id_stock } = req.body;

  produitsData.getProduitById(id)
    .then(produit => {
      if (!produit) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }

      // Utilisez les données existantes ou les nouvelles données fournies dans la requête
      const updatedProduit = {
        nom: nom || produit.getNom(),
        prix: prix || produit.getPrix(),
        description: description || produit.getDescription(),
        id_stock: id_stock || produit.getIdStock()
      };

      return produitsData.updateProduit(id, updatedProduit);
    })
    .then(updated => {
      if (updated) {
        res.json({ message: 'Produit mis à jour avec succès' });
      } else {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
      }
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour du produit :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du produit' });
    });
};



// Endpoint DELETE /produits/:id
exports.deleteProduit = (req, res) => {
  const id = req.params.id;

  produitsData.deleteProduit(id)
    .then(deleted => {
      if (deleted) {
        res.json({ message: 'Produit supprimé avec succès' });
      } else {
        res.status(404).json({ message: 'Produit non trouvé' });
      }
    })
    .catch(error => {
      console.error('Erreur lors de la suppression du produit :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la suppression du produit' });
    });
};
