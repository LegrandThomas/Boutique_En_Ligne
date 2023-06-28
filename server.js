require('reflect-metadata');
const container = require('./helper/injection');
const bodyParser = require('body-parser');
const express = require('express');
const { InversifyExpressServer, TYPE } = require('inversify-express-utils');
const ProduitsController = require('./controllers/produitsController');


// Créez une instance du serveur InversifyExpress en utilisant le conteneur existant
const server = new InversifyExpressServer(container, null, { rootPath: '/api' });

// Configurez les middlewares et les contrôleurs
server.setConfig((app) => {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
});

server.setErrorConfig((app) => {
 
});

// Démarrez le serveur
const app = server.build();
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
