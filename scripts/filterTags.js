function populateFilters(allRecipes, filteredRecipes) {
  const recipesToUse = filteredRecipes || allRecipes; // Use filtered recipes if available, otherwise use all recipes
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

  // Ajouter des gestionnaires d'événements aux tags pour afficher les listes correspondantes
  const ingredientSelector = document.getElementById('ingredient-selector');
  const applianceSelector = document.getElementById('appliance-selector');
  const ustensilSelector = document.getElementById('ustensil-selector');

  ingredientSelector.addEventListener('click', () => {
    toggleListDisplay('ingredient-list');
  });

  applianceSelector.addEventListener('click', () => {
    toggleListDisplay('appliance-list');
  });

  ustensilSelector.addEventListener('click', () => {
    toggleListDisplay('ustensil-list');
  });

  // Ajouter la fonctionnalité de recherche
  addSearchFunctionality(ingredientsList);
  addSearchFunctionality(applianceList);
  addSearchFunctionality(ustensilList);
}

function fillList(dataSet, listElement) {
  listElement.innerHTML = ''; // Clear previous content
  dataSet.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    listElement.appendChild(li);
  });
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

export { populateFilters };
