const { Container } = require('inversify');
require('reflect-metadata');

// Créez une instance du conteneur
const container = new Container();

// Enregistrez les liaisons de dépendances
container.bind('ProduitsData').to(require('../data/produitsData')).inSingletonScope();
container.bind('ProduitsController').to(require('../controllers/produitsController')).inSingletonScope();
container.bind('ProduitsService').to(require('../services/produitsService')).inSingletonScope();

// Exposez le conteneur afin qu'il puisse être utilisé dans d'autres modules
module.exports = container;
