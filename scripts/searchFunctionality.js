import { createRecipeCards } from './createRecipeCards.js';
import { populateFilters } from './filterTags.js';

function addSearchFunctionality(recipes) {
  const searchBar = document.getElementById('searchBar');
  const noResultsMessage = document.getElementById('no-results-message');

  searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.trim().toLowerCase();
    if (searchTerm.length >= 3) {
      const filteredRecipes = [];
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (recipe.name.toLowerCase().includes(searchTerm) ||
          recipe.description.toLowerCase().includes(searchTerm)) {
          filteredRecipes.push(recipe);
        } else {
          for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j];
            if (ingredient.ingredient.toLowerCase().includes(searchTerm)) {
              filteredRecipes.push(recipe);
              break; // Sortir de la boucle dès qu'un ingrédient correspondant est trouvé
            }
          }
        }
      }
      updateDisplayedRecipes(filteredRecipes, recipes);

      if (filteredRecipes.length === 0) {
        // Afficher le message d'erreur
        noResultsMessage.textContent = `Aucune recette ne contient '${searchTerm}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
        noResultsMessage.style.display = 'block';
      } else {
        // Cacher le message d'erreur s'il y a des résultats
        noResultsMessage.style.display = 'none';
      }
    } else if (searchTerm.length === 0) {
      // Si le champ de recherche est vide, afficher toutes les recettes
      updateDisplayedRecipes(recipes, recipes);
      noResultsMessage.style.display = 'none';
    } else {
      // Cacher le message d'erreur si la longueur de la recherche est inférieure à 3 caractères
      noResultsMessage.style.display = 'none';
    }
  });
}

function updateDisplayedRecipes(filteredRecipes, allRecipes) {
  const recipesContainer = document.getElementById('recipes-container');
  recipesContainer.innerHTML = '';
  createRecipeCards(filteredRecipes);
  populateFilters(allRecipes, filteredRecipes);
}

export { addSearchFunctionality, updateDisplayedRecipes };
