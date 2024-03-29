const Produit = require('../data/entités/produitsentité');

//voir pour implémentation régles et logiques métiers lorsqu'il y aura ajout des autres classes et tables
//voir README régles métiers, divers : produits

//voir également DI/IOC
//ici il faudrait injecté une instance de la classe PorduitsData dans le constructeur (en passant par le container par exemple)
//plutot que d'instancier la classe via cette classe-ci cela réduirait les dépendances entres les classes
// et permetrrais une plus grande souplesse et flexibilité du programme

  //****CLASSE ProduitController****/   

class ProduitsService {

  constructor(ProduitsData) {
    this.produitsData = new ProduitsData(Produit);
  }

  async getAllProduits() {
    try {
      const results = await this.produitsData.getAllProduits();
      const produits = results.map(row => {
        const produit = new Produit(row._id, row._nom, row._prix, row._description, row._id_stock);
        return produit;
      });
      return produits;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des produits : ' + error.message);
    }
  }

  async getProduitById(id) {
    try {
      const result = await this.produitsData.getProduitById(id);
      if (result) {
        const produit = new Produit(result._id, result._nom, result._prix, result._description, result._id_stock);
        return produit;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Erreur lors de la récupération du produit : ' + error.message);
    }
  }

  async createProduit(produit) {
    try {
      produit = new Produit( produit.nom, produit.prix, produit.description, produit.id_stock,null);
      const result = await this.produitsData.createProduit(produit);
      return result;
    } catch (error) {
      throw new Error('Erreur lors de la création du produit : ' + error.message);
    }
  }

  async updateProduit(id, updatedProduitData) {
    try {
      const existingProduit = await this.produitsData.getProduitById(id);
      if (existingProduit) {
        const updatedProduit = new Produit(
          existingProduit.getId(),
          updatedProduitData.nom || existingProduit.getNom(),
          updatedProduitData.prix || existingProduit.getPrix(),
          updatedProduitData.description || existingProduit.getDescription(),
          updatedProduitData.id_stock || existingProduit.getIdStock()
        );
        const result = await this.produitsData.updateProduit(id, updatedProduit);
        return result;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour du produit : ' + error.message);
    }
  }

  async deleteProduit(id) {
    try {
      const result = await this.produitsData.deleteProduit(id);
      return result;
    } catch (error) {
      throw new Error('Erreur lors de la suppression du produit : ' + error.message);
    }
  }
}

module.exports = ProduitsService;
