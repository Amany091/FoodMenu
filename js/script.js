import { shop, favourites, offer } from "../DB/fruits.js";
import people from "../DB/testmonials.js";

const closeIcon = document.querySelector(".sidebar .fas");
const openIcon = document.querySelector(".sidebar .open");
const sidebar = document.querySelector(".sidebar-sm");
const inputs = document.querySelectorAll("form input")
const title = document.getElementById("title")
const priceInp = document.getElementById("price")
const discountInp = document.getElementById("discount")
const descreptionInp = document.getElementById("descreption")
const countInp = document.getElementById("count")
const img = document.getElementById("image")
const formSubmit = document.getElementsByTagName("form")[0]
const newContainer = document.getElementsByClassName("newest")[0]
const subButton = document.getElementById("submit")

let fruits = []

// * SAVE ALL DATA OBJECTS WHICH ADDED BY FORM
function saveToLocalStorage() {
    localStorage.setItem("shop", JSON.stringify(fruits) )
}
const getFruits = localStorage.getItem("shop") || ''
if (getFruits) fruits = JSON.parse(getFruits) 


openIcon.addEventListener("click", () => {
  closeIcon.classList.remove("d-none");
  openIcon.classList.add("d-none");
  sidebar.classList.remove("d-none");
});
closeIcon.addEventListener("click", () => {
  closeIcon.classList.add("d-none");
  openIcon.classList.remove("d-none");
  sidebar.classList.add("d-none");
});


// * ADD FAVOURITES FRUITS INTO HTML
const favouriteContainer = document.getElementsByClassName("fav-list")[0];
favourites.map((product) => {
  const { image, name, descreption, discount, beforeDiscount, count } = product;

  let element = `
        <div class='food card'>
            <img src=${image} alt=${name} class='card-img-top'>
            <div class='card-body'>
                <p>${name}</p>
                <p class='food-info'>${descreption}</p>
                <span class='d-flex justify-content-baseline'>
                    <p>${discount}</p>
                    <p>${beforeDiscount}</p>
                </span>
                <div class='shop  my-3'>
                    <div class=' border border-light' >
                        <i class='fa'>&#xf067</i>
                        <p>${count}</p>
                        <i class='fa'>&#xf068</i>
                    </div>
                    <button> Buy Now </button>
                </div>
            </div>
        </div>
    `;
  favouriteContainer.innerHTML += element;
});


//* ADD SHOP FRUITS INTO HTML
// RETURN ALL DATA OBJECT AS HTML
const shopContainer = document.getElementsByClassName("shop-list")[0];
shop.map((product) => {
    const { image, name, descreption, discount, beforeDiscount, count } = product;
    let element = `
          <div class='food card'>
              <img src=${image} alt=${name} class='card-img-top'>
              <div class='card-body'>
                  <p>${name}</p>
                  <p class='food-info'>${descreption}</p>
                  <span class='d-flex align-items-baseline'>
                      <p>${discount}</p>
                      <p>${beforeDiscount}</p>
                  </span>
                  <div class='shop d-flex justify-content-around align-items-center my-3'>
                      <div class='d-flex justify-content-evenly align-items-baseline border border-light' >
                          <i class='fa'>&#xf067</i>
                          <p>${count}</p>
                          <i class='fa'>&#xf068</i>
                      </div>
                      <button> Buy Now </button>
                  </div>
              </div>
          </div>
      `;
    shopContainer.innerHTML += element;
});

