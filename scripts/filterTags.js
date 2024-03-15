import { updateDisplayedRecipes } from './searchFunctionality.js';
import { fetchRecipesData } from "./fetchRecipesData.js";
import { jsonFilePath } from "./fetchRecipesData.js";

let selectedTags = [];

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
  const ingredientSearch = document.getElementById('ingredient-search');
  const applianceSelector = document.getElementById('appareils-search');
  const ustensilSelector = document.getElementById('ustensil-search');

  ingredientSearch.removeEventListener('click', toggleIngredientListDisplay);
  applianceSelector.removeEventListener('click', toggleApplianceListDisplay);
  ustensilSelector.removeEventListener('click', toggleUstensilListDisplay);

  // Ajouter des gestionnaires d'événements aux tags pour afficher les listes correspondantes
  ingredientSearch.addEventListener('click', toggleIngredientListDisplay);
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
    const isTagSelected = selectedTags.includes(filterValue);

    if (!isTagSelected) {
      selectedTags.push(filterValue);
    } else {
      selectedTags = selectedTags.filter(tag => tag !== filterValue);
    }

    const filteredRecipes = allRecipes.filter(recipe =>
      selectedTags.every(tag =>
        recipe.ingredients.some(ingredient =>
          ingredient.ingredient.toLowerCase() === tag.toLowerCase()
        ) ||
        recipe.appliance.toLowerCase() === tag.toLowerCase() ||
        recipe.ustensils.some(ustensil =>
          ustensil.toLowerCase() === tag.toLowerCase()
        )
      )
    );

    updateDisplayedRecipes(filteredRecipes, allRecipes);
    addSelectedTag(filterValue, allRecipes);
  };

  if (!listElement._filterClickHandlerAdded) {
    listElement.addEventListener('click', handleFilterClick);
    listElement._filterClickHandlerAdded = true;
  }
}

function toggleListDisplay(listId, iconElement) {
  const list = document.getElementById(listId);
  const input = list.previousElementSibling;

  const allLists = document.querySelectorAll('.filter-list');
  allLists.forEach(l => {
    if (l.id !== listId) {
      l.style.display = 'none';
      const input = l.previousElementSibling;
      if (input.classList.contains('filter-input')) {
        input.style.display = 'none';
      }
    }
  });

  if (list.style.display === 'block') {
    list.style.display = 'none';
    if (iconElement) {
      iconElement.classList.remove('fa-rotate-180');
    }
    if (input && input.tagName.toLowerCase() === 'input') {
      input.style.display = 'none';
    }
  } else {
    list.style.display = 'block';
    if (iconElement) {
      iconElement.classList.add('fa-rotate-180');
    }
    if (input && input.tagName.toLowerCase() === 'input') {
      input.style.display = 'block';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const filterToggleElements = document.querySelectorAll('.filter-toggle');
  filterToggleElements.forEach(element => {
    const iconElement = element.querySelector('i');
    element.addEventListener('click', () => {
      toggleListDisplay(element.nextElementSibling.id, iconElement);
    });
  });
});

document.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() !== 'input') {
    const allLists = document.querySelectorAll('.filter-list');
    allLists.forEach(list => {
      list.style.display = 'none';
      const input = list.previousElementSibling;
      if (input && input.tagName.toLowerCase() === 'input') {
        if (!event.target.classList.contains('filter-input') && event.target !== input) {
          input.style.display = 'none';
          const iconElement = input.parentElement.querySelector('i');
          if (iconElement) {
            iconElement.classList.remove('fa-rotate-180');
          }
        }
      }
    });
  }
});

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

function addSelectedTag(tagName, allRecipes) {
  const selectedTagsContainer = document.getElementById('selected-tags-container');
  const tagElement = document.createElement('span');
  tagElement.classList.add('selected-tag');
  tagElement.textContent = tagName;
  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.textContent = '×'
  closeButton.addEventListener('click', () => {
    const indexToRemove = selectedTags.indexOf(tagName);
    if (indexToRemove !== -1) {
      selectedTags.splice(indexToRemove, 1);
      const filteredRecipes = allRecipes.filter(recipe =>
        selectedTags.every(tag =>
          recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase() === tag.toLowerCase()
          ) ||
          recipe.appliance.toLowerCase() === tag.toLowerCase() ||
          recipe.ustensils.some(ustensil =>
            ustensil.toLowerCase() === tag.toLowerCase()
          )
        )
      );
      updateDisplayedRecipes(filteredRecipes, allRecipes);
      selectedTagsContainer.removeChild(tagElement);
    }
  });
  tagElement.appendChild(closeButton);
  selectedTagsContainer.appendChild(tagElement);
  tagElement.style.display = 'block';
}



export { populateFilters };
