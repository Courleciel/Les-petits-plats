import { updateDisplayedRecipes } from './searchFunctionality.js';
import { fetchRecipesData } from "./fetchRecipesData.js";
import { jsonFilePath } from "./fetchRecipesData.js";

function populateFilters(allRecipes, filteredRecipes) {
  const recipesToUse = filteredRecipes || allRecipes; // Utiliser les recettes filtrées si disponibles, sinon utiliser toutes les recettes
  const ingredientsList = document.getElementById('ingredient-list');
  const applianceList = document.getElementById('appliance-list');
  const ustensilList = document.getElementById('ustensil-list');

  const ingredientsSet = new Set();
  const applianceSet = new Set();
  const ustensilSet = new Set();

  // Extraction des ingrédients, appareils et ustensiles uniques des recettes à utiliser
  recipesToUse.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => ingredientsSet.add(ingredient.ingredient));
    applianceSet.add(recipe.appliance);
    recipe.ustensils.forEach(ustensil => ustensilSet.add(ustensil));
  });

  // Remplissage des listes HTML
  fillList(ingredientsSet, ingredientsList);
  fillList(applianceSet, applianceList);
  fillList(ustensilSet, ustensilList);

  // Supprimer les écouteurs d'événements existants pour éviter les doublons
  const ingredientSelector = document.getElementById('ingredient-selector');
  const applianceSelector = document.getElementById('appliance-selector');
  const ustensilSelector = document.getElementById('ustensil-selector');

  ingredientSelector.removeEventListener('click', toggleIngredientListDisplay);
  applianceSelector.removeEventListener('click', toggleApplianceListDisplay);
  ustensilSelector.removeEventListener('click', toggleUstensilListDisplay);

  // Ajouter des gestionnaires d'événements aux tags pour afficher les listes correspondantes
  ingredientSelector.addEventListener('click', toggleIngredientListDisplay);
  applianceSelector.addEventListener('click', toggleApplianceListDisplay);
  ustensilSelector.addEventListener('click', toggleUstensilListDisplay);

  // Ajouter la fonctionnalité de recherche
  addSearchFunctionality(ingredientsList);
  addSearchFunctionality(applianceList);
  addSearchFunctionality(ustensilList);

  addFilterClickHandler(ingredientsList, allRecipes);
  addFilterClickHandler(applianceList, allRecipes);
  addFilterClickHandler(ustensilList, allRecipes);
}

// Définition des fonctions pour les gestionnaires d'événements
function toggleIngredientListDisplay(event) {
  event.stopPropagation(); // Arrêter la propagation pour empêcher la fermeture immédiate
  toggleListDisplay('ingredient-list');
}

function toggleApplianceListDisplay(event) {
  event.stopPropagation(); // Arrêter la propagation pour empêcher la fermeture immédiate
  toggleListDisplay('appliance-list');
}

function toggleUstensilListDisplay(event) {
  event.stopPropagation(); // Arrêter la propagation pour empêcher la fermeture immédiate
  toggleListDisplay('ustensil-list');
}


function fillList(dataSet, listElement) {
  listElement.innerHTML = ''; // Clear previous content
  dataSet.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    listElement.appendChild(li);
  });
}

function addFilterClickHandler(listElement, allRecipes) {
  const handleFilterClick = (event) => {
    const filterValue = event.target.textContent;
    const filteredRecipes = allRecipes.filter(recipe =>
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase() === filterValue.toLowerCase()
      ) ||
      recipe.appliance.toLowerCase() === filterValue.toLowerCase() ||
      recipe.ustensils.some(ustensil =>
        ustensil.toLowerCase() === filterValue.toLowerCase()
      )
    );
    updateDisplayedRecipes(filteredRecipes, allRecipes);
    addSelectedTag(filterValue);
  };

  if (!listElement._filterClickHandlerAdded) {
    listElement.addEventListener('click', handleFilterClick);
    listElement._filterClickHandlerAdded = true;
  }
}

function toggleListDisplay(listId) {
  const list = document.getElementById(listId);
  const allLists = document.querySelectorAll('.filter-list');
  allLists.forEach(l => {
    if (l.id !== listId) {
      l.style.display = 'none';
    }
  });
  list.style.display = (list.style.display === 'block') ? 'none' : 'block';
}

function addSearchFunctionality(listElement) {
  const input = listElement.previousElementSibling;
  input.addEventListener('input', () => {
    const searchTerm = input.value.toLowerCase();
    const items = listElement.querySelectorAll('li');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

document.addEventListener('click', () => {
  const allLists = document.querySelectorAll('.filter-list');
  allLists.forEach(list => {
    list.style.display = 'none';
  });
});
function addSelectedTag(tagName, allRecipes) {
  const selectedTagsContainer = document.getElementById('selected-tags-container');
  const tagElement = document.createElement('span');
  tagElement.classList.add('selected-tag');
  tagElement.textContent = tagName;
  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.textContent = '×'
  closeButton.addEventListener('click', () => {
    // Réinitialiser la page en rechargeant les données initiales et en recréant les cartes de recette
    fetchRecipesData(jsonFilePath);
    selectedTagsContainer.innerHTML = ''; // Effacer les tags sélectionnés
  });
  tagElement.appendChild(closeButton);
  selectedTagsContainer.appendChild(tagElement);
  tagElement.style.display = 'block';
}



export { populateFilters };