// ADD THE LAST ELEMENT FROM ARRAY FROM LOCALSTORAGE [NEWEST]
function AddProduct() {
    const { image, name, descreption, discount, beforeDiscount, count } = fruits[fruits.length -1]
    let element = `
      <div class='food card' data-index=${fruits.length -1} >
            <p class="text-danger position-absolute right-0 px-2" style="z-index:3" >new</p>
          <img src=${image} alt=${name} class='card-img-top'>
          <div class='card-body'>
              <p>${name}</p>
              <p class='food-info'>${descreption}</p>
              <span class='d-flex align-items-baseline'>
                  <p>${discount}</p>
                  <p>${beforeDiscount}</p>
              </span>
              <div class='shop d-flex justify-content-around align-items-center my-3'>
                  <div class='d-flex justify-content-evenly align-items-baseline border border-light' >
                      <i class='fa'>&#xf067</i>
                      <p>${count}</p>
                      <i class='fa'>&#xf068</i>
                  </div>
                  <button> Buy Now </button>
              </div>
              <div class="d-flex justify-content-evenly" >
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-danger" >Delete</button>
              </div>
          </div>
      </div>
  `;
    newContainer.innerHTML += element;
}

function deleteProduct(event) {
    let card = event.target.parentNode.parentNode.parentNode;
    let index = card.getAttribute("data-index")
    fruits.splice(index, 1)
    localStorage.removeItem("shop")
    saveToLocalStorage()
}

function editProduct(event) {
    let card = event.target.parentNode.parentNode.parentNode
    let index = card.getAttribute("data-index")
    const { image, name, descreption, discount, beforeDiscount, count } = fruits[index]
    title.value = name
    descreptionInp.value = descreption
    discountInp.value = discount
    priceInp.value = beforeDiscount
    countInp.value = count
    subButton.innerText = "EDIT"
    subButton.addEventListener("click", () => {
        fruits.splice(index, 1) // DELETE OLD OBJECT WHICH WANT TO BE UPDATED ,THEN INSERT A NEW ONE 
        subButton.innerText = "CREATE"
    })
    saveToLocalStorage()
}

// RETURN ALL OBJECTS FROM LOCALSTORAGE AS HTML 
function display() {
    fruits.map((fruit , index) => {
        const { image, name, descreption, discount, beforeDiscount, count } = fruit
        let element = `
          <div class='food card ' data-index=${index} >
                <p class="text-danger position-absolute right-0 px-2" style="z-index:3" >new</p>
              <img src=${image} alt=${name} class='card-img-top'>
                <div class='card-body'>
                  <p>${name}</p>
                  <p class='food-info'>${descreption}</p>
                  <span class='d-flex align-items-baseline'>
                      <p>${discount}</p>
                      <p>${beforeDiscount}</p>
                  </span>
                  <div class='shop d-flex justify-content-around align-items-center my-3'>
                      <div class='d-flex justify-content-evenly align-items-baseline border border-light' >
                          <i class='fa'>&#xf067</i>
                          <p>${count}</p>
                          <i class='fa'>&#xf068</i>
                      </div>
                      <button> Buy Now </button>
                  </div>
                   <div class="d-flex justify-content-evenly" >
                        <button class="btn btn-primary edit">Edit</button>
                        <button class="btn btn-danger delete" onclick="deleteProduct(${index})">Delete</button>
                    </div>
                </div>
          </div>
      `;
    newContainer.innerHTML += element;
})
    let newFoods = document.querySelectorAll(".newest .food")
    newFoods.forEach((card) => {
        card.querySelector(".delete").addEventListener("click", (event)=>deleteProduct(event))
        card.querySelector(".edit").addEventListener("click", (event)=>editProduct(event) )
        
    })
}

// READ PATH IMAGE FILE 
const reader = new FileReader()
let imageDataURL;
img.addEventListener("change", (e) => {
    const file = img.files[0]
    reader.readAsDataURL(file)
    reader.onload = () => {
        imageDataURL = reader.result
    }
})

// BY CLICKING ON BUTTON CREATE FROM FORM , NEW PRODUCT WILL BE ADDED 
function create(event) {  
    event.preventDefault()
    fruits.push({
        image: imageDataURL,
        name: title.value, 
        descreption: descreptionInp.value,
        discount: discountInp.value,
        beforeDiscount: priceInp.value,
        count: countInp.value
    })
    saveToLocalStorage()
    AddProduct()
    console.log(fruits)
    inputs.forEach(inp => inp.value = '')
}
formSubmit.addEventListener("submit", e => create(e))

