const produitsData = require('../data/produitsData');
const Produit = require('../data/entités/produitsentité');


exports.getAllProduits = async () => {
  try {
    const results = await produitsData.getAllProduits();
    // console.log(results);
    const produits = results.map(row => {
    const produit = new Produit(row._id,row._nom, row._prix, row._description, row._id_stock);
      // console.log(produit);
      return produit;
    });
    console.log(produits);
    return produits;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des produits : ' + error.message);
  }
};

exports.getProduitById = async (id) => {
  try {
    const result = await produitsData.getProduitById(id);
    if (result) {
      // console.log(result);
      const produit = new Produit(result._id, result._nom, result._prix, result._description, result._id_stock);
      console.log(produit);
      return produit;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Erreur lors de la récupération du produit : ' + error.message);
  }
};

exports.createProduit = async (produit) => {
  try {
    
    produit=new Produit(null,produit.nom,produit.prix,produit.description,produit.id_stock);
    // console.log(produit);
    const result = await produitsData.createProduit(produit);
  console.log(result);
    return result;
  } catch (error) {
    throw new Error('Erreur lors de la création du produit : ' + error.message);
  }
};

exports.updateProduit = async (id, updatedProduitData) => {
  try {
    const existingProduit = await produitsData.getProduitById(id);
    //  console.log(existingProduit);
    if (existingProduit) {
      // Créer un nouvel objet Produit avec les nouvelles valeurs
      const updatedProduit = new Produit(
        existingProduit.getId(),
        updatedProduitData.nom || existingProduit.getNom(),
        updatedProduitData.prix || existingProduit.getPrix(),
        updatedProduitData.description || existingProduit.getDescription(),
        updatedProduitData.id_stock || existingProduit.getIdStock()
      );
// console.log(updatedProduit);
      const result = await produitsData.updateProduit(id, updatedProduit);
      // console.log(result);
      return result;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour du produit : ' + error.message);
  }
};


exports.deleteProduit = async (id) => {
  try {
    const result = await produitsData.deleteProduit(id);
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error('Erreur lors de la suppression du produit : ' + error.message);
  }
};
