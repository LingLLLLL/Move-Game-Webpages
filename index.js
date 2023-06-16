let cart = new Array();
// cart = parse.JSON(localStorage.cart)
let checkOutList = new Array();
let list1;
let nbItem = 0;
let cartItem = new Array();
let count = {};
let result = [];

const TAX_TPS = 0.05;
const TAX_TVQ = 0.09975;
let subTotal = 0;
let totalQty = 0;
let totalTPS = 0;
let totalTVQ = 0;
let total = 0;

// Name and Password from the register-form
let firstName = document.getElementById('firstName');
let famName = document.getElementById('familyName');
let sEmail = document.getElementById('inputEmail');
let pw = document.getElementById('inputPassword');
let logIn = new Array();

function homePage() {
  let item =
    `<div class="hero-image">
      <div class="hero-text">
        <h3 style="font-size: 30px
		;" >
          TEAM 5 Co. is a hobby club that specializes in selling books, movies
          and video games only to its members at prices half the prices
          available on the market.
        </h3>
      </div>
    </div>
	<style>
    .hero-image {
        margin-top: 200px;
        background-image: url(jx3/jx3_2.jpg);
        background-color: #cccccc;
        height: 500px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
      }

      .hero-text {
        text-align:center;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: hsl(0, 0%, 100%);
      }
	</style>    
    `
  document.getElementById('listing').innerHTML = item;
  // document.getElementById('carouselExampleInterval').style.display = "none";
}

