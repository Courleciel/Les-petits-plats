function populateFilters(recipes) {
  const ingredientsList = document.getElementById('ingredient-list');
  const applianceList = document.getElementById('appliance-list');
  const ustensilList = document.getElementById('ustensil-list');

  const ingredientsSet = new Set();
  const applianceSet = new Set();
  const ustensilSet = new Set();

  // Extraction des ingrédients, appareils et ustensiles uniques de toutes les recettes
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => ingredientsSet.add(ingredient.ingredient));
    applianceSet.add(recipe.appliance);
    recipe.ustensils.forEach(ustensil => ustensilSet.add(ustensil));
  });

  // Remplissage des listes HTML
  ingredientsSet.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  applianceSet.forEach(appliance => {
    const li = document.createElement('li');
    li.textContent = appliance;
    applianceList.appendChild(li);
  });

  ustensilSet.forEach(ustensil => {
    const li = document.createElement('li');
    li.textContent = ustensil;
    ustensilList.appendChild(li);
  });

  // Ajouter des gestionnaires d'événements aux tags pour afficher les listes correspondantes
  const ingredientSelector = document.getElementById('ingredient-selector');
  const applianceSelector = document.getElementById('appliance-selector');
  const ustensilSelector = document.getElementById('ustensil-selector');

  ingredientSelector.addEventListener('click', () => {
    ingredientsList.style.display = 'block';
    applianceList.style.display = 'none';
    ustensilList.style.display = 'none';
  });

  applianceSelector.addEventListener('click', () => {
    ingredientsList.style.display = 'none';
    applianceList.style.display = 'block';
    ustensilList.style.display = 'none';
  });

  ustensilSelector.addEventListener('click', () => {
    ingredientsList.style.display = 'none';
    applianceList.style.display = 'none';
    ustensilList.style.display = 'block';
  });
}

export { populateFilters };
