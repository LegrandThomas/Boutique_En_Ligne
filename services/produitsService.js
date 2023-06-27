const produitsData = require('../data/produitsData');

exports.getAllProduits = () => {
  return produitsData.getAllProduits();
};

exports.createProduit = (produit) => {
  return produitsData.createProduit(produit);
};

exports.getProduitById = (id) => {
  return produitsData.getProduitById(id);
};

exports.updateProduit = (id, produit) => {
  return produitsData.updateProduit(id, produit);
};

exports.deleteProduit = (id) => {
  return produitsData.deleteProduit(id);
};
