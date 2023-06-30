-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 28 juin 2023 à 09:11
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `boutique_en_ligne`
--

-- --------------------------------------------------------

--
-- Structure de la table `adresse`
--

DROP TABLE IF EXISTS `adresse`;
CREATE TABLE IF NOT EXISTS `adresse` (
  `id_adresse` int NOT NULL AUTO_INCREMENT,
  `adresse` varchar(50) DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `code_postal` varchar(50) DEFAULT NULL,
  `pays` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_adresse`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

DROP TABLE IF EXISTS `avis`;
CREATE TABLE IF NOT EXISTS `avis` (
  `id_avis` int NOT NULL AUTO_INCREMENT,
  `commentaire` varchar(250) DEFAULT NULL,
  `evaluation` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_utilisateur` int NOT NULL,
  `id_variant_produit` int NOT NULL,
  PRIMARY KEY (`id_avis`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_variant_produit` (`id_variant_produit`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_categorie`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categoriser`
--

DROP TABLE IF EXISTS `categoriser`;
CREATE TABLE IF NOT EXISTS `categoriser` (
  `id_categorie` int NOT NULL,
  `id_produit` int NOT NULL,
  PRIMARY KEY (`id_categorie`,`id_produit`),
  KEY `id_produit` (`id_produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `adresse_mail` varchar(50) DEFAULT NULL,
  `mot_de_passe` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_adresse` int NOT NULL,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `adresse_mail` (`adresse_mail`),
  KEY `id_adresse` (`id_adresse`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id_commande` int NOT NULL AUTO_INCREMENT,
  `date_commande` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_adresse` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id_commande`),
  KEY `id_adresse` (`id_adresse`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `couleur`
--

DROP TABLE IF EXISTS `couleur`;
CREATE TABLE IF NOT EXISTS `couleur` (
  `id_couleur` int NOT NULL AUTO_INCREMENT,
  `valeur` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_couleur`),
  UNIQUE KEY `valeur` (`valeur`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `details_commande`
--

DROP TABLE IF EXISTS `details_commande`;
CREATE TABLE IF NOT EXISTS `details_commande` (
  `id_details_commande` int NOT NULL AUTO_INCREMENT,
  `quantite` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_produit` int NOT NULL,
  `id_commande` int NOT NULL,
  PRIMARY KEY (`id_details_commande`),
  KEY `id_produit` (`id_produit`),
  KEY `id_commande` (`id_commande`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `illustrer`
--

DROP TABLE IF EXISTS `illustrer`;
CREATE TABLE IF NOT EXISTS `illustrer` (
  `id_image` int NOT NULL,
  `id_variant_produit` int NOT NULL,
  PRIMARY KEY (`id_image`,`id_variant_produit`),
  KEY `id_variant_produit` (`id_variant_produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `url` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_image`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `lieu_stockage`
--

DROP TABLE IF EXISTS `lieu_stockage`;
CREATE TABLE IF NOT EXISTS `lieu_stockage` (
  `id_stock` int NOT NULL AUTO_INCREMENT,
  `nom_entrepot` varchar(50) DEFAULT NULL,
  `quantite_minimun` int DEFAULT NULL,
  `quantite_actuelle` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_adresse` int NOT NULL,
  PRIMARY KEY (`id_stock`),
  UNIQUE KEY `id_adresse` (`id_adresse`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `matiere`
--

DROP TABLE IF EXISTS `matiere`;
CREATE TABLE IF NOT EXISTS `matiere` (
  `id_matiere` int NOT NULL AUTO_INCREMENT,
  `valeur` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_matiere`),
  UNIQUE KEY `valeur` (`valeur`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `moyenpaiement`
--

DROP TABLE IF EXISTS `moyenpaiement`;
CREATE TABLE IF NOT EXISTS `moyenpaiement` (
  `id_moyen_paiement` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50) DEFAULT NULL,
  `descriptif` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_utilisateur` int NOT NULL,
  `id_adresse` int NOT NULL,
  PRIMARY KEY (`id_moyen_paiement`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_adresse` (`id_adresse`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `id_produit` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `prix` decimal(15,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_stock` int NOT NULL,
  PRIMARY KEY (`id_produit`),
  UNIQUE KEY `nom` (`nom`),
  KEY `id_stock` (`id_stock`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
CREATE TABLE IF NOT EXISTS `promotion` (
  `id_promo` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `pourcentage_reduction` decimal(15,2) DEFAULT NULL,
  `conditions_applications` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` date DEFAULT NULL,
  `id_variant_produit` int NOT NULL,
  PRIMARY KEY (`id_promo`),
  KEY `id_variant_produit` (`id_variant_produit`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `taille`
--

DROP TABLE IF EXISTS `taille`;
CREATE TABLE IF NOT EXISTS `taille` (
  `id_taille` int NOT NULL AUTO_INCREMENT,
  `valeur` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_taille`),
  UNIQUE KEY `valeur` (`valeur`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `variant_produit`
--

DROP TABLE IF EXISTS `variant_produit`;
CREATE TABLE IF NOT EXISTS `variant_produit` (
  `id_variant_produit` int NOT NULL AUTO_INCREMENT,
  `quantite_en_stock` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_taille` int NOT NULL,
  `id_matiere` int NOT NULL,
  `id_couleur` int NOT NULL,
  `id_produit` int NOT NULL,
  PRIMARY KEY (`id_variant_produit`),
  KEY `id_taille` (`id_taille`),
  KEY `id_matiere` (`id_matiere`),
  KEY `id_couleur` (`id_couleur`),
  KEY `id_produit` (`id_produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
