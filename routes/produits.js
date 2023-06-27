const express = require('express');
const router = express.Router();
const produitsController = require('../controllers/produitsController');

router.get('/', produitsController.getAllProduits);
router.post('/', produitsController.createProduit);
router.get('/:id', produitsController.getProduitById);
router.put('/:id', produitsController.updateProduit);
router.delete('/:id', produitsController.deleteProduit);

module.exports = router;
