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