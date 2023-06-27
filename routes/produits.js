const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitsController');

router.get('/', produitController.getAllProduits);

module.exports = router;
