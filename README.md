# 🍽️ COOKFUSION - L'Application de Génération d'Idées Recettes Indispensable.

## 🚀 Problèmes rencontrés et Solutions apportées

### 🔥 Les défis du quotidien :
- **Recherche fastidieuse de recettes**  
  Les familles manquent souvent d'inspiration en fin de journée et se retrouvent à fouiller sur plusieurs sites pour trouver une idée de repas. Cela prend du temps et engendre du stress.

- **Gestion inefficace des ingrédients**  
  Lorsqu'on combine plusieurs recettes, il est fréquent de se retrouver avec des doublons d'ingrédients, obligeant ainsi à faire plusieurs allers-retours en magasin pour des quantités redondantes.

- **Ajustement manuel des portions**  
  Adapter les quantités d'ingrédients en fonction du nombre de personnes peut être source d'erreurs et de gaspillage, avec des mesures peu pratiques (ex. 2,33 pommes ou 333,33 g de viande).

- **Manque de flexibilité dans la sélection**  
  Une fois une recherche effectuée, il est souvent difficile de remplacer une recette sans devoir refaire toute la recherche, limitant ainsi la diversité des options.

---

### ✅ Notre solution innovante :
- **⚡ Génération instantanée d'idées recettes personnalisées**  
  Notre application vous propose, en un clic, plusieurs recettes adaptées à vos critères (nombre de recettes, options végétariennes, etc.), vous libérant ainsi de la corvée de la recherche manuelle.

- **Fusion intelligente des ingrédients**  
  Grâce à un algorithme avancé, nous fusionnons automatiquement les ingrédients communs en une liste de courses optimisée. Fini les doublons ! Chaque ingrédient est recalculé dynamiquement en fonction du nombre de personnes et arrondi de manière pratique pour vos achats.

- **Remplacement flexible et ciblé des recettes**  
  Vous pouvez, d'un simple clic sur le bouton "Actualiser" qui apparaît au survol de chaque carte, remplacer individuellement une recette par une nouvelle option, assurant ainsi une diversité constante sans répétition.

- **Interface intuitive et performante**  
  Conçue avec les dernières technologies (Next.js, React et TypeScript), notre application offre une expérience fluide, rapide et responsive, idéale pour simplifier la planification des repas et optimiser vos courses.

---

## 📖 Guide utilisateur

1. **Installation et démarrage :**
   - Clonez le dépôt.
   - Installez les dépendances avec `npm install` ou `yarn install`.
   - Lancez l'application en mode développement avec `npm run dev` ou `yarn dev`.
   - Ouvrez votre navigateur et rendez-vous sur [http://localhost:3000](http://localhost:3000).

2. **Utilisation de l'application :**
   - Sur la page d'accueil, remplissez le formulaire en indiquant le nombre de recettes souhaité et en choisissant éventuellement l'option "Végétarien uniquement".
   - Cliquez sur **"C'est parti !"** pour lancer la recherche.
   - Les recettes sélectionnées s'affichent sous forme de cards avec leurs images, titres, ingrédients et le nombre de personnes.
   - Ajustez le nombre de personnes directement sur chaque card grâce aux boutons **"+"** et **"–"**. Les quantités d'ingrédients se recalculent automatiquement.
   - Pour remplacer une recette, passez la souris sur la card concernée pour faire apparaître le bouton **"Actualiser"**. Cliquez dessus pour remplacer la recette par une autre (différente de celles déjà affichées).
   - La liste de courses en bas se met à jour automatiquement pour refléter la fusion des ingrédients de toutes les recettes affichées.

---

## 🛠️ Stack technique

- **Next.js 13** (App Router)
- **React** (Composants fonctionnels, hooks)
- **TypeScript** (Typage strict pour une meilleure maintenabilité)
- **Tailwind** (Global et Modules CSS pour le styling)
- **Node.js** (Lecture de fichier JSON via API Route)
- **ESLint** (Pour garantir la qualité du code)

---

## 🏗️ Architecture technique détaillée

L'application adopte une architecture modulaire et évolutive reposant sur plusieurs concepts clés :

1. **Point d'entrée et layout global :**  
   - Le fichier `layout.tsx` définit le squelette HTML de l'application et importe le fichier de styles globaux (`globals.css`).  
   - Il enveloppe l'application avec le `RecipesProvider` pour rendre l'état global accessible.

2. **Pages et routing :**  
   - La page principale (`page.tsx`) compose l'interface en intégrant les composants **Form**, **Results** et **ShoppingList**.

3. **API Route et repository :**  
   - Une API Route (`app/api/recipes/route.ts`) gère la lecture du fichier JSON contenant les recettes et applique les filtres et le shuffle via le module `recipeRepository.ts` (situé dans `src/services`).

4. **Gestion de l'état avec Context :**  
   - Le `RecipesContext` (dans `src/context/recipesContext.tsx`) centralise l'état des recettes.  
   - Les composants clients (Form, Results, ShoppingList) utilisent le hook `useRecipes` pour accéder et mettre à jour cet état.

5. **Fonctions utilitaires :**  
   - Le module `quantityUtils.ts` (dans `src/utils`) gère le parsing et le formatage des quantités, afin d'éviter la redondance entre les composants.

6. **Design pattern et flux de données :**  
   - **Container/Presenter Pattern :**  
     La page principale agit en tant que container en orchestrant la communication entre les composants et en gérant l'état via le context.  
   - **Separation of Concerns :**  
     - La logique de récupération des données est isolée dans le repository et l'API Route.  
     - La logique d'affichage et d'ajustement des quantités est centralisée dans les composants Results et ShoppingList.  
     - Les interactions utilisateur (formulaire, boutons d'incrément/décrément, bouton actualiser) déclenchent des callbacks qui mettent à jour l'état global.

---

## 📂 Revue des fichiers et de leur fonctionnement

- **src/app/layout.tsx**  
  Définit la structure globale de l'application, importe les styles globaux, et enveloppe l'application avec le `RecipesProvider`.

- **src/app/page.tsx**  
  La page principale qui compose l'interface en intégrant :
  - **Form.tsx** : Le formulaire de recherche.
  - **Results.tsx** : Affiche les recettes sous forme de cards (avec ajustement des quantités et bouton "Actualiser").
  - **ShoppingList.tsx** : Fusionne et affiche la liste de courses.

- **src/context/recipesContext.tsx**  
  Crée le contexte global pour l'état des recettes. Fournit le hook `useRecipes` pour accéder et mettre à jour cet état dans toute l'application.

- **src/services/recipeRepository.ts**  
  Contient la logique de lecture du fichier JSON (`src/data/recipes.json`) et d'application des filtres (végétarien, count, shuffle).

- **src/app/api/recipes/route.ts**  
  API Route qui interroge le repository pour renvoyer un sous-ensemble filtré et mélangé de recettes selon les query params (`count` et `vegetarian`).

- **src/utils/quantityUtils.ts**  
  Regroupe les fonctions de parsing et de formatage des quantités, afin d'éviter la duplication dans Results et ShoppingList.

- **src/components/Form.tsx**  
  Composant client qui gère le formulaire de recherche. Il envoie une requête à l'API Route et met à jour le contexte via `setRecipes`.

- **src/components/Results.tsx**  
  Affiche les recettes sous forme de cards. Gère l'ajustement dynamique des quantités en fonction du nombre de personnes et propose des interactions (boutons "+", "–" et "Actualiser" au survol).

- **src/components/ShoppingList.tsx**  
  Fusionne les ingrédients de toutes les recettes affichées, applique les ajustements de quantité, et affiche la liste de courses de manière consolidée.