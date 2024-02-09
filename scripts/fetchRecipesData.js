import { createRecipeCards } from './createRecipeCards.js';

const jsonFilePath = 'data/recipes.json';

function fetchRecipesData(filePath) {
  fetch(filePath)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          createRecipeCards(data.recipes);
          const uniqueIngredients = getAllUniqueIngredients(data.recipes);
          fillIngredientSelect(uniqueIngredients);
      })
      .catch(error => {
          console.error('Erreur lors du chargement des données JSON:', error);
      });
}

// Fonction pour extraire tous les ingrédients uniques
function getAllUniqueIngredients(recipes) {
  const allIngredients = new Set();

  recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
          allIngredients.add(ingredient.ingredient.toLowerCase());
      });
  });

  return Array.from(allIngredients).sort();
}

// Fonction pour remplir le sélecteur d'ingrédients
function fillIngredientSelect(ingredients) {
  const select = document.getElementById('ingredient-selector');

  ingredients.forEach(ingredient => {
      const option = document.createElement('option');
      option.value = ingredient;
      option.textContent = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
      select.appendChild(option);
  });
}

fetchRecipesData(jsonFilePath);
