const express = require('express');
const router = express.Router();
const ProduitsController = require('../controllers/produitsController');

const produitsController = container.resolve(ProduitsController); // Utilisez la même instance créée dans server.js

router.get('/', produitsController.getAllProduits.bind(produitsController));
router.post('/', produitsController.createProduit.bind(produitsController));
router.get('/:id', produitsController.getProduitById.bind(produitsController));
router.put('/:id', produitsController.updateProduit.bind(produitsController));
router.delete('/:id', produitsController.deleteProduit.bind(produitsController));

module.exports = router;
