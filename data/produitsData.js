const connection = require('../helper/db');
const Produit = require('./entités/produitsentité');

class ProduitsData {

  constructor(produitEntity) {
    this.connection = connection;
    this.Produit = produitEntity;
  }


  getAllProduits() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM produit', (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          const produits = results.map(row => {
            const produit = new Produit(row.id_produit, row.nom, row.prix, row.description, row.id_stock);
            return produit;
          });
          resolve(produits);
        }
      });
    });
  }

  createProduit(produit) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO produit SET ?',
        {
          nom: produit.getNom(),
          prix: produit.getPrix(),
          description: produit.getDescription(),
          id_stock: produit.getIdStock()
        },
        (error, results) => {
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
        }
      );
    });
  }

  getProduitById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM produit WHERE id_produit = ?';
      this.connection.query(query, [id], (error, results) => {
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
            resolve(produit);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  updateProduit(id, produit) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE produit SET nom = ?, prix = ?, description = ?, id_stock = ? WHERE id_produit = ?';

      const values = [
        produit.getNom(),
        produit.getPrix(),
        produit.getDescription(),
        produit.getIdStock(),
        id
      ];
      this.connection.query(query, values, (error, results) => {
        if (error) {
          console.error('Erreur lors de la mise à jour du produit :', error);
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  }

  deleteProduit(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM produit WHERE id_produit = ?';
      this.connection.query(query, [id], (error, results) => {
        if (error) {
          console.error('Erreur lors de la suppression du produit :', error);
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  }
}

module.exports = ProduitsData;