function chargerZoneItem(categorie) {
  // document.getElementById('carouselExampleInterval').style.display = "inline";

  let list1;
  let item = `
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="3"
                aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="4"
                aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner carouselHeight">
            <div class="carousel-item active" data-bs-interval="2500">
                <img src="images/1wallpaper-gamer.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="2500">
                <img src="images/2gaming-backgrounds.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="2500">
                <img src="images/3gaming-wallpapers.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="2500">
                <img src="images/4gaming-wallpapers.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="2500">
                <img src="images/5wallpaper-hd.jpg" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <div class="row row-cols-1 row-cols-md-4 g-4 ownMargin">`;
  fetch('index.json')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data[categorie])
      list1 = data;
      nbItem = data[categorie].length
      for (let i = 0; i < data[categorie].length; i++) {
        // console.log(data.categorie[i])
        let title = data[categorie][i].Title;
        let image = data[categorie][i].image;
        let price = data[categorie][i].Price;
        let summary = data[categorie][i].summary;
        let Actor = data[categorie][i].Actor;
        // console.log(title + " " + image + " " + price + " " + summary)
        item += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${image}" class="card-img-top carImgHeight" alt="...">
                        <div class="card-body">
                        <p class="card-text">${price}</p>
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${Actor}</p>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-outline-secondary" id="btn${i}">Add To Cart</button>
                        </div>
                    </div>
                </div>`
        // let btnAddCart = document.createElement("button");
        // btnAddCart.setAttribute("class", "btn btn-outline-secondary")
        // btnAddCart.setAttribute("value", "Add To Cart")
        // btnAddCart.addEventListener("click", function () {
        //     let movieProduct = { product: data[categorie][i], quantity: "1" };
        //     addToCart(movieProduct);
        // })
        // let cardFooters = document.getElementsByClassName('card-footer');
        // for (let i = 0; i < cardFooters.length; i++) {
        //     cardFooters[i].appendChild(btnAddCart);
        // }

      }
      item += "</div>"
      document.getElementById('listing').innerHTML = item;


      for (let i = 0; i < nbItem; i++) {
        let btnAddCart = document.getElementById("btn" + i)
        btnAddCart.addEventListener("click", function () {
          let movieProduct = { product: data[categorie][i], quantity: "1" };
          addToCart(movieProduct);
        })

      }
      console.log(list1)
    })
    .catch(error => console.error(error));

}
console.log(list1)


//====================add to cart==================================

function addToCart(movieProduct) {
  cart.push(movieProduct);
  saveCart();
  let quantity = movieProduct.quantity;;
  let nbItemPanier = parseInt(document.getElementById("idItem").innerHTML);
  nbItemPanier += parseInt(quantity);
  document.getElementById("idItem").innerHTML = nbItemPanier;
}

//=======================save to localStorage=============================

function saveCart() {
  if (typeof (localStorage) == "undefined") {
    alert("navigator not support localstorage");
    return;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

//========================check icon to checkout page=====================

function checkout() {
  let item = `
    <div class="container">
        <main>
            <div class="py-5 text-center">
                <h2 style="margin-top: 100px;">Checkout Your Order</h2>
            </div>
            <section class="col-lg-11" style="margin: auto;">
        `

  count = {}
  for (let i = 0; i < cart.length; i++) {

    let obj = cart[i];
    let key = JSON.stringify(obj);
    count[key] = count[key] ? count[key] + 1 : 1;

    let title = cart[i].product.Title;
    let image = cart[i].product.image;
    let price = cart[i].product.Price;
    let summary = cart[i].product.summary;
    let Subject = cart[i].product.Subject;

  }
//reduce the duplicated item and increase it's count in result

  result = [];
  for (let key in count) {
    let obj = JSON.parse(key);
    result.push({ object: obj, count: count[key] });
  }

  console.log(result);

  for (let j = 0; j < result.length; j++) {
    let title = result[j].object.product.Title;
    let image = result[j].object.product.image;
    let price = result[j].object.product.Price;
    let summary = result[j].object.product.summary;
    let Subject = result[j].object.product.Subject;
    let itemQuantity = result[j].count;
    let itemTotal = parseFloat(price) * parseFloat(itemQuantity);
    // console.log(price)
    // console.log(itemQuantity)
    // console.log(itemTotal);

    item += `
            <div class="d-sm-flex justify-content-between align-items-center my-2 pb-3 border-bottom">
                <div class="d-block d-sm-flex align-items-center text-center text-sm-start">
                    <a class="d-inline-block flex-shrink-0 mx-auto me-sm-4" href="#">
                        <img src="${image}" width="160" alt="#">
                    </a>

                    <div class="pt-2">
                        <h5>${title}</h5>
                        <div class="fs-sm">
                            <span class="text-muted me-2">${Subject}</span>
                        </div>
                        <div class="fs-lg text-accent pt-2">
                            ${price}$
                        </div>
                    </div>
                </div>
                <div class="pt-2 pt-sm-0 ps-sm-3 mx-auto mx-sm-0 text-center text-sm-start" style="max-width: 9rem;">
                    <input class="form-control" type="number" id="itemQty${j}" min="1" value="${itemQuantity}">
                    <button class="btn btn-link px-0 text-danger" type="button">
                        <span class="fs-sm" id="removeItem${j}"> Remove</span>
                    </button>
                </div>
            </div>
        
        `
  }

  // ==========================calculateInvoice();==============================

  // calculateInvoice();
  item += `</section>
    <div class="col-8" style="margin: auto;">
        <br>
        <br>       
        <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between">
                <span style="font-weight: 600;">Before Tax (CAD)</span>
                <span id="idBeforeTax">${subTotal.toFixed(2)}$</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span style="font-weight: 400;">TPS (CAD)</span>
                <span id="idTPS">${totalTPS.toFixed(2)}$</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span style="font-weight: 400;">TVQ (CAD)</span>
                <span id="idTVQ">${totalTVQ.toFixed(2)}$</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span style="font-weight: 600;">Total (CAD)</span>
                <span id="idTotal">${total.toFixed(2)}$</span>
            </li>       
        </ul>
    </div>
    `

  item += `
    <div style="padding: 50px;">

        <div class="col-9" style="margin: auto;">
          <h4 class="mb-3">Billing address</h4>
          <form class="needs-validation" novalidate>
            <div class="row g-3">
              <div class="col-sm-6">
                <label for="firstName" class="form-label">First name</label>
                <input type="text" class="form-control" id="firstName" placeholder="" value="" required />
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div class="col-sm-6">
                <label for="lastName" class="form-label">Last name</label>
                <input type="text" class="form-control" id="lastName" placeholder="" value="" required />
                <div class="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div class="col-12">
                <label for="username" class="form-label">Username</label>
                <div class="input-group has-validation">
                  <span class="input-group-text">@</span>
                  <input type="text" class="form-control" id="username" placeholder="Username" required />
                  <div class="invalid-feedback">
                    Your username is required.
                  </div>
                </div>
              </div>

              <div class="col-12">
                <label for="email" class="form-label">Email <span class="text-muted">(Optional)</span></label>
                <input type="email" class="form-control" id="email" placeholder="you@example.com" />
                <div class="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div class="col-12">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
                <div class="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div class="col-12">
                <label for="address2" class="form-label">Address 2 <span class="text-muted">(Optional)</span></label>
                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
              </div>

              <div class="col-md-5">
                <label for="country" class="form-label">Country</label>
                <select class="form-select" id="country" required>
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div class="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>

              <div class="col-md-4">
                <label for="state" class="form-label">State</label>
                <select class="form-select" id="state" required>
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div class="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div class="col-md-3">
                <label for="zip" class="form-label">Zip</label>
                <input type="text" class="form-control" id="zip" placeholder="" required />
                <div class="invalid-feedback">Zip code required.</div>
              </div>
            </div>

            <hr class="my-4" />

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="same-address" />
              <label class="form-check-label" for="same-address">Shipping address is the same as my billing
                address</label>
            </div>

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="save-info" />
              <label class="form-check-label" for="save-info">Save this information for next time</label>
            </div>

            <hr class="my-4" />

            <h4 class="mb-3">Payment</h4>

            <div class="my-3">
              <div class="form-check">
                <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required />
                <label class="form-check-label" for="credit">Credit card</label>
              </div>
              <div class="form-check">
                <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required />
                <label class="form-check-label" for="debit">Debit card</label>
              </div>
              <div class="form-check">
                <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required />
                <label class="form-check-label" for="paypal">PayPal</label>
              </div>
            </div>

            <div class="row gy-3">
              <div class="col-md-6">
                <label for="cc-name" class="form-label">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" required />
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">Name on card is required</div>
              </div>

              <div class="col-md-6">
                <label for="cc-number" class="form-label">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder="" required />
                <div class="invalid-feedback">
                  Credit card number is required
                </div>
              </div>

              <div class="col-md-3">
                <label for="cc-expiration" class="form-label">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                <div class="invalid-feedback">Expiration date required</div>
              </div>

              <div class="col-md-3">
                <label for="cc-cvv" class="form-label">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                <div class="invalid-feedback">Security code required</div>
              </div>
            </div>

            <hr class="my-4" />

            <button class="w-100 btn btn-primary btn-lg" type="submit">
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
      `
  document.getElementById('listing').innerHTML = item;
  calculateInvoice();
  //==================================from checkOut.js===================================
  (() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  })();

  //=====================click up and down arrow to +/- item number
  for (let j = 0; j < result.length; j++) {
    let nbItemQty = document.getElementById("itemQty" + j);
    nbItemQty.addEventListener("change", function () {
      // let shopItemQty = nbItemQty.value;
      // itemQuantity = parseInt(shopItemQty);
      result[j].count = parseInt(nbItemQty.value)
      saveCart();
      calculateInvoice();
    });
  }

  //===============for remove button================

  for (let j = result.length - 1; j >= 0; j--) {
    let btnRemove = document.getElementById("removeItem" + j);
    let removeItemName = result[j].object.product.Title;
    btnRemove.addEventListener("click", function () {
      result.splice(j, 1);

      for (let i = cart.length - 1; i >= 0; i--) {
        if (cart[i].product.Title === removeItemName) {
          cart.splice(i, 1);
        }
      }

      saveCart();
      calculateInvoice();
      checkout();
    })
  }

}

//==================================================
function calculateInvoice() {
  let subTotal = 0;
  let totalQty = 0;
  let ItemQuantity
  let ItemTotalPrice

  for (let i = 0; i < result.length; i++) {
    ItemQuantity = result[i].count;
    ItemTotalPrice = parseFloat(result[i].object.product.Price) * parseInt(ItemQuantity);
    subTotal += ItemTotalPrice;
    totalQty += parseInt(ItemQuantity);
  }
  // result.forEach(function (eachItem) {
  //     /*
  //     a little reminder for the command line
  //     orderline = {product: pr, quantity: qty};
  //     */

  //     // ItemQuantity = eachItem.count;
  //     ItemTotalPrice = eachItem.object.product.Price;
  //     subTotal += parseInt(ItemQuantity) * parseFloat(ItemTotalPrice);
  //     totalQty += parseInt(ItemQuantity);
  // });

  totalTPS = subTotal * TAX_TPS;
  totalTVQ = subTotal * TAX_TVQ;
  total = subTotal + totalTPS + totalTVQ;
  document.getElementById("idBeforeTax").innerHTML = subTotal.toFixed(2) + " $";
  document.getElementById("idTPS").innerHTML = totalTPS.toFixed(2) + " $";
  document.getElementById("idTVQ").innerHTML = totalTVQ.toFixed(2) + " $";
  document.getElementById("idTotal").innerHTML = total.toFixed(2) + " $";

  // modification du panier
  document.getElementById("idItem").innerHTML = totalQty;

}


function logInPage() {
  let item = `
    <div class="bd-example-snippet bd-code-snippet" style="margin: 100px;">

        <div id="first" class="border border-1 rounded-4 col-md-5 mx-auto">
          <div class="myform form bd-example">
            <div class="logo mb-3" style="margin: 20px;">
              <div class="col-md-12 text-center">
                <h1>Login</h1>
              </div>
            </div>
            <form action="" method="get" class="bd-example" style="margin: 20px;">
              <div class="mb-3" style="padding: auto;">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" name="email" class="form-control" id="logInEmail" aria-describedby="emailHelp"
                  placeholder="name@example.com">
              </div>
              <div class="mb-3" style="padding: auto;">
                <label for="exampleInputEmail1">Password</label>
                <input type="password" name="password" id="logInPassword" class="form-control" aria-describedby="emailHelp"
                  placeholder="Enter Password">
              </div>
              <div class="checkbox mb-3 m-auto text-center">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <div class="mb-3" style="padding: auto;">
                <p class="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
              </div>
              <div class="d-grid gap-2 col-8 mx-auto">
                <button id="btnSignin" type="submit" class=" btn btn-primary">Login</button>
              </div>
              <div class="col-md-12 "  style="margin-top: 20px;">
                <h6 class="text-black-50" style="width: 100%; text-align: center; border-bottom: 1px solid #969696; 
                    line-height: 0.1em; margin: 10px 0 20px; padding:0 10px; ">
                    <span style="background:#fff; padding:0 10px; font-size:smaller;">or</span></h6>
              </div>
              <div class="col-md-12 mb-3">
                <p class="text-center">
                  <a href="javascript:void();" class="google btn mybtn"><i class="fa fa-google-plus">
                    </i> Signup using Google
                  </a>
                </p>
              </div>
              <div class="mb-3" style="padding: auto;">
                <p class="text-center">Don't have account? <a href="#" id="signup">Sign up here</a></p>
              </div>
            </form>

          </div>
        </div>
        <div id="second" class="border border-1 rounded-4 col-md-5 mx-auto">
          <div class="myform form bd-example">
            <div class="logo mb-3" style="margin: 20px;">
              <div class="col-md-12 text-center">
                <h1>Signup</h1>
              </div>
            </div>
            <form  name="registration" method="get" class="bd-example" style="margin: 20px;">
              <div class="mb-3" style="padding: auto;">
                <label for="exampleInputEmail1">First Name</label>
                <input type="text" name="firstname" class="form-control" id="firstName" aria-describedby="emailHelp"
                  placeholder="Enter Firstname">
              </div>
              <div class="mb-3" style="padding: auto;">
                <label for="exampleInputEmail1">Last Name</label>
                <input type="text" name="lastname" class="form-control" id="familyName" aria-describedby="emailHelp"
                  placeholder="Enter Lastname">
              </div>
              <div class="mb-3" style="padding: auto;">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name="email" class="form-control" id="inputEmail" aria-describedby="emailHelp"
                  placeholder="Enter email">
              </div>
              <div class="mb-3" style="padding: auto;">
                <label for="exampleInputEmail1">Password</label>
                <input type="password" name="password" id="inputPassword" class="form-control" aria-describedby="emailHelp"
                  placeholder="Enter Password">
              </div>
              <div class="d-grid gap-2 col-8 mx-auto">
                <button id="btnRegister" type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">Get Started For Free</button>
              </div>
              <div class="col-md-12 ">
                <div class="mb-3" style="margin-top: 10px;">
                  <p class="text-center"><a href="#" id="signin">Already have an account?</a></p>
                </div>
              </div>
          </div>
          </form>
        </div>
      
    
  </div>
    `
  document.getElementById('listing').innerHTML = item;
  document.getElementById("second").style.display = "none"
  // Add click event handlers to the "signup" and "signin" buttons
  document.getElementById("signup").addEventListener("click", function () {
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "block";
  });

  document.getElementById("signin").addEventListener("click", function () {
    document.getElementById("second").style.display = "none";
    document.getElementById("first").style.display = "block";
  });

  document.getElementById("btnRegister").addEventListener("click", function () {
    store();
  });
  document.getElementById("btnSignin").addEventListener("click", function () {
    check();
  });

}

// storing input from register-form
function store() {
  let firstName = document.getElementById('firstName');
  let famName = document.getElementById('familyName');
  let sEmail = document.getElementById('inputEmail');
  let pw = document.getElementById('inputPassword');
  let logIn = new Array();


  // localStorage.setItem('name', name1.value);
  // localStorage.setItem('pw', pw.value);
  if (sEmail.value == '' || pw.value == '') {
    alert('Registration not succeed');
  } else {
    alert('Registration succeed');
    let person = {
      familyNam: famName.value,
      firstNam: firstName.value,
      email: sEmail.value,
      pass: pw.value,
    };
    logIn.push(person);
    localStorage.setItem('logIn', JSON.stringify(logIn));
  }
}

// check if stored data from register-form is equal to entered data in the   login-form
function check() {
  let person1 = JSON.parse(localStorage.getItem('logIn'));
  // stored data from the register-form

  let userEmail = document.getElementById('logInEmail');
  let userPw = document.getElementById('logInPassword');
  try {

    // check if stored data from register-form is equal to data from login form
    if (userEmail.value == person1[0].email && userPw.value == person1[0].pass) {
      alert('Log In succeed');
      homePage();

    } else {
      alert('Your email and password does not match but you still have access.');
      homePage();

    }
  } catch (error) {
    alert('Something wrong but you still have access.');
    homePage();

  }
}
