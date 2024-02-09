function createRecipeCards(recipes) {
  const recipesContainer = document.getElementById('recipes-container');

  recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('recipe-card');

      const image = document.createElement('img');
      image.src = `/assets/images/${recipe.image}`;
      image.alt = recipe.name;
      card.appendChild(image);

      const name = document.createElement('h2');
      name.textContent = recipe.name;
      card.appendChild(name);

      const description = document.createElement('p');
      description.textContent = recipe.description;
      card.appendChild(description);

      const ingredientsTitle = document.createElement('h3');
      ingredientsTitle.textContent = "Ingrédients";
      card.appendChild(ingredientsTitle);

      const ingredientsList = document.createElement('ul');
      recipe.ingredients.forEach(ingredient => {
          const item = document.createElement('li');
          let text = ingredient.ingredient;
          if (ingredient.quantity) {
              text += `: ${ingredient.quantity}`;
          }
          if (ingredient.unit) {
              text += ` ${ingredient.unit}`;
          }
          item.textContent = text;
          ingredientsList.appendChild(item);
      });
      card.appendChild(ingredientsList);

      recipesContainer.appendChild(card);
  });
}

export { createRecipeCards };