// KEEP DATA EXISTING 
window.addEventListener("DOMContentLoaded", () => {
    display()
})



// * ADD FRUITS OFFER INTO HEADER AND MAKE IT AS SLIDER
let slide = 0;
const offerFruitsContainer = document.querySelectorAll(".offer-container");
// setInterval(() => {
//     for (let i = 0; i < offer.length; i++){
//         if (offer[i].length > slide) {
//             const { image, name, descreption, desc, discount, beforeDiscount } = offer[i][slide]
//             offerFruitsContainer[i].innerHTML = `
//             <div data-index=${slide} class="product-offer">
//                 <div class="offer card " >
//                     <div class="d-flex">
//                         <div class="fruitimg ">
//                             <img src=${image} alt=${name} class="img-fluid rounded-start">
//                         </div>
//                         <div class="offer-details">
//                             <div class="card-body">
//                                 <div class="details">
//                                     <div class="fruit-details">
//                                         <h5 class="card-title">${name}</h5>
//                                         <p class="card-text">${descreption}</p>
//                                         <p class="card-text">${desc}</p>
//                                     </div>
//                                     <div class="cost-offer">
//                                         <span>
//                                             <p>${discount}$</p>
//                                             <p>${beforeDiscount}$</p>
//                                         </span>
//                                         <button class="btn">BUY NOW</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             `
//             slide++
//         } else {
//             slide = 0
//         }
//         // for (let j = 0; j < offer[i].length; j++){
//         // }
//     }
// }, 2000);

// offerFruitsContainer.forEach(el => {
//     const offers = el.querySelectorAll(".product-offer")
//     let interval =setInterval(() => {
//         if (slide < offers.length) {
//             console.log(slide)
//             console.log(el.querySelectorAll(".product-offer")[1].innerHTML)
//             el.innerHTML = el.querySelectorAll(".product-offer")[slide].innerHTML
//             slide++
//         } else {
//             clearInterval(interval)
//         }

//         console.log(slide)

//     }, 2000);
// })

// 

// 

//
setInterval(() => {
  offer.forEach((off, index) => {
    off.forEach((product, ind) => {
      if (slide < off.length) {
        const { image, name, descreption, desc, discount, beforeDiscount } = off[slide];
        offerFruitsContainer[index].innerHTML = `
                <div data-index=${slide} class="product-offer">
                <div class="offer card " >
                    <div class="d-flex">
                        <div class="fruitimg ">
                            <img src=${image} alt=${name} class="img-fluid rounded-start">
                        </div>
                        <div class="offer-details">
                            <div class="card-body">
                                <div class="details">
                                    <div class="fruit-details">
                                        <h5 class="card-title">${name}</h5>
                                        <p class="card-text">${descreption}</p>
                                        <p class="card-text">${desc}</p>
                                    </div>
                                    <div class="cost-offer">
                                        <span>
                                            <p>${discount}$</p>
                                            <p>${beforeDiscount}$</p>
                                        </span>
                                        <button class="btn">BUY NOW</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            `
          slide++;
          
      } else {
        slide = 0;
        }
    });
  });
}, 2000);


// * 
const peopleContainer = document.getElementsByClassName("people")[0];
people.map((person) => {
  const { image, name, about } = person;
  let element = `
            <div class="person-info">
                <div class="person">
                    <div class="person-image">
                        <img src=${image} alt=${name}>
                    </div>
                    <div class="rate">
                        <i class="fa">&#xf005</i>
                        <i class="fa">&#xf005</i>
                        <i class="fa">&#xf005</i>
                        <i class="fa">&#xf005</i>
                        <i class="fa">&#xf005</i>
                    </div>
                </div>
                <p class="person-name">${name}</p>
                <p class="person-about">${about}</p>
            </div>
    `;
  peopleContainer.innerHTML += element;
});

