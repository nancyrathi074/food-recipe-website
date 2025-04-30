const recipeId = new URLSearchParams(window.location.search).get('id'); // Get the recipe ID from the URL

if (recipeId) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];

            // Set Recipe Name
            document.getElementById("recipe-name").innerText = meal.strMeal;

            // Set Recipe Category, Area, and Tags
            document.getElementById("recipe-category").innerText = `Category: ${meal.strCategory}`;
            document.getElementById("recipe-area").innerText = `Area: ${meal.strArea}`;
            document.getElementById("recipe-tags").innerText = `Tags: ${meal.strTags ? meal.strTags : "No tags"}`;

            // Set Recipe Image
            const recipeImage = document.querySelector(".recipe-image img");
            recipeImage.src = meal.strMealThumb;

            // Populate Ingredients
            const ingredientsList = document.getElementById("ingredients-list");
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient) {
                    const li = document.createElement("li");
                    li.innerText = `${ingredient} - ${measure || "No measurement"}`;
                    ingredientsList.appendChild(li);
                }
            }

            // Populate Recipe Instructions
            const recipeSteps = document.getElementById("recipe-steps");
            const instructions = meal.strInstructions.split("\n");
            instructions.forEach(step => {
                const li = document.createElement("li");
                li.innerText = step;
                recipeSteps.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching recipe data:", error));
} else {
    console.error("No recipe ID provided in the URL");
}
