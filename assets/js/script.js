var recBtn = document.getElementById("recBtn");
var ingBtn = document.getElementById("ingBtn");
var recVal = document.getElementById("recipe-val");
var nutVal = document.getElementById("nutrition-val");
var recName = document.getElementsByClassName("rec-name");
var recDisplay = document.getElementById("rec-display");
var nutCol = document.getElementById("nutrition-col");
var nutTxtDisplay = document.getElementById("displayNut");
// var histDisplay = document.getElementByClassName("history-area");
var recArray = [];
var historyArea = document.getElementById("history-area");
var calNumber = document.getElementById("cal-number");

var searchHistory = JSON.parse(localStorage.getItem("user-input")) || [];

// console.log(searchHistory);

//get Nutrition Function
var getNutrition = function () {

    var recQuery = this.value || recVal.value;
    

    var apiNutUrl = "https://api.edamam.com/api/nutrition-data?app_id=d80bea91&app_key=d0bd7a7983c9186ffd5e98b3cc987be7&ingr=" + recQuery;

    // make a get request to url
    fetch(apiNutUrl).then(function (response) {

        response.json().then(function (data) {
            // this will show the API data to navigate
            
            //display the search item
            var recQuery = recVal.value;
            nutTxtDisplay.textContent = recQuery;

            //Display the Calories of the search input
            var calCount = data.calories;
            calNumber.textContent = calCount;

            nutCol.appendChild(calNumber);
        })
    })
    var localStorageNut = function () {
        localStorage.setItem(JSON.stringify(NutQuery))
    }
}
//get Recipe Functionality
var getRecipe = function () {
    console.log(this);
    var recQuery = this.value || recVal.value;
    // This will be the API call and the function
    // var recQuery = recVal.value;
    recArray.push(recQuery)
    
    var apiRecUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + recQuery + "&apiKey=9811871b69254065b5ce62c69e6f0531&number=6";

    fetch(apiRecUrl).then(function (response) {
        response.json().then(function (data) {
            

            recDisplay.innerHTML = '';

            for (var i = 0; i < data.length; i++) {

                //image container
                var recImgURL = data[i].image;
                var img = document.createElement("img");
                img.className = "card-header fg-white"
                img.style.width = "150px"
                img.setAttribute("src", recImgURL)

                //div for the card
                var name = data[i].title;
                var recTile = document.createElement('div');
                recTile.className = "card card-img";
                recTile.textContent = name;

                recTile.appendChild(img);
                recDisplay.appendChild(recTile);
            }
            recipeSearch();
            // console.log(searchHistory);
            console.log(recVal.value.length)
            if (recVal.value.length > 0) {
                searchHistory.push(recVal.value);
                localStorage.setItem("user-input", JSON.stringify(searchHistory));
            }
           
            recVal.value = '';
           
            // console.log(searchHistory);
            createHistory();
        })
    })

}

// store recipe search
var recipeSearch = function () {
   // localStorage.setItem("user-input", JSON.stringify(recArray));
    
}

var createHistory = function () {
    document.getElementById('history-area').innerHTML = '';

    searchHistory.forEach(search => {
        var histBtn = document.createElement('button');
        //giving btn text
        histBtn.textContent = search; 
        //giving btn value
        histBtn.value = search;
    
    
        
        historyArea.prepend(histBtn);
        histBtn.addEventListener("click", getRecipe);
        histBtn.addEventListener("click", getNutrition);
    });

    //creating the btn
    
   
};

createHistory();
recBtn.addEventListener("click", getNutrition)
recBtn.addEventListener("click", getRecipe)

//test 5