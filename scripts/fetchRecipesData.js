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
        const uniqueAppliances = getAllUniqueAppliances(data.recipes);
        const uniqueUstensils = getAllUniqueUstensils(data.recipes);

        fillSelectOptions('ingredient-selector', uniqueIngredients);
        fillSelectOptions('appliance-selector', uniqueAppliances);
        fillSelectOptions('ustensil-selector', uniqueUstensils);
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

function getAllUniqueAppliances(recipes) {
  const allAppliances = new Set(recipes.map(recipe => recipe.appliance.toLowerCase()));
  return Array.from(allAppliances).sort();
}

function getAllUniqueUstensils(recipes) {
  const allUstensils = new Set(recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())));
  return Array.from(allUstensils).sort();
}


// Fonction pour remplir le sélecteur d'ingrédients
function fillSelectOptions(selectId, options) {
  const select = document.getElementById(selectId);
  options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
      select.appendChild(optionElement);
  });
}


fetchRecipesData(jsonFilePath);
