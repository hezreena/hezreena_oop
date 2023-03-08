const ButtonM = document.querySelector('#meal-button');
const InputM = document.querySelector('#meal-input');
const ListM = document.querySelector('#meal-list');

ButtonM.addEventListener('click', () => {
  const searchQuery = InputM.value.trim();
  if (searchQuery) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        ListM.innerHTML = ''; // clear previous search results
        if (data.meals) {
          data.meals.forEach(meal => {
            // Create a new list item with the meal name, recipe, image, and YouTube video 
            const newMeal = document.createElement('li');
            newMeal.innerHTML = `
              <h2>${meal.strMeal}</h2>
              <h2>food category: ${meal.strCategory}</h2>
              <div class="recipe" style="display: flex;">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="50%" height="50%">
                <div class="video-container">
                  <iframe src="${meal.strYoutube.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>
                </div>
              </div>
              
              <p>ingredients and measurements:<br>
              ${meal.strMeasure1} ${meal.strIngredient1}<br>${meal.strMeasure2} ${meal.strIngredient2}<br>${meal.strMeasure3} ${meal.strIngredient3}<br>${meal.strMeasure4} ${meal.strIngredient4}<br>${meal.strMeasure5} ${meal.strIngredient5}<br>${meal.strMeasure6} ${meal.strIngredient6}<br>${meal.strMeasure7} ${meal.strIngredient7}<br>${meal.strMeasure8} ${meal.strIngredient8}<br>${meal.strMeasure9} ${meal.strIngredient9}<br>${meal.strMeasure10} ${meal.strIngredient10}<br>${meal.strMeasure11} ${meal.strIngredient11}<br>${meal.strMeasure12} ${meal.strIngredient12}<br>${meal.strMeasure13} ${meal.strIngredient13}<br></p>
              
              <ul style="list-style-type: disc; text-align: justify; font-family: Arial, sans-serif;">
                ${meal.strInstructions.split('\r\n').map(instruction => `<li>${instruction}</li>`).join('')}
              </ul>
              <br>

              
            `;
            ListM.appendChild(newMeal);
          });
        } else {
          const noResults = document.createElement('li');
          noResults.textContent = 'No results found.';
          ListM.appendChild(noResults);
        }
      })
      .catch(error => console.error(error));
  }
});

