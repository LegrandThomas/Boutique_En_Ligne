class Produit {

    constructor(id,nom, prix, description, id_stock) {
      this._id=id;
      this._nom = nom;
      this._prix = prix;
      this._description = description;
      this._id_stock = id_stock;
    }
    
    getNom() {
      return this._nom;
    }
  
    setNom(value) {
      this._nom = value;
    }
  
    getPrix() {
      return this._prix;
    }
  
    setPrix(value) {
      this._prix = value;
    }
  
    getDescription() {
      return this._description;
    }
  
    setDescription(value) {
      this._description = value;
    }
  
    getIdStock() {
      return this._id_stock;
    }
  
    setIdStock(value) {
      this._id_stock = value;
    }

    getId() {
      return this._id;
    }
    setId(value) {
      this._id_stock = value;
    }
  }
  
  module.exports = Produit;
  