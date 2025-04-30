const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const recipesContainer = document.getElementById("recipes");

// Fetch Recipes
const fetchRecipes = async (query) => {
    recipesContainer.innerHTML = "<h3>Loading...</h3>";
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        recipesContainer.innerHTML = "";

        if (data.meals) {
            data.meals.forEach((meal) => {
                const recipeDiv = document.createElement("div");
                recipeDiv.classList.add("recipe");
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p>${meal.strCategory} | ${meal.strArea}</p>
                `;
                recipesContainer.appendChild(recipeDiv);
            });
        } else {
            recipesContainer.innerHTML = "<h3>No recipes found.</h3>";
        }
    } catch (error) {
        recipesContainer.innerHTML = "<h3>Error fetching recipes.</h3>";
        console.error(error);
    }
};

// Handle Search
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchBox.value.trim();
    if (query) {
        fetchRecipes(query);
    }
});
document.getElementById("search-form").addEventListener("submit", async function(event) {
  event.preventDefault();
  const query = document.getElementById("search-box").value.trim();
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "<h3>Loading...</h3>";
  
  try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      recipesContainer.innerHTML = "";
      
      if (data.meals) {
          data.meals.forEach((meal) => {
              const recipeDiv = document.createElement("div");
              recipeDiv.classList.add("recipe");
              recipeDiv.innerHTML = `
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                  <h3>${meal.strMeal}</h3>
                  <p>${meal.strCategory} | ${meal.strArea}</p>
              `;
              recipesContainer.appendChild(recipeDiv);
          });
      } else {
          recipesContainer.innerHTML = "<h3>No recipes found.</h3>";
      }
  } catch (error) {
      recipesContainer.innerHTML = "<h3>Error fetching recipes.</h3>";
      console.error(error);
  }
});
