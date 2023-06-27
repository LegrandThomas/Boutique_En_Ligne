const connection = require('../helper/db');


exports.getAllProduits = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM produit', (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };


  exports.createProduit = (produit) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO produit SET ?', produit, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  };


  exports.getProduitById = (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM produit WHERE id_produit = ?', id, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  };

  
  exports.updateProduit = (id, produit) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE produit SET ? WHERE id_produit = ?', [produit, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  };

  
  exports.deleteProduit = (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM produit WHERE id_produit = ?', id, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  };
  