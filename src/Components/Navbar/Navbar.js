
import { getSessionObject} from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import logo from "../../img/logo-wish.png";


const Navbar = async () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar;
  let user = getSessionObject("user");
  const logowish = new Image();
<<<<<<< HEAD
  logowish.src = "../../img/logo-wish.png";
=======
  logowish.src = logo;
  console.log(logo);
>>>>>>> 20719cc2100669d0e41dcb7cdaef3f0e22b5f10f
  logowish.height = 50;
  navbarWrapper.appendChild(logowish);
 

  if (!user) {
    navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-danger">
        <div class="container-fluid">
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
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/">Mes wishlists</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/">Mes wishlists partagées</a>
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
  `;
  }
  
  
  

  
  navbarWrapper.innerHTML = navbar;
 
};

export default Navbar;