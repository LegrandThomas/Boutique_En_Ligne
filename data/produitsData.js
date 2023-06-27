const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'boutique_en_ligne'
});

connection.connect((error) => {
    if (error) {
      console.error('Erreur lors de la connexion à la base de données :', error);
    } else {
      console.log('Connexion à la base de données réussie');
    }
  });


exports.getAllProduits = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM produit', (error, results) => {
        if (error) {
          console.error(error); // Affiche l'erreur dans la console
          reject(error);
        } else {
            console.log(results);
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
  