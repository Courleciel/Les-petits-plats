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
        })
        .catch(error => {
            console.error('Erreur lors du chargement des données JSON:', error);
        });
}

fetchRecipesData(jsonFilePath);
