# Boutique_En_Ligne
## Projet:

<details>
   <summary>Un système de gestion des produits pour un magasin en ligne</summary>
    Une entreprise de magasin en ligne souhaite gérer efficacement ses stocks de produit, ajuster les prix , permettre aux clients de faire des commandes et de             répondre aux besoins des clients de manière rapide et précise.
 </details>
  
 ## Contexte du projet:
  
  <details>
      <summary>contexte</summary>
      Vous avez été chargé de développer un système de gestion des produits pour un magasin en ligne. L'objectif est de permettre aux propriétaires du magasin de gérer       efficacement leur catalogue de produits, d'ajouter de nouveaux produits, de mettre à jour les informations existantes et de suivre les stocks. Voici un ensemble       de fonctionnalités pour le système de gestion des produits :

      **Gestion des catégories **:
      Les propriétaires du magasin doivent pouvoir créer, modifier et supprimer des catégories de produits.
      Chaque produit doit être associé à une ou plusieurs catégories pour une organisation facile du catalogue.

      Ajout et modification de produits :
      Les propriétaires du magasin doivent pouvoir ajouter de nouveaux produits en fournissant des détails tels que le nom, la description, les images, les prix, etc.
      Ils doivent également pouvoir modifier les informations existantes pour mettre à jour les prix, les descriptions, les images, etc.

      Gestion des variantes de produits :
      Certains produits peuvent avoir des variantes, tels que différentes tailles, couleurs, options, etc.
      Les propriétaires du magasin doivent pouvoir gérer ces variantes et spécifier les stocks disponibles pour chaque variante.

      Gestion des stocks :
      Le système doit permettre aux propriétaires du magasin de suivre les niveaux de stock de chaque produit.
      Ils doivent pouvoir ajouter des stocks lorsqu'ils reçoivent de nouvelles livraisons et mettre à jour les quantités vendues.


      Gestion des promotions et des remises :
      Les propriétaires du magasin doivent pouvoir définir des promotions et des remises sur certains produits ou catégories.
      Ils doivent pouvoir spécifier les dates de validité, les prix réduits, les conditions d'application, etc.


      Gestion des avis et des évaluations :
      Les clients doivent pouvoir laisser des avis et des évaluations sur les produits.
      Les propriétaires du magasin doivent pouvoir afficher, gérer et répondre à ces avis.

      Recherche et filtrage :
      Le système doit permettre aux propriétaires du magasin de rechercher des produits par nom, catégorie, prix, etc.
      Des options de filtrage avancées peuvent être fournies pour faciliter la navigation et la recherche des produits.

      Gestion des commandes :
      Le système doit être intégré à la gestion des commandes pour suivre les ventes de produits et ajuster les stocks en conséquence.

      Ce système de gestion des produits permettra aux propriétaires du magasin de gérer efficacement leur catalogue en ligne, de suivre les stocks, d'ajuster les prix       et de répondre aux besoins des clients de manière rapide et précise.

  </details>
  
  
<details>

<summary>Gitflow</summary>

### Mes branches

La branche Main est le miroir de ma production. Il est donc logique que l'on ne puisse y pousser nos modifications directement.

La branche develop centralise toutes les nouvelles fonctionnalités qui seront livrées dans la prochaine version. Ici, il va falloir se forcer à ne pas y faire de modifications directement.
  
Trois autres types de branches vont ensuite nous permettre de travailler :
 <details>
    <summary>feature</summary>
   Je développe des fonctionnalités

Je vais développer sur une branche de type feature.

git checkout -b feature/<nom> develop

Si je développe une nouvelle fonctionnalité, elle sera logiquement appliquée à la prochaine version : je crée de ce fait ma branche à partir de la branche develop.

Je commence ainsi à travailler à partir du code mis à jour pour la nouvelle version.

git checkout dev
git merge feature/<nom> --no-ff
git branch -d feature/<nom>

Lorsque j'ai fini mon travail, je rapatrie celui-ci sur la branche de développement et je supprime la branche feature qui est devenue obsolète.
  </details>
    <details>
      <summary>release</summary>
Je prépare une nouvelle version pour la mise en production

Je vais travailler sur une branche de type release.

git checkout -b release/<version> develop

Je crée la branche à partir de la branche develop, ainsi, je pourrais lancer mes tests et appliquer mes corrections pendant que mes collègues commencent déjà le développement de nouvelles fonctionnalités pour la version suivante.

git checkout dev
git merge release/<version> --no-ff

git checkout master
git merge release/<version> --no-ff
git tag <version>

git branch -d release/<version>

Lorsque tous mes tests sont passés avec succès et que ma nouvelle version est prête à être mise en production, je pousse tout sur la branche Main et je n’oublie pas d'appliquer mes corrections à la branche de développement.

Je crée aussi un tag sur le dernier commit de la branche de production avec mon numéro de version afin de m’y retrouver plus tard.

Et, enfin, je supprime la branche release car maintenant, elle ne sert plus à grand-chose.
   </details>
     <details> 
       <summary>hotfix</summary>
       Je corrige un bug en production

Je vais donc travailler sur une branche de type hotfix.

git checkout -b hotfix/<name> master

Pour ce cas particulier, je crée ma branche à partir du miroir de production. En effet, je ne veux pas que toutes les fonctionnalités de ma branche de développement se retrouvent en production lors d’une simple correction de bug.

git checkout dev
git merge hotfix/<name> --no-ff

git checkout master
git merge hotfix/<name> --no-ff
git tag <version>

git branch -d hotfix/<name>

Mon bug étant corrigé, je dois l’appliquer sur le dev et la prod. Une fois encore je versionne avec un tag sur la branche Main et je supprime la branche hotfix.
      </details>
    ![Screenshot test.](asset/image/acteurs.png)
   
</details>

   

