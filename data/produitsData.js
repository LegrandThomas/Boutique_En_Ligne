const connection = require('../helper/db');
const Produit = require("./entités/produitsentité");

exports.getAllProduits = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM produit', (error, results) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        const produits = results.map(row => {
          const produit = new Produit(row.nom, row.prix, row.description, row.id_stock);
          return {
            id_produit: row.id_produit,
            nom: produit.getNom(),
            prix: produit.getPrix(),
            description: produit.getDescription(),
            id_stock: produit.getIdStock()
          };
        });
        resolve(produits);
      }
    });
  });
};

exports.createProduit = (produit) => {
  return new Promise((resolve, reject) => {
    const newProduit = new Produit(
      produit.nom,
      produit.prix,
      produit.description,
      produit.id_stock
    );
    connection.query('INSERT INTO produit SET ?', {
      nom: newProduit.getNom(),
      prix: newProduit.getPrix(),
      description: newProduit.getDescription(),
      id_stock: newProduit.getIdStock()
    }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        const createdProduit = new Produit(
          newProduit.getNom(),
          newProduit.getPrix(),
          newProduit.getDescription(),
          newProduit.getIdStock()
        );
        resolve(createdProduit);
      }
    });
  });
};

exports.getProduitById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM produit WHERE id_produit = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération du produit :', error);
        reject(error);
      } else {
        if (results.length > 0) {
          const row = results[0];
          const produit = new Produit(
            row.nom,
            row.prix,
            row.description,
            row.id_stock
          );
          resolve(produit);
        } else {
          resolve(null);
        }
      }
    });
  });
};

exports.updateProduit = (id, produit) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE produit SET nom = ?, prix = ?, description = ?, id_stock = ? WHERE id_produit = ?';
      const values = [
        produit.nom,
        produit.prix,
        produit.description,
        produit.id_stock,
        id
      ];
      connection.query(query, values, (error, results) => {
        if (error) {
          console.error('Erreur lors de la mise à jour du produit :', error);
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  };
  
  exports.deleteProduit = (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM produit WHERE id_produit = ?';
      connection.query(query, [id], (error, results) => {
        if (error) {
          console.error('Erreur lors de la suppression du produit :', error);
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  };
  