const { Container } = require('inversify');
require('reflect-metadata');

const container = new Container();

// Enregistrez les liaisons de dépendances
container.bind('ProduitsData').to(require('../data/produitsData'));
container.bind('ProduitsController').to(require('../controllers/produitsController'));
container.bind('ProduitsService').to(require('../services/produitsService'));

// console.log(container);
module.exports = container;

