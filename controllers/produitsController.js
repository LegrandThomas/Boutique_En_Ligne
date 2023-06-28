const { controller, httpGet, httpPost, httpPut, httpDelete } = require('inversify-express-utils');
const produitsService = require('../services/produitsService');
require('reflect-metadata');
const container = require('../helper/injection');

@controller('/produits')
class ProduitsController {
  @httpGet('/')
  async getAllProduits(req, res) {
    try {
      const produits = await produitsService.getAllProduits();
      // console.log(produits);
      res.json(produits);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
      res.status(500).json({
        error: 'Erreur serveur lors de la récupération des produits'
      });
    }
  }

  @httpGet('/:id')
  async getProduitById(req, res) {
    try {
      const id = req.params.id;
      const produit = await produitsService.getProduitById(id);
      if (produit) {
        res.json(produit);
      } else {
        res.status(404).json({
          error: 'Produit non trouvé'
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du produit :', error);
      res.status(500).json({
        error: 'Erreur serveur lors de la récupération du produit'
      });
    }
  }

  @httpPost('/')
  async createProduit(req, res) {
    try {
      const produit = req.body;
      
      const createdProduit = await produitsService.createProduit(produit);
      res.status(201).json(createdProduit);
    } catch (error) {
      console.error('Erreur lors de la création du produit :', error);
      res.status(500).json({
        error: 'Erreur serveur lors de la création du produit'
      });
    }
  }

  @httpPut('/:id')
  async updateProduit(req, res) {
    try {
      const id = req.params.id;
      const produit = req.body;
      const updatedProduit = await produitsService.updateProduit(id, produit);
      if (updatedProduit) {
        res.json('Produit mis à jour avec succès');
      } else {
        res.status(404).json({
          error: 'Produit non trouvé'
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);
      res.status(500).json({
        error: 'Erreur serveur lors de la mise à jour du produit'
      });
    }
  }

  @httpDelete('/:id')
  async deleteProduit(req, res) {
    try {
      const id = req.params.id;
      const deleted = await produitsService.deleteProduit(id);
      if (deleted) {
        res.json({
          message: 'Produit supprimé avec succès'
        });
      } else {
        res.status(500).json({
          error: 'Produit pas trouvé dans la bdd'
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error);
      res.status(500).json({
        error: 'Erreur serveur lors de la suppression du produit'
      });
    }
  }
}

module.exports = ProduitsController;
