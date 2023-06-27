const mysql = require('mysql');
require('dotenv').config();


const connection = mysql.createConnection({
  host:process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

connection.connect((error) => {
    if (error) {
      console.error('Erreur lors de la connexion à la base de données :', error);
    } else {
      console.log('Connexion à la base de données réussie');
    }
  });

  module.exports = connection;