// ************************************************** loadingScreen**********************************************
$('document').ready(function(){
    $('.loadingScreen').fadeOut(1500 , function(){
   $('body').css('overflow' , 'auto')
    })
       
   
// *************************************************** navbar ****************************************************

let navbar = $('.navbar  ');
let exit = $('.exit');
let navbarWidth = $('.navbar').outerWidth();

let linksAnimate = $('.links li')


exit.click(function(){
    linksAnimate.animate({'margin-top' : '5px'}, 1100)
    if(navbar.css('left') == '0px'){navbar.animate({left : - navbarWidth },500) , exit.html('<i class="text-center fs-3 fa-solid fa-bars"></i>') , linksAnimate.animate({'margin-top' : '5px'}, 500)}
    else{navbar.animate({left : "0px" },500) , exit.html('<i class=" fs-3 fa-solid fa-xmark"></i>')}

})


// ******************************************************Show inputs********************************************
let inputsArea = document.querySelector('.inputs-group');
let gallery = document.querySelector('.gallery')

function showInputs(){
inputsArea.innerHTML = `
<div class="col-lg-10 d-flex justify-content-center align-items-center mx-auto ">
<input class="form-control name-search search w-50 m-2 bg-transparent" type="text" placeholder="Search By Name"/>
<input class="form-control letter-search search w-50 m-2 bg-transparent" type="text" placeholder="Search By First Letter"/>
</div>`;
gallery.innerHTML = "";    
}

document.querySelector('.search').addEventListener('click',function(){
    showInputs()
    navbar.animate({left : - navbarWidth },500)
    linksAnimate.animate({'margin-top' : '5px'}, 500 , function(){
        exit.html('<i class="text-center fs-3 fa-solid fa-bars"></i>') })    
})


// ************************************************** search inputs**********************************************
let searchMeal = [];

async function getSearch(search){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    newArray = await response.json()
    searchMeal = Object.entries(newArray)
    displayByNameSearch(newArray.slice(20, ))
document.querySelector('.name-search').addEventListener('keyup', function(e){
    // console.log(e.target);
   getSearch(e.target.value);   })
   
}

 
// *************************************************get data by search inputs**************************************

function displayByNameSearch(){
let cartoona = "";
for(let i =0; i < searchMeal[0][1].length; i++ ){
    cartoona = cartoona + `<div data-id="${searchMeal[0][1][0].idMeal}" class="viewer col-lg-3">
    <div class="card">
    <div class="background">
    <img class="inner-img w-100" src="${searchMeal[0][1][0].strMealThumb}" alt="">
    <div class="img-layer"><h4 class="meal-name text-center"> ${searchMeal[0][1][0].strMeal} </h4></div>
    </div>
    </div>   
    </div>`
    document.querySelector('.gallery').innerHTML = cartoona;    

 }

}


// ************************************************** Get Data By Category**********************************************

let allMeals = [];

async function getData(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    newArray = await response.json()
    allMeals = Object.entries(newArray)
    // console.log(allMeals);

    displayCategories(allMeals.slice(20, ))

                                            // display Details-Layer
    $('.Exit').click(function(){
        $('.section2').addClass('d-none')
        console.log("Helooooo");
    })
    
    // hideInputs
   
    $('.category , .area , .ingredients , .contact').click(function(){
        $('.inputs-group').addClass('d-none')})


        $('.img-layer').click(function(){
            getAllDetails()
        })
           
}




// getData()

let category = $('.category')
category.click(function(){
    getData()
    navbar.animate({left : - navbarWidth },500)
    linksAnimate.animate({'margin-top' : '5px'}, 500 , function(){
    exit.html('<i class="text-center fs-3 fa-solid fa-bars"></i>') })
})

// ****************************************************************************************************************

// *************************************************** Display Categories ***********************************************
function displayCategories(){
    let box = "";
    for (let i = 0; i < allMeals[0][1].length; i++){ 
        box +=  `<div data-id="${allMeals[0][1][i].idCategory}" class="viewer col-lg-3">
        <div class="card">
        <div class="background">
        <img class="inner-img w-100" src="${allMeals[0][1][i].strCategoryThumb}" alt="">
        <div class="img-layer"><h4 class="meal-name text-center pt-3"> ${allMeals[0][1][i].strCategory} </h4>
        <p class="meal-disc p-2 text-center"> ${allMeals[0][1][i].strCategoryDescription} </p>
        </div>
        </div>
        </div>   
        </div>`
        document.querySelector('.gallery').innerHTML = box;
    }
}

// ****************************************************************************************************************

// ****************************************************Get Data By Area******************************************
let allAreas = [];

async function getAllAreas(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    newArray = await response.json()
    allAreas = Object.entries(newArray)
    displayAllAreas(allAreas.slice(20, ))



    $('.background ').click(function(){
        getAllDetails()
    })
    
}

let Area = $('.area')
Area.click(function(){
    getAllAreas()
    navbar.animate({left : - navbarWidth },500)
    linksAnimate.animate({'margin-top' : '5px'}, 500 , function(){
    exit.html('<i class="text-center fs-3 fa-solid fa-bars"></i>') })
})

// *************************************************** Display Areas ***********************************************
function displayAllAreas(){
    let container = "";
    for (let i = 0; i < allAreas[0][1].length; i++){ 
        container +=  `<div class="viewer mx-0 col-lg-3">
        <div class="card">
        <div class="background bg-transparent text-center">
        <i class="fa-solid my-3  fs-1 fa-mountain-city"></i>
        <div class=""><h4 class="meal-name text-center"> ${allAreas[0][1][i].strArea} </h4></div>
        </div>
        </div>   
        </div>`
        document.querySelector('.gallery').innerHTML = container;
    }
}

// ***************************************************************************************************************
// ************************************************Get All Ingredients**************************************************
let allIngredients = [];

async function getAllIngredients(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    newArray = await response.json()
    allIngredients = Object.entries(newArray)
    // console.log(allAreas);
    
    displayAllIngredients(allIngredients.slice(20, ))


    $('.background ').click(function(){
        getAllDetails()

    })
    
}


let ingredients = $('.ingredients')
ingredients.click(function(){
    getAllIngredients()
    navbar.animate({left : - navbarWidth },500)
    linksAnimate.animate({'margin-top' : '5px'}, 500 , function(){
    exit.html('<i class="text-center fs-3 fa-solid fa-bars"></i>') })
})

// **************************************************display All Ingredients****************************************

function displayAllIngredients(){
    let alba = "";
    for (let i = 0; i < allIngredients[0][1].length; i++){ 
        alba +=  `<div data-id="${allIngredients[0][1][i].idIngredient}" class="viewer col-lg-3">
        <div class="card">
        <div class="background p-3 bg-black text-white text-center"> 
        <i class="inner-img w-100 fs-1 fa-solid fa-drumstick-bite m-3"></i>
        <h4 class="meal-name fs-5 "> ${allIngredients[0][1][i].strIngredient} </h4>
        <p class=" desc">${allIngredients[0][1][i].strDescription}</p>
        </div>
        </div>
        </div>   
        </div>`
        document.querySelector('.gallery').innerHTML = alba;
    }
}
// **************************************************************************************************************

// **************************************************Get Details Data**********************************************
let allDetails = [];

async function getAllDetails(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`)
    newArray = await response.json()
    allDetails = Object.entries(newArray)
    displayAllDetails(allDetails.slice(20, ))
     
  $('.Exit').click(function(){
    $('.section2').css('display' , 'none')
     getData() })
}
        
// getAllDetails()
// **************************************************************************************************************
// **************************************************Display Details Data**********************************************
function displayAllDetails(){
    let shanta = "";
    for (let i = 0; i < allDetails[0][1].length; i++){ 
        shanta +=  `<div data-id="${allDetails[0][1][i].idMeal}" class="col-lg-4 mt-2">
        <div class="meal-img ms-5">
        <img class="w-100 rounded-2" src="${allDetails[0][1][i].strMealThumb}" alt="meal">
        <h4 class="meal-title text-white text-center mt-2"> ${allDetails[0][1][i].strMeal}</h4>    
        </div>
        </div> 
        
        <div class="col-lg-8 mt-3">
        <div class="meal-details">
        <div class="top-top px-2 d-flex justify-content-between">
        <h4 class="instructions fs-1 text-white">instructions</h4>
        <i class=" Exit text-white fs-3 fa-solid fa-xmark"></i>
        </div>
        <p class="fs-5 text-white">${allDetails[0][1][i].strInstructions}</p>
        <h4 class="area text-white"> Area: ${allDetails[0][1][i].strArea} </h4>
        <h4 class="category text-white">Category: ${allDetails[0][1][i].strCategory}</h4>
        <h4 class="recipes text-white">Recipes:</h4>
        </div> 
        <div class="recipes-group ">
        <ul class="list-unstyled d-flex flex-wrap ">
        <li class="bg-info">${allDetails[0][1][i].strIngredient1}</li>
        <li class="bg-info">${allDetails[0][1][i].strIngredient2}</li>
        <li class="bg-info">${allDetails[0][1][i].strIngredient3}</li>
        <li class="bg-info">${allDetails[0][1][i].strIngredient4}</li>
        <li class="bg-info">${allDetails[0][1][i].strIngredient5}</li>
        <li class="bg-info">${allDetails[0][1][i].strIngredient6}</li>
        <li class="bg-info">${allDetails[0][1][i].strIngredient7}</li>
        <li class="bg-info">${allDetails[0][1][i].strIngredient8}</li>
        <li class="bg-info">${allDetails[0][1][i].strIngredient9}</li>
        </ul>
        <div class="tags d-flex">
        <h4 class="tag text-white me-3">Tag: </h4>
        <span class="naw3 mb-3 p-2 rounded-2 bg-danger"> ${allDetails[0][1][i].strTags}</span>    
        </div>
        <button class="btn btn-success Source p-2 me-3">Source</button>
        <button class="btn btn-danger p-2 Youtube">Youtube</button>
        </div>
        
        </div>`        
        gallery.innerHTML = "";    

        document.querySelector('.details-layer').innerHTML = shanta;

        // selecting inputs
        document.querySelector('.Youtube').addEventListener('click' , function(){
            open(allDetails[0][1][i].strYoutube)
        })
            
        document.querySelector('.Source').addEventListener('click' , function(){
            open('https://cooknshare.com/recipe/chicken-teriyaki-casserole/.')
        })

    }
}

// ***********************************************Get Contacts*************************************************

let contactUs =document.querySelector('.contactUs')
let contacts = document.querySelector('.contacts');
let inName = document.querySelector('.name-input');
let inEmail = document.querySelector('.mail-input');
let inPhone = document.querySelector('.phone-input');
let inAge = document.querySelector('.age-input');
let inPass = document.querySelector('.pas-input');
let inRepass = document.querySelector('.repas-input');
let inButton = document.querySelector('.btn-outline-danger');

function getContacts(){

contacts.innerHTML = `<div class="col-lg-6 d-flex justify-content-center align-items-center my-2">
<input type="text" class="form-control name-input mb-2 w-100" placeholder="Enter Your Name"> 
</div>  
<div class="col-lg-6 d-flex justify-content-center align-items-center my-2">
<input type="email" class="form-control mail-input mb-2 w-100" placeholder="Enter Your Email">
</div>
<div class="col-lg-6 d-flex justify-content-center align-items-center my-2">
<input type="text" class="form-control phone-input mb-2 w-100" placeholder="Enter Your phone">
</div>
<div class="col-lg-6 d-flex justify-content-center align-items-center my-2">
<input type="text" class="form-control age-input mb-2 w-100" placeholder="Enter Your Age">
</div>
<div class="col-lg-6 d-flex justify-content-center align-items-center my-2">
<input type="text" class="form-control pas-input mb-2 w-100" placeholder="Enter Your Password">
</div> 
<div class="col-lg-6 d-flex justify-content-center align-items-center my-2">
<input type="text" class="form-control repas-input mb-2 w-100" placeholder="RE-password"> 
</div>

<button class="btn btn-outline-danger w-25 mx-auto mt-3 py-2 px-3">Submit</button>
` 
gallery.innerHTML = "";
}

// Event on link*******************

contactUs.addEventListener('click' , function(){
    getContacts()
    navbar.animate({left : - navbarWidth },500)
    linksAnimate.animate({'margin-top' : '5px'}, 500 , function(){
    exit.html('<i class="text-center fs-3 fa-solid fa-bars"></i>') }) 
    $(contacts).css('display','flex')
    $('.category , .area , .ingredients , .search').click(function(){
    $('.contacts').addClass('d-none')})
    })


function validating() {
    

inName.addEventListener('focus' , function(){nameValidation()})
inEmail.addEventListener('focus' , function(){emailValidation()})
inPhone.addEventListener('focus' , function(){phoneValidation()})
inAge.addEventListener('focus' , function(){ageValidation()})
inPass.addEventListener('focus' , function(){passwordValidation()})
inRepass.addEventListener('focus' , function(){repasswordValidation()})





    
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(inName.value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inEmail.value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(inPhone.value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(inAge.value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(inPass.value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == inRepass.value
}
}

// inButton.addEventListener('.click' , function(){validating()})















function openApplication(){
    getData(function(){
        getAllAreas(function(){
            getAllIngredients()

        
        })

    })

} 

openApplication()







})