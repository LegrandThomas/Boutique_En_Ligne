const { controller, httpGet, httpPost, httpPut, httpDelete } = require('inversify-express-utils');
require('reflect-metadata');


            //***test container pour DI***
// const container = require('../helper/injection');
// console.log(container);


const service=require('../services/produitsService')
const ProduitsData = require('../data/produitsData');

//voir également DI/IOC
//ici il faudrait injecté une instance de la classe service dans le constructeur (en passant par le container par exemple)
//plutot que d'instancier la classe via cette classe-ci cela réduirait les dépendances entres les classes
// et permetrrais une plus grande souplesse et flexibilité du programme


      //****CLASSE ProduitController****/   
@controller('/produits')                                                       
class ProduitsController {


  constructor() {
    this.produitsService = new service(ProduitsData);
    //this .produitsService= container.get(ProduitsService) 

    // évite la dépendance entre les classes n'instanciant plus une classe depuis une autre, donc sans le new service mais 
    //en passant en paramétre du controller une instance de service en question, on fait du DI et on évite une trop grande
    //dépendance entre les classe 
    //offre egalement plus de modularité et flexibilité, via modification paramétre..
  }

//méthode Get
  @httpGet('/')
  async getAllProduits(req, res) {
    try {
      const produits = await this.produitsService.getAllProduits();
      // console.log(produits);
      res.json(produits);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
      res.status(500).json({
        error: 'Erreur serveur lors de la récupération des produits'
      });
    }
  }

  //Sur le get byId, test en amont voir si présence du paramatre (id) et si c'est bien un nombre voir if
  @httpGet('/:id')
  async getProduitById(req, res) {//async car on attend la récupération de la réponse avant de poursuivre
    const id = req.params.id;// récupération paramétre
 
      if( (id) &&  (!isNaN(parseInt(id))) ){ //test avant de continuer
        //si test ok on try d'envoyer au service la suite du traitement
    try {
    //envoi au service produit l'id, à la méthode getProduitById pour gestion des régles métiers
      const produit = await this.produitsService.getProduitById(id);
      //test réponse et retour en conséquence
      if (produit) {
        res.json(produit);
      } else {
        res.status(404).json({
          error: 'Produit non trouvé'
        });
      }
    } catch (error) {//traitement des erreurs de retour
      console.error('Erreur lors de la récupération du produit :', error);
      res.status(500).json({
        error: 'Erreur serveur lors de la récupération du produit'
      });
    }
  }
  else // arret de la poursuite du traitement par le controller si champ vide ou invalide et retour approprié
  {
    res.status(400).json({
      error:'Vous avez probablement saisi un champ vide ou invalide pour l\'id'
    })
  }
  }

//méthode Post
  @httpPost('/')
  async createProduit(req, res) {//async car on attend la récupération de la réponse avant de poursuivre
    const produit = req.body; // récupération du body (*imaginons un formulaire*)

//test vide/empty avant de poursuivre
if ((produit.nom !=undefined)||(produit.prix !=undefined)||(produit.description !=undefined)||(produit.id_stock !=undefined)){
  try {
    const createdProduit = await this.produitsService.createProduit(produit);//envoie au service concerné
    res.status(201).json(createdProduit);//retour client
  } catch (error) {//traitement erreur
    console.error('Erreur lors de la création du produit :', error);
    res.status(500).json({
      error: 'Erreur serveur lors de la création du produit'
    });
  }
}else{
  res.status(400).json({
    error:'Il manque des informations pour la création de votre produit'
    })

   
  }
}
//méthode Put
  @httpPut('/:id')
  async updateProduit(req, res) {
    const id = req.params.id;
    const produit = req.body;

//test avant de continuer
if( (id)  &&  (!isNaN(parseInt(id))) ){ //test avant de continuer

    try {
   
      const updatedProduit = await this.produitsService.updateProduit(id, produit);//await response du service
      //traitement
      if (updatedProduit) {
        res.json('Produit mis à jour avec succès');
      } else {
        res.status(404).json({
          error: 'Produit non trouvé'
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);
      res.status(500).json({
        error: 'Erreur serveur lors de la mise à jour du produit'
      });
    }
  }else{//sinon on informe le front
    res.status(400).json({
      error:'Il semblerait que l\'id soit mal renseigné ou au format incorrect'
      })
  }
  }

//méthode delete
  @httpDelete('/:id')
  async deleteProduit(req, res) {
    //reécupération param id
    const id = req.params.id;

    //test avant suite du traitement
    if( (id)  &&  (!isNaN(parseInt(id))) ){ 

    try {

      const deleted = await this.produitsService.deleteProduit(id);//attente response pour traitement
      if (deleted) {
        res.json({
          message: 'Produit supprimé avec succès'
        });
      } else {
        res.status(500).json({
          error: 'Produit pas trouvé dans la bdd'
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error);
      res.status(500).json({
        error: 'Erreur serveur lors de la suppression du produit'
      });
    }
  }else{//arret de suite si pas d'id ou id pas nombre
    res.status(400).json({
      error:'Il semblerait que l\'id soit mal renseigné ou au format incorrect'
      })
  }
}}

module.exports = ProduitsController;
