const express = require('express');
const router = express.Router();
const ProduitsController = require('../dist/produitsController');

const produitsController = new ProduitsController(); // Create an instance of the controller

router.get('/', produitsController.getAllProduits.bind(produitsController));
router.post('/', produitsController.createProduit.bind(produitsController));
router.get('/:id', produitsController.getProduitById.bind(produitsController));
router.put('/:id', produitsController.updateProduit.bind(produitsController));
router.delete('/:id', produitsController.deleteProduit.bind(produitsController));

module.exports = router;
