function createRecipeCards(recipes) {
  const recipesContainer = document.getElementById('recipes-container');

  recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('recipe-card');

      const image = document.createElement('img');
      image.src = `/assets/images/${recipe.image}`;
      image.alt = recipe.name;
      card.appendChild(image);

      const textContainer = document.createElement('div');
      textContainer.classList.add('recipe-text-container');

      const name = document.createElement('h2');
      name.textContent = recipe.name;
      textContainer.appendChild(name);

      const recetteTitle = document.createElement('h3');
      recetteTitle.textContent = "Recette";
      textContainer.appendChild(recetteTitle);

      const description = document.createElement('p');
      description.textContent = recipe.description;
      textContainer.appendChild(description);

      const ingredientsTitle = document.createElement('h3');
      ingredientsTitle.textContent = "Ingrédients";
      textContainer.appendChild(ingredientsTitle);

      const ingredientsContainer = document.createElement('div');
      ingredientsContainer.classList.add('ingredients-container');

      recipe.ingredients.forEach(ingredient => {
          const ingredientBlock = document.createElement('div');
          ingredientBlock.classList.add('ingredient-block');

          const ingredientName = document.createElement('span');
          ingredientName.textContent = ingredient.ingredient;
          ingredientName.classList.add('ingredient-name');
          ingredientBlock.appendChild(ingredientName);

          const ingredientQuantity = document.createElement('span');
          let quantityText = '';
          if (ingredient.quantity) {
              quantityText += `${ingredient.quantity}`;
          }
          if (ingredient.unit) {
              quantityText += ` ${ingredient.unit}`;
          }
          ingredientQuantity.textContent = quantityText;
          ingredientQuantity.classList.add('ingredient-quantity');
          ingredientBlock.appendChild(ingredientQuantity);

          ingredientsContainer.appendChild(ingredientBlock);
      });

      textContainer.appendChild(ingredientsContainer);
      card.appendChild(textContainer);
      recipesContainer.appendChild(card);
  });
}


export { createRecipeCards };
