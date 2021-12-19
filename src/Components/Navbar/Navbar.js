import { Navbar as BootstrapNavbar } from "bootstrap";
import { getSessionObject, setSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import logo from "../../img/logo-wish.png";
import { Redirect } from "../Router/Router";
import { createPopper } from "@popperjs/core/lib/createPopper";

const Navbar = async () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar;
  let user = getSessionObject("user");
  const logowish = new Image();
  logowish.src = logo;
  logowish.height = 50;
  navbarWrapper.appendChild(logowish);




  if (!user) {
    navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-danger">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">${logowish}</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/login">Se connecter</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/register">S'inscrire</a>
              </li>            
            </ul>
          </div>
        </div>
      </nav>
  `;
  } else {
    
    navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-danger">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">e-Pizzeria</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-uri="/">Accueil</a>
              </li> 
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/wishlists/add">Ajouter wishlist</a>
              </li>
              <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ">
          Mes wishlist 
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">            
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
          </div>
          </li>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Wishlist partagées
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
            </div>
            </li>
              <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/UserAccount">Mon compte</a>
            </li>      
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/logout">Se déconnecter</a>
              </li>
              <li class="nav-item">
              <a class="nav-item nav-link disabled" href="#">${user.username}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  `
  
   // json() returns a promise => we wait for the data
    
    navItemWishList();
   
  ;
  }
  async function navItemWishList(){
    const response1 = await fetch(`/api/wishlists/user=${user.id}`);
    const wishlists = await response1.json();

    console.log("element !!! "+wishlists[0]);
    console.log("element 1 id"+wishlists[0].title);
    // All items we'd like to add
    var navItems = [];
    for (let i = 0; i < wishlists.length; i++){
      console.log("i"+i);
        navItems.push({text: wishlists[i].title})
        console.log("name nav item :"+navItems[i].text);
    }

    // A few variables for use later
    var navElem = document.createElement("nav"),
        navList = document.createElement("ul"), 
        navItem, navLink;

    navElem.appendChild(navList);

    // Cycle over each nav item
    for (var i = 0; i < navItems.length; i++) {
        // Create a fresh list item, and anchor
        navItem = document.createElement("li");
        navLink = document.createElement("a");

        // Set properties on anchor
        navLink.href = navItems[i].href;
        navLink.innerHTML = navItems[i].text;

        // Add anchor to list item, and list item to list
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    }

    // Set first list item as current
    navList.children[0].className = "current";

    // Add list to body (or anywhere else)
    window.onload = function () {
        document.body.appendChild(navElem);
    }

};
 
  // function myWishLists(wish, element) {



    
  //   console.log("mywish"+wish);
  //   console.log("wish id :"+wish.id);
    
  //   console.log("NavItem"+element);

  //   // <a class="dropdown-item" href="#">${wishlists[0].title}</a>

  //   const url3 = document.createElement("button");
  //   url3.style.background = "none";
  //   url3.style.border = "none";
  //   url3.id = wish.id;
  //   url3.innerText = wish.title;
  //   url3.appendChild(element);
    
  //   url3.addEventListener("click",onclickNavMyWish);


  //   function onclickNavMyWish(){
  //     setSessionObject("wishlistInspected",wish.id);
      
  //     console.log("my wish 1"+ wish.id);
  //     Redirect("/wishlists/id");
  //   }


  //   console.log("mywishlist");
  //   console.log("test");
  // }

  
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;