import { createRecipeCards } from './createRecipeCards.js';
import { populateFilters } from './filterTags.js';

function addSearchFunctionality(recipes) {
  const searchBar = document.getElementById('searchBar');
  const noResultsMessage = document.getElementById('no-results-message');

  searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.trim().toLowerCase();
    if (searchTerm.length >= 3) {
      const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ingredient =>
          ingredient.ingredient.toLowerCase().includes(searchTerm)
        ) ||
        recipe.description.toLowerCase().includes(searchTerm)
      );
      updateDisplayedRecipes(filteredRecipes);

      if (filteredRecipes.length === 0) {
        noResultsMessage.textContent = `Aucune recette ne contient '${searchTerm}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
        noResultsMessage.style.display = 'block';
      } else {
        noResultsMessage.style.display = 'none';
      }
    } else {
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
