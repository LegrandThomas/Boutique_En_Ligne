const connection = require('../helper/db');
const Produit = require("./entités/produitsentité");

exports.getAllProduits = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM produit', (error, results) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        // console.log(results);
        const produits = results.map(row => {
          const produit = new Produit(row.id_produit,row.nom, row.prix, row.description, row.id_stock);
          // console.log(produit);
          return produit;
        });
        // console.log(produits);
        resolve(produits);
      }
    });
  });
};

exports.createProduit = (produit) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO produit SET ?', {
      nom: produit.getNom(),
      prix: produit.getPrix(),
      description: produit.getDescription(),
      id_stock: produit.getIdStock()
    }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        const insertedProduit = new Produit(
          produit.getNom(),
          produit.getPrix(),
          produit.getDescription(),
          produit.getIdStock()
        );
        insertedProduit.setId(results.insertId);
        resolve(insertedProduit);
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
            row.id_produit,
            row.nom,
            row.prix,
            row.description,
            row.id_stock
          );
          // console.log(produit);
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
     
      produit.getNom(),
      produit.getPrix(),
      produit.getDescription(),
      produit.getIdStock(),
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
        console.log(results);
        resolve(results.affectedRows > 0);
      }
    });
  });
};
