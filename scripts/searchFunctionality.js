import { createRecipeCards } from './createRecipeCards.js';
import { populateFilters } from './filterTags.js';

function addSearchFunctionality(recipes) {
  const searchBar = document.getElementById('searchBar');
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
    }
  });
}

function updateDisplayedRecipes(filteredRecipes, allRecipes) {
  const recipesContainer = document.getElementById('recipes-container');
  recipesContainer.innerHTML = ''; // Clear previous content
  createRecipeCards(filteredRecipes);
  populateFilters(allRecipes, filteredRecipes); // Update filters with filtered recipes
}

export { addSearchFunctionality };